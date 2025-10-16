import { AppDataSource } from "../config/db.js";
import {User} from "../models/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import type {IUserLoginDTO} from "../types/UserDTO.js";

export class LoginApi{

    async login(data:IUserLoginDTO){
        const UserRepo = AppDataSource.getRepository(User);

        const user =  await UserRepo.findOneBy({email:data.email});
        if(!user) throw new Error("Invalid email");

        
        const passawordValid = await bcrypt.compare(data.password , user.password)
        if(!passawordValid) throw new Error ("Invalid password");

        const token = jwt.sign({
            id:user.id,email:user.email,
            role:(await user.role)?.role_name
        },
            process.env.JWT_SECRET!,
            {expiresIn:"1d"} 
        )

        const {password , ...userWithoutPassword}=user;
        return {
            message:"Login Succesfull!",
            user:userWithoutPassword,
            token,
        }
    }
}