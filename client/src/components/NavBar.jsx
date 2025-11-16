import React from "react";
import { Link } from "react-router-dom";
import "./components.css";

export default function NavBar({ cartCount = 0 }) {
    return (
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