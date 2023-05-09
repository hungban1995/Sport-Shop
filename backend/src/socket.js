import { Server } from "socket.io";
import Notify from "./api/models/notify.model";
import http from "http";
import app from "./app.js";
const httpServer = http.createServer(app);

export const socketIo = () => {
  const io = new Server(httpServer, {
    cors: {
      origin: true,
      credentials: true,
    },
  });
  //connect-io
  io.on("connection", (socket) => {
    console.log("Connected socket.");
    //listen client
    socket.on("client-message", async (data) => {
      //save data
      try {
        await Notify.create(data);
      } catch (error) {
        return {
          error: { status: 401, error: decode.error },
        };
      }
      //sent client
      io.emit("server-message", "You have new message");
    });
    socket.on("disconnect", (data) => {
      io.emit("Socket disconnect");
    });
  });
};
