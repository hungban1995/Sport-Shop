import * as controller from "../controllers/orders.controller";
import express from "express";

const router = express.Router();
const ordersRouter = async (app) => {
  router.post("/create", controller.createOrder);
  router.get("/get-all", controller.getAll);
  router.get("/get-order/:id", controller.getById);
  router.patch("/update/:id", controller.updateOrder);
  router.delete("/delete/:id", controller.deleteOrder);
  router.get("/count", controller.getCount);
  return app.use("/api/orders", router);
};
export default ordersRouter;
