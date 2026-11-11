import mongoose, { Schema, Document, Model } from "mongoose";

export interface IWishlist extends Document {
  user_id: mongoose.Types.ObjectId;
  products: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const wishlistSchema = new Schema<IWishlist>(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
      unique: true,
    },

    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "product",
      },
    ],
  },
  {
    timestamps: true,
  },
);

const Wishlist = mongoose.model<IWishlist>("Wishlist", wishlistSchema);

export default Wishlist;
