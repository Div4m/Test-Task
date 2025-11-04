import {AppDataSource} from "../config/db.js";
import {User} from "../models/users.js";


export class AdminApi{
    private userRepo = AppDataSource.getRepository(User);

    async getAllUsers(){
        return await this.userRepo.find({relations:["role"]});
    }

    async getUserById(userId:string){
        const user = await this.userRepo.findOne({
            where:{user_id:userId},
            relations:["role"]
        });
        if(!user) return "User not found";
        return user;
    }
    async updateUser(userId:string, data:Partial<User>){
        const user = await this.userRepo.findOneBy({user_id:userId});
        if(!user) return "User not found"; 
        await this.userRepo.update({user_id:userId},data);
        return {message:"User updated successfully"};
    }
    async deleteUser(userId:string){
        const user = await this.userRepo.findOneBy({user_id:userId});
        if(!user) return "User not found";
        await this.userRepo.remove(user);
        return "User deleted successfully";
    }
}
