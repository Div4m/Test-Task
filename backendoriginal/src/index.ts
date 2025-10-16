import express from "express";
import "reflect-metadata";
import cors from "cors";
import dotenv from "dotenv";
import { AppDataSource } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { RoleSeeder } from "./seedScript/roleseed.js";



dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 5000;


app.use(express.json());
app.use(cors());// this  allow frontend connections

app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.use(express.urlencoded({extended:true}));// this parse form data 
app.use("/api",authRoutes);
app.use("/api/users", userRoutes);

AppDataSource.initialize()
  .then(async() => {
    console.log("Database connected successfully!");
        try {
      console.log("before seeding roleseeder");
      await new RoleSeeder().seedRoles();
      console.log("Roles seeded successfully");
    } catch (err) {
      console.error("Seeder failed:", err);
    }
    app.listen (PORT,() =>{
    
    console.log(`Server is running on http://localhost:${PORT} `);
    console.log("Event loop is active, waiting for connections...");
  
});
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });




