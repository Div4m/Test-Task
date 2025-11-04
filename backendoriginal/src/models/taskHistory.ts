import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import type { Task } from "./tasks.js";
import { Task as TaskEntity } from "./tasks.js";
import type{ User } from "./users.js";
import { User as UserEntity } from "./users.js";

@Entity("task_history")
export class TaskHistory {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @ManyToOne(() => TaskEntity, (task) => task.history, { onDelete: "CASCADE"})
    @JoinColumn({ name: "task_id" })
    task!: Task;

    @ManyToOne(() => UserEntity, (user) => user.history, { onDelete: "SET NULL", nullable:true})
    @JoinColumn({ name: "user_id" })
    user?:User | null ;

    @Column({ type: "varchar", length: 60 })
    action!: string;

    @Column({ type: "text", nullable: true })
    old_value?: string;

    @Column({ type: "text", nullable: true })
    new_value?: string;

    @CreateDateColumn({ name: "created_at", type: "timestamp"})
    created_at!: Date;

    @UpdateDateColumn({ name: "updated_at", type: "timestamp"})
    updated_at!: Date;
}
