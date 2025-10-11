export interface PermissionCreateDTO {
    permission_name: string;
    description?: string;
}

export interface PermissionDTO {
    id: string;
    permission_name: string;
    description?: string;
    created_at: Date;
    updated_at: Date;
}