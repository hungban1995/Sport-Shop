import express from "express";
import * as dotenv from "dotenv";
import corsConfig from "./configs/cors.config";
import helmetConfig from "./configs/helmet.config";
import connectDB from "./configs/db.connect";
import staticConfig from "./configs/static.config";
import parseConfig from "./configs/parse.config";
import httpErrorConfig from "./configs/httpErrors.config";
import morgan from "morgan";
import headerConfig from "./configs/header.config";
import * as router from "../src/api/routers";
import http from "http";
import { Server } from "socket.io";

dotenv.config(); //dotenv config
connectDB(); //Connect db
const app = express(); //Defined app
//socket-io
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: true,
    credentials: true,
  },
});

helmetConfig(app); //Helmet configs
corsConfig(app); //CORS configs
parseConfig(app, express); //Parse config
headerConfig(app); //Configs to client read file
app.use(morgan("common")); //Morgan configs
//API routes
router.usersRouter(app, express);
router.categoriesRouter(app, express);
router.categoriesPostsRouter(app, express);
router.postsRouter(app, express);
router.postCommentRouter(app, express);
router.productsVariantsRouter(app, express);

router.productsRouter(app, express);
router.ordersRouter(app, express);

app.get("/", (req, res, next) => {
  res.send("hello");
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
    //sent client
    io.emit("user disconnect");
  });
});

staticConfig(app); //Static configs
httpErrorConfig(app); //Catch server error

export default httpServer;
