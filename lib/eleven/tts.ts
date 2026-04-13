import axios from 'axios';
import fs from 'fs';
import fsPromises from 'fs/promises';
import path from 'path';
import { createHash } from 'crypto';

const ELEVEN_API_KEY = process.env.ELEVEN_API_KEY;

export async function generateElevenAudio(text: string, voice = 'alloy') {
  if (!ELEVEN_API_KEY) {
    throw new Error('ELEVEN_API_KEY not configured');
  }

  const endpoint = `https://api.elevenlabs.io/v1/text-to-speech/${encodeURIComponent(voice)}/stream`;

  const resp = await axios.post(endpoint, { text }, {
    responseType: 'arraybuffer',
    headers: {
      'xi-api-key': ELEVEN_API_KEY,
      'Content-Type': 'application/json',
      Accept: 'audio/mpeg'
    }
  });

  return {
    audioBuffer: Buffer.from(resp.data),
    contentType: resp.headers['content-type'] || 'audio/mpeg'
  };
}

// Cache TTS output to public/eleven-cache using a sha256(text|voice) filename.
// Returns the absolute filesystem path and the public URL (if NEXT_PUBLIC_APP_URL present).
export async function getOrCreateElevenAudioFile(text: string, voice = 'alloy') {
  const hash = createHash('sha256').update(`${voice}|${text}`).digest('hex');
  const publicDir = path.join(process.cwd(), 'public', 'eleven-cache');
  const filename = `${hash}.mp3`;
  const outPath = path.join(publicDir, filename);

  if (fs.existsSync(outPath)) {
    const publicBase = (process.env.NEXT_PUBLIC_APP_URL || '').replace(/\/$/, '');
    return {
      path: outPath,
      url: publicBase ? `${publicBase}/eleven-cache/${filename}` : undefined,
    };
  }

  const { audioBuffer } = await generateElevenAudio(text, voice);

  await fsPromises.mkdir(publicDir, { recursive: true });
  await fsPromises.writeFile(outPath, audioBuffer);

  const publicBase = (process.env.NEXT_PUBLIC_APP_URL || '').replace(/\/$/, '');
  return {
    path: outPath,
    url: publicBase ? `${publicBase}/eleven-cache/${filename}` : undefined,
  };
}

export default generateElevenAudio;
