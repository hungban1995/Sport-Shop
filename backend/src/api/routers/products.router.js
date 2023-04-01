import uploadMultiple from "../middleware/upload.multiple";
import * as controller from "../controllers/products.controller";
import express from "express";

const router = express.Router();
const productsRouter = async (app) => {
  router.post("/create", uploadMultiple, controller.createProduct); //create product
  router.get("/get-all", controller.getAll); //get all product
  router.get("/get-id/:id", controller.getById); //get all product
  router.patch("/update/:id", uploadMultiple, controller.updateProduct); //update product

  router.delete("/delete/:id", controller.deleteProduct); //delete product

  router.post("/ratings/:id", controller.createRating); //create product

  router.put("/ratings/:id", controller.updateRating); //update rating

  return app.use("/api/products", router);
};
export default productsRouter;
