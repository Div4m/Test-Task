import axios from "axios";

export class TaskService{
    private API_Url = "http://localhost:5000/api/task/";
    // create a task 
    create = async(data:any)=>{
        try{
            const response = await axios.post(this.API_Url,data);
            return response.data;
        }
        catch(error:any){
            throw new Error(error.response?.data?.message || "task creation is unsucessfull");
        }
    }
    // update a task 
    update =  async(id:string,data:any)=>{
        try{
            
        }
    }
}