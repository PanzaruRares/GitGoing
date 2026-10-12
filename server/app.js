import express from "express";
import cors from "cors";
import helmet from "helmet";
import session from "express-session";
import {
  SESSION_COOKIE_NAME,
  SESSION_MAX_AGE_MS,
} from "./config/session.js";
import healthRouter from "./routes/health.js";
import { EmailDeliveryError } from "./services/email.js";
import { createAuthRouter } from "./routes/auth.js";

export function createApp(clientOrigin, apiOrigin, sessionOptions) {
  const app = express();

  if (!sessionOptions?.store || !sessionOptions?.secret) {
    throw new Error("A session store and secret are required");
  }

  app.use(helmet());
  app.use(
    cors({
      origin: (origin, callback) => callback(null, origin === clientOrigin),
      credentials: true,
    }),
  );
  app.use(express.json({ limit: "10kb" }));
  app.use(express.urlencoded({ extended: false, limit: "1kb" }));
  app.use(
    session({
      name: SESSION_COOKIE_NAME,
      secret: sessionOptions.secret,
      store: sessionOptions.store,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: sessionOptions.secureCookies,
        sameSite: "lax",
        maxAge: SESSION_MAX_AGE_MS,
        path: "/",
      },
    }),
  );
  app.use("/api/health", healthRouter);
  app.use("/api/auth", createAuthRouter(apiOrigin, clientOrigin));

  app.use((error, _request, response, next) => {
    if (response.headersSent) {
      return next(error);
    }

    if (error instanceof EmailDeliveryError) {
      console.error(error.message);
      return response.status(503).json({
        error: "Email delivery is unavailable. Check the Resend settings and try again.",
      });
    }

    if (error.type === "entity.parse.failed") {
      return response.status(400).json({ error: "Request body must be valid JSON." });
    }

    if (error.type === "entity.too.large") {
      return response.status(413).json({ error: "Request body is too large." });
    }

    console.error("API request failed:", error);
    return response.status(500).json({ error: "Internal server error." });
  });

  return app;
}
