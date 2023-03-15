import mongoose from "mongoose";
const categoriesSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    image: { type: String },
  },
  { timestamps: true }
);
const Categories =
  mongoose.models.categories || mongoose.model("categories", categoriesSchema);

export default Categories;
