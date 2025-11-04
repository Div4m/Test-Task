import {Router} from "express";
import { StarredTaskController } from "../controllers/starController.js";
import { AuthMiddleware } from "../middleware/authmMiddleware.js";

const router =  Router();
const auth  = new AuthMiddleware();
const starredTaskController = new StarredTaskController();

router.post("/:taskId",auth.verifyToken,(req,res)=> starredTaskController.addStarTask(req,res));
router.delete("/:taskId",auth.verifyToken,(req,res)=>  starredTaskController.removeStar(req,res));
router.get("/",auth.verifyToken,(req,res)=>starredTaskController.getAllStarTask(req,res));

export default router;

