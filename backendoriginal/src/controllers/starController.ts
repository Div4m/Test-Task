import {Request,Response} from "express";
import { AuthRequest } from "../middleware/authmMiddleware.js";
import { StarredTaskService } from "../services/starredService.js";

export class StarredTaskController{
    private starredService = new StarredTaskService();

    async addStarTask(req:AuthRequest,res:Response){
        try{
            if (!req.user) {
            return res.status(401).json({ message: "Unauthorized: no user found" });
            }
            const userId = req.user.id;
            const {taskId} = req.params;

            const result = await this.starredService.addStarTask(userId,taskId)
            res.status(200).json(result);
        }
        catch (error:any){
            res.status(400).json({message:error.message})
        }
    }
    async removeStar(req:AuthRequest,res:Response){
        try{
            if (!req.user) {
            return res.status(401).json({ message: "Unauthorized: no user found" });
            }
            const userId = req.user.id;
            const {taskId} = req.params;
            const result = await this.starredService.removeStar(userId,taskId);
            res.status(200).json(result);
        }catch(error:any){
            res.status(400).json({message:error.message});
        }
    }
    async getAllStarTask(req:AuthRequest,res:Response){
        try{
            if (!req.user) {
            return res.status(401).json({ message: "Unauthorized: no user found" });
            }
            const userId = req.user.id;
            const result = await this.starredService.getAllStarTask(userId);
            res.status(200).json(result);
        }
        catch(error:any){
            res.status(400).json({message:error.message});
        }
    }
}