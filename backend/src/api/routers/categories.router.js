import * as controller from "../controllers/categories.controller";
import uploadSingle from "../middleware/upload.single";

const categoriesRouter = async (app, express) => {
  const router = express.Router();
  router.post("/create", uploadSingle, controller.createCat); //create
  router.get("/get-all", controller.getAll); //get all
  router.get("/get-id/:id", controller.getById); //get by id
  router.patch("/update/:id", uploadSingle, controller.updateCat); //update category
  router.delete("/delete/:id", controller.deleteCat); //delete
  return app.use("/api/categories", router);
};
export default categoriesRouter;
