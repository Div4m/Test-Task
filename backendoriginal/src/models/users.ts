import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  JoinColumn,
} from "typeorm";
 import type { Role } from "./role.js";
 import { Role as RoleEntity } from "./role.js";
 import type{ Task } from "./tasks.js";
 import { Task as TaskEntity } from "./tasks.js";
 import type { TaskHistory } from "./taskHistory.js";
 import { TaskHistory as TaskHistoryEntity } from "./taskHistory.js";
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

  @ManyToOne(() => RoleEntity, (role) => role.users, { eager:true,nullable: true})
  @JoinColumn({ name: "role_id" })
  role?: Role | null;

  @OneToMany(() => TaskEntity, (task) => task.user)
  tasksCreated!: Task[] ;

  @OneToMany(() => TaskEntity, (task) => task.assignedTo)
  tasksAssigned!: Task[] ;

  @OneToMany(() => TaskHistoryEntity, (history) => history.user)
  history!: TaskHistory[] ;

  @OneToMany(() => StarredTask, (starred) => starred.user)
  starredTasks!: StarredTask[] ;

  @CreateDateColumn({ type: "timestamp" })
  created_at!: Date;
}