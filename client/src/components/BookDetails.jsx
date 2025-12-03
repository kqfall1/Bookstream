import { normalizeBook } from '../../lib/helpers.js'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { read } from '../../lib/api.crud';
import { useCart } from '../../lib/cart.context';
import '../styles/BookList.css';

export default function BookDetails() {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const { addItem } = useCart();

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
        <div className="bs-books-page-full">
            <div className="bs-books-page" style={{ maxWidth: '1100px' }}>
                <div style={{ width: '360px' }}>
                    <img src={book.img} alt={book.title} style={{ width: '100%', height: 'auto', borderRadius: 8, boxShadow: 'var(--shadow-md)' }} />
                </div>
                <div>
                    <h2 style={{ marginTop: 0 }}>{book.title}</h2>
                    <p className="bs-author" style={{ fontSize: '1.05rem', marginTop: 0 }}>{book.author}</p>
                    <p className="bs-price" style={{ fontSize: '1.2rem' }}>${(book.price || 0).toFixed(2)}</p>
                    <div style={{ margin: '16px 0' }}>
                        <button className="bs-btn" onClick={() => addItem(book)}>Add to Cart</button>
                    </div>

                    <section style={{ marginTop: 24 }}>
                        <h3>Overview</h3>
                        <p>{book.description || 'No description available for this book.'}</p>
                        <dl>
                            {book.isbn && <><dt>ISBN</dt><dd>{book.isbn}</dd></>}
                            {book.published && <><dt>Published</dt><dd>{book.published}</dd></>}
                            {book.category && <><dt>Category</dt><dd>{book.category}</dd></>}
                        </dl>
                    </section>
                </div>
            </div>
        </div>
    );
}
