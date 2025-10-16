import {useState} from "react";
import {SignupData} from "../types/userType";
import { signupUser } from "../api/signup";
import { useNavigate } from "react-router-dom";
import "../css/signup.css";


const Signup = () =>{
    const navigate =useNavigate();
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
   <div className="signup-container">
      <h2>Sign Up</h2>
      <form className="signup-form" onSubmit={handleSignup}>
        <input
          type="text"
          name="first_name"
          placeholder="First Name"
          value={formData.first_name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="last_name"
          placeholder="Last Name"
          value={formData.last_name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <div className="phone-wrapper">
          <input
            type="text"
            name="country_code"
            placeholder="+91"
            value={formData.country_code}
            onChange={handleChange}
            required
            className="country-code"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
            className="phone-number"
          />
        </div>
        <button type="submit">Sign Up</button>
        
        
      </form>
       <p style={{ textAlign: "center", marginTop: "10px" }}>
        Already have an account?
        <button
          style={{
            color: "#007bff",
            border: "none",
            background: "none",
            cursor: "pointer"
          }}
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      </p>
    </div>
  );
}
export default Signup;

