import {Request ,Response} from "express";
import { PriorityApi } from "../api/priorityApi.js";

export class PriorityController{
    private priorityApi = new PriorityApi();

    async getPriorities(req:Request,res:Response){
        try{
            const priority = await this.priorityApi.getPriorities()
            res.status(200).json(priority);
        }catch(error:any){
            res.status(400).json({message:error.message});
        }
    }
    async getPriorityById(req:Request,res:Response){
        try{
            const { id } = req.params;
            const result = await this.priorityApi.getPriorityById(id);
            if(!result) throw new Error ("priority not found");
            res.status(200).json(result);
        }
        catch(error:any){
            res.status(401).json({message:error.message});
        }
    }
}