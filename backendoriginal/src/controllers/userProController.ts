import type {Response} from "express";
import { UserApi } from "../api/userProfileAPI.js";
import type { AuthRequest } from "../middleware/authmMiddleware.js";


export class UserController{
    private userService : UserApi;

    constructor (){
        this.userService  = new UserApi();
    }

    getProfile = async(req:AuthRequest, res:Response):Promise<void> =>{
        try{
            const userId = req.user?.id;
            if(!userId){
                res.status(401).json({message:"Unathorized userId"})
                return;
            }
            const user = await this.userService.getUserById(userId);

            if(!user){
                res.status(404).json({message:"User not found"});
                return;

            }
            res.status(200).json({message:"User Profile Fetched Succesfully",
                user,
            });
        }
        catch(err:any){
            res.status(500).json({
                message:"Failed to load Profile",
                error: (err.message),
            });
        }

    };
    updateProfile = async (req:AuthRequest, res:Response):Promise<void>=>{
        try{
            const userId = req.user?.id;

            if(!userId){
                res.status(401).json({message:"UserId missing"});
                return;
            }
            
            const updates = req.body;
            const updatedUser = await this.userService.updateUserById(userId,updates);
            if (!updatedUser) {
                res.status(404).json({message:"User not found "});
                return;
            }
            res.status(200).json({message:"User profile updated succesfully ",
            user:updatedUser
            });

        }catch(err:any){
            res.status(500).json({
                message:"Failed to update Profile",
                error: err.message
            });
        }

    }

}