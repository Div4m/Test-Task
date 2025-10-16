import { AppDataSource } from "../config/db.js";
import {Role} from "../models/role.js";

export class RoleSeeder{
    private roleRepo = AppDataSource.getRepository(Role);
    constructor(){}

    async seedRoles(){
        const roles = ["admin","user"];
        for (const roleName of roles){
            const existingRole = await this.roleRepo.findOneBy({role_name:roleName});
            if(!existingRole){
                const newRole = this.roleRepo.create({role_name:roleName});
                await this.roleRepo.save(newRole);
            }
        }
        console.log("role seeded succesfully!");
    }
}