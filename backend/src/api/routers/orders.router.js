import * as controller from "../controllers/orders.controller";

const ordersRouter = async (app, express) => {
  const router = express.Router();
  router.post("/create", controller.createOrder);
  router.get("/get-all", controller.getAll);
  router.get("/get-order/:id", controller.getById);
  router.patch("/update/:id", controller.updateOrder);
  router.delete("/delete/:id", controller.deleteOrder);
  return app.use("/api/orders", router);
};
export default ordersRouter;
