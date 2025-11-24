import { TaskService } from "../services/taskService.js";
import {Request,Response} from "express";
import { AuthRequest } from "../middleware/authmMiddleware.js";
const taskService = new TaskService();

export class TaskController{
    
    async createTaskController(req:Request,res:Response){
        try{
            const task = await taskService.createTask(req.body);
            res.status(201).json(task);
        }catch(error:any){
            res.status(400).json({message:error.message});
        }
    }

    async getAllTasksController(req:AuthRequest,res:Response){
        try{
            if(!req.user){
                return res.status(401).json({message:"no user found"})
            }
            const userId = req.user.id
            const tasks = await taskService.getAllTasks(userId);
            res.status(200).json(tasks);
        }
        catch(error:any){
            res.status(500).json({message:error.message});
        }

    }
    async getTaskByIdController(req:AuthRequest,res:Response){
        try{
            const task = await taskService.getTaskById(req.params.task_id,req.user!.id);
            res.status(202).json(task);
        }
        catch(error:any){
            res.status(404).json({message:error.message});
        }
    }
    async updateTaskController(req:AuthRequest,res:Response){
        try{
            const task = await taskService.updateTask(req.params.task_id,req.user!.id,req.body);
            res.status(200).json(task);
        }
        catch(error:any){
            res.status(400).json({message:error.message});
        }
    }

    async deleteTaskController(req:Request,res:Response){
        try{
            const result = await taskService.deleteTask(req.params.task_id);
            res.json(result);
        }
        catch(error:any){   
            res.status(400).json({message:error.message});
        }
    }
}