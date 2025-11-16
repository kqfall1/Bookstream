import { create } from '../../lib/api.crud.js'; 
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
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
            const user = await create('/api/users/', null, form);

            if (!user || user.error) {
                window.alert('Your sign up was unsuccessful.');
            }
            else {
                setForm(INITIAL_STATE);
                window.alert('You have signed up successfully! Welcome aboard!');
                navigate('/')
            }
        }
        catch (err) {
            console.log(err)
            window.alert('An unexpected error occurred. Please try again later.');
        }
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