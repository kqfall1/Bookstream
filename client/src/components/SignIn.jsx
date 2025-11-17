import auth from '../../lib/auth.helpers.js'
import { signIn } from '../../lib/api.auth.js'
import { useNavigate } from 'react-router-dom' 
import { useState } from "react";
import "../styles/components.css";

const INITAL_STATE = {
    email: '', 
    password: ''
}

export default function SignIn() {
    const navigate = useNavigate()
    const [form, setForm] = useState(INITAL_STATE);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            await signIn(form)

            if (auth.isAuthenticated()) {
                setForm(INITAL_STATE)
                window.alert('Successfully signed in.')
                navigate('/')
            }
            else {
                window.alert('You have entered invalid credentials.')
            }
        }
        catch (err) {
            console.log(err)
            window.alert("An unexpected error occurred. Please try again later.")
        }
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