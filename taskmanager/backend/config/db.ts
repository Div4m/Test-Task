// backend/config/db.js
import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME as string,     // Database name
  process.env.DB_USER as string,     // Database user
  process.env.DB_PASSWORD as string, // Database password
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    port:Number( process.env.DB_PORT) || 5432,
    logging: false,        // Disable SQL query logs
  }
);

export default sequelize;