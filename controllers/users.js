import User from "../models/Users.js";
import { validateUser } from "../models/Users.js";

export default {
  createUser: async (req, res) => {
    const { error, value } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const user = await User.findOne({ email: req.body.email });
    if (user) return res.send(user?.generateAuthToken());

    const newUser = new User({
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
    const { userId } = req.params;
    const user = await User.find();
    //const user = await User.findById(userId);
    if (!user) return res.status(404).send(null);

    res.send(user);
  },
};
