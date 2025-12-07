import { Link } from 'react-router-dom';
import React, { useState } from "react";
import "../styles/Cart.css";
import { useCart } from '../../lib/cart.context.jsx'
import Checkout from './Checkout.jsx';

export default function Cart({ isModal = false, onClose }) {
    const { items, addItem, removeItem, clearCart } = useCart()
    const total = items.reduce((s, it) => s + ((it.price || 0) * (it.quantity || 1)), 0);
    const totalItems = items.reduce((s, it) => s + (it.quantity || 1), 0);
    const [error, setError] = useState("");
    
    const handleIncrement = async (bookId) => {
      try {
        await addItem(bookId, 1);
      } catch (err) {
        setError(err.message);
      }
    };

    const handleDecrement = async (item) => {
      try {
        if (item.quantity > 1) {
          await addItem(item.book._id, -1);
        }
      } catch (err) {
        setError(err.message);
      }
    };

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
                <Link to="/" className="bs-hero-cta primary">
                  Browse Books
                </Link>
              )}
            </div>
          </div>
        ) : (
          <>
            <ul className="bs-cart-list">
              {items.map((it) => (
                <li key={it._id} className="bs-cart-item">
                  <img
                    src={it.book.img || it.book.photoPath}
                    alt={it.book.title}
                    className="bs-thumb"
                  />
                  <div style={{ flex: 1 }}>
                    <div className="bs-book-title">{it.book.title}</div>
                    <div className="bs-book-author">{it.book.author}</div>
                    <div className="bs-book-quantity">
                      <span>Qty:</span>
                      <button onClick={() => handleDecrement(it)}>-</button>
                      <span>{it.quantity}</span>
                      <button onClick={() => handleIncrement(it.book._id)}>+</button>
                    </div>
                    <div className="bs-book-price">${(it.price || 0).toFixed(2)}</div>
                  </div>
                  <button className="bs-remove" onClick={() => removeItem(it.book._id)}>
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

            <div className="bs-cart-total">Total Items: {totalItems}</div>
            <div className="bs-cart-total">Total: ${total.toFixed(2)}</div>
            <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
              <button className="bs-btn" onClick={() => clearCart()}>
                Clear
              </button>
              <Link to="/checkout" className="bs-hero-cta" onClick={() => {if (isModal && onClose) onClose();}}>
                Checkout
              </Link>
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
