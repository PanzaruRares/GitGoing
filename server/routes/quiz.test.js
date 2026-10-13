import assert from "node:assert/strict";
import { once } from "node:events";
import express from "express";
import JSZip from "jszip";
import { after, test } from "node:test";
import { createQuizRouter, parseQuiz, QUESTION_COUNT } from "./quiz.js";

const servers = [];
const LOREM =
  "Photosynthesis converts light energy into chemical energy stored in glucose. " +
  "Chloroplasts contain chlorophyll, which absorbs mostly red and blue light. " +
  "The light reactions occur in the thylakoid membranes while the Calvin cycle runs in the stroma. ";

function makeQuiz(count = QUESTION_COUNT) {
  return {
    questions: Array.from({ length: count }, (_, index) => ({
      question: `Question ${index + 1}?`,
      options: ["one", "two", "three", "four"],
      answer: "ABCD"[index % 4],
      explanation: "Because.",
    })),
  };
}

async function makeDocx(text) {
  const zip = new JSZip();
  zip.file(
    "[Content_Types].xml",
    '<?xml version="1.0" encoding="UTF-8"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/></Types>',
  );
  zip.file(
    "_rels/.rels",
    '<?xml version="1.0" encoding="UTF-8"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>',
  );
  zip.file(
    "word/document.xml",
    `<?xml version="1.0" encoding="UTF-8"?><w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body><w:p><w:r><w:t>${text}</w:t></w:r></w:p></w:body></w:document>`,
  );
  return zip.generateAsync({ type: "nodebuffer" });
}

function makePdf(text) {
  const lines = text.match(/.{1,60}(\s|$)/g) ?? [text];
  const stream = `BT /F1 12 Tf 50 700 Td 14 TL ${lines
    .map((line) => `(${line.trim()}) Tj T*`)
    .join(" ")} ET`;
  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>",
    `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`,
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
  ];
  let pdf = "%PDF-1.4\n";
  const offsets = [];
  objects.forEach((body, index) => {
    offsets.push(pdf.length);
    pdf += `${index + 1} 0 obj\n${body}\nendobj\n`;
  });
  const xref = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  offsets.forEach((offset) => {
    pdf += `${String(offset).padStart(10, "0")} 00000 n \n`;
  });
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;
  return Buffer.from(pdf, "latin1");
}

async function postFile(body, options = {}) {
  const app = express();
  app.use(
    "/api/quiz",
    createQuizRouter({
      generate: options.generate ?? (async () => JSON.stringify(makeQuiz())),
      limit: options.limit ?? 50,
    }),
  );
  const server = app.listen(0, "127.0.0.1");
  servers.push(server);
  await once(server, "listening");
  const { port } = server.address();
  return fetch(`http://127.0.0.1:${port}/api/quiz/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/octet-stream" },
    body,
  });
}

after(async () => {
  await Promise.all(servers.map((server) => new Promise((resolve, reject) => {
    server.close((error) => error ? reject(error) : resolve());
  })));
});

test("builds a 20-question quiz from a .docx document", async () => {
  let upstream;
  const response = await postFile(await makeDocx(LOREM), {
    generate: async (args) => {
      upstream = args;
      return JSON.stringify(makeQuiz());
    },
  });
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.equal(body.questions.length, QUESTION_COUNT);
  assert.deepEqual(Object.keys(body.questions[0]).sort(), ["answer", "explanation", "options", "question"]);
  assert.match(JSON.parse(upstream.input).document, /Photosynthesis/);
});

test("builds a quiz from a .pdf document", async () => {
  let upstream;
  const response = await postFile(makePdf(LOREM.replace(/[()]/g, "")), {
    generate: async (args) => {
      upstream = args;
      return JSON.stringify(makeQuiz());
    },
  });

  assert.equal(response.status, 200);
  assert.match(JSON.parse(upstream.input).document, /Photosynthesis/);
});

test("accepts model output wrapped in a markdown code fence", async () => {
  const response = await postFile(await makeDocx(LOREM), {
    generate: async () => `\`\`\`json\n${JSON.stringify(makeQuiz())}\n\`\`\``,
  });

  assert.equal(response.status, 200);
});

test("retries once when the model returns an invalid quiz", async () => {
  let calls = 0;
  const response = await postFile(await makeDocx(LOREM), {
    generate: async () => {
      calls += 1;
      return calls === 1 ? "not json" : JSON.stringify(makeQuiz());
    },
  });

  assert.equal(response.status, 200);
  assert.equal(calls, 2);
});

test("rejects unsupported, empty, and unreadable uploads without calling Gemini", async () => {
  let calls = 0;
  const generate = async () => {
    calls += 1;
    return JSON.stringify(makeQuiz());
  };

  assert.equal((await postFile(Buffer.from("plain text, not a document"), { generate })).status, 415);
  assert.equal((await postFile(Buffer.alloc(0), { generate })).status, 400);
  assert.equal((await postFile(Buffer.from("%PDF-1.4 broken"), { generate })).status, 422);
  assert.equal((await postFile(await makeDocx("too short"), { generate })).status, 422);
  assert.equal(calls, 0);
});

test("rejects files over the size limit", async () => {
  const response = await postFile(Buffer.alloc(6 * 1024 * 1024, 1));

  assert.equal(response.status, 413);
});

test("parseQuiz rejects malformed questions and trims extras", () => {
  assert.equal(parseQuiz(JSON.stringify(makeQuiz(19))), null);

  const bad = makeQuiz();
  bad.questions[3].answer = "E";
  assert.equal(parseQuiz(JSON.stringify(bad)), null);

  const badOptions = makeQuiz();
  badOptions.questions[0].options = ["only", "three", "options"];
  assert.equal(parseQuiz(JSON.stringify(badOptions)), null);

  assert.equal(parseQuiz(JSON.stringify(makeQuiz(25))).length, QUESTION_COUNT);
});
