import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { RolePermission } from "./rolePermission.js";

@Entity("permissions")
export class Permission {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ type: "varchar", unique: true, length: 100 })
    permission_name!: string;

    @Column({ nullable: true, type: "text" })
    description?: string;

    @OneToMany(() => RolePermission, (rolePermission) => rolePermission.permission, { lazy: true })
    rolePermissions!: Promise<RolePermission[]>;

    @CreateDateColumn({ type: "timestamp" })
    created_at!: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updated_at!: Date;
}