import type {Request,Response} from "express";
import { LoginService} from "../services/loginService.js";

export class LoginController{
    private loginService = new LoginService();

    login = async(req:Request,res:Response)=>{
        try{
            const {message,user,token} = await this.loginService.login(req.body);// here i added token with user
            res.status(200).json({message,user,token,}); // here i added token with user

        }catch(err:any){
            console.log("login error:",err.message)
            res.status(400).json({error:err.message});
        }
    }
}