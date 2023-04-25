import mongoose from "mongoose";
const { Schema } = mongoose;

const ProductsSchema = new Schema(
  {
    createdAt: {
      type: Date,
      default: Date.now,
    },
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
        user: { type: String, required: true, ref: "users" },
        rating: { type: Number, required: true },
        comment: { type: String },
        orderId: { type: String, required: true },
        createData: { type: Date, default: Date.now() },
      },
    ],
  },
  { timestamps: true }
);
// Virtuals
ProductsSchema.virtual("star").get(function () {
  let star = 0;
  let sum = 0;
  let ratings = [];
  if (this.ratings) {
    ratings = this.ratings;
  }
  ratings.forEach((item) => {
    sum += item.rating;
  });
  star = sum / ratings.length;
  return star;
});
ProductsSchema.set("toJSON", { virtuals: true });
const Products =
  mongoose.models.products || mongoose.model("products", ProductsSchema);

export default Products;
