import React from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import {Dashboard} from "./components/Dashboard";
import {Employee} from "./components/Employee";
import EmployeeDetails from "./components/EmployeeDetails"
function App(){
  
  return (
  
  <>
  
  <Navbar />
    <Routes>
      <Route path = "/employees/:id" element ={<EmployeeDetails />}/>
      <Route path="/employees" element={<Employee />} />
      <Route path="/" element={<Dashboard />} />
    </Routes>
  
  </>

);
}
export default App;


