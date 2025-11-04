import { TaskApi } from "../api/taskApi.js";
import {Request,Response} from "express";
import { AuthRequest } from "../middleware/authmMiddleware.js";
const taskService = new TaskApi();

export class TaskController{
    
    async createTask(req:Request,res:Response){
        try{
            const task = await taskService.createTask(req.body);
            res.status(201).json(task);
        }catch(error:any){
            res.status(400).json({message:error.message});
        }
    }

    async getAllTasks(req:AuthRequest,res:Response){
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
    async getTaskById(req:Request,res:Response){
        try{
            const task = await taskService.getTaskById(req.params.id);
            res.status(202).json(task);
        }
        catch(error:any){
            res.status(404).json({message:error.message});
        }
    }
    async updateTask(req:Request,res:Response){
        try{
            const task = await taskService.updateTask(req.params.id,req.body);
            res.status(200).json(task);
        }
        catch(error:any){
            res.status(400).json({message:error.message});
        }
    }

    async deleteTask(req:Request,res:Response){
        try{
            const result = await taskService.deleteTask(req.params.id);
            res.json(result);
        }
        catch(error:any){   
            res.status(400).json({message:error.message});
        }
    }
}