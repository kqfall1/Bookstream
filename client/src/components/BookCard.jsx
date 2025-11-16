import "../styles/components.css";

export default function BookCard({ book, onAddToCart = () => { } }) {
    return (
        <div className="bs-book-card">
            <img src={book.img} alt={book.title} className="bs-book-img" />
            <div className="bs-book-info">
                <h3>{book.title}</h3>
                <p className="bs-author">{book.author}</p>
                <div className="bs-bottom">
                    <div className="bs-price">${book.price.toFixed(2)}</div>
                    <button className="bs-btn" onClick={() => onAddToCart(book)}>Add to Cart</button>
                </div>
            </div>
        </div>
    );
}