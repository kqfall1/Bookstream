import { useState, useEffect } from "react";
import BookCard from "./BookCard";
import "../styles/components.css";
import { list } from "../../lib/api.crud";

export default function BooksList() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const controller = new AbortController();

        const fetchBooks = async () => {
            try {
                const data = await list("/api/books/", controller.signal);

                if (!Array.isArray(data)) {
                    window.alert("Failed to fetch books!");
                } 
                else {
                    setBooks(data);
                }
            } 
            catch (err) {
                if (err.name === "AbortError") { // Expected during unmount or re-render
                    console.log("Fetch aborted: component unmounted or re-rendered.");
                } 
                else {
                    console.error("Fetch error:", err);
                }
            }
        }  

        fetchBooks();
        return () => controller.abort();  
    }, [])  

    return (
        <div className="bs-books-page">
            <h2>📚 Book List</h2>
            <div className="bs-books-grid">
                {
                    books?.length > 0 ? (
                        books.map((b) => (
                            <BookCard key={b._id} book={b} onAddToCart={() => {}} />
                        ))
                    ) 
                    : (<p>No books available.</p>)
                }
            </div>
        </div>
    );
}