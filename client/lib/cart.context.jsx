import React, { createContext, useContext, useEffect, useState } from "react";
import auth from "./auth.helpers.js";
import { normalizeBook } from "./helpers.js";
const CartContext = createContext(null);

/**
 * Helper function for cart-related API calls.
 * @param method A String corresponding to an HTTP method.
 * @param endpoint The cart API endpoint. Must include an inital slash.
 * @param The optional body of the HTTP request.
 */
const callApi = async (method, endpoint, body) => {
  const token = auth.isAuthenticated();
  //console.log("GETTING JWT:", jwt);

  if (!token) {
    throw new Error("Authentication required for cart operations.");
  }

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const response = await fetch(`/api/carts${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    try {
      const errorData = await response.json();
      throw new Error(
        errorData.error || `API call failed: ${response.statusText} (${response.status})`
      );
    } catch (e) {
      throw new Error(`API call failed: ${response.statusText} (${response.status})`);
    }
  }

  // Special handling for routes that return no content (like clear or signout)
  if (response.status === 204 || response.statusText === "No Content") {
    return null;
  }

  return response.json();
};

/**
 * React context provider that exposes cart state and actions to its children via useCart().
 */
export function CartProvider({ children }) {
  // The cart object from the database (includes: { _id, userId, items: [...], totalPrice, ... })
  const [cart, setCart] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);

  const normalizeCart = async (cartData) => {
    if (!cartData || !cartData.items) return cartData;

    // Map over items and normalize the book object inside each using the normalizebook in helpers.js
    const normalizedItems = await Promise.all(
      cartData.items.map(async (item) => {
        const normalizedBook = await normalizeBook(item.book);
        return { ...item, book: normalizedBook };
      })
    );

    return { ...cartData, items: normalizedItems };
  };

  const fetchCart = async () => {
    const token = auth.isAuthenticated();
    if (!token) {
      setCart({ items: [], totalPrice: 0 });
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const data = await callApi("GET", "");
      const normalizedData = await normalizeCart(data);
      setCart(normalizedData);
    } catch (e) {
      // This catch block handles errors or auth expiration.
      if (e.message.includes("Authentication required")) {
        setCart({ items: [], totalPrice: 0 });
      } else {
        setError(e.message);
        setCart({ items: [], totalPrice: 0 });
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Reload cart whenever the authentication token state might change (login or signout)
  useEffect(() => {
    fetchCart();
  }, [auth.isAuthenticated()]);

  const addItem = async (bookId, quantity = 1) => {
    setError(null);
    if (!auth.isAuthenticated()) {
      alert("You must be logged in to add items to the cart.");
      return;
    }

    try {
      const updatedCart = await callApi("POST", "/carts/item", { bookId, quantity });
      const normalizedCart = await normalizeCart(updatedCart);
      setCart(normalizedCart);

      if (quantity >= 0) {
        setNotification({ message: "Your item was added to the cart", type: "success" });
      } 
      else {
        setNotification({ message: "Your item was removed from the cart", type: "success" });
      }
    } catch (e) {
      setError(e.message);
      setNotification({ message: e.message, type: "error" });
    }
  };

  const removeItem = async (bookId) => {
    setError(null);
    if (!auth.isAuthenticated()) {
      setError("You must be logged in to remove items from the cart.");
      return;
    }

    try {
      // backend cart.routes.js uses DELETE /api/cart/item with bookId in the body
      const updatedCart = await callApi("DELETE", "/item", { bookId });
      const normalizedCart = await normalizeCart(updatedCart);
      setCart(normalizedCart);
      setNotification({message: "Book removed from cart", type: "success"})
    } catch (e) {
      setError(e.message);
    }
  };

  const clearCart = async () => {
    setError(null);
    if (!auth.isAuthenticated()) {
      setError("You must be logged in to clear the cart.");
      return;
    }

    try {
      // POST /api/cart/clear
      await callApi("POST", "/clear");
      setCart((prev) => ({ ...prev, items: [], totalPrice: 0 }));
      setNotification({message: "Cleared cart", type: "success"})
    } catch (e) {
      setError(e.message);
    }
  };

  const checkout = async (shippingAddress) => {
    setError(null);
    if (!auth.isAuthenticated()) {
      throw new Error("Authentication required to proceed to checkout.");
    }

    try {
      const token = auth.isAuthenticated();

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ shippingAddress }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Checkout failed");
      }

      const newOrder = await response.json();
      setCart({ items: [], totalPrice: 0 });  
      setNotification({message: "Order placed successfully", type: "success"})
      return newOrder;
    } catch (e) {
      setError(e.message);
      throw e;
    }
  };

  const clearNotification = () => setNotification(null);

  /**
   * An object that bundles cart-related data and behaviors to be passed into CartProvider components as the value attribute.
   */
  const value = {
    cart: cart,
    items: cart?.items || [],
    totalPrice: cart?.totalPrice || 0,
    isLoading,
    error,
    notification,
    clearNotification,
    addItem,
    removeItem,
    clearCart,
    checkout,
    // Expose a flag to indicate if cart is ready and user is authenticated
    isReady: !isLoading && !!auth.isAuthenticated(),
  };

  return (
    <CartContext.Provider value={value}>
      {isLoading && auth.isAuthenticated() ? (
        <div className="p-4 text-center">Loading cart...</div>
      ) : (
        children
      )}
    </CartContext.Provider>
  );
}

/**
 * Custom hook that is called by the children of CartContext components to read cart data.
 * @returns Cart data if the CartContext has been updated by the user.
 */
export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
