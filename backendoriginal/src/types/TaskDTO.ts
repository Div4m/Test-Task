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
import type { IUserDTO } from "./UserDTO.js";
import type { PriorityDTO } from "./PriorityDTO.js";

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
export interface TaskUpdateDTO {
  title?: string;
  description?: string;
  due_date?: Date;
  status?: string;
  assignedToId?: string;
  priorityId?: string;
}