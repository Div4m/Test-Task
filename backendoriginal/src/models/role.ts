import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
import type { RolePermission } from "./rolePermission.js";
import {RolePermission as RolePermissionEntity} from "./rolePermission.js";
import { User } from "./users.js";


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

    @OneToMany(() => User, (user) => user.role)
    users!: User[] ;

    @OneToMany(() => RolePermissionEntity, (rolePermission) => rolePermission.role)
    rolePermissions !: RolePermission[];
}