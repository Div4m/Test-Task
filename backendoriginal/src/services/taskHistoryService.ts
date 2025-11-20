// import { AppDataSource } from "../config/db.js";
// import { TaskHistory } from "../models/taskHistory.js";
// import { User } from "../models/users.js";
// import { Task } from "../models/tasks.js";
// import { TaskHistoryCreateDTO } from "../types/TaskHistory.js";

// export class TaskHistoryApi{
//     private historyRepo = AppDataSource.getRepository(TaskHistory);
//     private userRepo = AppDataSource.getRepository(User);
//     private taskRepo = AppDataSource.getRepository(Task);

//     async createHistory(taskId:string,userId:string,data:TaskHistoryCreateDTO){
//         const task = await this.taskRepo.findOne({where:{taskId}});
//         if(!task) throw new Error("task not found");

//         const user = await this.userRepo.findOneBy ({id:userId});
//         if(!user) throw new Error ("user not found");

//         const history = this.historyRepo.create({
//                 task,
//                 user,
//                 action:data.action,
//                 old_value:data.old_value,
//                 new_value:data.new_value,
//             });
//         await this.historyRepo.save(history);
//         return {message:"history created"};        
//     }
//     async getTaskHistory (taskId:string){
//         const task = await this.taskRepo.findOne({where:{taskId},relations:["history","history.user"]});
//         if(!task) throw new Error("task not found");
//         return task.history;
//     }
// }