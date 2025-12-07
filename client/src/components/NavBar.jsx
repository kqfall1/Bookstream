import auth from '../../lib/auth.helpers.js'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { signOut } from '../../lib/api.auth.js'
import { useEffect, useState } from 'react';
import { useCart } from '../../lib/cart.context.jsx'
import "../styles/NavBar.css";

export default function NavBar({ onCartClick }) {
    const location = useLocation();
    const navigate = useNavigate();
    const [session, setSession] = useState(auth.isAuthenticated());

    /** Updates the state of the component each time the route changes. */
    useEffect(() => { setSession(auth.isAuthenticated()) }, [location])

    const { items } = useCart()

    return (
        <nav className="bs-nav">
            <div className="bs-nav-wrapper">
                <div className="bs-nav-left">
                    <div className="bs-logo-box">
                        <img src="/assets/bookstream.jpeg" alt="Bookstream logo" className="bs-logo-img" />
                    </div>
                    <Link to="/" className="bs-title">Bookstream</Link>
                </div>
                <div className="bs-nav-right">
                    <Link to="/browse" className="bs-link">Browse</Link>
                    {/* Always show My Account. If user is not signed in, take them to Sign In page */}
                    <Link to={session ? "/account" : "/signin"} className="bs-link">My Account</Link>

                    {session ? (
                        <a onClick={async (e) => {
                            await signOut()
                            setSession(auth.isAuthenticated())
                            navigate('/')
                        }} className="bs-link bs-link-clickable">Sign Out</a>
                    ) : (
                        <>
                            <Link to="/signin" className="bs-link">Sign In</Link>
                            <Link to="/signup" className="bs-link">Sign Up</Link>
                        </>
                    )}

                    {session && (
                        <button onClick={onCartClick} className="bs-link bs-link-clickable" style={{ background: 'none', border: 'none', font: 'inherit', cursor: 'pointer', fontWeight: 'bold' }}>
                            Cart {items?.length > 0 && <span className="bs-cart-count">{items.length}</span>}
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
}