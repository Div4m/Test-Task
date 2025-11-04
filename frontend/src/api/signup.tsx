import axios from "axios";
import { SignupData } from "../types/userType";

export class signupUser {
  private API_Url = "http://localhost:5000/api/signup";

  signup = async (data: SignupData) => {
    try {
      const response = await axios.post(`${this.API_Url}`, data);
      return response.data;

    }
    catch (error:any){
      throw new Error(error.response?.data?.message || "Signup failed")
    }
  };
};

