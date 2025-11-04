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
    //const [profilePic,setProfilePic] = useState<File | null>(null);
    const [error,setError] = useState<string | null>(null);

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    };
    // const handleFileChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    //   const file = e.target.files?.[0];
    //   if(file){
    //     setProfilePic(file);
    //   }
    // };
    const handleSignup = async (e:React.FormEvent)=>{
        e.preventDefault();
        setError(null);
    const api =  new signupUser();
    try{

        // const formDataToSend = new FormData();
        // formDataToSend.append("first_name",formData.first_name);
        // formDataToSend.append("last_name",formData.last_name || "");
        // formDataToSend.append("email",formData.email);
        // formDataToSend.append("password",formData.password);
        // formDataToSend.append("country_code",formData.country_code|| "");
        // formDataToSend.append("phone",formData.phone || "");
        // if(profilePic) formDataToSend.append("profile_pic",profilePic);
        const res = await api.signup(formData);

        alert(res.message || "Signup SucessFul!");
        setFormData({profile_pic:"" ,first_name:"",last_name:"",email:"",password:"",country_code:"",phone:""});

    }catch(error:any){
        setError(error.response?.data?.message || "Signup failed");
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
            placeholder="+"
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
        {error && <p className="signup-error">{error}</p>}
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

