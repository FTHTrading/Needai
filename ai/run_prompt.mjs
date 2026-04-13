import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

function usage(exitCode = 0) {
  const msg = `
Usage:
  node ai/run_prompt.mjs <promptFile> <targetFile> [options]

Options:
  --local-model <name>     Ollama model name (default: OLLAMA_MODEL or qwen2.5-coder)
  --prefer <local|openai>  Prefer provider (default: local)
  --openai-model <name>    OpenAI model name (default: OPENAI_MODEL)
  --out <file>             Write output to a file (also prints to stdout)

Environment:
  OLLAMA_MODEL             Default local model for Ollama
  OPENAI_API_KEY           If set, enables OpenAI fallback
  OPENAI_MODEL             Default OpenAI model
`;
  process.stderr.write(msg.trimStart() + "\n");
  process.exit(exitCode);
}

function readText(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function fileExists(filePath) {
  try {
    fs.accessSync(filePath, fs.constants.R_OK);
    return true;
  } catch {
    return false;
  }
}

function parseArgs(argv) {
  const positional = [];
  const options = {};

  for (let i = 2; i < argv.length; i++) {
    const arg = argv[i];
    if (!arg.startsWith("--")) {
      positional.push(arg);
      continue;
    }

    const key = arg.slice(2);
    const next = argv[i + 1];
    if (next && !next.startsWith("--")) {
      options[key] = next;
      i++;
    } else {
      options[key] = true;
    }
  }

  return { positional, options };
}

function buildPayload({ rulesText, promptText, targetPath, targetText }) {
  return [
    rulesText.trim(),
    "",
    "PROMPT:",
    promptText.trim(),
    "",
    "TARGET_PATH:",
    targetPath,
    "",
    "TARGET_FILE:",
    targetText,
    "",
    "REMINDER:",
    "Return ONLY a unified diff.",
    "",
  ].join("\n");
}

function runOllama({ model, payload }) {
  const result = spawnSync("ollama", ["run", model], {
    input: payload,
    encoding: "utf8",
    maxBuffer: 50 * 1024 * 1024,
  });

  if (result.error) throw result.error;
  if (result.status !== 0) {
    const err = (result.stderr || "").trim();
    throw new Error(err || `ollama exited with code ${result.status}`);
  }

  return result.stdout;
}

async function runOpenAI({ model, payload }) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("OPENAI_API_KEY is not set");
  if (!model) throw new Error("OpenAI model not specified (set OPENAI_MODEL or --openai-model)");

  const res = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      input: payload,
    }),
  });

  const json = await res.json().catch(() => null);
  if (!res.ok) {
    const detail = json ? JSON.stringify(json) : "(no json body)";
    throw new Error(`OpenAI HTTP ${res.status}: ${detail}`);
  }

  if (typeof json?.output_text === "string") return json.output_text;
  throw new Error("OpenAI response did not include output_text");
}

async function main() {
  const { positional, options } = parseArgs(process.argv);
  if (options.help || options.h) usage(0);
  if (positional.length < 2) usage(2);

  const promptFile = positional[0];
  const targetFile = positional[1];

  const rulesFile = path.resolve(".ai", "AI_RULES.md");
  if (!fileExists(rulesFile)) {
    throw new Error(`Missing rules file: ${rulesFile}`);
  }
  if (!fileExists(promptFile)) {
    throw new Error(`Missing prompt file: ${promptFile}`);
  }
  if (!fileExists(targetFile)) {
    throw new Error(`Missing target file: ${targetFile}`);
  }

  const prefer = String(options.prefer || "local");
  const localModel = String(options["local-model"] || process.env.OLLAMA_MODEL || "qwen2.5-coder");
  const openaiModel = String(options["openai-model"] || process.env.OPENAI_MODEL || "");

  const payload = buildPayload({
    rulesText: readText(rulesFile),
    promptText: readText(promptFile),
    targetPath: path.resolve(targetFile),
    targetText: readText(targetFile),
  });

  let output;
  let lastError;

  const attempts = prefer === "openai" ? ["openai", "local"] : ["local", "openai"];
  for (const provider of attempts) {
    try {
      if (provider === "local") {
        output = runOllama({ model: localModel, payload });
      } else {
        if (!process.env.OPENAI_API_KEY) continue;
        output = await runOpenAI({ model: openaiModel, payload });
      }
      break;
    } catch (e) {
      lastError = e;
    }
  }

  if (typeof output !== "string") {
    throw lastError || new Error("No provider succeeded");
  }

  process.stdout.write(output);
  if (options.out && typeof options.out === "string") {
    fs.mkdirSync(path.dirname(options.out), { recursive: true });
    fs.writeFileSync(options.out, output, "utf8");
  }
}

main().catch((err) => {
  process.stderr.write(`ERROR: ${err?.message || String(err)}\n`);
  process.exit(1);
});
