export interface PriorityCreateDTO {
    level: string;
    weight: number;
}

import type { TaskDTO } from "./TaskDTO";

export interface PriorityDTO {
    id: string;
    level: string;
    weight: number;
    tasks?: TaskDTO[];  //  if you want tasks associated with this priority
    created_at: Date;
    updated_at: Date;
}