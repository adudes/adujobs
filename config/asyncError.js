export default function (handler) {
  return async (param) => {
    try {
      await handler(param);
    } catch (error) {
      if (process.env.NODE_ENV === "production") {
        //winstone.error(error.message, error);
        console.log(error.message, error);
      } else {
        console.log(error.message, error);
      }
    }
  };
}
