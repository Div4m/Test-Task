import type {Request,Response} from "express";
import { LoginApi} from "../api/loginApi.js";

export class LoginController{
    private loginService = new LoginApi();

    login = async(req:Request,res:Response)=>{
        try{
            const user = await this.loginService.login(req.body);
            res.status(200).json({message:"Login Succesfull!",user});

        }catch(err:any){
            res.status(400).json({error:err.message});
        }
    }
}