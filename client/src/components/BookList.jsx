import { useState } from "react";
import BookCard from "./BookCard";
import Cart from "./Cart";
import "../styles/components.css";

const sampleBooks = [
    {
        id: 1,
        title: "The Pragmatic Web",
        author: "Jane Developer",
        price: 14.99,
        img: "https://via.placeholder.com/100x140?text=Book+1",
    },
    {
        id: 2,
        title: "Design Patterns for Developers",
        author: "John Architect",
        price: 19.99,
        img: "https://via.placeholder.com/100x140?text=Book+2",
    },
];

export default function BooksList() {
    const [cart, setCart] = useState([]);
    const addToCart = (book) => setCart((c) => [...c, book]);
    const removeFromCart = (index) => setCart((c) => c.filter((_, i) => i !== index));

    return (
        <div className="bs-books-page">
            <div className="bs-books-grid">
                {sampleBooks.map((b) => (
                    <BookCard key={b.id} book={b} onAddToCart={addToCart} />
                ))}
            </div>
            <aside className="bs-aside-cart">
                <Cart items={cart} onRemove={removeFromCart} />
            </aside>
        </div>
    );
}