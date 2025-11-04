import { AppDataSource } from "../config/db.js";
import { User } from "../models/users.js";
import {Role} from "../models/role.js";
import type { IUserCreateDTO } from "../types/UserDTO.js";
import bcrypt from "bcrypt";

export class SignupApi{
        private  userRepo = AppDataSource.getRepository(User);
        private  roleRepo = AppDataSource.getRepository(Role);
        
    async signup(data:IUserCreateDTO){
        

        const existingUser = await this.userRepo.findOneBy({email:data.email});
        if(existingUser) throw new Error ("User already exits");    

        const hashPassword = await bcrypt.hash(data.password,10);
        const defaultRole = await this.roleRepo.findOne({where:{role_name:"user"}});
        const humanReadableId = `USER-${Math.floor(1000 + Math.random() * 9000)}`;


        const newUser = this.userRepo.create({
            user_id:humanReadableId,
            first_name:data.first_name,
            last_name:data.last_name ?? null,
            country_code:data.country_code ?? null,
            phone : data.phone ?? null,
            email:data.email,
            password:hashPassword,
            profile_pic:data.profile_pic ?? null,
            role: defaultRole,
        }as Partial<User>); //this tells typescript that it matches entity(partially);

        await this.userRepo.save(newUser);

        const {password,...userWithoutPassword } = newUser;
        return userWithoutPassword;
    }
}