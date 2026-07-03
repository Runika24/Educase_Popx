import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
const API = "https://eaducase-popx-backend.onrender.com/users";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);

  // Enable the button only when both fields have content
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
        { timeout: 15000 } // render.com free tier can cold-start slowly
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
      if (err.code === "ECONNABORTED") {
        alert("Server is waking up, please try again in a few seconds");
      } else {
        alert("Server Error");
      }
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>
          Signin to your <br /> PopX account
        </h2>

        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,</p>

        <form onSubmit={login}>
          <fieldset className="input-fieldset">
            <legend>Email Address</legend>
            <input
              type="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </fieldset>
          {errors.email && <span className="error">{errors.email}</span>}

          <fieldset className="input-fieldset">
            <legend>Password</legend>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </fieldset>
          {errors.password && (
            <span className="error">{errors.password}</span>
          )}

          <button
            type="submit"
            className="login-button"
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