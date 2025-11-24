import {Router } from "express";
import { TaskController } from "../controllers/taskControllers.js";
import { AuthMiddleware } from "../middleware/authmMiddleware.js";

const router = Router();
const auth = new AuthMiddleware();
const taskControllers = new TaskController();  

router.post("/",auth.verifyToken,taskControllers.createTaskController);
router.get("/",auth.verifyToken,taskControllers.getAllTasksController);
router.get("/:task_id",auth.verifyToken,taskControllers.getTaskByIdController);
router.put("/:task_id",auth.verifyToken,taskControllers.updateTaskController);
router.delete("/:task_id",auth.verifyToken,taskControllers.deleteTaskController);

export default router;
