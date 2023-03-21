import * as controller from "../controllers/posts.categories.controller";
import uploadSingle from "../middleware/upload.single";

const categoriesPostsRouter = async (app, express) => {
  const router = express.Router();
  router.post("/create", uploadSingle, controller.createCatPosts); //create
  router.get("/get-all", controller.getAll); //get all
  router.get("/get-id/:id", controller.getById); //get by id
  router.patch("/update/:id", uploadSingle, controller.updateCatPosts); //update category
  router.delete("/delete/:id", controller.deleteCatPosts); //delete
  return app.use("/api/categories-posts", router);
};
export default categoriesPostsRouter;