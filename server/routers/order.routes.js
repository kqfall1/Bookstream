import express from "express";
import authCtrl from "../controllers/auth.controller.js";
import orderCtrl from "../controllers/order.controller.js";

const router = express.Router();

// Create a new order (Checkout)
router.route("/").post(authCtrl.requireSignin, orderCtrl.create);

// Get list of orders for the logged in user
router.route("/mine").get(authCtrl.requireSignin, orderCtrl.listByUser);

router.route("/:orderId").get(authCtrl.requireSignin, orderCtrl.read);

export default router;
