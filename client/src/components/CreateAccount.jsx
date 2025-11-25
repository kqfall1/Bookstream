import { create } from '../../lib/api.crud.js';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import "../styles/components.css";

const INITIAL_STATE = {
    email: '',
    name: '',
    password: ''
}

export default function CreateAccount() {
    const navigate = useNavigate()
    const [form, setForm] = useState(INITIAL_STATE);
    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Build payload expected by the API. Use `name` if available,
            // otherwise combine firstName and lastName.
            const payload = {
                email: form.email,
                password: form.password,
                username: form.username || undefined,
                name: form.name || [form.firstName, form.lastName].filter(Boolean).join(' ') || undefined
            }

            const user = await create('/api/users/', null, payload);

            const created = user && !user.error && (
                user._id || user.id || user.email || user.message || user.success
            );

            if (!created) {
                window.alert('Your sign up was unsuccessful.');
            }
            else {
                setForm(INITIAL_STATE);
                window.alert('You have signed up successfully! Welcome aboard! Please sign in.');
                navigate('/signin')
            }
        }
        catch (err) {
            console.log(err)
            window.alert('An unexpected error occurred. Please try again later.');
        }
    };

    return (
        <div className="bs-form-centered">
            <h2>Create a Bookstream Account</h2>
            <form onSubmit={handleSubmit} className="bs-form">
                <div className="bs-form-grid">
                    <div className="bs-form-col">
                        <label>
                            First name:
                            <input name="firstName" value={form.firstName || ''} onChange={handleChange} />
                        </label>
                        <label>
                            Email:
                            <input name="email" type="email" value={form.email} onChange={handleChange} required />
                        </label>
                        <label>
                            Confirm password:
                            <input name="confirmPassword" type="password" value={form.confirmPassword || ''} onChange={handleChange} />
                        </label>
                    </div>
                    <div className="bs-form-col">
                        <label>
                            Last name:
                            <input name="lastName" value={form.lastName || ''} onChange={handleChange} />
                        </label>
                        <label>
                            Password:
                            <input name="password" type="password" value={form.password} onChange={handleChange} required />
                        </label>
                        <label>
                            Username:
                            <input name="username" value={form.username || ''} onChange={handleChange} />
                        </label>
                    </div>
                </div>

                <button type="submit" className="bs-hero-cta primary">Create Account</button>
            </form>
        </div>
    );
}