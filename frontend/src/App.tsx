import { Routes, Route} from "react-router-dom";
import Signup from "./pages/signuppage"; 
import Login from "./pages/login";

function App() {
  return (
    
      <Routes>
        <Route path="/" element={<h1>Home Page</h1>} />
        <Route path="/signup" element={<Signup />} />
        <Route path = "/login" element ={<Login />} />
      </Routes>

    
  );
}

export default App;