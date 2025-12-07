import authCtrl from '../controllers/auth.controller.js'
import cartCtrl from '../controllers/cart.controller.js'
import express from 'express'

const router = express.Router()

router.route('/')
    .get(authCtrl.requireSignin, cartCtrl.getCart)     
    .post(authCtrl.requireSignin, cartCtrl.createCart)  
router.post("/item", (req, res, next) => {
  console.log("Cart request body:", req.body);
  if (!req.body.bookId || !req.body.quantity) {
    return res.status(400).json({ error: "Missing bookId or quantity" });
  }
  return cartCtrl.addItem(req, res, next)
});
/* router.route('/item')
    .post(authCtrl.requireSignin, cartCtrl.addItem)     
    .delete(authCtrl.requireSignin, cartCtrl.removeItem) */ 

router.route('/clear')
    .post(authCtrl.requireSignin, cartCtrl.clearCart)    

router.route('/checkout')
    .post(authCtrl.requireSignin, cartCtrl.checkout)   
     
export default router
