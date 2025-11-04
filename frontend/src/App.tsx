import {Routes, Route,useLocation} from "react-router-dom";
import Signup from "./pages/signuppage"; 
import Login from "./pages/login";
import UserProfile from "./pages/userProfile";
import Navbar from "./components/navbar";
import Home from "./pages/home";


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
      </Routes>

  </>
  )
}

export default App;