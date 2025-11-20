import {Routes, Route,useLocation} from "react-router-dom";
import Signup from "./pages/signuppage"; 
import Login from "./pages/login";
import UserProfile from "./pages/userProfile";
import Navbar from "./components/navbar";
import Home from "./pages/home";
import ForgetPassword from "./pages/forgetPage";
import PasswordReset from "./pages/passResetPage";


function App(){
  const location = useLocation();

  const token = localStorage.getItem("token");

  const hideNavbarPaths = ["/signup","/login"];

  const shouldHideNavbar = hideNavbarPaths.includes(location.pathname);

  return(
  <>

    {!shouldHideNavbar && token && <Navbar />}
      <Routes>
        <Route path ="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path = "/login" element ={<Login />} />
        <Route path="/profile" element={<UserProfile />}/>
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path = "/password-reset/:token" element ={<PasswordReset />} />
      </Routes>

  </>
  )
}

export default App;