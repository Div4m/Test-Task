import { PriorityModel } from "../models/priority.js";
import type { PriorityCreateDTO } from "../types/PriorityDTO.js";

export class PriorityService{
    private priorityModel = new PriorityModel();

    // here it calling getAllPRiorities funciton
    async getPriorities():Promise<PriorityCreateDTO[]>{
        try{
            const priorities = await this.priorityModel.getAllPriorities();
            if(priorities.length === 0) throw new Error ("priorities not found");       
            return priorities;
        }catch(error:any){
            console.log("error in getting all priorities:",error.message);
            throw new Error ("Error in getting all priorities");
        }
    }
    
    // get priority by id 
    async getPriorityById(id:string):Promise<PriorityCreateDTO>{
        try{
            const priority = await this.priorityModel.getPriorityById(id);
            if(!priority) throw new Error("priority id not found");
            return priority;
        }catch(error:any){
            console.log("id is not valid:",error.message);
            throw new Error ("Priority id is not valid");
        }
    }
}