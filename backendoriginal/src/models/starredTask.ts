import { Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { User } from "./users.js";
import { Task } from "./tasks.js";

@Entity("StarredTask")
export class StarredTask {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @ManyToOne(() => User, (user) => user.starredTasks, { onDelete: "CASCADE", lazy: true })
    @JoinColumn({ name: "user_id" })
    user!: Promise<User>;

    @ManyToOne(() => Task, (task) => task.starredBy, { onDelete: "CASCADE", lazy: true })
    @JoinColumn({ name: "task_id" })
    task!: Promise<Task>;

    @CreateDateColumn({ name: "created_at", type: "timestamp" })
    created_at!: Date;

    @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
    updated_at!: Date;
}
