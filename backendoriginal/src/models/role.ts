import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { User } from "./users.js";
import { RolePermission } from "./rolePermission.js";

@Entity("roles")
export class Role {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ length: 50, unique: true, nullable: false})
    role_name!: string;

    @CreateDateColumn({ type: "timestamp" })
    created_at!: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updated_at!: Date;

    @OneToMany(() => User, (user) => user.role,{lazy:true})
    users!: Promise<User[]>;

    @OneToMany(() => RolePermission, (rolePermission) => rolePermission.role, { lazy: true })
    rolePermissions!: Promise<RolePermission[]>;
}