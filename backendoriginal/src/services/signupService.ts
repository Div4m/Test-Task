import { db } from "../config/db.js";
import { UserModel } from "../models/userModel.js";
import type { IUserCreateDTO } from "../types/UserDTO.js";
import bcrypt from "bcrypt";

export class SignupService{
    private userModel = new UserModel();

    async signup(data:IUserCreateDTO){
    try{
        // first checking if user exist or not
        const existingUser = await this.userModel.findByEmail(data.email);
        if(existingUser) throw new Error ("User already exists")
        
        // password is hashesd here 
        const hashPassword = await bcrypt.hash(data.password,10);

        //a default role id
        const roleId = await this.userModel.getDefaultRoles("user");
        if(!roleId) throw new Error ("Default role not found")
        

        // generating a humanreadable unique user_id
        const humanReadableId = `USER-${Math.floor(1000 + Math.random() * 9000)}`;

        // now create use
        const newUser = await this.userModel.createUser(data,hashPassword,humanReadableId,roleId);

        return newUser;
        
    }catch(error:any){
        console.log("signupService error:",error.message)
        throw new Error(error.message || "Signup failed");
        }
    }
}

// import { AppDataSource } from "../config/db.js";
// import { User } from "../models/users.js";
// import {Role} from "../models/role.js";
// import type { IUserCreateDTO } from "../types/UserDTO.js";
// import bcrypt from "bcrypt";

// export class SignupApi{
//         private  userRepo = AppDataSource.getRepository(User);
//         private  roleRepo = AppDataSource.getRepository(Role);
        
//     async signup(data:IUserCreateDTO){
        

//         const existingUser = await this.userRepo.findOneBy({email:data.email});
//         if(existingUser) throw new Error ("User already exits");    

//         const hashPassword = await bcrypt.hash(data.password,10);
//         const defaultRole = await this.roleRepo.findOne({where:{role_name:"user"}});
//         const humanReadableId = `USER-${Math.floor(1000 + Math.random() * 9000)}`;


//         const newUser = this.userRepo.create({
//             user_id:humanReadableId,
//             first_name:data.first_name,
//             last_name:data.last_name ?? null,
//             country_code:data.country_code ?? null,
//             phone : data.phone ?? null,
//             email:data.email,
//             password:hashPassword,
//             profile_pic:data.profile_pic ?? null,
//             role: defaultRole,
//         }as Partial<User>); //this tells typescript that it matches entity(partially);

//         await this.userRepo.save(newUser);

//         const {password,...userWithoutPassword } = newUser;
//         return userWithoutPassword;
//     }
// }