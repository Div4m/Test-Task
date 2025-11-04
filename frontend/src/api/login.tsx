import axios from "axios";
import { LoginData } from "../types/userType";


export class loginUser{
    private API_Url = "http://localhost:5000/api/login";

    login = async(data:LoginData)=>{
        try{
            const response = await axios.post(`${this.API_Url}`,data);
            return response.data;

        }
        catch(error:any){
            throw new Error(error.response?.data?.message || "Login failed");
        }
    };
}