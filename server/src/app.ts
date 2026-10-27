import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { connectDB } from "./db/db";
import userRouter from "./routes/user";
import errorHandler from "./middlewares/errorHandler";
import productRouter from "./routes/product";
import cart from "./routes/cart";
import stripeRouter from "./routes/stripeRoute";

dotenv.config({
  path: "./.env",
});

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json({ limit: "40mb" }));

const PORT = process.env.PORT || 8000;

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/carts", cart);
app.use("/api/stripe", stripeRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
