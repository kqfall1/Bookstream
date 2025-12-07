import React, { useState } from "react";
import { useCart } from "../../lib/cart.context.jsx"; //
import { useNavigate } from "react-router-dom";
import "../styles/checkout.css";

export default function Checkout() {
  const { items, totalPrice, checkout, addItem, removeItem } = useCart();
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    street: "",
    city: "",
    zipCode: "",
    country: "",
  });
  const [error, setError] = useState("");

  const handleChange = (name) => (event) => {
    setAddress({ ...address, [name]: event.target.value });
  };

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

  const handlePlaceOrder = async () => {
    try {
      await checkout(address);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  if (items.length === 0) {
    return <div className="p-4">Your cart is empty. Nothing to checkout.</div>;
  }

  return (
    <div
      className="bs-checkout-container"
      style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}
    >
      <h1>Checkout</h1>

      {/* Order Summary */}
      <div
        className="bs-order-summary"
        style={{ marginBottom: "20px", border: "1px solid #ddd", padding: "15px" }}
      >
        <h3>Order Summary</h3>
        <ul className="bs-checkout-list">
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
        {/* <ul>
          {items.map((item) => (
             // Using item.book.title based on population in cart.controller
            <li key={item.book._id} style={{ display: "flex", justifyContent: "space-between" }}>
              <span>{item.book.title} x {item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul> */}
        <div style={{ fontWeight: "bold", marginTop: "10px", textAlign: "right" }}>
          Total: ${totalPrice.toFixed(2)}
        </div>
      </div>

      {/* Shipping Form */}
      <div className="bs-shipping-form">
        <h3>Shipping Address</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <input
            type="text"
            placeholder="Street"
            value={address.street}
            onChange={handleChange("street")}
            style={{ padding: "8px" }}
          />
          <input
            type="text"
            placeholder="City"
            value={address.city}
            onChange={handleChange("city")}
            style={{ padding: "8px" }}
          />
          <div style={{ display: "flex", gap: "10px" }}>
            <input
              type="text"
              placeholder="Zip Code"
              value={address.zipCode}
              onChange={handleChange("zipCode")}
              style={{ flex: 1, padding: "8px" }}
            />
            <input
              type="text"
              placeholder="Country"
              value={address.country}
              onChange={handleChange("country")}
              style={{ flex: 1, padding: "8px" }}
            />
          </div>
        </div>
      </div>

      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

      <button
        onClick={handlePlaceOrder}
        className="bs-hero-cta"
        style={{
          marginTop: "20px",
          width: "100%",
          padding: "15px",
          fontSize: "1.1em",
          cursor: "pointer",
        }}
      >
        Place Order
      </button>
    </div>
  );
}
