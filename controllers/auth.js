import User from "../models/Users.js";
import bcrypt from "bcrypt";
import Joi from "joi";

export default async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password");

  res.send(user.generateAuthToken());
};

export const validateUser = (user) => {
  const authSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  return authSchema.validate(user);
};
