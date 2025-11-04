import { AppDataSource } from "../config/db.js";
import { Priority } from "../models/priority.js";
import type { PriorityCreateDTO } from "../types/PriorityDTO.js";

export class PriorityApi{
    private priorityRepo = AppDataSource.getRepository(Priority);
    
    async getPriorities():Promise<PriorityCreateDTO[]>{
       const priorities = await this.priorityRepo.find({
        order:{weight:"DESC"}
       });
       return priorities;
    }
    async getPriorityById(id:string):Promise<PriorityCreateDTO>{
        const priority = await this.priorityRepo.findOne({where:{id}});
        if(!priority) throw new Error("priority not found");
        return priority ;
    }
}