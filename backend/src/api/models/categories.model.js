import mongoose from "mongoose";
const categoriesSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    numProducts: { type: Number },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);
const Categories =
  mongoose.models.categories || mongoose.model("categories", categoriesSchema);

export default Categories;
