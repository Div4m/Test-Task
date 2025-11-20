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
            RESTURNING *`,
            [
                taskId,
                data.title,
                data.description ?? null ,
                data.due_date ?? null ,
                data.status?? "not started" ,
                data.assignedToId ?? null  ,
                data.priorityId ?? null,
                data.userId,
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
                p.weight AS priority_weight

             FROM tasks AS t
                LEFT JOIN users AS u ON t.user_id=u.id
                LEFT JOIN users AS a ON t.assigned_to = a.id
                LEFT JOIN priorities AS p ON t.priority_id = p.id 
                ORDER BY created_at DESC;
                `,
                [userId]
        );
        return result.rows;
    }

    async getTaskById(id:string){
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
                p.weight AS priority_weight
            FROM tasks AS t
                LEFT JOIN users AS u ON `

        );
        return result.rows[0];
    }
    async updateTask(id:string ,updates:TaskUpdateDTO){
        const result = await db.query(
            `UPDATE `
        )
    }
    async deleteTask(id:string){
        await db.query(
            `DELETE FROM tasks
            WHERE id = $1`,
            [id]
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

