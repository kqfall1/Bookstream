import { normalizeBook } from '../../lib/helpers.js'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { read } from '../../lib/api.crud';
import { useCart } from '../../lib/cart.context';
import Toast from './Toast';
import '../styles/BookDetails.css';

export default function BookDetails() {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const { addItem, notification, clearNotification } = useCart();

    useEffect(() => {
        let mounted = true;
        const controller = new AbortController();

        async function fetchBook() {
            try {
                const data = await read(`/api/books/`, null, id, controller.signal);
                if (!mounted) return;
                if (data) {
                    const normalized = await normalizeBook(data)
                    setBook(normalized);
                } else {
                    setBook({ title: 'Book not found' });
                }
            }
            catch (err) {
                if (err.name !== 'AbortError') {
                    console.error('Failed to load book', err);
                    setBook({ title: 'Book not found' });
                }
            }
            finally {
                if (mounted) setLoading(false);
            }
        }

        fetchBook();
        return () => { mounted = false; controller.abort(); };
    }, [id]);

    if (loading) return <div className="bs-form-centered"><p>Loading book details…</p></div>;
    if (!book) return <div className="bs-form-centered"><p>Book not found.</p></div>;

    return (
        <>
            <Toast
                message={notification?.message}
                type={notification?.type}
                onClose={clearNotification}
            />
            <div className="bs-book-details-container">
                <div className="bs-book-details-layout">
                    <div>
                        <img src={book.img} alt={book.title} className="bs-book-cover-large" />
                    </div>
                    <div className="bs-book-details-content">
                        <h1 className="bs-book-title-large">{book.title}</h1>
                        <p className="bs-book-author-large">{book.author}</p>
                        <p className="bs-book-price-large">
                            {book.price != null && !Number.isNaN(Number(book.price))
                                ? `$${Number(book.price).toFixed(2)}`
                                : 'Price not available'}
                        </p>

                        <div className="bs-book-details-info">
                            <p>{book.description || 'Book details, including its categories, description, ISBN, publish date, etc.'}</p>
                        </div>

                        <div className="bs-book-actions">
                            <button className="bs-btn-primary" onClick={() => addItem(book)}>
                                Add to Cart
                            </button>
                            <button className="bs-btn-secondary">
                                Add to Library
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
