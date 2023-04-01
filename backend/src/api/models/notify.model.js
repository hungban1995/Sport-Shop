import mongoose from "mongoose";

const notifySchema = new mongoose.Schema(
  {
    recipient: {
      type: Array,
      ref: "users",
      required: true,
    },
    sender: {
      type: String,
      ref: "users",
    },
    message: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Notify = mongoose.models.notify || mongoose.model("notify", notifySchema);
export default Notify;
