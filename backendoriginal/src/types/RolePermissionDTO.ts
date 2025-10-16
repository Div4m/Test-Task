export interface RolePermissionCreateDTO {
    roleId: string;
    permissionId: string;
}

import type { RoleDTO } from "./RoleDTO.js";
import type { PermissionDTO } from "./PermissionDTO.js";

export interface RolePermissionDTO {
    id: string;
    role: RoleDTO;
    permission: PermissionDTO;
    granted_at: Date;
}