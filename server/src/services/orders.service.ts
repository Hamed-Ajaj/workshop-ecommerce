import type { ResultSetHeader } from "mysql2/promise";
import { db } from "../db";
import type { OrderItemInput } from "../types/product";

export const createOrder = async (
  userId: number,
  totalAmount: number,
  items: OrderItemInput[],
) => {
  const [orderResult] = await db.query<ResultSetHeader>(
    "INSERT INTO orders (user_id, total_amount) VALUES (?, ?)",
    [userId, totalAmount],
  );
  const orderId = orderResult.insertId;

  for (const item of items) {
    await db.query(
      "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)",
      [orderId, item.productId, item.quantity, item.price],
    );
  }

  return orderId;
};
