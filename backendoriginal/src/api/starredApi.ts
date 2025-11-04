import { AppDataSource } from "../config/db.js";
import {User} from "../models/users.js";
import {Task} from "../models/tasks.js";
import { StarredTask } from "../models/starredTask.js";

export class StarredTaskApi{
    private starredRepo = AppDataSource.getRepository(StarredTask);
    private taskRepo = AppDataSource.getRepository(Task);
    private userRepo = AppDataSource.getRepository(User);

    async addStarTask(userId:string,taskId:string){

        const user = await this.userRepo.findOneBy({id:userId});
        const task = await this.taskRepo.findOne({where:{taskId}});

        if(!user) throw new Error ("User not found");
        if(!task) throw new Error ("task not found");

        const existing = await this.starredRepo.findOne({where:{user:{id:userId},task:{id:task.id} },
        })
        if (existing) throw new Error ("task is already starred");

        const starred = this.starredRepo.create({user,task})
        await this.starredRepo.save(starred);
        return {message:"task starred successfully"};
    }

    async removeStar(userId:string,taskId:string){
        const task = await this.taskRepo.findOne({where:{taskId}});
        if(!task) throw new Error("Task not found");
        const starred = await this.starredRepo.findOne({where:{user:{id:userId},task:{id:task.id}}
        })
        if(!starred) throw new Error("task is not starred yet");
        await this.starredRepo.remove(starred);
        return {message:"Task is now unstarred"};
    }

    async getAllStarTask(userId:string){
        return await this.starredRepo.find({
            where :{user:{id:userId}},
            relations:["task"],
            order:{created_at:"DESC"},
        })
    }
}