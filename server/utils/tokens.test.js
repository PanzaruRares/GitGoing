import assert from "node:assert/strict";
import test from "node:test";
import { createOneTimeToken, hashOneTimeToken } from "./tokens.js";

test("one-time tokens are random and stored as hashes", () => {
  const first = createOneTimeToken();
  const second = createOneTimeToken();

  assert.notEqual(first.token, second.token);
  assert.equal(first.token.length, 43);
  assert.equal(first.tokenHash, hashOneTimeToken(first.token));
  assert.notEqual(first.tokenHash, first.token);
});
