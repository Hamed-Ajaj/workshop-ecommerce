import type { RequestHandler } from "express";
import { verifyAuthToken } from "../utils/auth";

export const requireAuth: RequestHandler = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ")
    ? authHeader.slice(7)
    : undefined;

  if (!token) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  try {
    const payload = verifyAuthToken(token);
    (req as any).user = { id: payload.sub };
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};
