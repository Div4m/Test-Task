import { useEmployees } from './useEmployee'
import {Link} from "react-router-dom"



export function Employee(){
  const employees = useEmployees();

    return(
   
      <div>
      <h1>Employees List</h1>
      <table style={{border:"1px solid black" ,borderCollapse: "collapse" , width: "100%"}}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
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




