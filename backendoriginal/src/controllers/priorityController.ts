import {Request ,Response} from "express";
import { PriorityService } from "../services/priorityService.js";


export class PriorityController{
    private priorityService = new PriorityService();
    // handling a getPriorities():-  req and res
    async getAllPriorities(req:Request,res:Response){
        try{
            const priority = await this.priorityService.getPriorities()
            res.status(200).json(priority);
        }catch(error:any){
            res.status(400).json({message:error.message});
        }
    }
    // handling a getPriorityById():- 
    async getPriorityById(req:Request,res:Response){
        try{
            const { id } = req.params;
            const result = await this.priorityService.getPriorityById(id);
            if(!result) throw new Error ("priority not found");
            res.status(200).json(result);
        }
        catch(error:any){
            res.status(401).json({message:error.message});
        }
    }
}