import * as controller from "../controllers/users.controller";
import {
  usersLoginSchemaValidate,
  usersRegisterSchemaValidate,
} from "../validation/users.validate";
const usersRouter = async (app, express) => {
  const router = express.Router();
  router.post("/register", usersRegisterSchemaValidate, controller.register); //user register
  router.post("/login", usersLoginSchemaValidate, controller.login); //user login
  router.get("/get-all", controller.getUsers); //get all user
  router.get("/get-user/:id", controller.getUserById); //get all user
  router.patch("/update/:id", controller.updateUser); //update user

  router.delete("/delete/:id", controller.deleteUser); //delete user
  return app.use("/api/users", router);
};
export default usersRouter;
