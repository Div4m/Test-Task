import {AppDataSource} from "../config/db.js";
import {User} from "../models/users.js";
import {Role} from "../models/role.js";
import { Permission } from "../models/permission.js";
import { RolePermission } from "../models/rolePermission.js";


export class AdminApi{
    private userRepo = AppDataSource.getRepository(User);
    private roleRepo = AppDataSource.getRepository(Role);
    private permissionRepo = AppDataSource.getRepository(Permission);
    private rolePermissionRepo  = AppDataSource.getRepository(RolePermission);

    //user CRUD
    async getAllUsers(){
        return await this.userRepo.find({relations:["role"]});
    }

    async getUserById(userId:string){
        const user = await this.userRepo.findOne({
            where:{user_id:userId},
            relations:["role"]
        });
        if(!user) return "User not found";
        return user;
    }
    async updateUser(userId:string, data:Partial<User>){
        const user = await this.userRepo.findOneBy({user_id:userId});
        if(!user) return "User not found";
        await this.userRepo.update({user_id:userId},data);
        return {message:"User updated successfully"};
    }
    async deleteUser(userId:string){
        const user = await this.userRepo.findOneBy({user_id:userId});
        if(!user) return "User not found";
        await this.userRepo.remove(user);
        return "User deleted successfully";
    }
    //Role CRUD
    async createRole(roleName:string){
        const roleExists = await this.roleRepo.findOneBy({role_name:roleName});
        if(roleExists) throw new Error ("Role already exists");

        const role = this.roleRepo.create({role_name:roleName})
        return await this.roleRepo.save(role);
    }
    async getRoles(){
        return await this.roleRepo.find({relations:["rolePermissions","rolePermissions.permission"]});
    }
    async getRoleById(roleId:string){
        const role = await this.roleRepo.findOne({
            where: {id:roleId},
            relations:["rolePermissions","rolePermissions.permission"]
        })
        if(!role) throw new Error ("Role not found");
        return role;
    }
    async deleteRole(roleId:string){
        const role = await this.roleRepo.findOneBy({id:roleId})
        if(!role) throw new Error ("Role not found");
        await this.roleRepo.remove(role);
        return {message:"Role deleted successfully"};
    }

    //permission 
    async createPermission(permissionName:string,description?:string){
        const permissionExists = await this.permissionRepo.findOneBy({permission_name:permissionName});
        if(permissionExists) throw new Error ("Permission already exists");

        const perm = this.permissionRepo.create({permission_name:permissionName,description});
        return await this.permissionRepo.save(perm);
    }
    async getAllPermissions(){
        return await this.permissionRepo.find();
    }

    //Role - permission mapping 
    async assignPermissionToRole(roleId:string,permissionId:string){
        // fetch role without incorrect 'permissions' relation path
        const role = await this.roleRepo.findOne({
            where: { id: roleId },
            relations: ["rolePermissions", "rolePermissions.permission"],
        });
        const permission = await this.permissionRepo.findOneBy({id:permissionId});
        if(!role || !permission ) throw new Error ("Role and Permission not found");
        
        const existing = await this.rolePermissionRepo.findOne({
            where:{role:{id:roleId},permission:{id:permissionId}}
        });
        if(existing) throw new Error ("permission already assigned to this role");

        const rolePermission = this.rolePermissionRepo.create({
            role,
            permission
        }); 
       return await this.rolePermissionRepo.save(rolePermission);  
    }
    async removePermissionFromRole(roleId:string,permissionId:string){
        const existing = await this.rolePermissionRepo.findOne({where:{role:{id:roleId},permission:{id:permissionId}},
            relations:["role","permission"],
        });
        if(!existing) throw new Error ("this Permission is not assigned to this role");
        await this.rolePermissionRepo.remove(existing)
        return {message:"Permission removed from this role"};
    }

    //Assign role to user
    async assignRoleToUser(userId:string,roleId:string) {
        const user = await this.userRepo.findOneBy({user_id:userId});
        const role = await this.roleRepo.findOneBy({id:roleId});

        if(!user) throw new Error("user not exist");
        if(!role) throw new Error ("Role not found");

        user.role = role;
        return await this.userRepo.save(user);
    }
}
