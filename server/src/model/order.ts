import mongoose, { Schema, type Document, type Types } from "mongoose";

interface IOrderItem {
  product_id: Types.ObjectId;
  name: string;
  quantity: number;
  price: number;
  size: string;
  color: string;
  image: string[];
}

export interface IOrder extends Document {
  user_id: Types.ObjectId;
  items: IOrderItem[];
  total_price: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  payment_method: "card";
  payment_status: "pending" | "paid" | "failed" | "refunded";
  stripe_session_id: string;
  shipping_address?: string;
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
}

const orderItemSchema = new Schema<IOrderItem>(
  {
    product_id: {
      type: Schema.Types.ObjectId,
      ref: "product",
      required: true,
    },
    name: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true, min: 0 },
    size: { type: String, required: true },
    color: { type: String, required: true },
    image: { type: [String], default: [] },
  },
  { _id: false },
);

const orderSchema = new Schema<IOrder>(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
      index: true,
    },
    items: {
      type: [orderItemSchema],
      required: true,
    },
    total_price: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    payment_method: {
      type: String,
      enum: ["card"],
      default: "card",
    },
    payment_status: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    },
    stripe_session_id: {
      type: String,
      required: true,
      unique: true,
    },
    shipping_address: String,
    phone: String,
  },
  { timestamps: true },
);

const Order = mongoose.model<IOrder>("order", orderSchema);

export default Order;