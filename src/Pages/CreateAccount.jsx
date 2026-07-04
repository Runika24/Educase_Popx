import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FiEye, FiEyeOff, FiArrowLeft, FiHome } from "react-icons/fi";
import "./CreateAccount.css";

const API = "https://eaducase-popx-backend.onrender.com/users";

function CreateAccount() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        fullName: "",
        phone: "",
        email: "",
        password: "",
        company: "",
        agency: "Yes",
    });

    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const validate = () => {
        let err = {};
        if (!form.fullName.trim()) err.fullName = "Full Name is required";
        if (!form.phone.trim()) {
            err.phone = "Phone Number is required";
        } else if (!/^[0-9]{10}$/.test(form.phone)) {
            err.phone = "Must be exactly 10 digits";
        }
        if (!form.email.trim()) {
            err.email = "Email is required";
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email)) {
            err.email = "Enter a valid email";
        }
        if (!form.password.trim()) {
            err.password = "Password is required";
        } else if (form.password.length < 6) {
            err.password = "Min 6 characters";
        }
        if (!form.company.trim()) err.company = "Company Name is required";
        setErrors(err);
        return Object.keys(err).length === 0;
    };

    const createAccount = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        try {
            const emailRes = await axios.get(`${API}?email=${encodeURIComponent(form.email)}`);
            if (emailRes.data.length > 0) { alert("Email already registered"); return; }
            const phoneRes = await axios.get(`${API}?phone=${encodeURIComponent(form.phone)}`);
            if (phoneRes.data.length > 0) { alert("Phone Number already registered"); return; }
            await axios.post(API, form);
            alert("Account Created Successfully");
            navigate("/login");
        } catch (error) {
            console.error(error);
            alert("Server Error");
        }
    };

    return (
        <div className="create-page">
            <div className="create-container">

                <div className="page-nav">
                    <button
                        className="nav-back-btn"
                        onClick={() => navigate(-1)}
                        aria-label="go back"
                    >
                        <FiArrowLeft size={14} />
                    </button>

                    <h5 className="page-title">Create your PopX account</h5></div>

                <form onSubmit={createAccount}>

                    <div className={`outlined-field${form.fullName ? " has-value" : ""}${errors.fullName ? " field-error" : ""}`}>
                        <input id="ca-name" type="text" name="fullName" value={form.fullName} onChange={handleChange} placeholder=" " />
                        <label htmlFor="ca-name">Full Name <span className="req">*</span></label>
                        {errors.fullName && <span className="field-helper error">{errors.fullName}</span>}
                    </div>

                    <div className={`outlined-field${form.phone ? " has-value" : ""}${errors.phone ? " field-error" : ""}`}>
                        <input id="ca-phone" type="tel" inputMode="numeric" maxLength={10} name="phone" value={form.phone} onChange={handleChange} placeholder=" " />
                        <label htmlFor="ca-phone">Phone Number <span className="req">*</span></label>
                        {errors.phone && <span className="field-helper error">{errors.phone}</span>}
                    </div>

                    <div className={`outlined-field${form.email ? " has-value" : ""}${errors.email ? " field-error" : ""}`}>
                        <input id="ca-email" type="email" name="email" value={form.email} onChange={handleChange} placeholder=" " />
                        <label htmlFor="ca-email">Email Address <span className="req">*</span></label>
                        {errors.email && <span className="field-helper error">{errors.email}</span>}
                    </div>

                    <div className={`outlined-field${form.password ? " has-value" : ""}${errors.password ? " field-error" : ""}`}>
                        <input id="ca-password" type={showPassword ? "text" : "password"} name="password" value={form.password} onChange={handleChange} placeholder=" " />
                        <label htmlFor="ca-password">Password <span className="req">*</span></label>
                        <button type="button" className="field-eye-btn" onClick={() => setShowPassword(!showPassword)} tabIndex={-1}>
                            {showPassword ? <FiEyeOff size={15} /> : <FiEye size={15} />}
                        </button>
                        {errors.password && <span className="field-helper error">{errors.password}</span>}
                    </div>

                    <div className={`outlined-field${form.company ? " has-value" : ""}${errors.company ? " field-error" : ""}`}>
                        <input id="ca-company" type="text" name="company" value={form.company} onChange={handleChange} placeholder=" " />
                        <label htmlFor="ca-company">Company Name <span className="req">*</span></label>
                        {errors.company && <span className="field-helper error">{errors.company}</span>}
                    </div>

                    <div className="agency-section">
                        <p className="agency-label">Are you an Agency? <span className="req">*</span></p>
                        <div className="radio-row">
                            <label className="radio-label">
                                <input type="radio" name="agency" value="Yes" checked={form.agency === "Yes"} onChange={handleChange} />
                                <span className="radio-circle"></span>
                                Yes
                            </label>
                            <label className="radio-label">
                                <input type="radio" name="agency" value="No" checked={form.agency === "No"} onChange={handleChange} />
                                <span className="radio-circle"></span>
                                No
                            </label>
                        </div>
                    </div>

                    <div className="button-group">
                        <button type="submit" className="primary-btn">Create Account</button>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default CreateAccount;