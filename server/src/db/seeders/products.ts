import type { ResultSetHeader } from "mysql2/promise";
import { db } from "../index";
import { products } from "./data";

export const seedProducts = async () => {
  await db.query<ResultSetHeader>(
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
};

if (require.main === module) {
  seedProducts()
    .then(() => {
      console.log("Seeded products");
      process.exit(0);
    })
    .catch((err) => {
      console.error("Failed to seed products", err);
      process.exit(1);
    });
}
