import { Server } from "socket.io";

export const socketIo = (httpServer) => {
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
    socket.on("client-message", (data) => {
      console.log("client Data.", data);
      //sent client
      io.emit("server-message", data);
    });
    socket.on("disconnect", (data) => {
      io.emit("Socket disconnect");
    });
  });
};
