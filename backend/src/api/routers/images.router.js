import express from "express";
import uploadSingle from "../middleware/upload.single";
import uploadMultiple from "../middleware/upload.multiple";
const router = express.Router();
const imagesRouter = async (app) => {
  router.post("/upload-single", uploadSingle);
  router.post("/upload-multiple", uploadMultiple);
  router.get("/");
  router.get("/:id");
  return app.use("api/images", router);
};
export default imagesRouter;
