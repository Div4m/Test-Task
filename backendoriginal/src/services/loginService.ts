import { UserModel } from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import type {IUserLoginDTO} from "../types/UserDTO.js";


export class LoginService{
    private userModel = new UserModel();

    async login(data:IUserLoginDTO){
        try{
            const user = await this.userModel.findByEmail(data.email);
            if(!user) throw new Error ("Invalid email");

            const passawordValid = await bcrypt.compare(data.password , user.password)
            if(!passawordValid) throw new Error ("Invalid password");


            // jwt token  sign 
            const token = jwt.sign({
                id:user.id,
                email:user.email,
                role:user.role_name
            },
                process.env.JWT_SECRET!,
                {expiresIn:"1d"}
            )

            delete user.password;

            // here i am returning a user with there token 
            return {
                message:"Login Succesfull!",
                user,            
                token,
            };

        }catch(error:any){
            console.log("error in LoginService",error);
            throw new Error (error.message||"login failed")
        }
    }
}















// export class LoginApi{

//     async login(data:IUserLoginDTO){
//         const UserRepo = pool.query();

//         const user =  await UserRepo.findOne({
//             where:{email:data.email},
//             relations:["role"],
//         });
//         if(!user) throw new Error("Invalid email");


//         const passawordValid = await bcrypt.compare(data.password , user.password)
//         if(!passawordValid) throw new Error ("Invalid password");

//         const token = jwt.sign({
//             id:user.id,
//             email:user.email,
//             role:user.role?.role_name
//         },
//             process.env.JWT_SECRET!,
//             {expiresIn:"1d"}
//         )

//         const {password , ...userWithoutPassword}=user;
//         return {
//             message:"Login Succesfull!",
//             user:userWithoutPassword,
//             token,
//         }
//     }
// }