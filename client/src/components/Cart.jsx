import "../styles/components.css";

export default function Cart({ items = [] }) {
  const total = items.reduce((s, it) => s + it.price, 0);
  //const [items, setCartItems] = useState([]);

  const onRemove = (index) => {
    items.splice(index, 1);
    //setCartItems((prevItems) => prevItems.filter((_, idx) => idx !== index));

  };

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
                <button className="bs-btn bs-remove" onClick={() => onRemove(idx)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="bs-cart-total">Total: ${total.toFixed(2)}</div>
        </>
      )}
    </div>
  );
}
