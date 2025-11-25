import { useState, useEffect } from "react";
import BookCard from "./BookCard";
import "../styles/BookList.css";
import { list } from "../../lib/api.crud";
import { useCart } from '../lib/cart.context'

export default function BooksList({ showFilters = true }) {
    const [books, setBooks] = useState([]);
    const [search, setSearch] = useState('');
    const [activeCategory, setActiveCategory] = useState('');
    const { items: cart, add, remove } = useCart();

    useEffect(() => {
        const controller = new AbortController();

        const fetchBooks = async () => {
            try {
                const data = await list("/api/books/", controller.signal);

                if (!Array.isArray(data)) {
                    window.alert("Failed to fetch books!");
                } 
                else {
                    // Normalize API books
                    const apiBooks = data.map(book => ({
                        ...book,
                        id: book._id || book.id,
                        img: book.photoPath || book.img || 'https://via.placeholder.com/140x200/9fc6e3/ffffff?text=' + encodeURIComponent(book.title)
                    }));
                    setBooks(apiBooks);
                }
            }
            catch (err) {
                if (err.name === "AbortError") {
                    console.log("Fetch aborted: component unmounted or re-rendered.");
                }
                else {
                    console.error("Fetch error:", err);
                    setBooks(SAMPLE_BOOKS);
                }
            }
        }

        fetchBooks();
        return () => controller.abort();
    }, [])


    // If filters are hidden (homepage), show all books regardless of previous search/category state.
    const filtered = (!showFilters ? books : books.filter(b => {
        const q = search.trim().toLowerCase();
        const matchesSearch = !q || (b.title || '').toLowerCase().includes(q) || (b.author || '').toLowerCase().includes(q);
        const matchesCategory = !activeCategory || (b.category || '').toLowerCase() === activeCategory.toLowerCase();
        return matchesSearch && matchesCategory;
    })).sort((a, b) => a.title.localeCompare(b.title));

    const categories = ['Adventure', 'Business', 'Children', 'Fantasy', 'Fiction', 'Mystery'];

    return (
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
                            <BookCard key={b._id || b.id} book={b} onAddToCart={add} />
                        ))
                    )
                        : (<p>No books available.</p>)
                }
            </div>
        </div>
    );
}