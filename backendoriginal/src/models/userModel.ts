import {db} from "../config/db.js";
import { IUserCreateDTO } from "../types/UserDTO.js";

export class UserModel{

    async getDefaultRoles(roleName:string){
        // fetching a id of "user"
        const role = await db.query("SELECT id FROM roles WHERE role_name=$1 LIMIT 1",[roleName]);
        // returning a first row 
        return role.rows[0]?.id;
    }
    
    async createUser(data:IUserCreateDTO,hashPassword:string,humanReadableId:string,roleId:string){
        // when user signup this query will run and create a user
        const result = await db.query(`INSERT INTO users (user_id,first_name,last_name,country_code,phone,email,password,profile_pic,role_id)
            VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)
            RETURNING id,user_id,first_name,last_name,email,profile_pic,created_at`,
            [
                humanReadableId,
                data.first_name,
                data.last_name ?? null,
                data.country_code ?? null,
                data.phone ?? null,
                data.email,
                hashPassword,
                data.profile_pic ?? null,
                roleId || null ,
            ]
        )
        // return the 1st row
        return result.rows[0];

    }
    async findByEmail(email:string){
            // here we are 
            const result = await db.query( 
                    `SELECT u.id,
                        u.user_id,
                        u.first_name,
                        u.last_name,
                        u.email,
                        u.phone,
                        u.status,
                        u.password,
                        u.profile_pic,
                        u.created_at,
                        r.role_name 
                        FROM users as u 
                        LEFT JOIN roles as r ON u.role_id = r.id
                        WHERE u.email = $1
                        LIMIT 1;`,[email]);
                    
                    return result.rows[0];
    }
    // UserProfile 
    // get user by id 
    async getUserById(id:string){
        const user = await db.query(
            `SELECT id,
                user_id,
                first_name,
                last_name,
                email,
                phone,
                country_code,
                profile_pic,
                created_at
            FROM users
            WHERE id = $1
            LIMIT 1`,[id]
        );
        return user.rows[0];
    }
    // update userProfile
        async updateUserById(id: string, data: any) {
        const result = await db.query(
            `UPDATE users
                SET first_name = $1,
                    last_name = $2,
                    email = $3,
                    phone = $4,
                    country_code = $5,
                    profile_pic = $6
            WHERE id = $7
            RETURNING id, user_id, first_name, last_name, email, phone, country_code, profile_pic`,
            [
                data.first_name ?? null,
                data.last_name ?? null,
                data.email ?? null,
                data.phone ?? null,
                data.country_code ?? null,
                data.profile_pic ?? null,
                id
            ]
        );

        return result.rows[0];
    }
}




//import {
//   Entity,
//   PrimaryGeneratedColumn,
//   Column,
//   ManyToOne,
//   OneToMany,
//   CreateDateColumn,
//   JoinColumn,
// } from "typeorm";
//  import type { Role } from "./role.js";
//  import { Role as RoleEntity } from "./role.js";
//  import type{ Task } from "./tasks.js";
//  import { Task as TaskEntity } from "./tasks.js";
//  import type { TaskHistory } from "./taskHistory.js";
//  import { TaskHistory as TaskHistoryEntity } from "./taskHistory.js";
//  import { StarredTask } from "./starredTask.js";

// @Entity("users") // table name in DB
// export class User {
//   @PrimaryGeneratedColumn("uuid")
//   id!: string;

//   @Column({ unique: true, length: 60 })
//   user_id!: string;

//   @Column({ length: 60 })
//   first_name!: string;

//   @Column({ type: "varchar", length: 60, nullable: true })
//   last_name?: string|null;

//   @Column({ type: "varchar", length: 20, nullable: true })
//   phone?: string;

//   @Column({ type: "varchar", length: 10, nullable: true })
//   country_code?: string;

//   @Column({ type: "varchar", unique: true, length: 100 })
//   email!: string;

//   @Column({ type: "varchar", length: 120 })
//   password!: string;

//   @Column({ type: "varchar", length: 255, nullable: true })
//   profile_pic?: string;

//   @Column({ type: "boolean", default: true })
//   status!: boolean;

//   @ManyToOne(() => RoleEntity, (role) => role.users, { eager:true,nullable: true})
//   @JoinColumn({ name: "role_id" })
//   role?: Role | null;

//   @OneToMany(() => TaskEntity, (task) => task.user)
//   tasksCreated!: Task[] ;

//   @OneToMany(() => TaskEntity, (task) => task.assignedTo)
//   tasksAssigned!: Task[] ;

//   @OneToMany(() => TaskHistoryEntity, (history) => history.user)
//   history!: TaskHistory[] ;

//   @OneToMany(() => StarredTask, (starred) => starred.user)
//   starredTasks!: StarredTask[] ;

//   @CreateDateColumn({ type: "timestamp" })
//   created_at!: Date;
// }

 // @ this is dynamic sql query for update user info
//const fields : string[] = [];
        // const values : any[] = []
        // let index = 1;

        // for(const key in updates){
        //     fields.push(`${key}=${index}`);
        //     values.push(updates[key]);
        //     index++;
        // }
        // values.push(id);

        // const query = `UPDATE users
        //                 SET ${fields.join(", ")}
        //                 WHERE id = $${index}
        //                 RETURNING id, user_id, first_name, last_name, email, phone, country_code, profile_pic;`;
            
        // const updated  = await db.query(query,values);
        // return updated.rows[0];