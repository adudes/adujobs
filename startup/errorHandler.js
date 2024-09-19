export default () => {
  process.on("uncaughtException", (err) => {
    if (process.env.NODE_ENV === "production") {
      // winstone.error(err.message, err);
      console.log(err.message, err);
      process.exit(1);
    } else {
      console.log(err.message, err);
      process.exit(1);
    }
  });
  process.on("unhandledRejection", (err) => {
    if (process.env.NODE_ENV === "production") {
      //winstone.error(err.message, err);
      console.log(err.message, err);
      process.exit(1);
    } else {
      console.log(err.message, err);
      process.exit(1);
    }
  });
};
