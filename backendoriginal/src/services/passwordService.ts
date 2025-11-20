import crypto from "crypto";
import bcrypt from "bcrypt";
import { PasswordResetModel } from "../models/passReset.js";
import { sendResetEmail } from "../utils/mailer.js";

export class PasswordResetService{
    private resetModel = new PasswordResetModel();
    // request 
    async requestReset(email:string){
        try{
            const user = await this.resetModel.findUserByEmail(email);
            if(!user) throw new Error ("user not found");

            //generting a token here  
            const token = crypto.randomBytes(32).toString("hex");
            //it expires in 15 min
            const expiresAt = new Date (Date.now() + 15 *60 *1000);

            await this.resetModel.createResetToken(user.id, token, expiresAt);
            // send email
            await sendResetEmail(user.email,token);// here i just added 
            return {message:"password token generated",token};
        }catch(error:any){
            console.log("request sending failed ",error.message)
            throw new Error("request not sent",error.message)
        }

    }

    // password reset
    async resetPassword(token: string, newPassword: string) {
        try{
            const record = await this.resetModel.findByToken(token);
            if (!record) throw new Error("Invalid or expired token");

            if (new Date(record.expires_at) < new Date()) {
            throw new Error("Token expired");
            }

            const hashedPassword = await bcrypt.hash(newPassword, 10);
            await this.resetModel.updatePassword(record.user_id, hashedPassword);
            await this.resetModel.deleteToken(token);

            return { message: "Password reset successful" };
        }catch(error:any){
            console.log("password reset failed",error.message)
            throw new Error("password reset failed")
        }
    }
}
