import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
    const location = useLocation();
    
    return (
        <nav className="navbar">
            <div className="container">
                <div className="flex items-center justify-between" style={{ padding: "var(--spacing-4) 0" }}>
                    <Link to="/" className="navbar-brand">
                        Employee Management
                    </Link>
                    <ul className="navbar-nav">
                        <li>
                            <Link 
                                to="/" 
                                className={location.pathname === "/" ? "active" : ""}
                            >
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to="/employees" 
                                className={location.pathname === "/employees" ? "active" : ""}
                            >
                                Employees
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}


