import express from "express";

const router = express.Router();

const searchRouter = async (app) => {
  router.post("/"); //search single model
  router.get("/all"); //search all model

  return app.use("/api/search", router);
};
export default searchRouter;
