import {UserModel} from "../models/userModel.js";


export class UserService{
    private userModel = new UserModel();
    // get userProfile
    async getProfile(id:string){
        try{
            const user = await this.userModel.getUserById(id)
            if(!user) throw new Error ("user not found ")
            return user;
        }catch(error:any){
            console.log("unable to fetch user:",error.message);
            throw new Error ("Unable to fetch user profile");
        }
    }
   
    // updating user profile
    async updateProfile(id:string ,updates:any ){
        try{
        const updatedUser = await this.userModel.updateUserById(id,updates);
        if(!updatedUser) throw new Error("update failed");
        return updatedUser;

        }
        catch(error:any){
            console.log("Update profile error:",error.message)
            throw new Error("profile updation failed")
        }
    } 
}



// this is interface 
// interface fields{
//     user_id:string,
//     first_name:string,
//     last_name?:string |null,
//     email:string,
//     phone?:string | null,
//     country_code? :string | null,
//     profile_pic? : string | null,
//     role_name?:string | null,
// }