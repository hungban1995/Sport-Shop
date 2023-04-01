import mongoose from "mongoose";
const imagesSchema = new mongoose.Schema(
  {
    title: { type: String },
    alt: { type: String },
    url: { type: String },
  },
  { timestamps: true }
);
const Images = mongoose.models.images || mongoose.model("images", imagesSchema);
export default Images;
