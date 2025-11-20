// import {Request, Response} from "express";
// import {AdminApi} from "../api/adminApi.js";

// export class AdminController{
//     private adminApi = new AdminApi();

//     getAllUsers = async (req:Request, res:Response)=>{
//         try{
//             const users = await this.adminApi.getAllUsers();
//             res.status(200).json(users);
//         }catch(error:any){
//             res.status(400).json({messagge:error.message});
//         }
//     }
//     getUserById = async(req:Request,res:Response)=>{
//         try{
//             const {userId} = req.params;
//             const user = await this.adminApi.getUserById(userId);
//             res.status(200).json(user);
//         }catch(error:any){
//             res.status(400).json({err:error.message});
//         }
        
//     }

//     updateUser = async(req:Request,res:Response)=>{
//         try{
//             const {userId} = req.params;
//             const data = req.body;
//             const result = await this.adminApi.updateUser(userId,data);
//             res.status(200).json(result);
//         }catch(error:any){
//             res.status(400).json({err:error.message});
//         }
// }
//     deleteUser = async(req:Request ,res:Response)=>{
//         try{
//             const {userId} = req.params;
//             const result = await this.adminApi.deleteUser(userId);
//             res.status(200).json(result);

//         }catch(error:any){
//             res.status(400).json({err:error.message});
//         }
//     }
//     //role 
//     createRole = async(req:Request,res:Response)=>{
//         try{
//             const {role_name} = req.body;
//             const result = await this.adminApi.createRole(role_name);
//             res.status(200).json(result);
//         }catch(error:any){
//             res.status(400).json({err:error.message});
//         }
//     }
//     getRoles = async(req:Request,res:Response)=>{
//         try{
//             const roles = await this.adminApi.getRoles();
//             res.status(200).json(roles);
//         }catch(error:any){
//             res.status(500).json({err:error.message});
//         }
//     }
//     getRoleById = async (req:Request,res:Response)=>{
//         try{
//             const {roleId} = req.params;
//             const role = await this.adminApi.getRoleById(roleId);
//             res.status(200).json(role);
//         }catch(error:any){
//             res.status(400).json({err:error.message});
//         }
//     }
//     deleteRole = async(req:Request,res:Response)=>{
//         try{
//         const {roleId} = req.params;
//         const result = await this.adminApi.deleteRole(roleId);
//         res.status(201).json(result);
//         }catch(error:any){
//             res.status(400).json({err:error.message});
//         }
//     }
//     // permission

//     createPermission = async(req:Request,res:Response)=>{
//         try{
//             const{permission_name} = req.body;
//             const result = await this.adminApi.createPermission(permission_name);
//             res.status(200).json(result);
//         }
//         catch(error:any){
//             res.status(400).json({err:error.message})
//         }
//     }
//     getAllPermissions = async (req:Request,res:Response)=>{
//         try{
//             const permissions = await this.adminApi.getAllPermissions();
//             res.status(200).json(permissions);
//         }catch(error:any){
//             res.status(400).json({err:error.message});
//         }
//     }
//     //role-permission 
//     assignPermissionToRole = async(req:Request,res:Response)=>{
//         try{
//             const {roleId,permissionId} = req.body;
//             const result  = await this.adminApi.assignPermissionToRole(roleId,permissionId);
//             res.status(200).json(result);
//         }catch(error:any){
//             res.status(400).json({err:error.message});
//         }
//     }
//     removePermissionFromRole = async(req:Request,res:Response)=>{
//         try{
//             const {roleId,permissionId} = req.body;
//             const result = await this.adminApi.removePermissionFromRole(roleId,permissionId);
//             res.status(200).json(result);
//         }catch(error:any){
//             res.status(400).json({err:error.message});
//         }
//     }
//     //assign role to user 
//     assignRoleToUser = async(req:Request,res:Response)=>{
//         try{
//             const {userId,roleId} = req.body;
//             const result =  await this.adminApi.assignRoleToUser(userId,roleId);
//             res.status(200).json(result);
//         }catch(error:any){
//             res.status(400).json({err:error.message});
//         }
//     }
// }