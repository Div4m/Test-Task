import { useParams } from "react-router-dom";
import { useEmployees } from "./useEmployee";

function EmployeeDetials(){
    const {id} = useParams<{ id:string }>();
    const employees = useEmployees();
    const employee = employees.find(emp => emp.id === Number(id));

    if (!employee) {
        return <h2>Employee not found</h2>;
    }

    return (
    <div>
      <h2>Details of Employee {employee.id}</h2>
      <p><b>Name:</b> {employee.name}</p>
      <p><b>Email:</b> {employee.email}</p>
      <p><b>Department:</b> {employee.dep}</p>
    </div>
  );
}
export default EmployeeDetials