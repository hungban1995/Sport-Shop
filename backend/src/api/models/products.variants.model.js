import mongoose from "mongoose";
const { Schema } = mongoose;

const ProductVariantSchema = new Schema(
  {
    createdAt: {
      type: Date,
      default: Date.now,
    },
    ofProduct: { type: String, ref: "products" },
    attributes: { type: Array, default: [] },
    image: { type: String },
    sku: { type: String },
    price: { type: Number, required: true, min: 0, default: 0 },
    inStock: { type: Number, required: true, min: 0, default: 0 },
    sold: { type: Number, default: 0 },
    onSale: {
      type: Number,
      min: 0,
      validate: {
        validator: function (value) {
          return value <= this.price;
        },
        message: "On-sale price cannot be greater than the regular price",
      },
    },
  },
  { timestamps: true }
);
const ProductsVariants =
  mongoose.models.productsVariants ||
  mongoose.model("productsVariants", ProductVariantSchema);

export default ProductsVariants;
