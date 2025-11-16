import React from "react";
import "./components.css";

export default function Cart({ items = [], onRemove = () => { } }) {
    const total = items.reduce((s, it) => s + it.price, 0);
    return (
        <div className="bs-cart">
            <h2>Your Cart</h2>
            {items.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    <ul className="bs-cart-list">
                        {items.map((it, idx) => (
                            <li key={idx} className="bs-cart-item">
                                <img src={it.img} alt={it.title} className="bs-thumb" />
                                <div>
                                    <div className="bs-book-title">{it.title}</div>
                                    <div className="bs-book-author">{it.author}</div>
                                    <div className="bs-book-price">${it.price.toFixed(2)}</div>
                                </div>
                                <button className="bs-btn bs-remove" onClick={() => onRemove(idx)}>Remove</button>
                            </li>
                        ))}
                    </ul>
                    <div className="bs-cart-total">Total: ${total.toFixed(2)}</div>
                </>
            )}
        </div>
    );
}