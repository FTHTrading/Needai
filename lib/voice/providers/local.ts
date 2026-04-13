/**
 * Local TTS Provider (Fallback)
 * 
 * Uses say.exe on Windows or espeak on Linux.
 * Always available, no API key needed.
 */

import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { TTSProvider, TTSOptions } from '../tts.js';

const execAsync = promisify(exec);

export const LocalTTS: TTSProvider = {
  name: 'local',

  async available(): Promise<boolean> {
    // Local TTS is always "available" as fallback
    return true;
  },

  async synthesize(text: string, options: TTSOptions): Promise<Buffer> {
    void options;
    const platform = os.platform();
    const tempFile = path.join(os.tmpdir(), `tts_${Date.now()}.wav`);

    try {
      if (platform === 'win32') {
        // Use PowerShell on Windows - escape single quotes by doubling them
        // Also remove any newlines and normalize whitespace
        const escapedText = text
          .replace(/'/g, "''")  // Escape single quotes for PowerShell
          .replace(/"/g, '`"') // Escape double quotes
          .replace(/[\r\n]+/g, ' ') // Remove newlines
          .trim();
        await execAsync(
          `powershell -Command "Add-Type -AssemblyName System.Speech; $synth = New-Object System.Speech.Synthesis.SpeechSynthesizer; $synth.SetOutputToWaveFile('${tempFile}'); $synth.Speak('${escapedText}'); $synth.Dispose()"`
        );
      } else if (platform === 'darwin') {
        // Use say on macOS
        await execAsync(`say -o "${tempFile}" --data-format=LEF32@22050 "${text}"`);
      } else {
        // Use espeak on Linux
        await execAsync(`espeak "${text}" --stdout > "${tempFile}"`);
      }

      const audio = fs.readFileSync(tempFile);
      fs.unlinkSync(tempFile);
      return audio;
    } catch (error) {
      // Return empty buffer if local TTS fails
      console.error('[LocalTTS] Failed:', error);
      return Buffer.alloc(0);
    }
  },
};
