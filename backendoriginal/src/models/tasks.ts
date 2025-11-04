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
import type{ User } from "./users.js";
import { User as UserEntity } from "./users.js";
import { Priority } from "./priority.js";
import type { TaskHistory } from "./taskHistory.js";
import { TaskHistory as TaskHistoryEntity } from "./taskHistory.js";
import { StarredTask } from "./starredTask.js";

@Entity("tasks")
export class Task {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ name: "task_id", type: "varchar", length: 60, unique: true })
    taskId!: string;

    @ManyToOne(() => UserEntity, (user) => user.tasksCreated, { onDelete: "CASCADE"})
    @JoinColumn({ name: "user_id" })
    user!: User;

    @ManyToOne(() => Priority, (priority) => priority.tasks, { onDelete: "SET NULL"})
    @JoinColumn({ name: "priority_id" })
    priority?: Priority;

    @Column({ type: "varchar", length: 100 })
    title!: string;

    @Column({ type: "text", nullable: true })
    description?: string;

    @ManyToOne(() => UserEntity, (user) => user.tasksAssigned, { onDelete: "SET NULL"})
    @JoinColumn({ name: "assigned_to" })
    assignedTo?:User;

    @OneToMany(() => TaskHistoryEntity, (history) => history.task)
    history!: TaskHistory[];

    @OneToMany(() => StarredTask, (starred) => starred.task,{cascade:true})
    starredBy!: StarredTask[];

    @Column({ type: "timestamp", nullable: true })
    due_date?: Date;

    @Column({ type: "varchar", length: 50, default: "not started" })
    status!: string;

    @CreateDateColumn({ name: "created_at", type: "timestamp" })
    created_at!: Date;

    @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
    updated_at!: Date;
}
