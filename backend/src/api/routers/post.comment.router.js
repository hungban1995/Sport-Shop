import * as controller from "../controllers/posts.comment.controller";
import express from "express";

const router = express.Router();
const postCommentRouter = async (app) => {
  router.post("/create", controller.createCmt); //create
  router.get("/", controller.getByPost); //get by post
  router.patch("/update/:id", controller.updateCmt); //update
  router.delete("/delete/:id", controller.deleteCmt); //delete
  return app.use("/api/post-comment", router);
};
export default postCommentRouter;
