import { StarredTaskModel } from "../models/starredTask.js";

export class StarredTaskService{
    private starredModel = new StarredTaskModel();


    async addStarTask(userId:string,taskId:string){
        // user and task exist or not 
        const user = await this.starredModel.checkUser(userId)
        const task = await this.starredModel.taskExists(taskId);

        if(!user) throw new Error ("User not found");
        if(!task) throw new Error ("task not found");

        // here task has star or not it confirms by task (id)
        const existing = await this.starredModel.alreadyStarred(userId,task.id)
        if (existing) throw new Error ("task is already starred");

        const starred = await this.starredModel.addStarOnTask(userId, task.id);
        
        return {
            message:"task starred successfully",
            starred,
        };
    }
    // it remove star
    async removeStar(userId:string,taskId:string){
        // task exists or not 
        const task = await this.starredModel.taskExists(taskId);
        if(!task) throw new Error("Task not found");
        // task is starred or not
        const starred = await this.starredModel.alreadyStarred(userId, task.id);
        if(!starred) throw new Error("task is not starred yet");
        // remove star
        await this.starredModel.removeStar(userId, task.id);
        return {message:"Task is now unstarred"};
    }

    async getAllStarTask(userId:string){
        try{

            const user = await this.starredModel.checkUser(userId);
            if(!user) throw new Error("User not found");

            // get all starred task of user 
            const tasks = await this.starredModel.getAllStarTask(userId);
            return tasks;
        }catch(error:any){
            console.log("dont have starred tasks yet or problem while getting");
            throw new Error ("error while getting tasks");
        }
    }
}

// import { AppDataSource } from "../config/db.js";
// import {User} from "../models/users.js";
// import {Task} from "../models/tasks.js";
// import { StarredTask } from "../models/starredTask.js";

// export class StarredTaskApi{
//     private starredRepo = AppDataSource.getRepository(StarredTask);
//     private taskRepo = AppDataSource.getRepository(Task);
//     private userRepo = AppDataSource.getRepository(User);

//     async addStarTask(userId:string,taskId:string){

//         const user = await this.userRepo.findOneBy({id:userId});
//         const task = await this.taskRepo.findOne({where:{taskId}});

//         if(!user) throw new Error ("User not found");
//         if(!task) throw new Error ("task not found");

//         const existing = await this.starredRepo.findOne({where:{user:{id:userId},task:{id:task.id} },
//         })
//         if (existing) throw new Error ("task is already starred");

//         const starred = this.starredRepo.create({user,task})
//         await this.starredRepo.save(starred);
//         return {message:"task starred successfully"};
//     }

//     async removeStar(userId:string,taskId:string){
//         const task = await this.taskRepo.findOne({where:{taskId}});
//         if(!task) throw new Error("Task not found");
//         const starred = await this.starredRepo.findOne({where:{user:{id:userId},task:{id:task.id}}
//         })
//         if(!starred) throw new Error("task is not starred yet");
//         await this.starredRepo.remove(starred);
//         return {message:"Task is now unstarred"};
//     }

//     async getAllStarTask(userId:string){
//         return await this.starredRepo.find({
//             where :{user:{id:userId}},
//             relations:["task"],
//             order:{created_at:"DESC"},
//         })
//     }
// }