const [employees,setEmployee] = useState<Emp[]>([
        {id:1,name:"Dev",email:"dev2@gmail.com",dep:"Analytics"},
        {id:12,name:"Naman",email:"naman1@gmail.com",dep:"Finance"},
        {id:23,name:"Rahul",email:"rahul4@gmail.com",dep:"IT"},
        {id:34,name:"Shiv",email:"shiv@gamil.com",dep:"BDE"},
        {id:45,name:"Dharam",email:"dharam9@gmail.com",dep:"Marketing"},
        {id:56,name:"Ram",email:"ram32@gamil.com",dep:"QA"},
    ]);


    
// Navbar file :-
    


import {Link} from "react-router-dom";

 export default function Navbar(){
    return(

        
    <nav style={{ padding: "10px", display: "flex" ,background: "#212020ff" }}>
        <ul>
            <li>
                <Link to="/employees">Employees</Link>
            </li>
            <li>
                <Link to="/">Dashboard</Link>
            </li>
        </ul>
    </nav>
    );
}


// Dashboard.tsx:-
import {Employee} from "./Employee"

export function Dashboard(){
    return(
        <div>
            
            <h1>DashBoard</h1>
            <Employee/>
        </div>
    )
}

// export function EmployeeCard({employees}:{employees:Emp}){
//     return(
//     <div
//          style={{
//         border: "1px solid #201c1cff",
//         borderRadius: "8px",
//         padding: "16px",
//         margin: "12px",
//         width: "250px",
//          }}>

//         <h2>{employees.name}</h2>
//         <p><b>ID:</b>{employees.id}</p>
//            <p><b>Name:</b>{employees.name}</p>
//         <p><b>Email:</b>{employees.email}</p>
//         <p><b>Department:</b>{employees.dep}</p>
//     </div>

//     );
// }


// Employee.tsx:-

import {useState,useEffect} from  'react'

import {Link} from "react-router-dom"

interface Emp {
    id :number;
    name:string;
    email:string;
    dep:string;
}


export function Employee(){
  

  const [employees,setEmployee] = useState<Emp[]>([]);
    
  useEffect(()=>{
    const data:Emp[]=[
       {id:1,name:"Dev",email:"dev2@gmail.com",dep:"Analytics"},
        {id:12,name:"Naman",email:"naman1@gmail.com",dep:"Finance"},
        {id:23,name:"Rahul",email:"rahul4@gmail.com",dep:"IT"},
        {id:34,name:"Shiv",email:"shiv@gamil.com",dep:"BDE"},
        {id:45,name:"Dharam",email:"dharam9@gmail.com",dep:"Marketing"},
        {id:56,name:"Ram",email:"ram32@gamil.com",dep:"QA"},
    ];
    setEmployee(data);
  },[]);


    return(
      <div>
      <h1>Employees List</h1>
      <table style={{border:"1px solid black" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>email</th>
            <th>dep</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.dep}</td>
              <td>
                <Link to={`/employees/${emp.id}`}>
                <button>View</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    );
}


// export function EmployeeCard({employees}:{employees:Emp}){
//     return(
//     <div
//          style={{
//         border: "1px solid #201c1cff",
//         borderRadius: "8px",
//         padding: "16px",
//         margin: "12px",
//         width: "250px",
//          }}>

//         <h2>{employees.name}</h2>
//         <p><b>ID:</b>{employees.id}</p>
//         <p><b>Email:</b>{employees.email}</p>
//         <p><b>Department:</b>{employees.dep}</p>
//     </div>

//     );
// }

