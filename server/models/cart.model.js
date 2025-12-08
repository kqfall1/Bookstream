import mongoose from "mongoose";

//item in cart
const cartItemSchema = new mongoose.Schema(
  {
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    quantity: {
      type: Number,
      min: [1, "Quantity must be at least 1"],
      default: 1,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
);

//actual cart object
const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    items: [cartItemSchema],
    status: {
      type: String,
      enum: ["active", "checked_out", "abandoned"],
      default: "active",
    },
    totalPrice: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

cartSchema.virtual("itemCount").get(function (password) {
  return this.items.length;
});

cartSchema.pre("save", function () {
  this.totalPrice = this.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
});

export default mongoose.model("Cart", cartSchema);
