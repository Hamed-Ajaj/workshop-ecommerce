import bcrypt from "bcryptjs";
import type { ResultSetHeader } from "mysql2/promise";
import { db } from "../db";
import type { UserRow } from "../types/product";

export const getUserByEmail = async (email: string) => {
  const [users] = await db.query<UserRow[]>(
    "SELECT * FROM users WHERE email = ?",
    [email],
  );
  return users[0] ?? null;
};

export const getUserById = async (id: number) => {
  const [users] = await db.query<UserRow[]>(
    "SELECT * FROM users WHERE id = ?",
    [id],
  );
  return users[0] ?? null;
};

export const createUser = async (input: {
  name: string;
  email: string;
  password: string;
}) => {
  const hashedPassword = await bcrypt.hash(input.password, 10);
  const [result] = await db.query<ResultSetHeader>(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [input.name, input.email, hashedPassword],
  );

  return {
    id: result.insertId,
    name: input.name,
    email: input.email,
  };
};

export const updateUser = async (
  id: number,
  updates: { name?: string; email?: string; password?: string },
) => {
  const fields: string[] = [];
  const values: Array<string | number> = [];

  if (updates.name) {
    fields.push("name = ?");
    values.push(updates.name);
  }

  if (updates.email) {
    fields.push("email = ?");
    values.push(updates.email);
  }

  if (updates.password) {
    const hashedPassword = await bcrypt.hash(updates.password, 10);
    fields.push("password = ?");
    values.push(hashedPassword);
  }

  if (fields.length === 0) {
    return getUserById(id);
  }

  values.push(id);
  await db.query<ResultSetHeader>(
    `UPDATE users SET ${fields.join(", ")} WHERE id = ?`,
    values,
  );

  return getUserById(id);
};
