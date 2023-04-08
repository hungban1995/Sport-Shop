import * as controller from "../controllers/posts.categories.controller";
import express from "express";

const router = express.Router();
const categoriesPostsRouter = async (app) => {
  router.post("/create", controller.createCatPosts); //create
  router.get("/get-all", controller.getAll); //get all
  router.get("/get-id/:id", controller.getById); //get by id
  router.patch("/update/:id", controller.updateCatPosts); //update category
  router.delete("/delete/:id", controller.deleteCatPosts); //delete
  return app.use("/api/categories-posts", router);
};
export default categoriesPostsRouter;
