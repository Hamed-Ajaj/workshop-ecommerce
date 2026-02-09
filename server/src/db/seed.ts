import type { ResultSetHeader } from "mysql2/promise";
import { db } from "./index";
import { products, users } from "./seeders/data";
import bcrypt from "bcryptjs";

const buildIds = (firstId: number, count: number) =>
  Array.from({ length: count }, (_, index) => firstId + index);

const seedAll = async () => {
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();
    await connection.query("SET FOREIGN_KEY_CHECKS = 0");
    await connection.query("TRUNCATE TABLE order_items");
    await connection.query("TRUNCATE TABLE orders");
    await connection.query("TRUNCATE TABLE products");
    await connection.query("TRUNCATE TABLE users");
    await connection.query("SET FOREIGN_KEY_CHECKS = 1");

    const hashedUsers = await Promise.all(
      users.map(async (user) => ({
        ...user,
        password: await bcrypt.hash(user.password, 10),
      })),
    );

    const [userResult] = await connection.query<ResultSetHeader>(
      "INSERT INTO users (name, email, password) VALUES ?",
      [hashedUsers.map((user) => [user.name, user.email, user.password])],
    );
    const userIds = buildIds(userResult.insertId, userResult.affectedRows);

    const [productResult] = await connection.query<ResultSetHeader>(
      "INSERT INTO products (name, description, price, image, category) VALUES ?",
      [
        products.map((product) => [
          product.name,
          product.description,
          product.price,
          product.image,
          product.category,
        ]),
      ],
    );
    const productIds = buildIds(
      productResult.insertId,
      productResult.affectedRows,
    );

    const [orderResult] = await connection.query<ResultSetHeader>(
      "INSERT INTO orders (user_id, total_amount) VALUES (?, ?)",
      [userIds[0], 59.97],
    );
    const orderIds = buildIds(orderResult.insertId, orderResult.affectedRows);

    await connection.query<ResultSetHeader>(
      "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ?",
      [
        [
          [orderIds[0], productIds[0], 1, products[0].price],
          [orderIds[0], productIds[1], 1, products[1].price],
        ],
      ],
    );

    await connection.commit();
    console.log("Seeded all tables");
  } catch (err) {
    await connection.rollback();
    throw err;
  } finally {
    connection.release();
  }
};

if (require.main === module) {
  seedAll()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error("Failed to seed all tables", err);
      process.exit(1);
    });
}
