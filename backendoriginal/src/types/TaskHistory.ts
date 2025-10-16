export interface TaskHistoryCreateDTO {
    taskId: string;
    userId?: string;    
    action: string;
    old_value?: string;
    new_value?: string;
}

import type { TaskDTO } from "./TaskDTO.js";
import type { IUserDTO } from "./UserDTO.js";

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