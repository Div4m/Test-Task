import { AppDataSource } from "../config/db.js";
import {User} from "../models/users.js";

interface fields{
    user_id:string,
    first_name:string,
    last_name?:string |null,
    email:string,
    phone?:string | null,
    country_code? :string | null,
    profile_pic? : string | null,
    role_name?:string | null,
}


export class UserApi{
    private userRepo = AppDataSource.getRepository(User);

    async getUserById (id:string){
        return await this.userRepo.findOne({
            where:{ id },
            select :["id","user_id","first_name","last_name","email","country_code","phone","profile_pic"],
        })
    }

    async updateUserById(id:string ,updates:Partial<User> ):Promise<fields|null>{
        const user = await this.userRepo.findOneBy({id})
        if(!user) return null;

        Object.assign(user,updates)
        await this.userRepo.save(user);
        const reqField:fields = {
            
            user_id: user.user_id,
            first_name: user.first_name,
            last_name: user.last_name?? null,
            email : user.email,
            phone: user.phone?? null,
            
            country_code: user.country_code??null,
            profile_pic :user.profile_pic?? null,
        }
        return reqField;
    }
}