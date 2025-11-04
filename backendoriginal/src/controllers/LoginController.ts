import type {Request,Response} from "express";
import { LoginApi} from "../api/loginApi.js";

export class LoginController{
    private loginService = new LoginApi();

    login = async(req:Request,res:Response)=>{
        try{
            const {message,user,token} = await this.loginService.login(req.body);// here i added token with user
            res.status(200).json({message,user,token,}); // here i added token with user

        }catch(err:any){
            res.status(400).json({error:err.message});
        }
    }
}