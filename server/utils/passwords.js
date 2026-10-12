import { scrypt as scryptCallback, randomBytes, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

const scrypt = promisify(scryptCallback);
const COST = 16384;
const BLOCK_SIZE = 8;
const PARALLELIZATION = 1;
const KEY_LENGTH = 64;
const SALT_LENGTH = 16;
const MAX_MEMORY = 64 * 1024 * 1024;

export async function hashPassword(password) {
  if (typeof password !== "string" || password.length === 0) {
    throw new TypeError("Password must be a non-empty string");
  }

  const salt = randomBytes(SALT_LENGTH);
  const derivedKey = await scrypt(password, salt, KEY_LENGTH, {
    N: COST,
    r: BLOCK_SIZE,
    p: PARALLELIZATION,
    maxmem: MAX_MEMORY,
  });

  return [
    "scrypt",
    COST,
    BLOCK_SIZE,
    PARALLELIZATION,
    salt.toString("base64url"),
    derivedKey.toString("base64url"),
  ].join("$");
}

export async function verifyPassword(password, storedHash) {
  if (typeof password !== "string" || typeof storedHash !== "string") {
    return false;
  }

  const [algorithm, cost, blockSize, parallelization, saltText, keyText, extra] =
    storedHash.split("$");
  if (
    algorithm !== "scrypt" ||
    cost !== String(COST) ||
    blockSize !== String(BLOCK_SIZE) ||
    parallelization !== String(PARALLELIZATION) ||
    !saltText ||
    !keyText ||
    extra !== undefined ||
    !/^[A-Za-z0-9_-]+$/.test(saltText) ||
    !/^[A-Za-z0-9_-]+$/.test(keyText)
  ) {
    return false;
  }

  const salt = Buffer.from(saltText, "base64url");
  const expectedKey = Buffer.from(keyText, "base64url");
  if (
    salt.length !== SALT_LENGTH ||
    expectedKey.length !== KEY_LENGTH ||
    salt.toString("base64url") !== saltText ||
    expectedKey.toString("base64url") !== keyText
  ) {
    return false;
  }

  const actualKey = await scrypt(password, salt, KEY_LENGTH, {
    N: COST,
    r: BLOCK_SIZE,
    p: PARALLELIZATION,
    maxmem: MAX_MEMORY,
  });

  return timingSafeEqual(actualKey, expectedKey);
}
