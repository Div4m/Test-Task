import { PriorityController } from "../controllers/priorityController.js";
import {Router} from "express";

const router =Router();
const priorityController = new PriorityController();

router.get("/",(req,res)=>priorityController.getAllPriorities(req,res));
router.get("/:id",(req,res)=>priorityController.getPriorityById(req,res));


export default router;
