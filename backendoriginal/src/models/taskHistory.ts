import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Task } from "./tasks.js";
import { User } from "./users.js";

@Entity("task_history")
export class TaskHistory {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @ManyToOne(() => Task, (task) => task.history, { onDelete: "CASCADE", lazy: true })
    @JoinColumn({ name: "task_id" })
    task!: Promise<Task>;

    @ManyToOne(() => User, (user) => user.history, { onDelete: "SET NULL", lazy: true })
    @JoinColumn({ name: "user_id" })
    user?: Promise<User>;

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
