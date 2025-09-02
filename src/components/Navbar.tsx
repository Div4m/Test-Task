import {Link} from "react-router-dom";

 export default function Navbar(){
    return(

    <nav style={{ padding: "10px", display: "flex" ,background: "#111010ff" }}>
        <ul style={{ display: "flex", gap: "20px", listStyle: "none" }}>
            <li>
                <Link to="/employees"  style={{ color: "white", textDecoration: "none" }}>Employees</Link>
            </li>
            <li>
                <Link to="/"  style={{ color: "white", textDecoration: "none" }}>Dashboard</Link>
            </li>
        </ul>
    </nav>
    );
}


