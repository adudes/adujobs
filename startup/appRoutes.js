import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
//import winstone from "winstone";

import routes from "../routes/routes.js";
import error from "../middlewares/error.js";
// https://adu-com-td1c.onrender.com
//http://localhost:5173
export default (app) => {
  // app.use(cors({ origin: "http://localhost:5173" }));

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static("public"));
  app.use(helmet());
  app.use(morgan("tiny"));
  app.use("/route", routes);
  app.use(error);
};
