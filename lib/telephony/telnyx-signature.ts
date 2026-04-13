/**
 * Telnyx ED25519 Webhook Signature Verification
 * 
 * Transport-level security gate. Runs BEFORE any routing logic.
 * 
 * Headers required:
 *   - telnyx-signature-ed25519: Base64 encoded signature
 *   - telnyx-timestamp: Unix timestamp (seconds)
 * 
 * Verification:
 *   1. Concatenate timestamp + raw body
 *   2. Verify ED25519 signature against Telnyx public key
 *   3. Enforce 5-minute timestamp skew window
 */

import nacl from 'tweetnacl';

// 5 minute max timestamp skew
const MAX_TIMESTAMP_SKEW_SECONDS = 300;

export interface SignatureVerificationResult {
  valid: boolean;
  reason?: string;
  timestampSkewSeconds?: number;
}

/**
 * Verify a Telnyx webhook signature
 * 
 * @param publicKeyPem - Telnyx public key in PEM format (from env)
 * @param payload - Raw request body as Buffer
 * @param signatureB64 - Base64 encoded signature from header
 * @param timestamp - Unix timestamp string from header
 * @returns Verification result with reason if failed
 */
export function verifyTelnyxSignature(
  publicKeyPem: string,
  payload: Buffer,
  signatureB64: string,
  timestamp: string
): SignatureVerificationResult {
  try {
    // Validate inputs exist
    if (!publicKeyPem) {
      return { valid: false, reason: 'TELNYX_PUBLIC_KEY not configured' };
    }
    if (!signatureB64) {
      return { valid: false, reason: 'Missing telnyx-signature-ed25519 header' };
    }
    if (!timestamp) {
      return { valid: false, reason: 'Missing telnyx-timestamp header' };
    }

    // Check timestamp skew
    const now = Math.floor(Date.now() / 1000);
    const ts = parseInt(timestamp, 10);
    
    if (isNaN(ts)) {
      return { valid: false, reason: 'Invalid timestamp format' };
    }
    
    const skew = Math.abs(now - ts);
    if (skew > MAX_TIMESTAMP_SKEW_SECONDS) {
      return { 
        valid: false, 
        reason: `Timestamp outside allowed window (skew: ${skew}s, max: ${MAX_TIMESTAMP_SKEW_SECONDS}s)`,
        timestampSkewSeconds: skew
      };
    }

    // Build the signed message: timestamp + payload
    const message = Buffer.concat([
      Buffer.from(timestamp),
      payload,
    ]);

    // Decode signature from base64
    const signature = Buffer.from(signatureB64, 'base64');
    
    // Parse public key from PEM format
    // ED25519 public keys are 32 bytes, wrapped in SPKI format
    const publicKeyRaw = parseEd25519PublicKey(publicKeyPem);
    
    if (!publicKeyRaw || publicKeyRaw.length !== 32) {
      return { valid: false, reason: 'Invalid public key format' };
    }

    // Verify the signature
    const isValid = nacl.sign.detached.verify(
      new Uint8Array(message),
      new Uint8Array(signature),
      new Uint8Array(publicKeyRaw)
    );

    return { 
      valid: isValid, 
      reason: isValid ? undefined : 'Signature verification failed',
      timestampSkewSeconds: skew
    };
  } catch (error) {
    return { 
      valid: false, 
      reason: `Verification error: ${error instanceof Error ? error.message : String(error)}` 
    };
  }
}

/**
 * Parse ED25519 public key from PEM format
 * 
 * Handles both raw base64 and full PEM with headers.
 * ED25519 public keys in SPKI format have a 12-byte header before the 32-byte key.
 */
function parseEd25519PublicKey(pem: string): Buffer | null {
  try {
    // Remove PEM headers and whitespace
    const base64 = pem
      .replace(/-----BEGIN PUBLIC KEY-----/g, '')
      .replace(/-----END PUBLIC KEY-----/g, '')
      .replace(/-----BEGIN ED25519 PUBLIC KEY-----/g, '')
      .replace(/-----END ED25519 PUBLIC KEY-----/g, '')
      .replace(/\s+/g, '');
    
    const der = Buffer.from(base64, 'base64');
    
    // If it's exactly 32 bytes, it's a raw key
    if (der.length === 32) {
      return der;
    }
    
    // SPKI format: 12-byte header + 32-byte key = 44 bytes
    if (der.length === 44) {
      // Skip the SPKI header (OID for ED25519)
      return der.slice(12);
    }
    
    // Try to find the key at the end (various DER encodings)
    if (der.length > 32) {
      return der.slice(-32);
    }
    
    return null;
  } catch {
    return null;
  }
}

/**
 * Middleware-style verification for Next.js API routes
 */
export async function verifyWebhookRequest(
  headers: Headers,
  body: Buffer
): Promise<SignatureVerificationResult> {
  const publicKey = process.env.TELNYX_PUBLIC_KEY || '';
  const signature = headers.get('telnyx-signature-ed25519') || '';
  const timestamp = headers.get('telnyx-timestamp') || '';
  
  return verifyTelnyxSignature(publicKey, body, signature, timestamp);
}

/**
 * Generate a test signature for simulation purposes
 * 
 * Uses a local keypair for testing the verification flow.
 */
export function generateTestSignature(
  payload: Buffer,
  timestamp: string
): { signature: string; publicKey: string; privateKey: Uint8Array } {
  // Generate a test keypair
  const keypair = nacl.sign.keyPair();
  
  // Build the message
  const message = Buffer.concat([
    Buffer.from(timestamp),
    payload,
  ]);
  
  // Sign it
  const signature = nacl.sign.detached(
    new Uint8Array(message),
    keypair.secretKey
  );
  
  // Encode public key as base64 (raw 32-byte format)
  const publicKeyB64 = Buffer.from(keypair.publicKey).toString('base64');
  
  return {
    signature: Buffer.from(signature).toString('base64'),
    publicKey: publicKeyB64,
    privateKey: keypair.secretKey,
  };
}

/**
 * Check if signature verification is enabled
 */
export function isSignatureVerificationEnabled(): boolean {
  return !!process.env.TELNYX_PUBLIC_KEY;
}
