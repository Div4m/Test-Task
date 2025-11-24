import {db} from "../config/db.js";
import type { TaskCreateDTO, TaskUpdateDTO} from "../types/TaskDTO.js";
import { v4 as uuidv4} from "uuid";


export class TaskModel {
    async checkUser(data:TaskCreateDTO){
        // check user exist or not 
        const result = await db.query(
            `SELECT id FROM users 
            WHERE id = $1
            LIMIT 1`,
            [data.userId]
        );
        return result.rows[0];
    }
    // check priortiy exist or not
    async checkPriority(priorityId:string ){

        const result = await db.query(
            `SELECT id FROM priorities
            WHERE id = $1
            LIMIT 1`,
            [priorityId]
        );
        return result.rows[0];
    }

    // create task :-
    async createTask(data:TaskCreateDTO){
        const taskId = `TASK-${uuidv4().slice(0, 8).toUpperCase()}`;
        const result = await db.query(
            `INSERT INTO tasks 
            (task_id,title,description,due_date,status,user_id,assigned_to,priority_id)
            VALUES($1,$2,$3,$4,$5,$6,$7,$8)
            RETURNING *`,
            [
                taskId,
                data.title,
                data.description ?? null ,
                data.due_date ?? null ,
                data.status?? "not started" ,
                data.userId,
                data.assignedToId ?? null  ,
                data.priorityId ?? null,
                
            ]
        );
        const createTask = result.rows[0];
        // task history create
        await db.query(
            `INSERT INTO task_history
            (action,old_value,new_value,task_id,user_id)
            VALUES($1,$2,$3,$4,$5)`,
            [
                "task created",
                null,
                createTask.status,
                createTask.id,
                data.userId,
            ]

        );
        return createTask; 
    }
    

    // get all tasks:-
    async getAllTasks(userId:string){
        const result = await db.query(
            `SELECT 
                t.id,
                t.task_id,
                t.title,
                t.description,
                t.due_date,
                t.status,
                t.created_at,
                t.updated_at,
                
                u.user_id AS creator_id,
                u.first_name AS creator_fname,
                u.last_name AS creator_lname,

                a.id AS assigned_user,
                a.first_name AS assigned_fname,
                a.last_name AS assigned_lname,


                p.level AS priority_level,
                p.weight AS priority_weight,
                --sql comment to check if the task is starred by the user
                CASE 
                    WHEN s.user_id IS NOT NULL THEN TRUE
                    ELSE FALSE
                END AS is_starred

             FROM tasks AS t
                LEFT JOIN users AS u ON t.user_id=u.id
                LEFT JOIN users AS a ON t.assigned_to = a.id
                LEFT JOIN priorities AS p ON t.priority_id = p.id 
                LEFT JOIN starred_task AS s ON t.id = s.task_id AND s.user_id = $1
                
                ORDER BY created_at DESC;
                `,
                [userId]
        );
        return result.rows;
    }

    async getTaskById(taskId:string,userId:string){
        const result = await db.query(
            `SELECT              
                t.id,
                t.task_id,
                t.title,
                t.description,
                t.due_date,
                t.status,
                t.created_at,
                t.updated_at,

                u.user_id AS creator_id,
                u.first_name AS creator_fname,
                u.last_name AS creator_lname,

                a.id AS assigned_user,
                a.first_name AS assigned_fname,
                a.last_name AS assigned_lname,

                p.level AS priority_level,
                p.weight AS priority_weight,

                CASE 
                    WHEN s.user_id IS NOT NULL THEN TRUE
                    ELSE FALSE
                END AS is_starred
            FROM tasks AS t
                LEFT JOIN users AS u ON t.user_id = u.id
                LEFT JOIN users AS a ON t.assigned_to = a.id
                LEFT JOIN priorities AS p ON t.priority_id = p.id
                LEFT JOIN starred_task AS s ON t.id = s.task_id AND s.user_id = $1
            WHERE t.task_id = $2`,
            [userId,taskId]
        );

        return result.rows[0];
    }
    async updateTask(taskId:string ,userId:string,updates:TaskUpdateDTO){

        const oldTaskRes= await db.query(
            `SELECT * FROM tasks 
            WHERE task_id =$1
            LIMIT 1`,
            [taskId]
        );
        const oldTask = oldTaskRes.rows[0];
        if (!oldTask){
            throw new Error ("Task not found");
        }
        const result = await db.query(
            `UPDATE tasks
                SET title = $1,
                    description = $2,
                    due_date = $3,
                    status =$4,
                    priority_id = $5,
                    assigned_to = $6,
                    updated_at = Now()
                WHERE task_id = $7
                RETURNING *`,
            [
                updates.title ?? oldTask.title,
                updates.description ?? oldTask.description,
                updates.due_date ?? oldTask.due_date,
                updates.status  ?? oldTask.status,
                updates.priorityId ?? oldTask.priority_id,
                updates.assignedToId ?? oldTask.assigned_to,
                taskId
            ]  
        );
        const  updatedTask = result.rows[0];
        // task history update
        await db.query(
            `INSERT INTO task_history
            (action,old_value,new_value,task_id,user_id)
            VALUES($1,$2,$3,$4,$5)`,
            [
                "task updated",
                oldTask.status,
                updatedTask.status,
                updatedTask.id,
                userId,
            ]   
        )
        return updatedTask;
    }
    async deleteTask(taskId:string){
        await db.query(
            `DELETE FROM tasks
            WHERE task_id = $1`,
            [taskId]
        );
    }
}



















// import {
//     Entity,
//     PrimaryGeneratedColumn,
//     Column,
//     ManyToOne,
//     OneToMany,
//     JoinColumn,
//     CreateDateColumn,
//     UpdateDateColumn,
// } from "typeorm";
// import type{ User } from "./users.js";
// import { User as UserEntity } from "./users.js";
// import { Priority } from "./priority.js";
// import type { TaskHistory } from "./taskHistory.js";
// import { TaskHistory as TaskHistoryEntity } from "./taskHistory.js";
// import { StarredTask } from "./starredTask.js";

// @Entity("tasks")
// export class Task {
//     @PrimaryGeneratedColumn("uuid")
//     id!: string;

//     @Column({ name: "task_id", type: "varchar", length: 60, unique: true })
//     taskId!: string;

//     @ManyToOne(() => UserEntity, (user) => user.tasksCreated, { onDelete: "CASCADE"})
//     @JoinColumn({ name: "user_id" })
//     user!: User;

//     @ManyToOne(() => Priority, (priority) => priority.tasks, { onDelete: "SET NULL"})
//     @JoinColumn({ name: "priority_id" })
//     priority?: Priority;

//     @Column({ type: "varchar", length: 100 })
//     title!: string;

//     @Column({ type: "text", nullable: true })
//     description?: string;

//     @ManyToOne(() => UserEntity, (user) => user.tasksAssigned, { onDelete: "SET NULL"})
//     @JoinColumn({ name: "assigned_to" })
//     assignedTo?:User;

//     @OneToMany(() => TaskHistoryEntity, (history) => history.task)
//     history!: TaskHistory[];

//     @OneToMany(() => StarredTask, (starred) => starred.task,{cascade:true})
//     starredBy!: StarredTask[];

//     @Column({ type: "timestamp", nullable: true })
//     due_date?: Date;

//     @Column({ type: "varchar", length: 50, default: "not started" })
//     status!: string;

//     @CreateDateColumn({ name: "created_at", type: "timestamp" })
//     created_at!: Date;

//     @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
//     updated_at!: Date;
// }

