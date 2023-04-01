import mongoose from "mongoose";
import { status, payment } from "../constants";

const ordersSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    address: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    orderDetail: [
      {
        nameProduct: String,
        productVariant: {
          required: true,
          type: mongoose.Schema.Types.ObjectId,
          ref: "productsVariants",
        },
        quantity: { type: Number, required: true },
      },
    ],
    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      default: status[0],
      validate: {
        validator: (value) => {
          const is_match = status.includes(value);
          return is_match;
        },
        message: `Status type: {VALUE} is invalid!`,
      },
    },
    user: { type: String, ref: "users" },
    paymentMethod: {
      required: true,
      type: String,
      default: payment[0],
      validate: {
        validator: (value) => {
          const is_match = payment.includes(value);
          return is_match;
        },
        message: `Status type: {VALUE} is invalid!`,
      },
    },
  },
  { timestamps: true }
);

const Orders = mongoose.models.orders || mongoose.model("orders", ordersSchema);
export default Orders;
