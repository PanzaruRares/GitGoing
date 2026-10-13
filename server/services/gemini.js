const GEMINI_INTERACTIONS_URL =
  "https://generativelanguage.googleapis.com/v1beta/interactions";

export class GeminiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = "GeminiError";
    this.status = status;
  }
}

function defaultModels() {
  return [
    process.env.GEMINI_MODEL || "gemini-3.1-flash-lite-preview",
    "gemini-3.1-flash-lite-preview",
    "gemini-3.1-flash-lite",
  ].filter((model, index, all) => all.indexOf(model) === index);
}

export async function generateText({
  systemInstruction,
  input,
  apiKey = process.env.GEMINI_API_KEY,
  models = defaultModels(),
  rounds = 2,
  attemptTimeoutMs = 60000,
  fetchImpl = fetch,
}) {
  if (!apiKey) {
    throw new GeminiError("GEMINI_API_KEY is not configured.", 503);
  }

  let lastStatus = 0;
  for (let round = 0; round < rounds; round += 1) {
    for (const model of models) {
      if (round > 0) {
        await new Promise((resolve) => setTimeout(resolve, 800));
      }

      let upstream;
      try {
        upstream = await fetchImpl(GEMINI_INTERACTIONS_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": apiKey,
          },
          body: JSON.stringify({
            model,
            store: false,
            system_instruction: systemInstruction,
            input,
          }),
          signal: AbortSignal.timeout(attemptTimeoutMs),
        });
      } catch (error) {
        console.warn(`Gemini request with model ${model} failed: ${error.message}`);
        continue;
      }

      if (upstream.ok) {
        let result;
        try {
          result = await upstream.json();
        } catch {
          continue;
        }
        const text = (result.steps || [])
          .filter((step) => step.type === "model_output")
          .flatMap((step) => step.content || [])
          .filter((part) => part.type === "text" && typeof part.text === "string")
          .map((part) => part.text)
          .join("\n")
          .trim();
        if (text) {
          return text;
        }
        continue;
      }

      lastStatus = upstream.status;
      console.warn(
        `Gemini request with model ${model} failed (${upstream.status}): ${(await upstream.text()).slice(0, 300)}`,
      );
      if ([400, 401, 403].includes(upstream.status)) {
        throw new GeminiError("Gemini rejected the request.", upstream.status);
      }
    }
  }

  throw new GeminiError("Gemini is unavailable.", lastStatus || 502);
}
