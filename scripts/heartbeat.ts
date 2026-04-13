#!/usr/bin/env node

/**
 * Heartbeat check
 *
 * Usage:
 * - Local: HEARTBEAT_URL=http://localhost:3000/api/health npm run heartbeat
 * - Deployed: HEARTBEAT_URL=https://your-app.example.com/api/health npm run heartbeat
 */

function getHeartbeatUrl() {
  const url = process.env.HEARTBEAT_URL?.trim();
  if (url) return url;
  return 'http://localhost:3000/api/health';
}

async function runHeartbeat() {
  const url = getHeartbeatUrl();
  const startedAt = Date.now();

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'user-agent': 'vanity-heartbeat'
    }
  });

  const elapsedMs = Date.now() - startedAt;
  const text = await res.text();

  if (!res.ok) {
    throw new Error(`Heartbeat failed: ${res.status} ${res.statusText} (${elapsedMs}ms) ${text}`);
  }

  let parsed: unknown = null;
  try {
    parsed = JSON.parse(text);
  } catch {
    // non-json ok
  }

  console.log(
    JSON.stringify(
      {
        ok: true,
        url,
        status: res.status,
        elapsedMs,
        body: parsed ?? text
      },
      null,
      2
    )
  );
}

runHeartbeat()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

