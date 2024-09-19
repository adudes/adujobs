import jsonwebtoken from "jsonwebtoken";
export default function (req, res, next) {
  const token = req.header("x-auth-token");
  console.log("coming here and there");
  console.log(token);
  if (!token) return res.status(401).send("Acess denied. No token provided");

  try {
    const decodedToken = jsonwebtoken.verify(
      token,
      "Thisitokenrealityforfutue"
    );
    req.user = decodedToken;
    next();
  } catch (error) {
    console.log("====from authonthicating middleware====");
    console.log(error);
    res.status(500).send("Invalid token");
  }
}
