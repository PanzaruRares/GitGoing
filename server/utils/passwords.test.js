import assert from "node:assert/strict";
import test from "node:test";
import { hashPassword, verifyPassword } from "./passwords.js";

test("password hashes verify only the original password", async () => {
  const hash = await hashPassword("correct horse battery staple");

  assert.notEqual(hash, "correct horse battery staple");
  assert.equal(await verifyPassword("correct horse battery staple", hash), true);
  assert.equal(await verifyPassword("incorrect password", hash), false);
});

test("password verification rejects malformed hashes and invalid inputs", async () => {
  assert.equal(await verifyPassword("password", "not-a-password-hash"), false);
  assert.equal(await verifyPassword(null, "not-a-password-hash"), false);
  assert.equal(await verifyPassword("password", null), false);
  await assert.rejects(hashPassword(""), TypeError);
  await assert.rejects(hashPassword(null), TypeError);
});
