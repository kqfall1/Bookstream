// Bookstream/client/src/components/Navbar.jsx

import React from 'react';

const Navbar = () => {
    return (
        <nav className="navbar">
            <h1>Bookstream</h1>
            <div className="nav-links">
                <a href="/books">Books</a>
                <a href="/cart">Cart</a>
                <a href="/signin">Sign In</a>
            </div>
        </nav>
    );
};

export default Navbar;