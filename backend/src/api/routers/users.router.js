import * as controller from "../controllers/users.controller";
import uploadSingle from "../middleware/upload.single";
import {
  usersLoginSchemaValidate,
  usersRegisterSchemaValidate,
} from "../validation/users.validate";
import express from "express";

const router = express.Router();
const usersRouter = async (app) => {
  router.post(
    "/register",
    uploadSingle,
    usersRegisterSchemaValidate,
    controller.register
  ); //user register
  router.post("/login", usersLoginSchemaValidate, controller.login); //user login
  router.get("/get-all", controller.getUsers); //get all user
  router.get("/get-id/:id", controller.getUserById); //get all user
  router.patch("/update/:id", uploadSingle, controller.updateUser); //update user

  router.delete("/delete/:id", controller.deleteUser); //delete user
  router.post("/refresh-token", controller.refreshToken); //refreshToken
  return app.use("/api/users", router);
};
export default usersRouter;
