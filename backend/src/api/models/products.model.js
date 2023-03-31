import mongoose from "mongoose";
const { Schema } = mongoose;

const ProductsSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    content: { type: String },
    category: { type: Array, default: [], ref: "categories" },
    images: { type: Array, default: [] },
    variants: {
      type: Array,
      required: true,
      default: [],
      ref: "productsVariants",
    },
    ratings: [
      {
        user: { type: String, ref: "users" },
        rating: { type: Number },
        comment: { type: String },
      },
    ],
  },
  { timestamps: true }
);
const Products =
  mongoose.models.products || mongoose.model("products", ProductsSchema);

export default Products;
