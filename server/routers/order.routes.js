import express from "express";
import authCtrl from "../controllers/auth.controller.js";
import orderCtrl from "../controllers/order.controller.js";

const router = express.Router();

// Create a new order (Checkout)
router.route("/api/orders").post(authCtrl.requireSignin, orderCtrl.create);

// Get list of orders for the logged in user
router.route("/api/orders/mine").get(authCtrl.requireSignin, orderCtrl.listByUser);

router.route("/api/orders/:orderId").get(authCtrl.requireSignin, orderCtrl.read);

export default router;
