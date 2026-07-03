import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AccountSettings.css";
import { FaCamera } from "react-icons/fa";

function AccountSettings() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("user");

    if (!data) {
      navigate("/login");
      return;
    }

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
        <h2>Account Settings</h2>
      </div>

      <div className="profile-section">
        <div className="profile-image">
          <img
            src="https://i.pravatar.cc/150?img=32"
            alt="profile"
          />

          <div className="camera-icon">
            <FaCamera />
          </div>
        </div>

        <div className="profile-details">
          <h3>{user.fullName}</h3>
          <p>{user.email}</p>
          <span>{user.company}</span>
        </div>
      </div>

      <div className="about-section">
        <p>
          Lorem Ipsum Dolor Sit Amet, Consetetur Sadipscing Elitr,
          Sed Diam Nonumy Eirmod Tempor Invidunt Ut Labore Et Dolore
          Magna Aliquyam Erat, Sed Diam.
        </p>
      </div>

      <div className="info-box">
        <div className="row">
          <span>Phone</span>
          <strong>{user.phone}</strong>
        </div>

        <div className="row">
          <span>Agency</span>
          <strong>{user.agency}</strong>
        </div>
      </div>

      <button
        className="logout-btn"
        onClick={logout}
      >
        Logout
      </button>

    </div>
  </div>
);
}

export default AccountSettings;