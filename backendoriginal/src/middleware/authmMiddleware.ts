import type {NextFunction,Request,Response} from "express";
import Jwt from "jsonwebtoken";


interface jwtpayload{
    id:string;
    userId?: string;
    role?: string;
}
export interface AuthRequest extends Request{
    user?:jwtpayload;
}

export class AuthMiddleware{

    private secret:string;
    constructor(secret?:string){
        this.secret = secret || process.env.JWT_SECRET || "ironman";

    }

    verifyToken = (req:AuthRequest,res:Response,next:NextFunction)=>{
        try{
            const authHeader = req.headers.authorization ;
            if(!authHeader || !authHeader.startsWith("Bearer")){
                return res.status(401).json({message:"Token missing"});
            } 
            const token = authHeader.split(" ") [1];


            const decode = Jwt.verify(token,this.secret) as unknown as jwtpayload;
            
            req.user = decode;
            next();
        }catch(error){
            return res.status(401).json({message:"token expired"});
        }
    }
}




// import type {NextFunction,Request,Response} from "express";
// import Jwt from "jsonwebtoken";
// import type {Role} from "../models/role.js";

// interface jwtpayload{
//     id:string;
//     userId?: string;
//     role?:Role | string;
// }
// export interface AuthRequest extends Request{
//     user?:jwtpayload;
// }

// export class AuthMiddleware{

//     private secret:string;
//     constructor(secret?:string){
//         this.secret = secret || process.env.JWT_SECRET || "ironman";

//     }

//     verifyToken = (req:AuthRequest,res:Response,next:NextFunction)=>{
//         try{
//             const authHeader = req.headers.authorization ;
//             if(!authHeader || !authHeader.startsWith("Bearer")){
//                 return res.status(401).json({message:"Token missing"});
//             } 
//             const token = authHeader.split(" ") [1];


//             const decode = Jwt.verify(token,this.secret) as unknown as jwtpayload;
            
//             req.user = decode;
//             next();
//         }catch(error){
//             return res.status(401).json({message:"token expired"});
//         }
//     }
// }