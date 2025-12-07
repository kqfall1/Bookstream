import assetRouter from "./routers/asset_router.js";
import cookieParser from "cookie-parser";
import compress from "compression";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import mongoose from "mongoose";
import userRoute from "./routers/user.routes.js";
import bookRoute from "./routers/book.routes.js"; 
import authRoutes from "./routers/auth.routes.js";
import cartRoute from "./routers/cart.routes.js";   
import orderRoute from "./routers/order.routes.js";   


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compress());
app.use(cookieParser());
app.use(cors());
app.use(helmet());
app.use("/src", assetRouter);
app.use("/api/users", userRoute);
app.use('/api/books', bookRoute)
app.use("/api/auth", authRoutes);
app.use("/api/carts", cartRoute); 
app.use("/api/orders", orderRoute);   

app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: err.name + ": " + err.message });
  } else if (err) {
    res.status(400).json({ error: err.name + ": " + err.message });
    console.log(err);
  }
});
export default app;
