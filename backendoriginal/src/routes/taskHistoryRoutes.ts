import { TaskHistoryController } from "../controllers/taskHistCotroller.js";
import {AuthMiddleware} from "../middleware/authmMiddleware.js";
import {Router} from "express";


const router = Router();
const auth = new AuthMiddleware();
const taskHistoryController = new TaskHistoryController();

router.post("/:taskId",auth.verifyToken,(req,res)=>taskHistoryController.createHistory(req,res));
router.get("/:taskId",auth.verifyToken,(req,res)=>taskHistoryController.getTaskHistory(req,res));

export default router;
