import {db} from "../config/db.js";

export class StarredTaskModel{
    // checking user existance
    async checkUser(userId:string){
        const user = await db.query(
            `SELECT id FROM users
            WHERE id =$1
            LIMIT 1`,
            [userId]
        );
        return user.rows[0];

    
    }
    // checking tasks existing 
    async taskExists(taskId:string){
        const task = await db.query(
            `SELECT id FROM tasks
            WHERE task_id=$1
            LIMIT 1`,
            [taskId]
        );
        return task.rows[0];
    }
    //checking task is already starred 
    async alreadyStarred(userId:string,taskId:string){
        const result = await db.query(
            `SELECT id FROM starred_task
            WHERE user_id =$1 AND task_id = $2
            LIMIT 1`,[userId,taskId]
        );
        return result.rows[0];
    }

    // now adding star 
    async addStarOnTask(userId:string, taskId:string){
        const added = await db.query(
            `INSERT INTO starred_task (user_id,task_id)
             VALUES ($1,$2)
             RETURNING id,user_id,task_id,created_at`,
             [userId,taskId]
        )
        return added.rows[0];
    }

    //remove star from tasks
    async removeStar(userId:string,taskId:string){
        await db.query(
        `DELETE FROM starred_task
            WHERE user_id=$1 AND task_id = $2`,
            [userId,taskId]
        );
    }
    // i want to understand this
    async getAllStarTask(userId:string){
        const result = await db.query(
        `SELECT 
            st.id AS starred_id,
            st.created_at AS starred_at,
            t.id AS task_id,
            t.title,
            t.description,
            t.status,
            t.due_date,
            t.priority_id,
            t.created_at AS task_created_at
        FROM starred_task st
        LEFT JOIN tasks t 
            ON st.task_id = t.id
        WHERE st.user_id = $1
        ORDER BY st.created_at DESC`,
        [userId]
        );
        return result.rows;
    }

}




















// import { Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
// import type { User } from "./users.js";
// import { User as UserEntity } from "./users.js";
// import type { Task } from "./tasks.js";
// import { Task as TaskEntity } from "./tasks.js";

// @Entity("starred_task")
// export class StarredTask {
//     @PrimaryGeneratedColumn("uuid")
//     id!: string;

//     @ManyToOne(() => UserEntity, (user) => user.starredTasks, { onDelete: "CASCADE"})
//     @JoinColumn({ name: "user_id" })
//     user!: User;

//     @ManyToOne(() => TaskEntity, (task) => task.starredBy, { onDelete: "CASCADE"})
//     @JoinColumn({ name: "task_id" })
//     task!: Task;

//     @CreateDateColumn({ name: "created_at", type: "timestamp" })
//     created_at!: Date;

//     @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
//     updated_at!: Date;
// }
