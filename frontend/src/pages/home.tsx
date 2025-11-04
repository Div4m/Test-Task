import { useNavigate } from "react-router-dom";
import "../css/home.css";

const Home = () => {
    const navigate = useNavigate();
    return (
        <div className ="home">
            <section className = "main" >
            
                <h1>Welcome to <strong>Karyon</strong></h1>
                <p>Here is your task manager ! Now your own Karya-On to manage your tasks,save time and boost your Productivity  </p>
                <div className= "cta-buttons">
                    <button onClick={() => navigate("/signup")}>Signup</button>
                    <button onClick={()=> navigate("/login")}>Login</button>
                </div>
            </section>
            
            <section className = "features">
                <h2>Why Karyon?</h2>
                <div className= "feature-grid">
                    <div className= "feature-card">
                        <h3>Task Organizor</h3>
                        <p>
                            You can easily organize your tasks as per your priority and deadlines.
                        </p>
                    </div>
                    <div className ="feature-card">
                        <h3>Productivity Booster</h3>
                        <p>
                            Boost your productivity with your own task manager and stay ahead.
                        </p>
                    </div>
                    <div className = "feature-card">
                        <h3>Track Your Progress</h3>
                        <p>
                            Users can track their task completion progress and history of their tasks.
                        </p>
                    </div>
                </div>
            </section>
            <div className="footer">
                <p>&copy; 2025 Karyon. All rights reserved.</p>
            </div>

        </div>
    )
}
export default Home;