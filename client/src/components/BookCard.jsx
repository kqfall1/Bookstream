import "../styles/components.css";
import React, { useState } from "react";

export default function BookCard({ book, onAddToCart = () => {} }) {
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  //const [cartItems, setCartItems] = useState([]);

  const handleQuantityChange = (event) => {
    setSelectedQuantity(parseInt(event.target.value));
  };

  return (
    <div className="bs-book-card">
      <div className="bs-book-info">
        <h3>{book.title}</h3>
        <p className="bs-author">{book.author}</p>
        <h4 className="bs-price">${(book.price * selectedQuantity).toFixed(2)}</h4>
        <div>
          <label htmlFor="quantity-dropdown">Quantity: </label>
          <select id="quantity-dropdown" value={selectedQuantity} onChange={handleQuantityChange}>
            {Array.from({ length: 50 }, (_, i) => i + 1).map((quantity) => (
              <option key={quantity} value={quantity}>
                {quantity}
              </option>
            ))}
          </select>
        </div>
        <div className="bs-bottom">
          <button className="bs-btn" onClick={onAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
