import assert from "node:assert/strict";
import test from "node:test";
import User from "./User.js";

test("user model normalizes email and applies account defaults", async () => {
  const user = new User({
    email: " Learner@Example.com ",
    displayName: " Learner ",
  });

  await user.validate();

  assert.equal(user.email, "learner@example.com");
  assert.equal(user.displayName, "Learner");
  assert.equal(user.emailVerified, false);
});

test("credential and token hashes are excluded from normal queries", () => {
  for (const field of [
    "passwordHash",
    "googleId",
    "emailVerificationTokenHash",
    "passwordResetTokenHash",
  ]) {
    assert.equal(User.schema.path(field).options.select, false);
  }
});
