import { Link } from 'react-router-dom';
import auth from '../../lib/auth.helpers.js';
import BookCard from "./BookCard";
import { normalizeBook } from "../../lib/helpers.js"
import { list } from "../../lib/api.crud";
import { useCart } from '../../lib/cart.context'
import Toast from './Toast';
import { useState, useEffect } from "react";
import "../styles/Homepage.css";

export default function Homepage() {
    const [books, setBooks] = useState([]);
    const { items: cart, addItem, notification, clearNotification } = useCart();
    const isAuthenticated = auth.isAuthenticated();

    useEffect(() => {
        const controller = new AbortController();

        const fetchBooks = async () => {
            try {
                const data = await list("/api/books/", controller.signal);

                if (!Array.isArray(data)) {
                    window.alert("Failed to fetch books!");
                }
                else {
                    const apiBooks = await Promise.all(data.map(normalizeBook));

                    const allowedCategories = new Set(['Adventure', 'Business', 'Children', 'Fantasy', 'Fiction', 'Mystery'].map(c => c.toLowerCase()));
                    const baseBooks = apiBooks
                        .filter(b => allowedCategories.has((b?.category || '').toLowerCase()))
                        .sort((a, b) => (a.title || '').localeCompare(b.title || ''));

                    // Show the same set as browse (all allowed categories). Limit to 18 to keep layout tidy.
                    setBooks(baseBooks.slice(0, 18));
                }
            }
            catch (err) {
                if (err.name === "AbortError") {
                    console.log("Fetch aborted: component unmounted or re-rendered.");
                }
                else {
                    console.error("Fetch error:", err);
                    setBooks([]);
                }
            }
        }

        fetchBooks();
        return () => controller.abort();
    }, [])

    return (
        <>
            <Toast
                message={notification?.message}
                type={notification?.type}
                onClose={clearNotification}
            />
            <div className="bs-homepage">
                <div className="bs-welcome-section">
                    {isAuthenticated ? (
                        <>
                            <h1 className="bs-welcome-title">Welcome back!</h1>
                            <div className="bs-welcome-buttons">
                                <Link to="/browse" className="bs-welcome-btn">Browse</Link>
                                <Link to="/account" className="bs-welcome-btn">My Account</Link>
                                <Link to="/" onClick={() => {
                                    // Sign out logic handled in NavBar
                                }} className="bs-welcome-btn">Sign Out</Link>
                            </div>
                        </>
                    ) : (
                        <>
                            <h1 className="bs-welcome-title">Welcome!</h1>
                            <p className="bs-welcome-desc">
                                Discover your next great read with Bookstream.
                                We're dedicated to connecting readers with books they'll love,
                                offering a curated collection across all genres.
                                Join our community today and start building your digital library!
                            </p>
                            <Link to="/signup" className="bs-welcome-btn bs-join-btn">Join Bookstream</Link>
                        </>
                    )}
                    <div className="bs-promotion-banner">
                        <p>Promotion Banner</p>
                    </div>
                </div>

                <div className="bs-books-section">
                    <div className="bs-books-grid-home">
                        {books?.length > 0 ? (
                            books.map((b) => (
                                <BookCard key={b._id || b.id} book={b} onAddToCart={addItem} />
                            ))
                        ) : (
                            <p>No books available.</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
