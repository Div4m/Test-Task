import {Request,Response} from "express";
import { AuthRequest } from "../middleware/authmMiddleware.js";
import { StarredTaskApi } from "../api/starredApi.js";

export class StarredTaskController{
    private starredApi = new StarredTaskApi();

    async addStarTask(req:AuthRequest,res:Response){
        try{
            if (!req.user) {
            return res.status(401).json({ message: "Unauthorized: no user found" });
            }
            const userId = req.user.id;
            const {taskId} = req.params;

            const result = await this.starredApi.addStarTask(userId,taskId)
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
            const result = await this.starredApi.removeStar(userId,taskId);
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
            const result = await this.starredApi.getAllStarTask(userId);
            res.status(200).json(result);
        }
        catch(error:any){
            res.status(400).json({message:error.message});
        }
    }
}