export interface StarredTaskCreateDTO {
    userId: string;
    taskId: string;
}

import type { IUserDTO } from "./UserDTO.js";
import type { TaskDTO } from "./TaskDTO.js";

export interface StarredTaskDTO {
    id: string;
    user: IUserDTO;
    task: TaskDTO;
    created_at: Date;
    updated_at: Date;
}

