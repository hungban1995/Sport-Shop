import express from "express";
import * as dotenv from "dotenv";
import corsConfig from "./configs/cors.config";
import socketIo from "./socket.js";
import connectDB from "./configs/db.connect";
import staticConfig from "./configs/static.config";
import parseConfig from "./configs/parse.config";
import httpErrorConfig from "./configs/httpErrors.config";
import morgan from "morgan";

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

dotenv.config(); //dotenv config
connectDB(); //Connect db
const app = express(); //Defined app
corsConfig(app); //CORS configs
parseConfig(app, express); //Parse config

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
  res.send(`Hello`);
});

staticConfig(app); //Static configs
httpErrorConfig(app); //Catch server error

export default app;
