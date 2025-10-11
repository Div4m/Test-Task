export interface TaskHistoryCreateDTO {
    taskId: string;
    userId?: string;    
    action: string;
    old_value?: string;
    new_value?: string;
}

import type { TaskDTO } from "./TaskDTO.ts";
import type { IUserDTO } from "./UserDTO.ts";

export interface TaskHistoryDTO {
    id: string;
    task: TaskDTO;
    user?: IUserDTO;       
    action: string;
    old_value?: string;
    new_value?: string;
    created_at: Date;
    updated_at: Date;
}