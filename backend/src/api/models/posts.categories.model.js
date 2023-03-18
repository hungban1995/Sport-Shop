import mongoose from "mongoose";
const categoriesPostsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    image: { type: String },
  },
  { timestamps: true }
);
const CategoriesPosts =
  mongoose.models.categoriesPost ||
  mongoose.model("categoriesPost", categoriesPostsSchema);

export default CategoriesPosts;
