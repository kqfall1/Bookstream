import "../styles/components.css";
import { Link } from 'react-router-dom';

const PLACEHOLDER = 'https://via.placeholder.com/140x200?text=No+Cover';

export default function BookCard({ book, onAddToCart = () => { } }) {
    const src = book.photoPath || book.img || PLACEHOLDER;

    return (
        <div className="bs-book-card">
            <Link to={`/books/${book.id || book._id}`} className="bs-book-link" style={{ textDecoration: 'none', color: 'inherit' }}>
                <img
                    src={src}
                    alt={book.title}
                    className="bs-book-cover"
                    loading="lazy"
                    onError={(e) => { e.currentTarget.src = PLACEHOLDER }}
                />
                <div className="bs-book-info">
                    <h3 title={book.title}>{book.title}</h3>
                    <p className="bs-author">{book.author}</p>
                    <p className="bs-price">${(book.price || 0).toFixed(2)}</p>
                </div>
            </Link>
            <div className="bs-bottom">
                <button className="bs-btn" onClick={() => onAddToCart(book)}>Add to Cart</button>
            </div>
        </div>
    );
}