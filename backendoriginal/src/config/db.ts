import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

export const db = new Pool({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  user: process.env.DB_USER || "maru",
  password: process.env.DB_PASSWORD || "maru444",
  database: process.env.DB_NAME || "taskmanager",
  ssl:false,
  
});

export const connectDB = async () => {
  try {
    const client = await db.connect();
    await client.query("SELECT NOW();");
    console.log(" Connected to database successfully!");
    client.release();
  } catch (err:any) {
    console.error("Database connection failed:", err.message);
    process.exit(1);
  }
};
















// import "reflect-metadata";
// import { DataSource } from "typeorm";
// import dotenv from "dotenv";
// import { User } from "../models/users.js";
// import { Task } from "../models/tasks.js";
// import { Role } from "../models/role.js";
// import { TaskHistory } from "../models/taskHistory.js";
// import { RolePermission } from "../models/rolePermission.js";
// import { StarredTask } from "../models/starredTask.js";
// import { Priority } from "../models/priority.js";
// import { Permission } from "../models/permission.js";


// dotenv.config();




// export const AppDataSource = new DataSource({
//   type: "postgres",
//   host: process.env.DB_HOST || "localhost",
//   port: Number(process.env.DB_PORT) || 5432,
//   username: process.env.DB_USER || "maru",
//   password: process.env.DB_PASSWORD || "maru444",
//   database: process.env.DB_NAME || "taskmanager",
//   synchronize: false, 
//   logging: true,
//   entities: [User,Task,Role,TaskHistory,RolePermission,StarredTask,Priority,Permission],
// });
