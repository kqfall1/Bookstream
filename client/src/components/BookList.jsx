import { useState, useEffect } from "react";
import BookCard from "./BookCard";
import "../styles/components.css";
import { list } from "../../lib/api.crud";
import { useCart } from '../lib/cart.context'

const SAMPLE_BOOKS = [
    {
        id: '1',
        title: '1984',
        author: 'George Orwell',
        category: 'Fiction',
        price: 20.99,
        img: 'https://m.media-amazon.com/images/I/71rpa1-kyvL._SL1500_.jpg'
    },
    {
        id: '2',
        title: 'Animal Farm',
        author: 'George Orwell',
        category: 'Fiction',
        price: 13.99,
        img: 'https://m.media-amazon.com/images/I/71Kgho+dVZL._SL1500_.jpg'
    },
    {
        id: '3',
        title: 'Atomic Habits',
        author: 'James Clear',
        category: 'Business',
        price: 19.99,
        img: 'https://m.media-amazon.com/images/I/81YkqyaFVEL._SL1500_.jpg'
    },
    {
        id: '4',
        title: 'Becoming',
        author: 'Michelle Obama',
        category: 'Business',
        price: 17.99,
        img: 'https://m.media-amazon.com/images/I/81cJTmFpG-L._SL1500_.jpg'
    },
    {
        id: '5',
        title: 'Clean Code',
        author: 'Robert C. Martin',
        category: 'Business',
        price: 54.99,
        img: 'https://m.media-amazon.com/images/I/51E2055ZGUL._SL1000_.jpg'
    },
    {
        id: '6',
        title: 'Design Patterns',
        author: 'Gang of Four',
        category: 'Business',
        price: 59.99,
        img: 'https://m.media-amazon.com/images/I/81gtKoapHFL._SL1500_.jpg'
    },
    {
        id: '7',
        title: 'Educated',
        author: 'Tara Westover',
        category: 'Adventure',
        price: 16.99,
        img: 'https://m.media-amazon.com/images/I/71-4MkLN5jL._SL1500_.jpg'
    },
    {
        id: '8',
        title: 'Harry Potter and the Sorcerer\'s Stone',
        author: 'J.K. Rowling',
        category: 'Fantasy',
        price: 14.99,
        img: 'https://m.media-amazon.com/images/I/81YOuOGFCJL._SL1500_.jpg'
    },
    {
        id: '9',
        title: 'Lean Startup',
        author: 'Eric Ries',
        category: 'Business',
        price: 27.99,
        img: 'https://m.media-amazon.com/images/I/81-QB7nDh4L._SL1500_.jpg'
    },
    {
        id: '10',
        title: 'Pride and Prejudice',
        author: 'Jane Austen',
        category: 'Fiction',
        price: 12.99,
        img: 'https://m.media-amazon.com/images/I/71Q1tPupKjL._SL1500_.jpg'
    },
    {
        id: '11',
        title: 'Sapiens',
        author: 'Yuval Noah Harari',
        category: 'Adventure',
        price: 24.99,
        img: 'https://m.media-amazon.com/images/I/713jIoMO3UL._SL1500_.jpg'
    },
    {
        id: '12',
        title: 'The Alchemist',
        author: 'Paulo Coelho',
        category: 'Adventure',
        price: 14.99,
        img: 'https://m.media-amazon.com/images/I/71aFt4+OTOL._SL1500_.jpg'
    },
    {
        id: '13',
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        category: 'Fiction',
        price: 15.99,
        img: 'https://m.media-amazon.com/images/I/71V1N3jrTNL._SL1500_.jpg'
    },
    {
        id: '14',
        title: 'The Hobbit',
        author: 'J.R.R. Tolkien',
        category: 'Fantasy',
        price: 22.99,
        img: 'https://m.media-amazon.com/images/I/712cDO7d73L._SL1500_.jpg'
    },
    {
        id: '15',
        title: 'The Hunger Games',
        author: 'Suzanne Collins',
        category: 'Adventure',
        price: 17.99,
        img: 'https://m.media-amazon.com/images/I/71un2hI4mcL._SL1500_.jpg'
    },
    {
        id: '16',
        title: 'The Pragmatic Programmer',
        author: 'Andrew Hunt',
        category: 'Business',
        price: 49.99,
        img: 'https://m.media-amazon.com/images/I/71f1jieYHNL._SL1500_.jpg'
    },
    {
        id: '17',
        title: 'Thinking, Fast and Slow',
        author: 'Daniel Kahneman',
        category: 'Business',
        price: 18.99,
        img: 'https://m.media-amazon.com/images/I/71-e3WXlTxL._SL1500_.jpg'
    },
    {
        id: '18',
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        category: 'Mystery',
        price: 18.99,
        img: 'https://m.media-amazon.com/images/I/81aY1lxk+9L._SL1500_.jpg'
    },
    {
        id: '19',
        title: 'Where the Crawdads Sing',
        author: 'Delia Owens',
        category: 'Mystery',
        price: 16.99,
        img: 'https://m.media-amazon.com/images/I/91Q0i34t5aL._SL1500_.jpg'
    },
    {
        id: '20',
        title: 'You Don\'t Know JS',
        author: 'Kyle Simpson',
        category: 'Business',
        price: 32.99,
        img: 'https://m.media-amazon.com/images/I/71RHNsv9YaL._SL1500_.jpg'
    }
];

export default function BooksList({ showFilters = true }) {
    const [books, setBooks] = useState(SAMPLE_BOOKS);
    const [search, setSearch] = useState('');
    const [activeCategory, setActiveCategory] = useState('');
    const { items: cart, add, remove } = useCart();

    useEffect(() => {
        const controller = new AbortController();

        const fetchBooks = async () => {
            try {
                const data = await list("/api/books/", controller.signal);

                if (!Array.isArray(data)) {
                    console.log("Using sample books data");
                    setBooks(SAMPLE_BOOKS);
                }
                else if (data.length > 0) {
                    // Normalize API books
                    const apiBooks = data.map(book => ({
                        ...book,
                        id: book._id || book.id,
                        img: book.photoPath || book.img || 'https://via.placeholder.com/140x200/9fc6e3/ffffff?text=' + encodeURIComponent(book.title)
                    }));

                    // Merge SAMPLE_BOOKS with API books, deduplicate by title.
                    // SAMPLE_BOOKS take precedence to keep the Amazon image URLs.
                    const map = new Map();
                    apiBooks.forEach(b => map.set(b.title.toLowerCase(), b));
                    SAMPLE_BOOKS.forEach(b => map.set(b.title.toLowerCase(), b));

                    setBooks(Array.from(map.values()));
                }
                else {
                    setBooks(SAMPLE_BOOKS);
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