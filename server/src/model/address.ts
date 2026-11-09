import mongoose, { Schema, Document, Model } from "mongoose";

export type AddressType = "Home" | "Office";

export interface IAddress extends Document {
  user_id: mongoose.Types.ObjectId;
  fullName: string;
  phone: string;
  address: string;
  city: string;
  township: string;
  postalCode?: string;
  type: AddressType;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const addressSchema = new Schema<IAddress>(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },

    address: {
      type: String,
      required: [true, "Street address is required"],
      trim: true,
    },

    city: {
      type: String,
      required: [true, "City is required"],
      trim: true,
    },

    township: {
      type: String,
      required: [true, "Township is required"],
      trim: true,
    },

    postalCode: {
      type: String,
      trim: true,
      default: "",
    },

    type: {
      type: String,
      enum: ["Home", "Office"],
      required: [true, "Address type is required"],
      default: "Home",
    },

    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

addressSchema.index(
  { user_id: 1 },
  {
    unique: true,
    partialFilterExpression: { isDefault: true },
  },
);

addressSchema.index({ user_id: 1, createdAt: -1 });

const Address = mongoose.model<IAddress>("address", addressSchema);

export default Address;
