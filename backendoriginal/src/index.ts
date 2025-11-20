import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import { RoleSeeder } from "./seedScript/roleseed.js";
import authRoutes from "./routes/authRoutes.js";
import passwordResetRoutes from "./routes/passwordResetRoutes.js";
import userRoutes from "./routes/userRoutes.js";
// import adminRoutes from "./routes/adminRoutes.js";
// import taskRoutes from "./routes/taskRoutes.js";
import starredRoutes from "./routes/staredRoutes.js";
// import taskHistoryRoutes  from "./routes/taskHistoryRoutes.js";
import priorityRoutes from "./routes/priorityRoutes.js";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 5000;


app.use(express.json());
app.use(cors({origin: "http://localhost:5173",credentials: true}));// this  allow frontend connections

app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.use(express.urlencoded({extended:true}));// this parse form data 
app.use("/api",authRoutes);
app.use("/api/password-reset",passwordResetRoutes);
app.use("/api/users", userRoutes);
// app.use("/api/admin", adminRoutes);
// app.use("/api/tasks",taskRoutes);
app.use("/api/starred",starredRoutes);
// app.use("/api/taskhistory",taskHistoryRoutes);
app.use("/api/priority",priorityRoutes);


const startServer = async()=>{
  try{
      await connectDB();
      try{
          console.log("before seeding role");
          const seedResult = await new RoleSeeder().seedRoles();
          console.log("role seeded successfully", seedResult);
      }catch(error:any){
        console.error("seeder failed:", error?.message || error);
        // Don't exit—continue starting the server even if seeding fails
      }
      
      const server = app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
        console.log("Event loop is active, waiting for connections...");
      });

      // Handle server errors
      server.on("error", (err:any) => {
        console.error("Server error:", err);
      });

  }catch(error:any){
      console.error("failed to start a server:", error?.message || error);
      process.exit(1);
  }
};
startServer();












// AppDataSource.initialize()
//   .then(async() => {
//     console.log("Database connected successfully!");
//         try {
//       console.log("before seeding roleseeder");
//       await new RoleSeeder().seedRoles();
//       console.log("Roles seeded successfully");
//     } catch (err) {
//       console.error("Seeder failed:", err);
//     }
//     app.listen (PORT,() =>{
    
//     console.log(`Server is running on http://localhost:${PORT} `);
//     console.log("Event loop is active, waiting for connections...");
  
// });
//   })
//   .catch((err) => {
//     console.error("Database connection failed:", err);
//   });