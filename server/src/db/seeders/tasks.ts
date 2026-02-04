import type { ResultSetHeader } from "mysql2/promise";
import { db } from "../index";
import { tasks } from "./data";

export const seedTasks = async () => {
  await db.query<ResultSetHeader>(
    "INSERT INTO tasks (title, priority, status) VALUES ?",
    [tasks.map((task) => [task.title, task.priority, task.status])],
  );
};

if (require.main === module) {
  seedTasks()
    .then(() => {
      console.log("Seeded tasks");
      process.exit(0);
    })
    .catch((err) => {
      console.error("Failed to seed tasks", err);
      process.exit(1);
    });
}
