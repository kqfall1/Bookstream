import Book from '../models/book.model.js'
import errorHandler from './error.controller.js'
import extend from 'lodash/extend.js'

const create = async (req, res) => {
    const book = new Book(req.body)
    try {
        await book.save()
        return res.status(200).json({
            message: "Book successfully created!"
        })
    }
    catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const bookByID = async (req, res, next, id) => {
    try {
        const book = await Book.findById(id)
        if (!book) {
            return res.status(400).json({
                error: "Book not found"
            })
        }
        req.book = book
        next()
    }
    catch (err) {
        return res.status(404).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const list = async (req, res) => {
    try {
        const books = await Book.find().select("author category description isbn photoPath publisher title yearPublished")
        return res.json(books)
    }
    catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const read = (req, res) => {
    return res.json(req.book)
}

const remove = async (req, res) => {
    try {
        const book = req.book; 
        const deletedBook = await book.deleteOne()
        return res.json(deletedBook)
    }
    catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const update = async (req, res) => {
    try {
        const book = req.book 
        extend(book, req.body)
        book.updated = Date.now()
        await book.save()
        res.json(book)
    }
    catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

export { create, bookByID, list, read, remove, update }