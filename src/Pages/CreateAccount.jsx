import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./CreateAccount.css";
import { FiEye, FiEyeOff } from "react-icons/fi";
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

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    };

    const validate = () => {
        let err = {};

        if (!form.fullName.trim()) {
            err.fullName = "Full Name is required";
        }

        if (!form.phone.trim()) {
            err.phone = "Phone Number is required";
        } else if (!/^[0-9]{10}$/.test(form.phone)) {
            err.phone = "Phone Number must contain exactly 10 digits";
        }

        if (!form.email.trim()) {
            err.email = "Email is required";
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email)
        ) {
            err.email = "Enter a valid email";
        }

        if (!form.password.trim()) {
            err.password = "Password is required";
        } else if (form.password.length < 6) {
            err.password = "Password should be at least 6 characters";
        }

        if (!form.company.trim()) {
            err.company = "Company Name is required";
        }

        setErrors(err);

        return Object.keys(err).length === 0;
    };

    const createAccount = async (e) => {
        e.preventDefault();

        console.log("Create Account Clicked");

        if (!validate()) return;

        try {
            const emailRes = await axios.get(
                `${API}?email=${encodeURIComponent(form.email)}`
            );

            if (emailRes.data.length > 0) {
                alert("Email already registered");
                return;
            }

            const phoneRes = await axios.get(
                `${API}?phone=${encodeURIComponent(form.phone)}`
            );

            if (phoneRes.data.length > 0) {
                alert("Phone Number already registered");
                return;
            }

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

                <h2>Create your PopX account</h2>

                <form onSubmit={createAccount}>

                    <fieldset className="input-fieldset">
                        <legend>
                            Full Name <span>*</span>
                        </legend>

                        <input
                            type="text"
                            name="fullName"
                            placeholder="Marry Doe"
                            value={form.fullName}
                            onChange={handleChange}
                        />

                        {errors.fullName && (
                            <span className="error">{errors.fullName}</span>
                        )}
                    </fieldset>

                    <fieldset className="input-fieldset">
                        <legend>
                            Phone Number <span>*</span>
                        </legend>

                        <input
                            type="tel"
                            inputMode="numeric"
                            maxLength={10}
                            name="phone"
                            placeholder="MarryDoe"
                            value={form.phone}
                            onChange={handleChange}
                        />

                        {errors.phone && (
                            <span className="error">{errors.phone}</span>
                        )}
                    </fieldset>

                    <fieldset className="input-fieldset">
                        <legend>
                            Email Address <span>*</span>
                        </legend>

                        <input
                            type="email"
                            name="email"
                            placeholder="MarryDoe@gmail.com"
                            value={form.email}
                            onChange={handleChange}
                        />

                        {errors.email && (
                            <span className="error">{errors.email}</span>
                        )}
                    </fieldset>

                    <fieldset className="input-fieldset">
                        <legend>
                            Password <span>*</span>
                        </legend>

                        <div className="password-wrapper">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="********"
                                value={form.password}
                                onChange={handleChange}
                            />

                            <button
                                type="button"
                                className="toggle-password"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FiEyeOff /> : <FiEye />}
                            </button>
                        </div>

                        {errors.password && (
                            <span className="error">{errors.password}</span>
                        )}
                    </fieldset>

                    <fieldset className="input-fieldset">
                        <legend>
                            Company Name <span>*</span>
                        </legend>

                        <input
                            type="text"
                            name="company"
                            placeholder="Marry Doe"
                            value={form.company}
                            onChange={handleChange}
                        />

                        {errors.company && (
                            <span className="error">{errors.company}</span>
                        )}
                    </fieldset>

                    <div className="agency-section">
                        <p>
                            Are you an Agency?<span>*</span>
                        </p>

                        <div className="radio">
                            <label>
                                <input
                                    type="radio"
                                    name="agency"
                                    value="Yes"
                                    checked={form.agency === "Yes"}
                                    onChange={handleChange}
                                />
                                Yes
                            </label>

                            <label>
                                <input
                                    type="radio"
                                    name="agency"
                                    value="No"
                                    checked={form.agency === "No"}
                                    onChange={handleChange}
                                />
                                No
                            </label>
                        </div>
                    </div>

                    <div className="button-group">
                        <button
                            type="submit"
                            className="create-btn"
                        >
                            Create Account
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
}

export default CreateAccount;