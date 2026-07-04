import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AccountSettings.css";
import { FaCamera } from "react-icons/fa";
import { FiArrowLeft, FiHome } from "react-icons/fi";

function AccountSettings() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("user");
    if (!data) { navigate("/login"); return; }
    setUser(JSON.parse(data));
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  if (!user) return null;

  return (
    <div className="account-page">
      <div className="account-card">

        <div className="account-header">
          <button className="nav-back-btn" onClick={() => navigate(-1)} aria-label="go back">
            <FiArrowLeft size={16} />
          </button>
          <h2>Account Settings</h2>
          <button className="nav-home-btn" onClick={() => navigate("/")} aria-label="go home">
            <FiHome size={16} />
          </button>
        </div>

        <div className="profile-section">
          <div className="profile-image">
            <img src="https://i.pravatar.cc/150?img=32" alt="Profile" />
            <div className="camera-icon">
              <FaCamera size={9} />
            </div>
          </div>
          <div className="profile-details">
            <h3>{user.fullName}</h3>
            <p>{user.email}</p>
          </div>
        </div>

        <div className="dashed-line"></div>

        <div className="about-section">
          <p>
            Lorem Ipsum Dolor Sit Amet, Consetetur Sadipscing Elitr,
            Sed Diam Nonumy Eirmod Tempor Invidunt Ut Labore Et Dolore
            Magna Aliquyam Erat, Sed Diam.
          </p>
        </div>

        <div className="dashed-line"></div>

        <div className="empty-space"></div>

        <div className="dashed-line"></div>

        <div className="button-group">
          <button className="primary-btn" onClick={logout}>Logout</button>
        </div>

      </div>
    </div>
  );
}

export default AccountSettings;