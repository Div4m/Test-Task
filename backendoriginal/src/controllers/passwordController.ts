import { PasswordResetService } from "../services/passwordService.js";
import type{Request,Response} from "express";

export class PasswordResetController{
    private resetService = new PasswordResetService();
    //request reset token
    resetReq = async(req:Request,res:Response)=>{
        const {email} = req.body;
        try{
            const result = await this.resetService.requestReset(email);
            res.status(200).json(result);
        }
        catch(error:any){
            res.status(400).json({err:error.message});
        }
    } 
    // reset password using token
    passwordRes = async(req:Request,res:Response)=>{
        const {token,newPassword} = req.body;
        try{
            const result = await this.resetService.resetPassword(token,newPassword);
            res.status(200).json(result);
        }catch(error:any){
            res.status(400).json({err:error.message});
        }
    }
}