import express from "express";
import cors from "cors";
import { db, testDB } from "./db";
import type { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import type {
  OrderItemInput,
  Product,
  TaskRow,
  UserRow,
} from "./types/product";

const getErrorMessage = (err: unknown) =>
  err instanceof Error ? err.message : "Unknown error";

export const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  }),
);

testDB();

app.get("/api/products", async (req, res) => {
  try {
    const [rows] = await db.query<RowDataPacket[]>("SELECT * FROM products");
    res.json(rows as Product[]);
  } catch (err) {
    res.status(500).json({ error: getErrorMessage(err) });
  }
});

// GET Single Product
app.get("/api/products/:id", async (req, res) => {
  try {
    const [rows] = await db.query<RowDataPacket[]>(
      "SELECT * FROM products WHERE id = ?",
      [req.params.id],
    );
    if (rows.length === 0)
      return res.status(404).json({ message: "Not found" });
    res.json(rows[0] as Product);
  } catch (err) {
    res.status(500).json({ error: getErrorMessage(err) });
  }
});

app.get("/api/tasks", async (req, res) => {
  try {
    const [rows] = await db.query<TaskRow[]>(
      "SELECT * FROM tasks ORDER BY id DESC",
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: getErrorMessage(err) });
  }
});

// POST New Task
app.post("/api/tasks", async (req, res) => {
  const { title, priority } = req.body;
  try {
    const [result] = await db.query<ResultSetHeader>(
      "INSERT INTO tasks (title, priority) VALUES (?, ?)",
      [title, priority],
    );
    res.status(201).json({ id: result.insertId, title, priority });
  } catch (err) {
    res.status(500).json({ error: getErrorMessage(err) });
  }
});

// PUT Update Task Status
app.put("/api/tasks/:id", async (req, res) => {
  const { status } = req.body;
  try {
    await db.query("UPDATE tasks SET status = ? WHERE id = ?", [
      status,
      req.params.id,
    ]);
    res.json({ message: "Updated" });
  } catch (err) {
    res.status(500).json({ error: getErrorMessage(err) });
  }
});

// DELETE Task
app.delete("/api/tasks/:id", async (req, res) => {
  try {
    await db.query("DELETE FROM tasks WHERE id = ?", [req.params.id]);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: getErrorMessage(err) });
  }
});

// Register User
app.post("/api/auth/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const [result] = await db.query<ResultSetHeader>(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, password], // Note: In production, hash the password!
    );
    res.status(201).json({ id: result.insertId, name, email });
  } catch (err) {
    res.status(500).json({ error: "Email already exists" });
  }
});

// Login User
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const [users] = await db.query<UserRow[]>(
      "SELECT * FROM users WHERE email = ? AND password = ?",
      [email, password],
    );
    if (users.length === 0)
      return res.status(401).json({ error: "Invalid credentials" });
    res.json({ id: users[0].id, name: users[0].name, email: users[0].email });
  } catch (err) {
    res.status(500).json({ error: getErrorMessage(err) });
  }
});

// Place Order
app.post("/api/orders", async (req, res) => {
  const { userId, totalAmount, items } = req.body as {
    userId: number;
    totalAmount: number;
    items: OrderItemInput[];
  }; // items = [{productId, quantity, price}, ...]
  try {
    // 1. Create the Order
    const [orderResult] = await db.query<ResultSetHeader>(
      "INSERT INTO orders (user_id, total_amount) VALUES (?, ?)",
      [userId, totalAmount],
    );
    const orderId = orderResult.insertId;

    // 2. Create Order Items (Loop through items)
    for (const item of items) {
      await db.query(
        "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)",
        [orderId, item.productId, item.quantity, item.price],
      );
    }

    res.status(201).json({ message: "Order placed successfully", orderId });
  } catch (err) {
    res.status(500).json({ error: getErrorMessage(err) });
  }
});
