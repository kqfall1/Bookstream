import auth from '../../lib/auth.helpers.js'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { signOut } from '../../lib/api.auth.js'
import { useEffect, useState } from 'react';
import "./components.css";

export default function NavBar({ cartCount = 0 }) {
    const location = useLocation();
    const navigate = useNavigate();
    const [session, setSession] = useState(auth.isAuthenticated());

    /** Updates the state of the component each time the route changes. */
    useEffect(() => {setSession(auth.isAuthenticated())}, [location])

    return (session ? 
        <nav className="bs-nav">
            <div className="bs-nav-left">
                <Link to="/" className="bs-logo">Bookstream</Link>
            </div>
            <div className="bs-nav-right">
                <a onClick={async (e) => {
                    await signOut()
                    setSession(auth.isAuthenticated())
                    navigate('/')
                }}>Sign Out</a>
                <Link to="/cart" className="bs-link">
                    Cart {cartCount > 0 && <span className="bs-cart-count">{cartCount}</span>}
                </Link>
            </div>
        </nav>
        :
        <nav className="bs-nav">
            <div className="bs-nav-left">
                <Link to="/" className="bs-logo">Bookstream</Link>
            </div>
            <div className="bs-nav-right">
                <Link to="/signin" className="bs-link">Sign In</Link>
                <Link to="/signup" className="bs-link">Create Account</Link>
                <Link to="/cart" className="bs-link">
                    Cart {cartCount > 0 && <span className="bs-cart-count">{cartCount}</span>}
                </Link>
            </div>
        </nav>
    );
}