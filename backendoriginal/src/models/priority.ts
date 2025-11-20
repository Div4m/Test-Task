import {db} from "../config/db.js";
import { PriorityCreateDTO } from "../types/PriorityDTO.js";

export class PriorityModel{
    // selectting all priorities from table:-
    async getAllPriorities():Promise<PriorityCreateDTO[]>{
        
        const result = await db.query(
            `SELECT id,level,weight,created_at,updated_at
                FROM priorities 
                ORDER BY weight DESC`);
        return result.rows as PriorityCreateDTO[];
            
    }
    // selecting priority by Id:-
    async getPriorityById(id:string):Promise<PriorityCreateDTO | null>{
        const result = await db.query(
            `SELECT id ,level,weight,created_at,updated_at
                FROM priorities
                WHERE id = $1
                LIMIT 1`,
                [id]);
        return result.rows[0] as PriorityCreateDTO | null;
    }
}











// import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
// import { Task } from "./tasks.js";

// @Entity("priorities")
// export class Priority {
//     @PrimaryGeneratedColumn("uuid")
//     id!: string;

//     @Column({ type: "varchar", length: 50, unique: true, nullable: false })
//     level!: string;

//     @Column({ type: "int" })
//     weight!: number;

//     @OneToMany(() => Task, (task) => task.priority)
//     tasks!: Task[];

//     @CreateDateColumn({ type: "timestamp" })
//     created_at!: Date;

//     @UpdateDateColumn({ type: "timestamp" })
//     updated_at!: Date;
// }
