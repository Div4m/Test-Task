import {Link, useNavigate} from 'react-router-dom';
import "../css/navbar.css";


const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    }
    return (
        <nav className="navbar">
            <div className='navbar-left'>
            <img src = "website.png" alt=" web logo "className='logo-img'/>
            <h2 className='logo'>Karyon</h2>
            </div>
            <ul className="navbar-links">
                <li><Link to = "/">Home</Link></li>
                <li>
                    <Link to = "/dashboard">Dashboard</Link>
                </li>
                <li>
                    <Link to = "/profile">Profile</Link>
                </li>
            </ul>
            <div className="navbar-right">
                <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </div>
        </nav>

    )
};
export default Navbar;