import mongoose, { Schema, type Document, type Types } from "mongoose";

export interface ICartItem {
  key: string;
  product_id: Types.ObjectId;
  quantity: number;
  size: string;
  color: string;
}

export interface ICart extends Document {
  user_id: Types.ObjectId;
  items: ICartItem[];
  expiresAt: Date;
}

const cartItemSchema = new Schema<ICartItem>(
  {
    key: {
      type: String,
      required: true,
    },
    product_id: {
      type: Schema.Types.ObjectId,
      ref: "product",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    size: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
  },
  { _id: false },
);

const cartSchema = new Schema<ICart>(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
      unique: true,
      index: true,
    },
    items: {
      type: [cartItemSchema],
      default: [],
    },
    expiresAt: {
      type: Date,
      default: () => new Date(Date.now() + 15 * 60 * 1000),
      expires: 0,
    },
  },
  { timestamps: false },
);

const Cart = mongoose.model<ICart>("cart", cartSchema);

export default Cart;
