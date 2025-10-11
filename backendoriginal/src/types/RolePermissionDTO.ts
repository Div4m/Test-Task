export interface RolePermissionCreateDTO {
    roleId: string;
    permissionId: string;
}

import type { RoleDTO } from "./RoleDTO";
import type { PermissionDTO } from "./PermissionDTO";

export interface RolePermissionDTO {
    id: string;
    role: RoleDTO;
    permission: PermissionDTO;
    granted_at: Date;
}