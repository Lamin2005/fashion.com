import { model, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import crypto from "crypto";

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "customer" | "admin";
  avatar?: {
    image_url: string;
    public_id: string;
  };
  resetToken: string | undefined;
  tokenExpire: Date | undefined;
  comparePassword(enteredPassword: string): Promise<boolean>;
  generateResetToken(): Promise<string>;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },

    avatar: {
      type: {
        image_url: String,
        public_id: String,
      },
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer",
    },

    resetToken: {
      type: String,
    },

    tokenExpire: {
      type: Date,
    },
  },
  { timestamps: true },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateResetToken = function () {
  const token = crypto.randomBytes(20).toString("hex");

  this.resetToken = crypto.createHash("sha256").update(token).digest("hex");

  this.tokenExpire = new Date(Date.now() + 10 * 60 * 1000);

  return token;
};

const User = model<IUser>("user", userSchema);
export default User;
