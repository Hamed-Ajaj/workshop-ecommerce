import type { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { db } from "../db";
import type { Product } from "../types/product";

export const listProducts = async (category?: string) => {
  const [rows] = await db.query<RowDataPacket[]>(
    category
      ? "SELECT * FROM products WHERE category = ?"
      : "SELECT * FROM products",
    category ? [category] : [],
  );

  return rows as Product[];
};

export const createProduct = async (input: {
  name: string;
  description?: string;
  price: number;
  image?: string;
  category: string;
}) => {
  const [result] = await db.query<ResultSetHeader>(
    "INSERT INTO products (name, description, price, image, category) VALUES (?, ?, ?, ?, ?)",
    [
      input.name,
      input.description ?? null,
      input.price,
      input.image ?? null,
      input.category,
    ],
  );

  return {
    id: result.insertId,
    ...input,
    description: input.description ?? null,
    image: input.image ?? null,
  };
};

export const getProductById = async (id: number) => {
  const [rows] = await db.query<RowDataPacket[]>(
    "SELECT * FROM products WHERE id = ?",
    [id],
  );

  return (rows[0] as Product | undefined) ?? null;
};
