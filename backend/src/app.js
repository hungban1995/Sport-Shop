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
dotenv.config(); //dotenv config
connectDB(); //Connect db
const app = express(); //Defined app
helmetConfig(app); //Helmet configs
corsConfig(app); //CORS configs
parseConfig(app, express); //Parse config
headerConfig(app); //Configs to client read file
app.use(morgan("common")); //Morgan configs

//API routes//

app.get("/", (req, res, next) => {
  res.send("hello");
});
staticConfig(app); //Static configs
httpErrorConfig(app); //Catch server error

export default app;
