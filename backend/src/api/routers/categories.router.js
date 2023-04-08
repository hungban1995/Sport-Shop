import * as controller from "../controllers/categories.controller";

import express from "express";

const router = express.Router();

const categoriesRouter = async (app) => {
  router.post("/create", controller.createCat); //create
  router.get("/get-all", controller.getAll); //get all
  router.get("/get-id/:id", controller.getById); //get by id
  router.patch("/update/:id", controller.updateCat); //update category
  router.delete("/delete/:id", controller.deleteCat); //delete
  return app.use("/api/categories", router);
};
export default categoriesRouter;
