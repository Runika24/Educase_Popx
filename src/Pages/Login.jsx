import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FiEye, FiEyeOff, FiArrowLeft, FiHome } from "react-icons/fi";
import "./Login.css";

const API = "https://eaducase-popx-backend.onrender.com/users";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setIsValid(email.trim().length > 0 && password.trim().length > 0);
  }, [email, password]);

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

    setLoading(true);
    try {
      const res = await axios.get(
        `${API}?email=${encodeURIComponent(email)}`,
        { timeout: 15000 }
      );
      if (res.data.length === 0) { alert("Account not found"); return; }
      const user = res.data[0];
      if (user.password !== password) { alert("Incorrect Password"); return; }
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/account");
    } catch (err) {
      if (err.code === "ECONNABORTED") {
        alert("Server is waking up, please try again in a few seconds");
      } else {
        alert("Server Error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">

      <div className="page-nav">
  <button
    className="nav-back-btn"
    onClick={() => navigate(-1)}
    aria-label="go back"
  >
    <FiArrowLeft size={16} />
  </button>

  <h2 className="signin-heading">Signin to your PopX account</h2>
</div>

<p className="signin-description">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
</p>

        <form onSubmit={login}>

          <div className={`outlined-field${email ? " has-value" : ""}${errors.email ? " field-error" : ""}`}>
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder=" "
            />
            <label htmlFor="login-email">Email Address</label>
            {errors.email && <span className="field-helper error">{errors.email}</span>}
          </div>

          <div className={`outlined-field${password ? " has-value" : ""}${errors.password ? " field-error" : ""}`}>
            <input
              id="login-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=" "
            />
            <label htmlFor="login-password">Password</label>
            <button
              type="button"
              className="field-eye-btn"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
            >
              {showPassword ? <FiEyeOff size={15} /> : <FiEye size={15} />}
            </button>
            {errors.password && <span className="field-helper error">{errors.password}</span>}
          </div>

          <button
            type="submit"
            className="primary-btn"
            disabled={!isValid || loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default Login;