import {db} from "../config/db.js";

export class PasswordResetModel{
    async createResetToken(userId:string,token:string,expiresAt:Date){
        try{
        await db.query(
            `INSERT INTO password_reset
            (user_id,reset_token,expires_at,created_at)
            VALUES ($1,$2,$3,Now())`,
        [userId,token,expiresAt]);
        console.log("INSERT Success");
        }catch(error:any){
            console.log("DB insert err:",error.message) // here i changed
        }
    }

    async findByToken(token:string){
        const result = await db.query(`SELECT * FROM password_reset 
            WHERE reset_token=$1 
            LIMIT 1`,
            [token]);
            return result.rows[0];
    }
    async deleteToken(token:string){
        await db.query(`DELETE FROM password_reset 
            WHERE reset_token=$1`,
            [token])
    }
    async findUserByEmail(email:string){
        const result = await db.query(
            `SELECT * FROM users 
            WHERE email = $1 `,[email]);
            return result.rows[0];
    }
    async updatePassword(userId:string,hashPassword:string){
         await db.query(`UPDATE  users 
            SET PASSWORD=$1
            WHERE id= $2`,
        [hashPassword,userId]);
    }
}