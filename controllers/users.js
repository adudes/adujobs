// import User from "../models/Users.js";
// import { validateUser } from "../models/Users.js";
import Users from "../models/Users.js";
export default {
  createUser: async (req, res) => {
    const { error, value } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const user = await Users.findOne({ email: req.body.email });
    if (user) return res.send(user?.generateAuthToken());

    const newUser = new Users({
      ...value,
    });
    // const salt = await bcrypt.genSalt(10);
    // newUser.password = await bcrypt.hash(value.password, salt);
    await newUser.save();

    // res.header("x-auth-token", newUser.generateAuthToken()).send({
    //   fname: newUser.firstName,
    //   lastName: newUser.lastName,
    //   email: newUser.email,
    // });

    res.send(newUser.generateAuthToken());
  },
  getUser: async (req, res) => {
    const { userid } = req.params;
    console.log(userid);
    const user = await Users.findById(userid);
    console.log(user);
    if (!user) return res.status(404).send(null);

    res.send(user);
  },
};
