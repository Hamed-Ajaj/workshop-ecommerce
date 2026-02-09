import type { RequestHandler } from "express";
import { createUser, getUserByEmail } from "../services/user.service";
import { validateUserCredentials } from "../services/auth.service";
import { signAuthToken } from "../utils/auth";
import { getErrorMessage } from "../utils/errors";

export const register: RequestHandler = async (req, res) => {
  const { name, email, password } = req.body as {
    name: string;
    email: string;
    password: string;
  };

  try {
    const existing = await getUserByEmail(email);
    if (existing) {
      return res.status(409).json({ error: "Email already exists" });
    }

    const user = await createUser({ name, email, password });
    const token = signAuthToken(user.id);

    return res.status(201).json({ user, token });
  } catch (err) {
    return res.status(500).json({ error: getErrorMessage(err) });
  }
};

export const login: RequestHandler = async (req, res) => {
  const { email, password } = req.body as {
    email: string;
    password: string;
  };

  try {
    const user = await validateUserCredentials(email, password);
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = signAuthToken(user.id);
    return res.json({
      user: { id: user.id, name: user.name, email: user.email },
      token,
    });
  } catch (err) {
    return res.status(500).json({ error: getErrorMessage(err) });
  }
};
