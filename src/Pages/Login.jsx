import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
const API = "https://eaducase-popx-backend.onrender.com/users";


function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const err = {};

    if (!email.trim()) {
      err.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      err.email = "Enter a valid email";
    }

    if (!password.trim()) {
      err.password = "Password is required";
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const login = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
     const res = await axios.get(
`${API}?email=${encodeURIComponent(email)}`
);

      if (res.data.length === 0) {
        alert("Account not found");
        return;
      }

      const user = res.data[0];

      if (user.password !== password) {
        alert("Incorrect Password");
        return;
      }

      localStorage.setItem("user", JSON.stringify(user));
      navigate("/account");
    } catch (err) {
      alert("Server Error");
      console.log(err);
    }
  };

 return (
  <div className="login-page">
    <div className="login-card">

      <h2>Signin to your PopX account</h2>

      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

      <form onSubmit={login}>
        <div className="input-group">
          <label>Email Address</label>

          <input
            type="email"
            placeholder="Enter email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {errors.email && (
            <span className="error">{errors.email}</span>
          )}
        </div>

        <div className="input-group">
          <label>Password</label>

          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁"}
            </button>
          </div>

          {errors.password && (
            <span className="error">{errors.password}</span>
          )}
        </div>

        <button type="submit" className="login-button">
          Login
        </button>

        <button
          type="button"
          className="back-btn"
          onClick={() => navigate("/")}
        >
          Back
        </button>
      </form>

    </div>
  </div>
);
}

export default Login;