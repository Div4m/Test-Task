import {Request, Response} from "express";
import {AdminApi} from "../api/adminApi.js";

export class AdminController{
    private adminApi = new AdminApi();

    getAllUsers = async (req:Request, res:Response)=>{
        try{
            const users = await this.adminApi.getAllUsers();
            res.status(200).json(users);
        }catch(error:any){
            res.status(400).json({messagge:error.message});
        }
    }
    getUserById = async(req:Request,res:Response)=>{
        try{
            const {userId} = req.params;
            const user = await this.adminApi.getUserById(userId);
            res.status(200).json(user);
        }catch(error:any){
            res.status(400).json({err:error.message});
        }
        
    }

    updateUser = async(req:Request,res:Response)=>{
        try{
            const {userId} = req.params;
            const data = req.body;
            const result = await this.adminApi.updateUser(userId,data);
            res.status(200).json(result);
        }catch(error:any){
            res.status(400).json({err:error.message});
        }
}
    deleteUser = async(req:Request ,res:Response)=>{
        try{
            const {userId} = req.params;
            const result = await this.adminApi.deleteUser(userId);
            res.status(200).json(result);

        }catch(error:any){
            res.status(400).json({err:error.message});
        }

    }
}