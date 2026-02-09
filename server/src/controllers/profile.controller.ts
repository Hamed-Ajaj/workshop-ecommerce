import type { RequestHandler } from "express";
import { getUserByEmail, getUserById, updateUser } from "../services/user.service";
import { getErrorMessage } from "../utils/errors";

export const getProfile: RequestHandler = async (req, res) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const user = await getUserById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json({ id: user.id, name: user.name, email: user.email });
  } catch (err) {
    return res.status(500).json({ error: getErrorMessage(err) });
  }
};

export const updateProfile: RequestHandler = async (req, res) => {
  const updates = req.body as {
    name?: string;
    email?: string;
    password?: string;
  };

  try {
    const userId = (req as any).user?.id;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (updates.email) {
      const existing = await getUserByEmail(updates.email);
      if (existing && existing.id !== userId) {
        return res.status(409).json({ error: "Email already exists" });
      }
    }

    const user = await updateUser(userId, updates);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json({ id: user.id, name: user.name, email: user.email });
  } catch (err) {
    return res.status(500).json({ error: getErrorMessage(err) });
  }
};
