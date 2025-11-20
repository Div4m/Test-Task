// import {Response, NextFunction} from "express";
// import {AuthRequest} from "./authmMiddleware.js";

// export const adminMiddleware = (req:AuthRequest, res:Response, next:NextFunction)=>{
//     try{

//         if(!req.user){
//             return res.status(401).json({message:"Unauthorized"});
//         }
//         const roleName =
//         typeof req.user.role === "string"
//         ? req.user.role.toLowerCase()
//         : req.user.role?.role_name?.toLowerCase();
        
//         if(roleName!== "admin"){
//             return res.status(403).json({message:"only Admins"});
//         }
//         next();
//     }catch(error:any){
//         res.status(500).json({message:error.message});
//     }
// }