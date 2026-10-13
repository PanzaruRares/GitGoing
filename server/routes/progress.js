import { Router } from "express";
import { rateLimit } from "express-rate-limit";
import User from "../models/User.js";

const MAX_COMPLETED = 400;
const LECTURE_ID = /^[a-z0-9-]{1,30}\/\d{1,3}\/\d{1,3}$/;

const progressRateLimit = rateLimit({
  windowMs: 60 * 1000,
  limit: 60,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_request, response) => {
    response.status(429).json({ error: "Too many progress updates. Please slow down." });
  },
});

export function parseCompleted(body) {
  const list = body?.completed;
  if (!Array.isArray(list) || list.length > MAX_COMPLETED) {
    return null;
  }
  if (list.some((id) => typeof id !== "string" || !LECTURE_ID.test(id))) {
    return null;
  }
  return [...new Set(list)];
}

async function findSessionUser(request) {
  const userId = request.session.userId;
  if (!userId) {
    return null;
  }
  const user = await User.findById(userId).select("emailVerified +sessionVersion");
  if (
    !user ||
    !user.emailVerified ||
    user.sessionVersion !== request.session.sessionVersion
  ) {
    return null;
  }
  return user;
}

export function createProgressRouter(clientOrigin) {
  const router = Router();

  router.use(progressRateLimit);
  router.use((request, response, next) => {
    response.setHeader("Cache-Control", "no-store");
    const origin = request.get("origin");
    if (request.method !== "GET" && origin && origin !== clientOrigin) {
      return response.status(403).json({ error: "Request origin is not allowed." });
    }
    return next();
  });

  router.get("/", async (request, response) => {
    const user = await findSessionUser(request);
    if (!user) {
      return response.status(401).json({ error: "Not authenticated." });
    }
    const { completedLectures } = await User.findById(user._id).select("completedLectures");
    return response.json({ completed: completedLectures ?? [] });
  });

  router.put("/", async (request, response) => {
    const user = await findSessionUser(request);
    if (!user) {
      return response.status(401).json({ error: "Not authenticated." });
    }
    const completed = parseCompleted(request.body);
    if (!completed) {
      return response.status(400).json({ error: "Send a list of completed lecture ids." });
    }
    await User.updateOne({ _id: user._id }, { $set: { completedLectures: completed } });
    return response.json({ completed });
  });

  return router;
}

export default createProgressRouter;
