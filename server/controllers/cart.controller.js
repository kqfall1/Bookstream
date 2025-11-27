import Cart from '../models/cart.model.js'
import Book from '../models/book.model.js'
import errorHandler from './error.controller.js'

const createCart = async (req, res) => {
    try {
        const cart = new Cart({ user: req.user._id, items: [] })
        await cart.save()
        return res.status(201).json(cart)
    } catch (err) {
        return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
    }
}

const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id }).populate("items.book")
        if (!cart) return res.status(404).json({ error: "Cart not found" })
        return res.json(cart)
    } catch (err) {
        return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
    }
}

const addItem = async (req, res) => {
    try {
        const { bookId, quantity } = req.body
        const book = await Book.findById(bookId)
        if (!book) return res.status(404).json({ error: "Book not found" })

        let cart = await Cart.findOne({ user: req.user._id })
        if (!cart) cart = new Cart({ user: req.user._id, items: [] })

        const existingItem = cart.items.find(item => item.book.equals(bookId))
        if (existingItem) {
            existingItem.quantity += quantity
        } else {
            cart.items.push({ book: bookId, quantity, price: book.price })
        }

        await cart.save()
        return res.json(cart)
    } catch (err) {
        return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
    }
}

const removeItem = async (req, res) => {
    try {
        const { bookId } = req.body
        const cart = await Cart.findOne({ user: req.user._id })
        if (!cart) return res.status(404).json({ error: "Cart not found" })

        cart.items = cart.items.filter(item => !item.book.equals(bookId))
        await cart.save()
        return res.json(cart)
    } catch (err) {
        return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
    }
}

const clearCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id })
        if (!cart) return res.status(404).json({ error: "Cart not found" })

        cart.items = []
        await cart.save()
        return res.json({ message: "Cart cleared successfully" })
    } catch (err) {
        return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
    }
}

const checkout = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id })
        if (!cart) return res.status(404).json({ error: "Cart not found" })

        cart.status = "checked_out"
        await cart.save()
        return res.json({ message: "Checkout successful", cart })
    } catch (err) {
        return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
    }
}

export default { createCart, getCart, addItem, removeItem, clearCart, checkout }
