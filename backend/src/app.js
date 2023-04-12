import express from "express";
import * as dotenv from "dotenv";
import corsConfig from "./configs/cors.config";
// import helmetConfig from "./configs/helmet.config";
import connectDB from "./configs/db.connect";
import staticConfig from "./configs/static.config";
import parseConfig from "./configs/parse.config";
import httpErrorConfig from "./configs/httpErrors.config";
import morgan from "morgan";
import headerConfig from "./configs/header.config";
import cookieParser from "cookie-parser";
import {
  categoriesPostsRouter,
  categoriesRouter,
  imagesRouter,
  notifyRouter,
  ordersRouter,
  postCommentRouter,
  postsRouter,
  productsRouter,
  productsVariantsRouter,
  usersRouter,
} from "../src/api/routers";
import http from "http";
import { socketIo } from "./socket";

dotenv.config(); //dotenv config
connectDB(); //Connect db
const app = express(); //Defined app
//socket-io
const httpServer = http.createServer(app);
// Use cookie-parser middleware
app.use(cookieParser());

// helmetConfig(app); //Helmet configs
corsConfig(app); //CORS configs
parseConfig(app, express); //Parse config
headerConfig(app); //Configs to client read file
app.use(morgan("common")); //Morgan configs
//API routes
imagesRouter(app);
categoriesRouter(app);
usersRouter(app);
categoriesPostsRouter(app);
postsRouter(app);
postCommentRouter(app);
productsVariantsRouter(app);

productsRouter(app);
ordersRouter(app);
notifyRouter(app);
imagesRouter(app);

app.get("/", (req, res, next) => {
  const myCookie = req.cookies.myCookie;
  res.send(`The value of myCookie is: ${myCookie}`);
});
socketIo(httpServer);

staticConfig(app); //Static configs
httpErrorConfig(app); //Catch server error

export default httpServer;
