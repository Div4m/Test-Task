export interface TaskCreateDTO {
    taskId: string;
    title: string;
    description?: string;
    due_date?: Date;
    status?: string;
    userId: string;       // creator user id
    assignedToId?: string; // assigned user id
    priorityId?: string;   // priority id
}
import type { IUserDTO } from "./UserDTO";
import type { PriorityDTO } from "./PriorityDTO";

export interface TaskDTO {
    id: string;
    taskId: string;
    title: string;
    description?: string;
    due_date?: Date;
    status: string;
    created_at: Date;
    updated_at: Date;
    user?: IUserDTO;       
    assignedTo?: IUserDTO; // assigned user
    priority?: PriorityDTO;
}