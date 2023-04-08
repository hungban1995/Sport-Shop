import * as controller from "../controllers/posts.controller";
import express from "express";

const router = express.Router();
const postsRouter = async (app) => {
  router.post("/create", controller.createPost); //create
  router.get("/get-all", controller.getAll); //get all
  router.get("/get-id/:id", controller.getById); //get by id
  router.patch("/update/:id", controller.updatePost); //update post
  router.delete("/delete/:id", controller.deletePost); //delete
  return app.use("/api/posts", router);
};
export default postsRouter;
