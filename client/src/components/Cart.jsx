import { Link } from 'react-router-dom'
import "../styles/Cart.css";
import { useCart } from '../../lib/cart.context.js'

export default function Cart({ isModal = false, onClose }) {
    const { items, remove, clear } = useCart()
    const total = items.reduce((s, it) => s + (it.price || 0), 0);

    const cartContent = (
        <>
            {items.length === 0 ? (
                <div className="bs-cart-empty">
                    <div className="bs-empty-hero">
                        <p>Your cart is empty.</p>
                        <p>Browse books and add them to your cart.</p>
                        {isModal && (
                            <button className="bs-hero-cta primary" onClick={onClose}>
                                Browse Books
                            </button>
                        )}
                        {!isModal && (
                            <Link to="/" className="bs-hero-cta primary">Browse Books</Link>
                        )}
                    </div>
                </div>
            ) : (
                <>
                    <ul className="bs-cart-list">
                        {items.map((it, idx) => (
                            <li key={idx} className="bs-cart-item">
                                <img src={it.img || it.photoPath} alt={it.title} className="bs-thumb" />
                                <div style={{ flex: 1 }}>
                                    <div className="bs-book-title">{it.title}</div>
                                    <div className="bs-book-author">{it.author}</div>
                                    <div className="bs-book-price">${(it.price || 0).toFixed(2)}</div>
                                </div>
                                <button className="bs-remove" onClick={() => remove(idx)}>Remove</button>
                            </li>
                        ))}
                    </ul>
                    <div className="bs-cart-total">Total: ${total.toFixed(2)}</div>
                    <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
                        <button className="bs-btn" onClick={() => clear()}>Clear</button>
                        <Link to="/checkout" className="bs-hero-cta">Checkout</Link>
                    </div>
                </>
            )}
        </>
    );

    if (isModal) {
        return (
            <>
                <div className="bs-cart-modal-overlay" onClick={onClose}></div>
                <div className="bs-cart-modal">
                    <div className="bs-cart-modal-header">
                        <h2>Your Cart</h2>
                        <button className="bs-cart-close" onClick={onClose} aria-label="Close cart">
                            ×
                        </button>
                    </div>
                    {cartContent}
                </div>
            </>
        );
    }

    return (
        <div className="bs-cart">
            <h2>Your Cart</h2>
            {cartContent}
        </div>
    );
}