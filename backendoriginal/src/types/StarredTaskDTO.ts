export interface StarredTaskCreateDTO {
    userId: string;
    taskId: string;
}

import type { IUserDTO } from "./UserDTO";
import type { TaskDTO } from "./TaskDTO";

export interface StarredTaskDTO {
    id: string;
    user: IUserDTO;
    task: TaskDTO;
    created_at: Date;
    updated_at: Date;
}

