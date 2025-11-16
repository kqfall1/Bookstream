import authCtrl from '../controllers/auth.ctrl.js'
import bookCtrl from '../controllers/book.controller.js'
import express from 'express'

const router = express.Router()

router.route('/api/books')
    .get(bookCtrl.list)
    .post(bookCtrl.create)
router.route('/api/books/:bookId')
    .get(authCtrl.requireSignin, bookCtrl.read)
    .put(authCtrl.requireSignin, bookCtrl.update)
    .delete(authCtrl.requireSignin, bookCtrl.remove)
router.param('bookId', bookCtrl.bookByID)

export default router