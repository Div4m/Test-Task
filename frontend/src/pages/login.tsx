import {useState} from "react";
import { loginUser } from "../api/login";
import { LoginData } from "../types/userType";
import { useNavigate } from "react-router-dom";
import "../css/login.css"

const  Login=() => {
    const navigate = useNavigate();
    const [form,setFormData] = useState<LoginData>({email:"",password:""});
    const[error,setError] = useState<string|null>(null);
    const [loading,setLoading] = useState(false);

    const loginuser= new loginUser();

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setFormData({...form,[e.target.name]:e.target.value})
    }
    const handleSubmit = async(e: React.FormEvent) =>{
        e.preventDefault();
        setError(null);
        setLoading(true);
        try{
            const res = await loginuser.login(form);
            console.log("Login success:",res);
            localStorage.setItem("token",res.token);
        }
        catch(error:any){
            setError(error.message)
        }
    };
   return (
    <div className="login-container">
      <div className="login-card">
        <h1>Login</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          {error && <p className="login-error">{error}</p>}
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="login-footer">
          Don't have an account? { ' '}
          <button
          style={{
            color :"#007bff",
            border :"none",
            background :"none",
            cursor:"pointer"
          }}onClick={() => navigate("/signup")}
          >
            SignUp
          </button>
        </div>
      </div>
    </div>
  );
}
export default Login