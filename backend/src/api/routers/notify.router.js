import Notify from "../models/notify.model";
import express from "express";

const router = express.Router();
const notifyRouter = async (app) => {
  router.get("/", async (req, res, next) => {
    try {
      const notifications = await Notify.find({})
        .sort({
          createdAt: "desc",
        })
        .populate({ path: "sender", select: "role username avatar" });

      res.status(200).json({ success: "success", notifications });
    } catch (error) {
      next(error);
    }
  });
  //lay theo danh sach
  router.get("/recipient/:id", async (req, res, next) => {
    try {
      const { recipientId } = req.params;
      const notifications = await Notify.find({ recipient: recipientId }).sort({
        createdAt: "desc",
      });
      res.status(200).json({ success: "Lay thành công", notifications });
    } catch (error) {
      next(error);
    }
  });

  //lay theo order id
  router.get("/order/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      const activity = await Notify.find({ ofId: id }).sort({
        createdAt: "desc",
      });
      res.status(200).json({ success: "Lay thành công", activity });
    } catch (error) {
      next(error);
    }
  });

  // Đánh dấu thông báo đã đọc
  router.post("/read", async (req, res, next) => {
    try {
      const listId = req.body;
      let id;
      for (id of listId) {
        const checkRead = await Notify.findById(id);
        await Notify.findByIdAndUpdate(
          id,
          { read: !checkRead.read },
          { new: true }
        );
      }
      res.status(200).json({ success: "Success" });
    } catch (error) {
      next(error);
    }
  });

  // Xóa một thông báo
  router.delete("/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      await Notify.findByIdAndDelete(id);
      res.status(200).json({ success: "Xóa thành công" });
    } catch (error) {
      next(error);
    }
  });
  return app.use("/api/notifications", router);
};
export default notifyRouter;
