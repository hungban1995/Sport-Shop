import mongoose from "mongoose";
mongoose.set("strictQuery", true);
const connectDB = async () => {
  try {
    mongoose.connect(process.env.DATABASE_URL);
    console.log("Connect db success");
  } catch (err) {
    console.log("Connect Error: ", err);
  }
};
export default connectDB;
