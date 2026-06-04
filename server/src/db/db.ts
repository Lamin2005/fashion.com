import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    let DB_Connection_String = "";

    if (process.env.NODE_ENV === "production") {
      DB_Connection_String = process.env.MONGODB_ALTALS_URL!;
    } else {
      DB_Connection_String = process.env.MONGO_URL!;
    }
    const response = await mongoose.connect(DB_Connection_String);
    console.log("MongoDB connected", response.connection.host);
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  }
};
