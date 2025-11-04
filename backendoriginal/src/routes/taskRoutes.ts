import {Router } from "express";
import { TaskController } from "../controllers/taskControllers.js";
import { AuthMiddleware } from "../middleware/authmMiddleware.js";

const router = Router();
const auth = new AuthMiddleware();
const taskControllers = new TaskController();  

router.post("/",auth.verifyToken,taskControllers.createTask);
router.get("/",auth.verifyToken,taskControllers.getAllTasks);
router.get("/:id",auth.verifyToken,taskControllers.getTaskById);
router.put("/:id",auth.verifyToken,taskControllers.updateTask);
router.delete("/:id",auth.verifyToken,taskControllers.deleteTask);

export default router;