
// import {Response} from "express";
// import { TaskHistoryApi } from "../api/taskHistoryApi.js";
// import {AuthRequest} from "../middleware/authmMiddleware.js";
// import type{ TaskHistoryCreateDTO } from "../types/TaskHistory.js";

// export class TaskHistoryController{
//    private taskHistoryApi = new TaskHistoryApi();

//     async createHistory(req:AuthRequest,res:Response){
//         try{
//             const {taskId} = req.params;
//             const {action,old_value,new_value} =req.body;
//             const userId = req.user?.id;
//             if(!userId) throw new Error ("user is not valid");
//             const data:TaskHistoryCreateDTO = { taskId, userId, action , old_value,new_value};

//             const response = await this.taskHistoryApi.createHistory(taskId,userId,data) 
//             res.status(200).json(response)
//         }catch(error:any){
//             res.status(400).json({err:error.message})
//         }
//     }
//     async getTaskHistory (req:AuthRequest,res:Response){
//         try{
//             const {taskId} = req.params;
//             const history = await this.taskHistoryApi.getTaskHistory(taskId);
//             res.status(200).json(history);
//         }catch(error:any){
//             res.status(400).json({err:error.message});
//         }
//     }
// }

// import {Response} from "express";
// import { TaskHistoryApi } from "../api/taskHistoryApi.js";
// import {AuthRequest} from "../middleware/authmMiddleware.js";
// import type{ TaskHistoryCreateDTO } from "../types/TaskHistory.js";

// export class TaskHistoryController{
//    private taskHistoryApi = new TaskHistoryApi();

//     async createHistory(req:AuthRequest,res:Response){
//         try{
//             const {taskId} = req.params;
//             const {action,old_value,new_value} =req.body;
//             const userId = req.user?.id;
//             if(!userId) throw new Error ("user is not valid");
//             const data:TaskHistoryCreateDTO = { taskId, userId, action , old_value,new_value};

//             const response = await this.taskHistoryApi.createHistory(taskId,userId,data) 
//             res.status(200).json(response)
//         }catch(error:any){
//             res.status(400).json({err:error.message})
//         }
//     }
//     async getTaskHistory (req:AuthRequest,res:Response){
//         try{
//             const {taskId} = req.params;
//             const history = await this.taskHistoryApi.getTaskHistory(taskId);
//             res.status(200).json(history);
//         }catch(error:any){
//             res.status(400).json({err:error.message});
//         }
//     }
// }