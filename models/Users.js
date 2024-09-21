import { Schema, model } from "mongoose";
import Joi from "joi";
import jsonwebtoken from "jsonwebtoken";
const userSchema = new Schema({
  displayName: {
    type: String,
    required: [true, "Display name is required"],
    minlength: [2, "Display name must be at least 2 characters"],
    maxlength: [50, "Display name must be less than 50 characters"],
    lowercase: true,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: function (v) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email address`,
    },
  },

  profilePicture: { type: String },
  accessToken: { type: String },
  coin: [
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      numberOfCoins: {
        type: Number,
        required: true,
        min: 0,
      },
    },
  ],
  rate: [
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      numberOfRates: {
        type: Number,
        required: true,
        min: 0,
      },
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jsonwebtoken.sign(
    {
      id: this._id,
      displayName: this.displayName,
      profilePicture: this.profilePicture,
      accessToken: this.accessToken,
    },
    "Thisitokenrealityforfutue"
  );
  return token;
};
export default model("User", userSchema);

export const validateUser = (user) => {
  const userSchema = Joi.object({
    displayName: Joi.string().required().min(2).max(50).label("Display name"),
    email: Joi.string()
      .required()
      .email({ minDomainSegments: 2, tlds: { allow: false } })
      .label("Email"),
    profilePicture: Joi.string().required().label("Profile Picture"),

    accessToken: Joi.string().required().label("Access token"),
    // password: Joi.string()
    //   .required()
    //   .min(8)
    //   .pattern(/[a-z]/)
    //   .pattern(/[A-Z]/)
    //   .pattern(/[@$!%*?&]/)
    //   .label("Password"),
    // accessMeans: Joi.string().label("Access Means"),
    // accountType: Joi.string().label("Account Type"),
    // school: Joi.string().label("Categories"),
    // isAgree: Joi.boolean().valid(true).label("Agreement"),
  });

  return userSchema.validate(user);
};

export const validateUserChange = (user) => {
  const userSchema = Joi.object({
    firstName: Joi.alternatives()
      .try(Joi.string().min(2).max(50).required(), Joi.forbidden())
      .label("First name"),
    lastName: Joi.alternatives()
      .try(Joi.string().min(2).max(50).required(), Joi.forbidden())
      .label("Last name"),
    email: Joi.alternatives()
      .try(
        Joi.string()
          .email({ minDomainSegments: 2, tlds: { allow: false } })
          .required(),
        Joi.forbidden()
      )
      .label("Email"),
    password: Joi.alternatives()
      .try(
        Joi.string()
          .min(8)
          .pattern(/[a-z]/)
          .pattern(/[A-Z]/)
          .pattern(/[@$!%*?&]/)
          .required(),
        Joi.forbidden()
      )
      .label("Password"),
    learnerRole: Joi.alternatives()
      .try(Joi.string(), Joi.forbidden())
      .label("Learner Role"),
    accountType: Joi.alternatives()
      .try(Joi.string(), Joi.forbidden())
      .label("Account Type"),
    school: Joi.alternatives()
      .try(Joi.string(), Joi.forbidden())
      .label("Categories"),
    placeLearner: Joi.boolean().label("Place Learner"),

    isAgree: Joi.alternatives()
      .try(Joi.boolean().valid(true), Joi.forbidden())
      .label("Agreement"),
  });

  return userSchema.validate(user, { abortEarly: false });
};
export const validateKidRegistration = (kid) => {
  const kidSchema = Joi.object({
    firstName: Joi.string().required().min(2).max(50).label("First name"),
    lastName: Joi.string().required().min(2).max(50).label("Last name"),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: false } })
      .label("Email"),
    password: Joi.string()
      .min(8)
      .pattern(/[a-z]/)
      .pattern(/[A-Z]/)
      .pattern(/[@$!%*?&]/)
      .label("Password"),
    accessMeans: Joi.string().label("Access Means"),
  });

  return kidSchema.validate(kid);
};
export const validateKidCompleteRegistration = (kid) => {
  const kidSchema = Joi.object({
    addedLearnerType: Joi.alternatives()
      .try(Joi.string(), Joi.forbidden())
      .label("Categories"),
    profilePicture: Joi.string(),
    gender: Joi.string().valid("male", "female", "other"),
    age: Joi.number().integer().min(11).max(12),
    address: Joi.string(),
    accessMeans: Joi.string().valid("remote", "in-person"),
    // completeRegistration: Joi.boolean(),
  });

  return kidSchema.validate(kid);
};
