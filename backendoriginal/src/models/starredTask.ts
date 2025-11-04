import { Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import type { User } from "./users.js";
import { User as UserEntity } from "./users.js";
import type { Task } from "./tasks.js";
import { Task as TaskEntity } from "./tasks.js";

@Entity("starred_task")
export class StarredTask {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @ManyToOne(() => UserEntity, (user) => user.starredTasks, { onDelete: "CASCADE"})
    @JoinColumn({ name: "user_id" })
    user!: User;

    @ManyToOne(() => TaskEntity, (task) => task.starredBy, { onDelete: "CASCADE"})
    @JoinColumn({ name: "task_id" })
    task!: Task;

    @CreateDateColumn({ name: "created_at", type: "timestamp" })
    created_at!: Date;

    @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
    updated_at!: Date;
}
