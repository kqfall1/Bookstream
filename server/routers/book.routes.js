import authCtrl from '../controllers/auth.controller.js'
import bookCtrl from '../controllers/book.controller.js'
import express from 'express'

const router = express.Router()

router.route('/')
    .get(bookCtrl.list)
    .post(bookCtrl.create)
router.route('/:bookId')
    .get(bookCtrl.read)
    .put(authCtrl.requireSignin, bookCtrl.update)
    .delete(authCtrl.requireSignin, bookCtrl.remove)
router.param('bookId', bookCtrl.bookByID)

export default router