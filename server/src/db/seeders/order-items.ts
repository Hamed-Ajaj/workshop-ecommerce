import type { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { db } from "../index";

export const seedOrderItems = async () => {
  const [orders] = await db.query<RowDataPacket[]>(
    "SELECT id FROM orders ORDER BY id ASC LIMIT 1",
  );
  if (orders.length === 0) {
    throw new Error("No orders found. Seed orders first.");
  }

  const [products] = await db.query<RowDataPacket[]>(
    "SELECT id, price FROM products ORDER BY id ASC LIMIT 2",
  );
  if (products.length === 0) {
    throw new Error("No products found. Seed products first.");
  }

  const orderId = orders[0].id as number;
  const items = products.map((product) => [
    orderId,
    product.id,
    1,
    product.price,
  ]);

  await db.query<ResultSetHeader>(
    "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ?",
    [items],
  );
};

if (require.main === module) {
  seedOrderItems()
    .then(() => {
      console.log("Seeded order items");
      process.exit(0);
    })
    .catch((err) => {
      console.error("Failed to seed order items", err);
      process.exit(1);
    });
}
