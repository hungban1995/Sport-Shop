import express from "express";
import path from "path";
const __dirname = path.resolve();
const staticConfig = (app) => {
  app.use(express.static(__dirname + "/src/public/"));
  app.set("viewEngine", "ejs");
  app.set("views", "./src/views");
};
export default staticConfig;
