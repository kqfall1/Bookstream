import Order from "../models/order.model.js";
import Cart from "../models/cart.model.js";
import errorHandler from "./error.controller.js";

const create = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.auth._id }).populate("items.book");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ error: "Cannot place order. Cart is empty." });
    }

    const orderItems = cart.items.map((item) => ({
      book: item.book._id,
      title: item.book.title,
      quantity: item.quantity,
      price: item.price,
    }));

    const totalAmount = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const order = new Order({
      user: req.auth._id,
      items: orderItems,
      totalAmount: totalAmount,
      shippingAddress: req.body.shippingAddress || {},
    });

    await order.save();

    cart.status = "checked_out";
    cart.items = [];
    cart.totalPrice = 0;
    await cart.save();

    return res.status(201).json(order);
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

const listByUser = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.auth._id })
      .sort("-createdAt")
      .populate("items.book", "title photoPath");

    return res.json(orders);
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

const read = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId).populate(
      "items.book",
      "title author photoPath"
    );

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    if (order.user.toString() !== req.auth._id) {
      return res.status(403).json({ error: "Not authorized to view this order" });
    }

    return res.json(order);
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

export default { create, listByUser, read };
