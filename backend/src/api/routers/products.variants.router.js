import * as controller from "../controllers/product.variants.controller";
import express from "express";

const router = express.Router();
const productsVariantsRouter = async (app) => {
  router.post("/create", controller.createProductVariant); //create productvariants

  router.patch("/update/:id", controller.updateProductVariant); //update productvariants
  router.delete("/delete/:id", controller.deleteProductVariant); //delete productvariants
  return app.use("/api/products-variants", router);
};
export default productsVariantsRouter;
