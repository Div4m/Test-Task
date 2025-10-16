import type{ Request,Response } from "express";
import { SignupApi } from "../api/signupApi.js";

export class SignupController {
    private signupService :  SignupApi;

    constructor(){
        this.signupService = new SignupApi();

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