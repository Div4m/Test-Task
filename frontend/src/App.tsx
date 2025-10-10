
import { BrowserRouter as Router, Routes, Route,Link } from "react-router-dom";

import Signup from "./pages/signup"; 

function App() {
  return (
    
      <Routes>
        <Route path="/" element={<h1>Home Page</h1>} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
   
    
  );
}

export default App;