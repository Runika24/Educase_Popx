import "./Welcome.css";
import { useNavigate } from "react-router-dom";
import illustration from "./onboarding-illustration.svg";

function Welcome() {
    const navigate = useNavigate();

    return (
        <div className="welcome-page">
            <div className="welcome-card">
                <div className="illustration-area">
                    <img src={illustration} alt="" />
                </div>

                <div className="bottom-content">
                    <h1>Welcome to PopX</h1>
                    <p>
                        Lorem ipsum dolor sit amet,
                        <br />
                        consectetur adipiscing elit,
                    </p>

                    <button className="create-btn" onClick={() => navigate("/create")}>
                        Create Account
                    </button>
                    <button className="login-btn" onClick={() => navigate("/login")}>
                        Already Registered? Login
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Welcome;