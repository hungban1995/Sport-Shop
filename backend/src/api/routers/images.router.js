import express from "express";
import uploadSingle from "../middleware/upload.single";
import uploadMultiple from "../middleware/upload.multiple";
import * as controller from "../controllers/images.controller";
const router = express.Router();
const imagesRouter = async (app) => {
  router.post("/upload-single", uploadSingle, controller.uploadSingle);
  router.post("/upload-multiple", uploadMultiple, controller.uploadMultiple);
  router.patch("/update/:id", controller.updateImage);
  router.get("/", controller.getAll);
  router.get("/get-id/:id", controller.getById);
  router.post("/delete", controller.deleteId);
  return app.use("/api/images", router);
};
export default imagesRouter;
