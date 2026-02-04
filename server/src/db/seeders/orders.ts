import type { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { db } from "../index";

export const seedOrders = async () => {
  const [users] = await db.query<RowDataPacket[]>(
    "SELECT id FROM users ORDER BY id ASC LIMIT 1",
  );
  if (users.length === 0) {
    throw new Error("No users found. Seed users first.");
  }

  const userId = users[0].id as number;

  await db.query<ResultSetHeader>(
    "INSERT INTO orders (user_id, total_amount) VALUES (?, ?)",
    [userId, 59.97],
  );
};

if (require.main === module) {
  seedOrders()
    .then(() => {
      console.log("Seeded orders");
      process.exit(0);
    })
    .catch((err) => {
      console.error("Failed to seed orders", err);
      process.exit(1);
    });
}
