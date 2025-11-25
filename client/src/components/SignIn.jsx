import auth from '../../lib/auth.helpers.js'
import { signIn } from '../../lib/api.auth.js'
import { useNavigate, Link } from 'react-router-dom'
import { useState } from "react";
import "../styles/Form.css";
import "../styles/UserAccountForm.css";

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
            const data = await signIn(form)

            // If API returned an error message, surface it to the user
            if (data && data.error) {
                window.alert(data.error)
                return
            }

            // If the API returned a token it should have been stored by api.auth
            if (data && data.token && auth.isAuthenticated()) {
                setForm(INITAL_STATE)
                window.alert('Successfully signed in.')
                navigate('/')
            } else {
                // Fall back to a generic message if no token was returned
                window.alert(data?.message || 'You have entered invalid credentials.')
            }
        }
        catch (err) {
            console.log(err)
            window.alert("An unexpected error occurred. Please try again later.")
        }
    };

    return (
        <div className="bs-form-centered">
            <h2>Sign In to Bookstream</h2>
            <form onSubmit={handleSubmit} className="bs-form">
                <div className="bs-form-grid">
                    <div className="bs-form-col">
                        <label>
                            Email:
                            <input name="email" type="email" value={form.email} onChange={handleChange} required />
                        </label>
                    </div>
                    <div className="bs-form-col">
                        <label>
                            Password:
                            <input name="password" type="password" value={form.password} onChange={handleChange} required />
                        </label>
                    </div>
                </div>
                <button type="submit" className="bs-hero-cta primary">Sign In</button>
                <p style={{ textAlign: 'center', marginTop: 16 }}>
                    Don't have an account? <Link to="/signup">Create one</Link>
                </p>
            </form>
        </div>
    );
}