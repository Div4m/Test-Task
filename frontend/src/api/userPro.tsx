import { UserProfileData } from "../types/userType";
import axios from "axios";

export class UserProfileApi {
    private API_Url = "http://localhost:5000/api/users/me";

    getUserProfile = async (): Promise<UserProfileData> => {
        try {
            const token = localStorage.getItem("token");
            if(!token) throw new Error("No token found")
            const response = await axios.get(`${this.API_Url}`,{
                method:"GET",
                headers:{
                    "Content-Type": "application/json",
                    Authorization:`Bearer ${token}`,
                }
            });
            return response.data.user as UserProfileData;

        }catch (error:any){
            console.log("error in fetcing user profile:", error.message);
            throw new Error(error.response?.data?.message || error.message);
        }
    }

    updateUserProfile = async (updatedData : Partial<UserProfileData>): Promise<UserProfileData> => {
        try {
            const token = localStorage.getItem("token")
            if(!token) throw new Error ("no token found");

            const response = await axios.put(`${this.API_Url}`, updatedData, {
                headers:{
                    Authorization : `Bearer ${token}`,

                }
            });
            return response.data.user as UserProfileData;

        }catch (error:any){
            console.log("error in updating user profile:", error.message);
            throw new Error (error.response?.data?.message || error.message);
        }

    }

}