
import { Task } from "../models/tasksModel.js";
import {User} from "../models/users.js";
import { Priority } from "../models/priority.js";
import { TaskHistory } from "../models/taskHistory.js";
import type{TaskCreateDTO, TaskUpdateDTO} from "../types/TaskDTO.js";
import {v4 as uuidv4} from "uuid";


export class TaskApi {
    private taskRepo = AppDataSource.getRepository(Task);
    private userRepo = AppDataSource.getRepository(User);
    private priorityRepo = AppDataSource.getRepository(Priority);
   
   
    async createTask(data:TaskCreateDTO){

        const user = await this.userRepo.findOneBy({id:data.userId})
        if(!user) throw new Error("User not found");
        const taskId = `TASK-${uuidv4().slice(0, 8).toUpperCase()}`;
        const task = this.taskRepo.create({
            taskId,
            title: data.title,
            description: data.description,
            due_date: data.due_date,
            status: data.status || "not started",
            user,

        });
        if(data.assignedToId){
            const assignedTo = await this.userRepo.findOne({where:{id:data.assignedToId}});
            if(assignedTo){
                task.assignedTo = assignedTo;
            }
        }
        if(data.priorityId){
            const priority = await this.priorityRepo.findOneBy({
                id:data.priorityId
            })
            if(priority){
                task.priority = priority;
            }
        }
        return await this.taskRepo.save(task);

}

    async getAllTasks(userId:string){
        const tasks =  await this.taskRepo.find({
            relations:["user","assignedTo","priority","starredBy","starredBy.user"],
            order : {created_at:"DESC"},
        });
        return tasks.map(task=>({
            ...task,
            isStarred: task.starredBy.some(star=> star.user.id===userId)
        }))
    }
    async getTaskById(id:string){
        const task = this.taskRepo.findOne({
            where:{id},
            relations:["user","assignedTo","priority","history","starredBy"],
        })
        if(!task) throw new Error ("Task not found ");
        return task;
    }
    async updateTask(id:string, updates:TaskUpdateDTO){
        const task = await this.taskRepo.findOne({
            where:{id},relations:["priority"],
        });
        if(!task) throw new Error("Task not found");
        if(updates.priorityId){
            const priority = await this.priorityRepo.findOne({
                where:{id:updates.priorityId}
            })
            if(!priority) throw new Error ("priority not found");
            task.priority = priority;
            delete updates.priorityId;
        }
        Object.assign(task,updates);
        return await this.taskRepo.save(task);
    }
    async deleteTask(id:string){
        const task = await this.taskRepo.findOne({where:{id}});
        if(!task) throw new Error("Task not found");

        await this.taskRepo.remove(task);
        return "Task deleted succesfully"
    }

}



// import { AppDataSource } from "../config/db.js";
// import { Task } from "../models/tasks.js";
// import {User} from "../models/users.js";
// import { Priority } from "../models/priority.js";
// import { TaskHistory } from "../models/taskHistory.js";
// import type{TaskCreateDTO, TaskUpdateDTO} from "../types/TaskDTO.js";
// import {v4 as uuidv4} from "uuid";


// export class TaskApi {
//     private taskRepo = AppDataSource.getRepository(Task);
//     private userRepo = AppDataSource.getRepository(User);
//     private priorityRepo = AppDataSource.getRepository(Priority);
   
   
//     async createTask(data:TaskCreateDTO){

//         const user = await this.userRepo.findOneBy({id:data.userId})
//         if(!user) throw new Error("User not found");
//         const taskId = `TASK-${uuidv4().slice(0, 8).toUpperCase()}`;
//         const task = this.taskRepo.create({
//             taskId,
//             title: data.title,
//             description: data.description,
//             due_date: data.due_date,
//             status: data.status || "not started",
//             user,

//         });
//         if(data.assignedToId){
//             const assignedTo = await this.userRepo.findOne({where:{id:data.assignedToId}});
//             if(assignedTo){
//                 task.assignedTo = assignedTo;
//             }
//         }
//         if(data.priorityId){
//             const priority = await this.priorityRepo.findOneBy({
//                 id:data.priorityId
//             })
//             if(priority){
//                 task.priority = priority;
//             }
//         }
//         return await this.taskRepo.save(task);

// }

//     async getAllTasks(userId:string){
//         const tasks =  await this.taskRepo.find({
//             relations:["user","assignedTo","priority","starredBy","starredBy.user"],
//             order : {created_at:"DESC"},
//         });
//         return tasks.map(task=>({
//             ...task,
//             isStarred: task.starredBy.some(star=> star.user.id===userId)
//         }))
//     }
//     async getTaskById(id:string){
//         const task = this.taskRepo.findOne({
//             where:{id},
//             relations:["user","assignedTo","priority","history","starredBy"],
//         })
//         if(!task) throw new Error ("Task not found ");
//         return task;
//     }
//     async updateTask(id:string, updates:TaskUpdateDTO){
//         const task = await this.taskRepo.findOne({
//             where:{id},relations:["priority"],
//         });
//         if(!task) throw new Error("Task not found");
//         if(updates.priorityId){
//             const priority = await this.priorityRepo.findOne({
//                 where:{id:updates.priorityId}
//             })
//             if(!priority) throw new Error ("priority not found");
//             task.priority = priority;
//             delete updates.priorityId;
//         }
//         Object.assign(task,updates);
//         return await this.taskRepo.save(task);
//     }
//     async deleteTask(id:string){
//         const task = await this.taskRepo.findOne({where:{id}});
//         if(!task) throw new Error("Task not found");

//         await this.taskRepo.remove(task);
//         return "Task deleted succesfully"
//     }

// }