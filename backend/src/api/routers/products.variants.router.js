import uploadSingle from "../middleware/upload.single";
import * as controller from "../controllers/product.variants.controller";
import { productsVariantValidate } from "../validation/products.validate";
import express from "express";

const router = express.Router();
const productsVariantsRouter = async (app) => {
  router.post(
    "/create",
    // productsVariantValidate,
    uploadSingle,
    controller.createProductVariant
  ); //create productvariants

  router.patch("/update/:id", uploadSingle, controller.updateProductVariant); //update productvariants
  router.delete("/delete/:id", controller.deleteProductVariant); //delete productvariants
  return app.use("/api/products-variants", router);
};
export default productsVariantsRouter;
