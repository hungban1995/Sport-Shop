import * as controller from "../controllers/users.controller";
import {
  usersLoginSchemaValidate,
  usersRegisterSchemaValidate,
} from "../validation/users.validate";
const usersRouter = async (app, express) => {
  const router = express.Router();
  router.post("/register", usersRegisterSchemaValidate, controller.register); //user register
  router.post("/login", usersLoginSchemaValidate, controller.login); //user login

  return app.use("/api/users", router);
};
export default usersRouter;
