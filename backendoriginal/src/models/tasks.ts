import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";
import { User } from "./users.js";
import { Priority } from "./priority.js";
import { TaskHistory } from "./taskHistory.js";
import { StarredTask } from "./starredTask.js";

@Entity("tasks")
export class Task {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ name: "task_id", type: "varchar", length: 60, unique: true })
    taskId!: string;

    @ManyToOne(() => User, (user) => user.tasksCreated, { onDelete: "CASCADE", lazy: true })
    @JoinColumn({ name: "user_id" })
    user!: Promise<User>;

    @ManyToOne(() => Priority, (priority) => priority.tasks, { onDelete: "SET NULL", lazy: true })
    @JoinColumn({ name: "priority_id" })
    priority!: Promise<Priority>;

    @Column({ type: "varchar", length: 100 })
    title!: string;

    @Column({ type: "text", nullable: true })
    description?: string;

    @ManyToOne(() => User, (user) => user.tasksAssigned, { onDelete: "SET NULL", lazy: true })
    @JoinColumn({ name: "assigned_to" })
    assignedTo?: Promise<User>;

    @OneToMany(() => TaskHistory, (history) => history.task, { lazy: true })
    history!: Promise<TaskHistory[]>;

    @OneToMany(() => StarredTask, (starred) => starred.task, { lazy: true })
    starredBy!: Promise<StarredTask[]>;

    @Column({ type: "timestamp", nullable: true })
    due_date?: Date;

    @Column({ type: "varchar", length: 50, default: "not started" })
    status!: string;

    @CreateDateColumn({ name: "created_at", type: "timestamp" })
    created_at!: Date;

    @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
    updated_at!: Date;
}
