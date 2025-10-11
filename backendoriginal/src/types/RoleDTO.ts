export interface RoleCreateDTO {
    role_name: string ;
}

export interface RoleDTO {
    id: string;
    role_name: string;
    created_at: Date;
    updated_at: Date;
}