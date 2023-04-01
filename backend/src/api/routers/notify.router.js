import Notify from "../models/notify.model";
import express from "express";

const router = express.Router();
const notifyRouter = async (app) => {
  //lay theo danh sach
  router.get("/:recipientId", async (req, res, next) => {
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

  // Đánh dấu một thông báo đã đọc
  router.patch("/:id/read", async (req, res, next) => {
    try {
      const { id } = req.params;
      const notify = await Notify.findByIdAndUpdate(
        id,
        { read: true },
        { new: true }
      );
      res.status(200).json({ success: "Read", notify });
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
