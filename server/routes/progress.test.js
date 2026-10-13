import assert from "node:assert/strict";
import test from "node:test";
import { parseCompleted } from "./progress.js";

test("parseCompleted accepts lecture ids and removes duplicates", () => {
  assert.deepEqual(
    parseCompleted({ completed: ["javascript/1/2", "html-css/3/1", "javascript/1/2"] }),
    ["javascript/1/2", "html-css/3/1"],
  );
  assert.deepEqual(parseCompleted({ completed: [] }), []);
});

test("parseCompleted rejects malformed input", () => {
  assert.equal(parseCompleted(null), null);
  assert.equal(parseCompleted({ completed: "javascript/1/1" }), null);
  assert.equal(parseCompleted({ completed: ["../etc/passwd"] }), null);
  assert.equal(parseCompleted({ completed: [{ $ne: 1 }] }), null);
  assert.equal(parseCompleted({ completed: Array(401).fill("a/1/1") }), null);
});
