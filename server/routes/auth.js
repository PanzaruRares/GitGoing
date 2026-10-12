import { Router } from "express";
import { rateLimit } from "express-rate-limit";
import { randomBytes } from "node:crypto";
import User from "../models/User.js";
import {
  SESSION_COOKIE_NAME,
  SESSION_MAX_AGE_MS,
} from "../config/session.js";
import {
  assertEmailDeliveryConfigured,
  sendPasswordResetEmail,
  sendVerificationEmail,
} from "../services/email.js";
import { hashPassword, verifyPassword } from "../utils/passwords.js";
import { createOneTimeToken, hashOneTimeToken } from "../utils/tokens.js";

const PASSWORD_MIN_LENGTH = 12;
const PASSWORD_MAX_LENGTH = 128;
const VERIFICATION_TOKEN_TTL_MS = 24 * 60 * 60 * 1000;
const PASSWORD_RESET_TOKEN_TTL_MS = 60 * 60 * 1000;
const verificationPageCsp =
  "default-src 'none'; style-src 'unsafe-inline'; form-action 'self'; base-uri 'none'; frame-ancestors 'none'";
const registrationMessage =
  "If this email can be registered, a verification email will be sent.";
const dummyPasswordHash = hashPassword(randomBytes(32).toString("hex"));

const authRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_request, response) => {
    response.status(429).json({ error: "Too many requests. Try again later." });
  },
});

const verificationRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_request, response) => {
    response.status(429).json({ error: "Too many requests. Try again later." });
  },
});

const loginRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_request, response) => {
    response.status(429).json({ error: "Too many requests. Try again later." });
  },
});

const passwordResetRequestRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 3,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_request, response) => {
    response.status(429).json({ error: "Too many requests. Try again later." });
  },
});

const passwordResetRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_request, response) => {
    response.status(429).json({ error: "Too many requests. Try again later." });
  },
});

function requireExpectedOrigin(clientOrigin) {
  return (request, response, next) => {
    const origin = request.get("origin");
    if (origin && origin !== clientOrigin) {
      return response.status(403).json({ error: "Request origin is not allowed." });
    }
    return next();
  };
}

function parseLogin(body) {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return { error: "Provide an email address and password." };
  }

  const email =
    typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: "Provide a valid email address." };
  }

  if (
    typeof body.password !== "string" ||
    body.password.length === 0 ||
    [...body.password].length > PASSWORD_MAX_LENGTH
  ) {
    return { error: "Provide a valid password." };
  }

  return { value: { email, password: body.password } };
}

function parseRegistration(body) {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return { error: "Provide an email address and password." };
  }

  const email =
    typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  if (
    email.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    return { error: "Provide a valid email address." };
  }

  if (typeof body.password !== "string") {
    return { error: "Provide a password." };
  }

  const passwordLength = [...body.password].length;
  if (
    passwordLength < PASSWORD_MIN_LENGTH ||
    passwordLength > PASSWORD_MAX_LENGTH
  ) {
    return {
      error: `Password must be between ${PASSWORD_MIN_LENGTH} and ${PASSWORD_MAX_LENGTH} characters.`,
    };
  }

  let displayName;
  if (body.displayName !== undefined) {
    if (typeof body.displayName !== "string") {
      return { error: "Display name must be text." };
    }

    displayName = body.displayName.trim();
    if (displayName.length > 80) {
      return { error: "Display name must be 80 characters or fewer." };
    }
  }

  return { value: { email, password: body.password, displayName } };
}

function parsePasswordResetRequest(body) {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return { error: "Provide a valid email address." };
  }

  const email =
    typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  if (
    email.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    return { error: "Provide a valid email address." };
  }

  return { value: { email } };
}

function parsePasswordReset(body) {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return { error: "Provide a valid reset link and new password." };
  }

  const { token, password, confirmPassword } = body;
  if (typeof token !== "string" || !/^[A-Za-z0-9_-]{43}$/.test(token)) {
    return { error: "This password reset link is invalid or expired." };
  }

  if (typeof password !== "string" || typeof confirmPassword !== "string") {
    return { error: "Enter and confirm your new password." };
  }

  const passwordLength = [...password].length;
  if (
    passwordLength < PASSWORD_MIN_LENGTH ||
    passwordLength > PASSWORD_MAX_LENGTH
  ) {
    return {
      error: `Password must be between ${PASSWORD_MIN_LENGTH} and ${PASSWORD_MAX_LENGTH} characters.`,
    };
  }

  if (password !== confirmPassword) {
    return { error: "The passwords do not match." };
  }

  return { value: { token, password } };
}

async function sendNewVerificationEmail(user, apiOrigin) {
  const { token, tokenHash } = createOneTimeToken();
  user.emailVerificationTokenHash = tokenHash;
  user.emailVerificationTokenExpiresAt = new Date(
    Date.now() + VERIFICATION_TOKEN_TTL_MS,
  );
  await user.save();

  await sendVerificationEmail({
    email: user.email,
    displayName: user.displayName,
    token,
    apiOrigin,
  });
}

async function sendNewPasswordResetEmail(user, apiOrigin) {
  const { token, tokenHash } = createOneTimeToken();
  user.passwordResetTokenHash = tokenHash;
  user.passwordResetTokenExpiresAt = new Date(
    Date.now() + PASSWORD_RESET_TOKEN_TTL_MS,
  );
  await user.save();

  await sendPasswordResetEmail({
    email: user.email,
    displayName: user.displayName,
    token,
    apiOrigin,
  });
}

function acceptedRegistration(response) {
  return response.status(202).json({ message: registrationMessage });
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };

    return entities[character];
  });
}

function verificationPage({ clientOrigin, token, state, errorMessage }) {
  const isConfirmation = state === "confirmation";
  const isVerified = state === "verified";
  const isResetForm = state === "reset-form" || state === "reset-error";
  const isResetSuccess = state === "reset-success";
  const isResetUnavailable = state === "reset-unavailable";
  const isResetPage = isResetForm || isResetSuccess || isResetUnavailable;
  const isSuccess = isVerified || isResetSuccess;
  const title = isResetForm
    ? "Choose a new password"
    : isResetSuccess
      ? "Password updated"
      : isResetUnavailable
        ? "Reset link unavailable"
        : isConfirmation
          ? "Verify your email"
          : isVerified
            ? "Email verified"
            : "Verification link unavailable";
  const description = isResetForm
    ? "Choose a new password for your GitGoing account. The reset link expires after one hour."
    : isResetSuccess
      ? "Your password has been changed. You can now return to GitGoing and log in with your new password."
      : isResetUnavailable
        ? "This reset link may have expired or already been used. Request a new password reset from GitGoing."
        : isConfirmation
          ? "Confirm your email address to finish setting up your GitGoing account."
          : isVerified
            ? "Your email address is confirmed. You can now sign in and continue learning."
            : "This link may have expired or already been used. Return to GitGoing and submit the sign-up form again to request a new one.";
  const action = isResetForm
    ? `<form method="post" action="/api/auth/reset-password"><input type="hidden" name="token" value="${escapeHtml(token)}">${errorMessage ? `<p class="form-error" role="alert">${escapeHtml(errorMessage)}</p>` : ""}<label for="password">New password</label><input id="password" name="password" type="password" minlength="${PASSWORD_MIN_LENGTH}" maxlength="${PASSWORD_MAX_LENGTH}" autocomplete="new-password" required><label for="confirm-password">Confirm new password</label><input id="confirm-password" name="confirmPassword" type="password" minlength="${PASSWORD_MIN_LENGTH}" maxlength="${PASSWORD_MAX_LENGTH}" autocomplete="new-password" required><button type="submit">Update password <span aria-hidden="true">-&gt;</span></button></form>`
    : isConfirmation
      ? `<form method="post" action="/api/auth/verify-email"><input type="hidden" name="token" value="${escapeHtml(token)}"><button type="submit">Confirm email <span aria-hidden="true">-&gt;</span></button></form>`
      : `<a class="verify-action secondary" href="${escapeHtml(clientOrigin)}">${isSuccess ? "Return to GitGoing" : "Back to GitGoing"}</a>`;
  const stateLabel = isResetForm
    ? "PASSWORD RESET / NEW PASSWORD"
    : isResetSuccess
      ? "PASSWORD RESET / COMPLETE"
      : isResetUnavailable
        ? "PASSWORD RESET / LINK ERROR"
        : isConfirmation
          ? "ACTION REQUIRED"
          : isVerified
            ? "SUCCESS"
            : "LINK ERROR";
  const icon = isResetPage
    ? isSuccess
      ? "✓"
      : isResetForm
        ? ">"
        : "!"
    : isConfirmation
      ? "@"
      : isVerified
        ? "✓"
        : "!";

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="robots" content="noindex, nofollow">
    <title>${title} | GitGoing</title>
    <style>
      :root {
        color-scheme: dark;
        font-family: "Courier New", Courier, monospace;
        color: #e5e1e8;
        background: #17151c;
        font-synthesis: none;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        --background: #17151c;
        --surface: #201d26;
        --surface-raised: #292530;
        --border: #39333f;
        --text: #e5e1e8;
        --muted: #aaa2b0;
        --pink: #e58ac7;
        --cyan: #7ed6d0;
        --green: #a8d18d;
      }
      * { box-sizing: border-box; }
      body {
        min-width: 320px;
        min-height: 100vh;
        margin: 0;
        display: grid;
        grid-template-rows: auto 1fr auto;
        background: var(--background);
        color: var(--text);
      }
      a { color: inherit; text-decoration: none; }
      a:focus-visible, button:focus-visible {
        outline: 2px solid var(--cyan);
        outline-offset: 4px;
      }
      .topbar, .footer {
        min-height: 72px;
        padding: 0 clamp(1rem, 5vw, 5rem);
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        border-bottom: 1px solid var(--border);
      }
      .brand {
        display: inline-flex;
        align-items: center;
        gap: 0.65rem;
        font-size: 1rem;
        font-weight: 700;
        letter-spacing: -0.04em;
      }
      .brand-mark { color: var(--cyan); }
      .topbar-note, .footer { color: var(--muted); font-size: 0.75rem; }
      main {
        width: min(100% - 2rem, 560px);
        margin: auto;
        padding: 4rem 0;
      }
      .panel {
        position: relative;
        padding: clamp(1.5rem, 6vw, 3rem);
        border: 1px solid var(--border);
        background: var(--surface);
        box-shadow: 6px 6px 0 #100f14;
      }
      .panel::before {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 3px;
        background: ${isVerified ? "var(--green)" : isConfirmation ? "var(--pink)" : "#ffaaa6"};
        content: "";
      }
      .eyebrow {
        margin: 0 0 2rem;
        color: var(--cyan);
        font-size: 0.72rem;
        letter-spacing: 0.08em;
      }
      .status-icon {
        width: 3.25rem;
        height: 3.25rem;
        margin-bottom: 1.5rem;
        display: grid;
        place-items: center;
        border: 1px solid ${isVerified ? "var(--green)" : isConfirmation ? "var(--pink)" : "#ffaaa6"};
        color: ${isVerified ? "var(--green)" : isConfirmation ? "var(--pink)" : "#ffaaa6"};
        font-size: 1.35rem;
        font-weight: 700;
      }
      h1 {
        margin: 0;
        font-size: clamp(1.8rem, 7vw, 2.7rem);
        line-height: 1.15;
        letter-spacing: -0.05em;
      }
      h1 span { color: var(--pink); }
      .description {
        margin: 1.25rem 0 2rem;
        color: var(--muted);
        font-size: 0.92rem;
        line-height: 1.75;
      }
      form { margin: 0; }
      .verify-action {
        min-height: 48px;
        padding: 0.8rem 1rem;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.75rem;
        border: 1px solid var(--pink);
        background: var(--pink);
        color: var(--background);
        font: inherit;
        font-size: 0.82rem;
        font-weight: 700;
        cursor: pointer;
      }
      .verify-action:hover { background: transparent; color: var(--pink); }
      .verify-action.secondary {
        border-color: var(--border);
        background: var(--surface-raised);
        color: var(--text);
      }
      .verify-action.secondary:hover { border-color: var(--cyan); color: var(--cyan); }
      form { display: grid; gap: 0.65rem; }
      form label { color: var(--muted); font-size: 0.78rem; }
      .form-error { margin: 0 0 0.5rem; color: #ffaaa6; font-size: 0.8rem; line-height: 1.5; }
      form input:not([type="hidden"]) {
        width: 100%;
        min-height: 46px;
        margin-bottom: 0.5rem;
        padding: 0.65rem 0.75rem;
        border: 1px solid var(--border);
        background: var(--background);
        color: var(--text);
        font: inherit;
      }
      form input:focus-visible {
        outline: 2px solid var(--cyan);
        outline-offset: 2px;
      }
      .footer {
        min-height: 64px;
        border-top: 1px solid var(--border);
        border-bottom: 0;
      }
      .footer-mark { color: var(--pink); }
      @media (max-width: 480px) {
        .topbar, .footer { min-height: 60px; }
        .topbar-note { font-size: 0.65rem; }
        main { padding: 2rem 0; }
      }
    </style>
  </head>
  <body>
    <header class="topbar">
      <a class="brand" href="${escapeHtml(clientOrigin)}" aria-label="GitGoing home">
        <span class="brand-mark" aria-hidden="true">&gt;_</span>
        <span>GitGoing</span>
      </a>
      <span class="topbar-note">${isResetPage ? "ACCOUNT / PASSWORD" : "ACCOUNT / EMAIL"}</span>
    </header>
    <main>
      <section class="panel" aria-labelledby="page-title">
        <p class="eyebrow">&gt; ${stateLabel}</p>
        <div class="status-icon" aria-hidden="true">${icon}</div>
        <h1 id="page-title">${title}<span>_</span></h1>
        <p class="description">${description}</p>
        ${action}
      </section>
    </main>
    <footer class="footer">
      <span>GitGoing</span>
      <span>Learn by doing<span class="footer-mark">_</span></span>
    </footer>
  </body>
</html>`;
}

function regenerateSession(request) {
  return new Promise((resolve, reject) => {
    request.session.regenerate((error) => {
      if (error) {
        reject(error);
        return;
      }
      resolve();
    });
  });
}

function saveSession(request) {
  return new Promise((resolve, reject) => {
    request.session.save((error) => {
      if (error) {
        reject(error);
        return;
      }
      resolve();
    });
  });
}

function destroySession(request) {
  return new Promise((resolve, reject) => {
    request.session.destroy((error) => {
      if (error) {
        reject(error);
        return;
      }
      resolve();
    });
  });
}

function clearSessionCookie(response) {
  response.clearCookie(SESSION_COOKIE_NAME, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
}

function setPrivatePageHeaders(response) {
  response.setHeader("Referrer-Policy", "no-referrer");
  response.setHeader("Cache-Control", "no-store");
  response.setHeader("Content-Security-Policy", verificationPageCsp);
}

export function createAuthRouter(apiOrigin, clientOrigin) {
  const router = Router();
  const expectedOrigin = requireExpectedOrigin(clientOrigin);

  router.get("/me", async (request, response) => {
    const userId = request.session.userId;
    if (!userId) {
      return response.status(401).json({ error: "Not authenticated." });
    }

    const user = await User.findById(userId).select(
      "email displayName emailVerified avatarUrl +sessionVersion",
    );
    if (
      !user ||
      !user.emailVerified ||
      user.sessionVersion !== request.session.sessionVersion
    ) {
      await destroySession(request);
      clearSessionCookie(response);
      return response.status(401).json({ error: "Not authenticated." });
    }

    response.setHeader("Cache-Control", "no-store");
    return response.status(200).json({
      user: {
        id: user._id.toString(),
        email: user.email,
        displayName: user.displayName || null,
        emailVerified: user.emailVerified,
        avatarUrl: user.avatarUrl || null,
      },
    });
  });

  router.post("/login", expectedOrigin, loginRateLimit, async (request, response) => {
    const parsed = parseLogin(request.body);
    if (parsed.error) {
      return response.status(400).json({ error: parsed.error });
    }

    const { email, password } = parsed.value;
    const user = await User.findOne({ email }).select(
      "+passwordHash +sessionVersion",
    );
    const passwordMatches = await verifyPassword(
      password,
      user?.passwordHash || (await dummyPasswordHash),
    );

    if (!user || !user.passwordHash || !passwordMatches) {
      return response
        .status(401)
        .json({ error: "Invalid email or password." });
    }

    if (!user.emailVerified) {
      return response
        .status(403)
        .json({ error: "Verify your email before signing in." });
    }

    await regenerateSession(request);
    request.session.userId = user._id.toString();
    request.session.sessionVersion = user.sessionVersion;
    await saveSession(request);

    return response.status(200).json({
      user: {
        id: user._id.toString(),
        email: user.email,
        displayName: user.displayName,
      },
    });
  });

  router.post("/logout", expectedOrigin, async (request, response) => {
    await destroySession(request);
    clearSessionCookie(response);
    return response.status(204).end();
  });

  router.post("/register", expectedOrigin, authRateLimit, async (request, response) => {
    const parsed = parseRegistration(request.body);
    if (parsed.error) {
      return response.status(400).json({ error: parsed.error });
    }

    const { email, password, displayName } = parsed.value;
    assertEmailDeliveryConfigured();
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      if (!existingUser.emailVerified) {
        await sendNewVerificationEmail(existingUser, apiOrigin);
      }
      return acceptedRegistration(response);
    }

    const passwordHash = await hashPassword(password);
    let user;
    try {
      user = await User.create({ email, passwordHash, displayName });
    } catch (error) {
      if (error.code !== 11000) {
        throw error;
      }

      const concurrentUser = await User.findOne({ email });
      if (concurrentUser && !concurrentUser.emailVerified) {
        await sendNewVerificationEmail(concurrentUser, apiOrigin);
      }
      return acceptedRegistration(response);
    }

    await sendNewVerificationEmail(user, apiOrigin);
    return acceptedRegistration(response);
  });

  router.post(
    "/forgot-password",
    expectedOrigin,
    passwordResetRequestRateLimit,
    async (request, response) => {
      const parsed = parsePasswordResetRequest(request.body);
      if (parsed.error) {
        return response.status(400).json({ error: parsed.error });
      }

      assertEmailDeliveryConfigured();
      const user = await User.findOne({
        email: parsed.value.email,
        emailVerified: true,
        passwordHash: { $exists: true },
      });
      if (user) {
        await sendNewPasswordResetEmail(user, apiOrigin);
      }

      return response.status(202).json({
        message:
          "If a verified account exists for this email, a password reset link will be sent.",
      });
    },
  );

  router.get(
    "/reset-password",
    verificationRateLimit,
    async (request, response) => {
      setPrivatePageHeaders(response);
      const { token } = request.query;
      if (typeof token !== "string" || !/^[A-Za-z0-9_-]{43}$/.test(token)) {
        return response
          .status(400)
          .type("html")
          .send(verificationPage({ clientOrigin, state: "reset-unavailable" }));
      }

      const user = await User.findOne({
        passwordResetTokenHash: hashOneTimeToken(token),
        passwordResetTokenExpiresAt: { $gt: new Date() },
      });
      if (!user) {
        return response
          .status(400)
          .type("html")
          .send(verificationPage({ clientOrigin, state: "reset-unavailable" }));
      }

      return response
        .status(200)
        .type("html")
        .send(
          verificationPage({ clientOrigin, token, state: "reset-form" }),
        );
    },
  );

  router.post(
    "/reset-password",
    passwordResetRateLimit,
    async (request, response) => {
      const isHtmlForm = request.is("application/x-www-form-urlencoded");
      const parsed = parsePasswordReset(request.body);
      if (parsed.error) {
        if (isHtmlForm) {
          setPrivatePageHeaders(response);
          const token =
            typeof request.body?.token === "string" &&
            /^[A-Za-z0-9_-]{43}$/.test(request.body.token)
              ? request.body.token
              : undefined;
          const hasValidToken = token
            ? await User.exists({
                passwordResetTokenHash: hashOneTimeToken(token),
                passwordResetTokenExpiresAt: { $gt: new Date() },
              })
            : false;
          if (hasValidToken) {
            return response
              .status(400)
              .type("html")
              .send(
                verificationPage({
                  clientOrigin,
                  token,
                  state: "reset-error",
                  errorMessage: parsed.error,
                }),
              );
          }
          return response
            .status(400)
            .type("html")
            .send(verificationPage({ clientOrigin, state: "reset-unavailable" }));
        }

        return response.status(400).json({ error: parsed.error });
      }

      const { token, password } = parsed.value;
      const resetToken = hashOneTimeToken(token);
      const userExists = await User.exists({
        passwordResetTokenHash: resetToken,
        passwordResetTokenExpiresAt: { $gt: new Date() },
      });
      if (!userExists) {
        if (isHtmlForm) {
          setPrivatePageHeaders(response);
          return response
            .status(400)
            .type("html")
            .send(verificationPage({ clientOrigin, state: "reset-unavailable" }));
        }

        return response
          .status(400)
          .json({ error: "This password reset link is invalid or expired." });
      }

      const passwordHash = await hashPassword(password);
      const user = await User.findOneAndUpdate(
        {
          passwordResetTokenHash: resetToken,
          passwordResetTokenExpiresAt: { $gt: new Date() },
        },
        {
          $set: { passwordHash },
          $unset: {
            passwordResetTokenHash: 1,
            passwordResetTokenExpiresAt: 1,
          },
          $inc: { sessionVersion: 1 },
        },
        { returnDocument: "after" },
      );

      if (!user) {
        if (isHtmlForm) {
          setPrivatePageHeaders(response);
          return response
            .status(400)
            .type("html")
            .send(verificationPage({ clientOrigin, state: "reset-unavailable" }));
        }

        return response
          .status(400)
          .json({ error: "This password reset link is invalid or expired." });
      }

      if (isHtmlForm) {
        setPrivatePageHeaders(response);
        return response
          .status(200)
          .type("html")
          .send(
            verificationPage({
              clientOrigin,
              state: "reset-success",
            }),
          );
      }

      return response
        .status(200)
        .json({ message: "Password updated. You can now sign in." });
    },
  );

  async function verifyEmail(token, response) {
    response.setHeader("Referrer-Policy", "no-referrer");
    response.setHeader("Cache-Control", "no-store");
    response.setHeader("Content-Security-Policy", verificationPageCsp);

    if (
      typeof token !== "string" ||
      !/^[A-Za-z0-9_-]{43}$/.test(token)
    ) {
      return response
        .status(400)
        .type("html")
        .send(verificationPage({ clientOrigin, state: "unavailable" }));
    }

    const user = await User.findOne({
      emailVerificationTokenHash: hashOneTimeToken(token),
      emailVerificationTokenExpiresAt: { $gt: new Date() },
    });
    if (!user) {
      return response
        .status(400)
        .type("html")
        .send(verificationPage({ clientOrigin, state: "unavailable" }));
    }

    user.emailVerified = true;
    user.emailVerificationTokenHash = undefined;
    user.emailVerificationTokenExpiresAt = undefined;
    await user.save();

    return response
      .status(200)
      .type("html")
      .send(verificationPage({ clientOrigin, state: "verified" }));
  }

  router.get("/verify-email", verificationRateLimit, (request, response) => {
    const { token } = request.query;
    if (typeof token !== "string" || !/^[A-Za-z0-9_-]{43}$/.test(token)) {
      response.setHeader("Referrer-Policy", "no-referrer");
      response.setHeader("Cache-Control", "no-store");
      response.setHeader("Content-Security-Policy", verificationPageCsp);
      return response
        .status(400)
        .type("html")
        .send(verificationPage({ clientOrigin, state: "unavailable" }));
    }

    response.setHeader("Referrer-Policy", "no-referrer");
    response.setHeader("Cache-Control", "no-store");
    response.setHeader("Content-Security-Policy", verificationPageCsp);
    return response.type("html").send(
      verificationPage({ clientOrigin, token, state: "confirmation" }),
    );
  });

  router.post(
    "/verify-email",
    verificationRateLimit,
    async (request, response) => verifyEmail(request.body?.token, response),
  );

  return router;
}
