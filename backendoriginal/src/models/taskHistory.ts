import {db} from "../config/db.js";


export class TaskHistoryModel {
    async getTaskAllHistoryById(taskId:string){
        const result = await db.query(
            `SELECT * FROM task_history
            WHERE task_id = $1
            ORDER BY created_at DESC`,
            [taskId]
        );
        return result.rows;
    }
    async getAllHistoryOfUserTasks(userId:string,taskId:string){
        const result = await db.query(
            `SELECT * FROM task_history
            `
        )
    }
        
    }
