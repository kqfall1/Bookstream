import React, { createContext, useContext, useEffect, useState } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
    const [items, setItems] = useState(() => {
        try {
            const raw = localStorage.getItem('bs_cart')
            return raw ? JSON.parse(raw) : []
        } catch (e) {
            return []
        }
    })

    useEffect(() => {
        try { localStorage.setItem('bs_cart', JSON.stringify(items)) } catch (e) { }
    }, [items])

    const add = (book) => setItems((s) => [...s, book])
    const remove = (index) => setItems((s) => s.filter((_, i) => i !== index))
    const clear = () => setItems([])

    return React.createElement(
        CartContext.Provider,
        { value: { items, add, remove, clear } },
        children
    )
}

export const useCart = () => {
    const ctx = useContext(CartContext)
    if (!ctx) throw new Error('useCart must be used within CartProvider')
    return ctx
}
