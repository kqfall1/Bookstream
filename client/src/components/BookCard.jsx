import "../styles/components.css";

export default function BookCard({ book }) {
    return (
        <div className="bs-book-card">
            <div className="bs-book-info">
                <h3>{book.title}</h3>
                <p className="bs-author">{book.author}</p>
                <h4 className="bs-price">${book.price}</h4>
                <div className="bs-bottom">
                    <button className="bs-btn">Add to Cart</button>
                </div>
            </div>
        </div>
    );
}