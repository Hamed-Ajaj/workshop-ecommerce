import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

export const db = mysql.createPool({
  host: "127.0.0.1",
  user: "user",
  password: "password",
  database: "ecommerce_db",
  waitForConnections: true,
  connectionLimit: 10,
});

// test the db connection
export const testDB = async () => {
  try {
    await db.query("SELECT 1");
    console.log("MySQL connected");
  } catch (err) {
    console.error("MySQL connection failed", err);
  }
};
