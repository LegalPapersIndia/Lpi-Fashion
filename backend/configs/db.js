import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.once("connected", () => {
      console.log("Database Connected Successfully");
    });

    await mongoose.connect(`${process.env.MONGODB_URI}/Fashion`, {
      serverSelectionTimeoutMS: 30000,
    });

  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
