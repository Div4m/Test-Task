import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from "typeorm";
import type { Role } from "./role.js";
import type { Permission } from "./permission.js";
import {Permission as PermissionEntity} from "./permission.js";
import {Role as RoleEntity} from "./role.js";

@Entity("role_permissions")
export class RolePermission {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @ManyToOne(() => RoleEntity, (role) => role.rolePermissions, { onDelete: "CASCADE"})
    @JoinColumn({ name: "role_id" })
    role!: Role;

    @ManyToOne(() => PermissionEntity, (permission) => permission.rolePermissions, { onDelete: "CASCADE"})
    @JoinColumn({ name: "permission_id" })
    permission!: Permission;

    @CreateDateColumn({ type: "timestamp" })
    granted_at!: Date;
}