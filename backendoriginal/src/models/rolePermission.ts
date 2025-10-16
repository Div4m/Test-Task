import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from "typeorm";
import { Role } from "./role.js";
import { Permission } from "./permission.js";

@Entity("role_permissions")
export class RolePermission {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @ManyToOne(() => Role, (role) => role.rolePermissions, { onDelete: "CASCADE", lazy: true })
    @JoinColumn({ name: "role_id" })
    role!: Promise<Role>;

    @ManyToOne(() => Permission, (permission) => permission.rolePermissions, { onDelete: "CASCADE", lazy: true })
    @JoinColumn({ name: "permission_id" })
    permission!: Promise<Permission>;

    @CreateDateColumn({ type: "timestamp" })
    granted_at!: Date;
}