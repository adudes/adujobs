import mongoose from "mongoose";
import asyncError from "../config/asyncError.js";

export default asyncError(async (startServer) => {
  await mongoose.connect(
    process.env.NODE_ENV === "production"
      ? process.env.PROD_DATABASE_URL
      : process.env.DEV_DATABASE_URL
  );
  if (process.env.NODE_ENV === "production")
    console.log("connected to database");
  // winstone.info("connected to database");
  else console.log("connected to database");

  startServer();
});
