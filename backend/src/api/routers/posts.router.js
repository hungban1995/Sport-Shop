import uploadMultiple from "../middleware/upload.multiple";

import * as controller from "../controllers/posts.controller";

const postsRouter = async (app, express) => {
  const router = express.Router();
  router.post("/create", uploadMultiple, controller.createPost); //create
  router.get("/get-all", controller.getAll); //get all
  router.get("/get-id/:id", controller.getById); //get by id
  router.patch("/update/:id", uploadMultiple, controller.updatePost); //update post
  router.delete("/delete/:id", controller.deletePost); //delete
  return app.use("/api/posts", router);
};
export default postsRouter;
