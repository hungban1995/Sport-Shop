import * as controller from "../controllers/users.controller";
import uploadSingle from "../middleware/upload.single";
import {
  usersLoginSchemaValidate,
  usersRegisterSchemaValidate,
} from "../validation/users.validate";
const usersRouter = async (app, express) => {
  const router = express.Router();
  router.post(
    "/register",
    uploadSingle,
    usersRegisterSchemaValidate,
    controller.register
  ); //user register
  router.post("/login", usersLoginSchemaValidate, controller.login); //user login
  router.get("/get-all", controller.getUsers); //get all user
  router.get("/get-user/:id", controller.getUserById); //get all user
  router.patch("/update/:id", uploadSingle, controller.updateUser); //update user

  router.delete("/delete/:id", controller.deleteUser); //delete user
  router.post("/refresh-token", controller.refreshToken); //refreshToken
  return app.use("/api/users", router);
};
export default usersRouter;
