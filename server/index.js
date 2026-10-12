import dotenv from "dotenv";
import { randomBytes } from "node:crypto";
import { fileURLToPath } from "node:url";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import { createApp } from "./app.js";
import { connectDatabase } from "./config/database.js";
import { SESSION_MAX_AGE_MS } from "./config/session.js";

dotenv.config({ path: fileURLToPath(new URL("./.env", import.meta.url)) });

const port = Number(process.env.PORT || 5000);
const mongoUri = process.env.MONGODB_URI;
const clientUrl = new URL(
  process.env.CLIENT_ORIGIN || "http://127.0.0.1:5173",
);
const apiUrl = new URL(
  process.env.API_ORIGIN || `http://127.0.0.1:${port}`,
);

if (
  !["http:", "https:"].includes(clientUrl.protocol) ||
  !["http:", "https:"].includes(apiUrl.protocol)
) {
  throw new Error("CLIENT_ORIGIN and API_ORIGIN must use http or https");
}

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error("PORT must be an integer between 1 and 65535");
}

if (!mongoUri) {
  throw new Error("MONGODB_URI is required; set it in server/.env");
}

let sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
  if (process.env.NODE_ENV === "production") {
    throw new Error("SESSION_SECRET is required in production");
  }
  sessionSecret = randomBytes(32).toString("hex");
  console.warn(
    "SESSION_SECRET is unset; using a temporary development secret. Sessions will expire when the server restarts.",
  );
} else if (Buffer.byteLength(sessionSecret) < 32) {
  throw new Error("SESSION_SECRET must be at least 32 bytes");
}

async function startServer() {
  await connectDatabase(mongoUri);
  const sessionStore = MongoStore.create({
    client: mongoose.connection.getClient(),
    collectionName: "sessions",
    ttl: Math.floor(SESSION_MAX_AGE_MS / 1000),
  });
  const app = createApp(clientUrl.origin, apiUrl.origin, {
    store: sessionStore,
    secret: sessionSecret,
    secureCookies: process.env.NODE_ENV === "production",
  });

  app.listen(port, "127.0.0.1", () => {
    console.log(`API listening on http://127.0.0.1:${port}`);
  });
}

startServer().catch((error) => {
  console.error("Failed to start API:", error);
  process.exitCode = 1;
});
