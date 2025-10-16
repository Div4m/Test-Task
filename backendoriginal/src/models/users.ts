import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  JoinColumn,
} from "typeorm";
 import { Role } from "./role.js";
 import { Task } from "./tasks.js";
 import { TaskHistory } from "./taskHistory.js";
 import { StarredTask } from "./starredTask.js";

@Entity("users") // table name in DB
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ unique: true, length: 60 })
  user_id!: string;

  @Column({ length: 60 })
  first_name!: string;

  @Column({ type: "varchar", length: 60, nullable: true })
  last_name?: string|null;

  @Column({ type: "varchar", length: 20, nullable: true })
  phone?: string;

  @Column({ type: "varchar", length: 10, nullable: true })
  country_code?: string;

  @Column({ type: "varchar", unique: true, length: 100 })
  email!: string;

  @Column({ type: "varchar", length: 120 })
  password!: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  profile_pic?: string;

  @Column({ type: "boolean", default: true })
  status!: boolean;

  @ManyToOne(() => Role, (role) => role.users, { nullable: true ,lazy:true})
  @JoinColumn({ name: "role_id" })
  role?: Promise<Role>;

  @OneToMany(() => Task, (task) => task.user, { lazy: true })
  tasksCreated!: Promise<Task[]>;

  @OneToMany(() => Task, (task) => task.assignedTo, { lazy: true })
  tasksAssigned!: Promise<Task[]>;

  @OneToMany(() => TaskHistory, (history) => history.user, { lazy: true })
  history!: Promise<TaskHistory[]>;

  @OneToMany(() => StarredTask, (starred) => starred.user, { lazy: true })
  starredTasks!: Promise<StarredTask[]>;

  @CreateDateColumn({ type: "timestamp" })
  created_at!: Date;
}

