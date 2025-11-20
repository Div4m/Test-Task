import axios from "axios";

export class PasswordService{
    private API_Url = "http://localhost:5000/api/password-reset";

    request = async(email:string)=>{
        try{
            const response = await axios.post(`${this.API_Url}/request`,{email});

            return response.data;
        }catch(error:any){
            throw new Error (error.response?.data?.error||"Request failed");

        }

    }
    resetPassword = async (token: string, newPassword: string) => {
    try {
      const response = await axios.post(`${this.API_Url}/reset`, { token, newPassword });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || "Password reset failed");
    }
  };
}
