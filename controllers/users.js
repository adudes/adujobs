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
    await newUser.save();

    res.send(newUser.generateAuthToken());
  },
  getUser: async (req, res) => {
    const { userid } = req.params;
    const user = await Users.findById(userid);
    if (!user) return res.status(404).send(null);

    res.send(user);
  },
  updateUser: async (req, res) => {
    const { userid } = req.params;
    const { error, value } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await Users.findByIdAndUpdate(userid, value, { new: true });
    if (!user) return res.status(404).send(null);

    res.send(user);
  },
  deleteUser: async (req, res) => {
    const { userid } = req.params;
    const user = await Users.findByIdAndDelete(userid);
    if (!user) return res.status(404).send(null);

    res.send({ message: "User deleted successfully" });
  },
};
