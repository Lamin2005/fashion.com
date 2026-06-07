import mongoose, { model, Schema, Types, Document } from "mongoose";

interface Image {
  url: string;
  public_id: string;
}

interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  instock_count: number;
  category: string;
  sizes: string[];
  colors: string[];
  images: Image[];
  is_new_arrival: boolean;
  is_feature: boolean;
  rating_count: number;
  user: Types.ObjectId;
}

const prodcutSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    instock_count: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    sizes: {
      type: [String],
      required: true,
    },
    colors: {
      type: [String],
      required: true,
    },
    images: {
      type: [
        {
          url: String,
          public_id: String,
        },
      ],
      required: true,
    },
    is_new_arrival: {
      type: Boolean,
      required: true,
    },
    is_feature: {
      type: Boolean,
      required: true,
    },

    rating_count: {
      type: Number,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      requriedPaths: true,
    },
  },
  { timestamps: true },
);

const Product = model<IProduct>("product", prodcutSchema);
export default Product;
