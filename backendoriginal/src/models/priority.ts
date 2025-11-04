import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Task } from "./tasks.js";

@Entity("priorities")
export class Priority {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ type: "varchar", length: 50, unique: true, nullable: false })
    level!: string;

    @Column({ type: "int" })
    weight!: number;

    @OneToMany(() => Task, (task) => task.priority)
    tasks!: Task[];

    @CreateDateColumn({ type: "timestamp" })
    created_at!: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updated_at!: Date;
}
