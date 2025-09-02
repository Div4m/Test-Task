import {useEmployees} from "./useEmployee"

export function Dashboard(){
    const employees = useEmployees();

    return(
        <div style= {{padding:"100px"}}>
            
            <h1>DashBoard</h1>
            <p>Total Employees : {employees.length}</p>
        </div>
    )
}
