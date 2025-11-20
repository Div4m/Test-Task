import type{ Request,Response } from "express";
import { SignupService } from "../services/signupService.js";

export class SignupController {
    private signupService :  SignupService;

    constructor(){
        this.signupService = new SignupService();

    }
    signup = async (req: Request ,res: Response)=>{

        try{
            const user =  await this.signupService.signup(req.body);
            res.status(201).json({message:"User Signup Succesfully!",user});
        }catch(error:any){
            console.log(error);
            res.status(400).json({err:error.message});
        }
    }
}
