import helmet from "helmet";
//import compression from "compression";
export default (app) => {
  if (process.env.NODE_ENV === "production") {
    app.use(helmet());
    //app.use(compression());
  }
};
