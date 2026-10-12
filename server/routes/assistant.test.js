import assert from "node:assert/strict";
import { once } from "node:events";
import express from "express";
import { after, test } from "node:test";
import { createAssistantRouter } from "./assistant.js";

const servers = [];

async function postAssistant(body, options = {}) {
  const app = express();
  app.use(express.json({ limit: "20kb" }));
  app.use(
    "/api/assistant",
    createAssistantRouter({
      apiKey: options.apiKey ?? "test-key",
      model: "test-model",
      fetchImpl: options.fetchImpl ?? (async () => Response.json({
        steps: [{
          type: "model_output",
          content: [{ type: "text", text: "A closure retains its lexical scope." }],
        }],
      })),
    }),
  );
  const server = app.listen(0, "127.0.0.1");
  servers.push(server);
  await once(server, "listening");
  const { port } = server.address();
  const response = await fetch(`http://127.0.0.1:${port}/api/assistant/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return response;
}

after(async () => {
  await Promise.all(servers.map((server) => new Promise((resolve, reject) => {
    server.close((error) => error ? reject(error) : resolve());
  })));
});

test("answers with text and references while forwarding a stateless request", async () => {
  let upstreamRequest;
  const response = await postAssistant({
    question: "What is a closure?",
    context: [{ source: "JavaScript / Functions / Closures", excerpt: "A closure preserves lexical scope." }],
    history: [
      { role: "user", content: "Explain scope." },
      { role: "assistant", content: "Scope controls visibility." },
      { role: "user", content: "What is a closure?" },
    ],
  }, {
    fetchImpl: async (url, init) => {
      upstreamRequest = { url, init };
      return Response.json({
        steps: [{
          type: "model_output",
          content: [{ type: "text", text: "A closure retains its lexical scope." }],
        }],
      });
    },
  });

  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), {
    answer: "A closure retains its lexical scope.",
    sources: ["JavaScript / Functions / Closures"],
  });
  assert.equal(upstreamRequest.url, "https://generativelanguage.googleapis.com/v1beta/interactions");
  assert.equal(upstreamRequest.init.headers["x-goog-api-key"], "test-key");
  const requestBody = JSON.parse(upstreamRequest.init.body);
  assert.equal(requestBody.model, "test-model");
  assert.equal(requestBody.store, false);
  assert.match(requestBody.system_instruction, /untrusted data/);
  assert.match(requestBody.system_instruction, /no more than 60 words/);
  assert.match(requestBody.system_instruction, /finish your final sentence/);
  const prompt = JSON.parse(requestBody.input);
  assert.equal(prompt.learner_question, "What is a closure?");
  assert.equal(prompt.recent_conversation.length, 2);
  assert.equal(prompt.course_references[0].source, "JavaScript / Functions / Closures");
});

test("rejects invalid input before calling Gemini", async () => {
  let wasCalled = false;
  const response = await postAssistant({
    question: "x".repeat(1001),
    context: [],
    history: [],
  }, {
    fetchImpl: async () => {
      wasCalled = true;
      return Response.json({});
    },
  });

  assert.equal(response.status, 400);
  assert.match((await response.json()).error, /Question must contain/);
  assert.equal(wasCalled, false);
});

test("reports an unconfigured API key without making an upstream request", async () => {
  let wasCalled = false;
  const response = await postAssistant({
    question: "How do arrays work?",
    context: [],
    history: [],
  }, {
    apiKey: "",
    fetchImpl: async () => {
      wasCalled = true;
      return Response.json({});
    },
  });

  assert.equal(response.status, 503);
  assert.match((await response.json()).error, /GEMINI_API_KEY/);
  assert.equal(wasCalled, false);
});
