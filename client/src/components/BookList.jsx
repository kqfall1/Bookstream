import BookCard from "./BookCard";
import { fetchCoverUri, normalizeBook } from "../../lib/helpers.js"
import { list } from "../../lib/api.crud";
import { useCart } from '../../lib/cart.context'
import Toast from './Toast';
import { useState, useEffect } from "react";
import "../styles/BookList.css";

export default function BooksList({ showFilters = true }) {
    const [books, setBooks] = useState([]);
    const [search, setSearch] = useState('');
    const [activeCategory, setActiveCategory] = useState('');
    const { items: cart, addItem, notification, clearNotification } = useCart();

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
                    setBooks(apiBooks);
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


    // If filters are hidden (homepage), show all books regardless of previous search/category state.
    const filtered = (!showFilters ? books : books.filter(b => {
        if (!b) return false;

        const q = search.trim().toLowerCase();
        const title = (b.title || '').toLowerCase();
        const author = (b.author || '').toLowerCase();
        const category = (b.category || '').toLowerCase();

        const matchesSearch = !q || title.includes(q) || author.includes(q);
        const matchesCategory = !activeCategory || category === activeCategory.toLowerCase();

        return matchesSearch && matchesCategory;
    })).sort((a, b) => {
        const titleA = a.title || '';
        const titleB = b.title || '';
        return titleA.localeCompare(titleB);
    });

    const categories = ['Fiction', 'Non-Fiction', 'Science', 'History', 'Biography', 'Children', 'Fantasy'];

    return (
        <>
            <Toast
                message={notification?.message}
                type={notification?.type}
                onClose={clearNotification}
            />
            <div className="bs-books-page-full">
                {showFilters && <h2 className="bs-section-heading">Browse Books</h2>}

            {showFilters && (
                <>
                    <section className="bs-search-panel">
                        <h3 className="bs-search-heading">Browse by Search</h3>
                        <div className="bs-search-row">
                            <input className="bs-search-input" placeholder="Enter authors, titles, keywords, etc." value={search} onChange={(e) => setSearch(e.target.value)} />
                            <button className="bs-hero-cta" onClick={() => { /* no-op, filtering happens live */ }}>Search</button>
                        </div>
                    </section>

                    <section className="bs-categories">
                        <h3 className="bs-search-heading">Browse by Category</h3>
                        <div className="bs-cats-row">
                            {categories.map(cat => (
                                <button key={cat} className={`bs-cat-btn ${activeCategory === cat ? 'active' : ''}`} onClick={() => setActiveCategory(activeCategory === cat ? '' : cat)}>{cat}</button>
                            ))}
                        </div>
                    </section>
                </>
            )}

            <div className="bs-books-grid">
                {
                    filtered?.length > 0 ? (
                        filtered.map((b) => (
                            <BookCard key={b._id || b.id} book={b} onAddToCart={addItem} />
                        ))
                    )
                        : (<p>No books available.</p>)
                }
            </div>
            </div>
        </>
    );
}