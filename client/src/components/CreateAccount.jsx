import React, { useState } from "react";
import "./components.css";

export default function CreateAccount() {
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: replace console.log with API call to backend /users/register
        console.log("Create account:", form);
        alert("Account creation submitted (mock).");
    };

    return (
        <div className="bs-form-container">
            <h2>Create Account</h2>
            <form onSubmit={handleSubmit} className="bs-form">
                <label>
                    Name
                    <input name="name" value={form.name} onChange={handleChange} required />
                </label>
                <label>
                    Email
                    <input name="email" type="email" value={form.email} onChange={handleChange} required />
                </label>
                <label>
                    Password
                    <input name="password" type="password" value={form.password} onChange={handleChange} required />
                </label>
                <button type="submit" className="bs-btn">Create</button>
            </form>
        </div>
    );
}