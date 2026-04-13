#!/usr/bin/env tsx
import { config } from 'dotenv';
import axios from 'axios';
import * as fs from 'fs';

config();

const ELEVEN_API_KEY = process.env.ELEVEN_API_KEY;
if (!ELEVEN_API_KEY) {
  console.error('ELEVEN_API_KEY not set');
  process.exit(1);
}

async function run() {
  const text = 'Hello, this is a quick Eleven Labs TTS test.';

  try {
    console.log('Listing voices from ElevenLabs...');
    const vresp = await axios.get('https://api.elevenlabs.io/v1/voices', {
      headers: { 'xi-api-key': ELEVEN_API_KEY }
    });

    const voices = vresp.data?.voices || vresp.data || [];
    if (!voices || voices.length === 0) {
      console.error('No voices returned from ElevenLabs');
      process.exit(1);
    }

    const voiceId = voices[0].voice_id || voices[0].id || voices[0].voiceId || voices[0].name;
    console.log('Using voice id:', voiceId);

    const endpoint = `https://api.elevenlabs.io/v1/text-to-speech/${encodeURIComponent(voiceId)}/stream`;

    console.log('Requesting ElevenLabs TTS...');
    const resp = await axios.post(endpoint, { text }, {
      responseType: 'arraybuffer',
      headers: {
        'xi-api-key': ELEVEN_API_KEY,
        'Content-Type': 'application/json',
        Accept: 'audio/mpeg'
      }
    });

    const outPath = 'eleven_direct.mp3';
    fs.writeFileSync(outPath, Buffer.from(resp.data));
    console.log('Saved:', outPath);
  } catch (err: any) {
    console.error('TTS request failed:', err?.response?.status, err?.response?.data || err.message);
    process.exit(1);
  }
}

run();
