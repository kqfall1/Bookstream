import authCtrl from '../controllers/auth.controller.js'
import cartCtrl from '../controllers/cart.controller.js'
import express from 'express'

const router = express.Router()

router.use((req, res, next) => {
  console.log("Cart router saw request:", req.method, req.originalUrl);
  next();
});

router.route('/')
    .get(authCtrl.requireSignin, cartCtrl.getCart)     
    .post(authCtrl.requireSignin, cartCtrl.createCart)  
/router.route('/item')
    .post(authCtrl.requireSignin, cartCtrl.addItem)     
    .delete(authCtrl.requireSignin, cartCtrl.removeItem) 

router.route('/clear')
    .post(authCtrl.requireSignin, cartCtrl.clearCart)    

router.route('/checkout')
    .post(authCtrl.requireSignin, cartCtrl.checkout)   
     
export default router
