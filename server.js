import express from "express";
//import winstone from 'winstone'
import db from "./startup/db.js";
import appRoutes from "./startup/appRoutes.js";
import config from "./startup/config.js";
import errorHandler from "./startup/errorHandler.js";
import prod from "./startup/prod.js";

const app = express();

errorHandler();
config(app);
appRoutes(app);
prod(app);

db(() => {
  app.listen(process.env.PORT || 7000, () => {
    if (process.env.NODE_ENV === "production")
      //winstone.info("Server is running...");
      console.log("====Server running after chainging port===");
    else console.log("Server is running...");
  });
});
