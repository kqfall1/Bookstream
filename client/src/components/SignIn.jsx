import React, { useState } from "react";
import "./components.css";

export default function SignIn() {
    const [form, setForm] = useState({ email: "", password: "" });
    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: replace with real authentication call
        console.log("Sign in attempt:", form);
        alert("Sign-in submitted (mock).");
    };

    return (
        <div className="bs-form-container">
            <h2>Sign In</h2>
            <form onSubmit={handleSubmit} className="bs-form">
                <label>
                    Email
                    <input name="email" type="email" value={form.email} onChange={handleChange} required />
                </label>
                <label>
                    Password
                    <input name="password" type="password" value={form.password} onChange={handleChange} required />
                </label>
                <button type="submit" className="bs-btn">Sign In</button>
            </form>
        </div>
    );
}