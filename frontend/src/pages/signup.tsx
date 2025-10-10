import React,{useState} from "react";
import {SignupData} from "../types/userType";
import { signupUser } from "../api/signup";


const Signup = () =>{
    const [formData,setFormData] = useState<SignupData>({
        profile_pic:"",
        first_name:"",
        last_name: "",
        email : "",
        password: "",
        country_code: "",
        phone:""
    });

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    };
    const handleSignup = async (e:React.FormEvent)=>{
        e.preventDefault();
    try{
        const res = await signupUser(formData);
        alert(res.data.message || "Signup SucessFul!");
        setFormData({profile_pic:"" ,first_name:"",last_name:"",email:"",password:"",country_code:"",phone:""});

    }catch(error:any){
        alert(error.response?.data?.message || "Signup failed");
    }
    };

    return (
    <div style={{ maxWidth: 400, margin: "50px auto", padding: 20, border: "1px solid #1a1919ff", borderRadius: 10 }}>
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          name="first_name"
          placeholder="First Name"
          value={formData.first_name}
          onChange={handleChange}
          required
        />
        <br /><br />
        <input
          type="text"
          name="last_name"
          placeholder="Last Name"
          value={formData.last_name}
          onChange={handleChange}
        />
        <br /><br />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <br /><br />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <br /><br />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup

