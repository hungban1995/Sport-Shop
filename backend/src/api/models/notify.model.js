import mongoose from "mongoose";

const notifySchema = new mongoose.Schema(
  {
    recipient: {
      type: String,
      ref: "users",
    },
    sender: {
      type: String,
      ref: "users",
    },
    ofId: {
      type: String,
      required: true,
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
    details: {
      type: Object,
    },
  },
  { timestamps: true }
);

const Notify = mongoose.models.notify || mongoose.model("notify", notifySchema);
export default Notify;
