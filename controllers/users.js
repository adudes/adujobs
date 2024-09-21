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
    const user = await Users.findById(userid)
      .populate("coin.userId")
      .populate("rate.userId")
      .exec();

    if (!user) return res.status(404).send(null);

    res.send(user);
  },
  updateUser: async (req, res) => {
    const { userid } = req.params;
    // const { error, value } = validateUser(req.body);
    // if (error) return res.status(400).send(error.details[0].message);

    const user = await Users.findByIdAndUpdate(userid, req.body, { new: true });
    if (!user) return res.status(404).send(null);

    res.send(user);
  },
  deleteUser: async (req, res) => {
    const { userid } = req.params;
    const user = await Users.findByIdAndDelete(userid);
    if (!user) return res.status(404).send(null);
    res.send({ message: "User deleted successfully" });
  },

  addCoinToUser: async (req, res) => {
    const { userid } = req.params;
    const user = await Users.findById(userid);
    if (!user) {
      throw new Error("User not found");
    }

    const existingCoin = user.coin.find(
      (coin) => coin.userId.toString() === req.body.userId
    );
    if (existingCoin) {
      existingCoin.numberOfCoins =
        existingCoin.numberOfCoins + coinData.numberOfCoins;
    } else {
      user.coin.push(coinData);
    }

    await user.save();
    console.log("Coin added or updated successfully:", user);
    res.send(user);
  },
  rateUser: async (req, res) => {
    const { userid } = req.params;
    const user = await Users.findById(userid);
    if (!user) {
      throw new Error("User not found");
    }

    const existingRate = user.rate.find(
      (rate) => rate.userId.toString() === req.body.userId
    );
    if (existingRate) {
      existingRate.numberOfRates = req.body?.numberOfRates;
    } else {
      user.rate.push(req.body);
    }

    await user.save();
    console.log("Coin added or updated successfully:", user);
    res.send(user);
  },
};
