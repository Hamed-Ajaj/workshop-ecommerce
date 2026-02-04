import type { ResultSetHeader } from "mysql2/promise";
import { db } from "../index";
import { users } from "./data";

export const seedUsers = async () => {
  await db.query<ResultSetHeader>(
    "INSERT INTO users (name, email, password) VALUES ?",
    [users.map((user) => [user.name, user.email, user.password])],
  );
};

if (require.main === module) {
  seedUsers()
    .then(() => {
      console.log("Seeded users");
      process.exit(0);
    })
    .catch((err) => {
      console.error("Failed to seed users", err);
      process.exit(1);
    });
}
