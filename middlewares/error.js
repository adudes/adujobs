//import winstone from "winstone";
export default function (error, req, res, next) {
  if (process.env.NODE_ENV === "production") {
    // winstone.error(error.message, err);
    console.log(error.message, error);
  }
  console.log(error.message, error);

  return res.status(500).send(error.message);
}
