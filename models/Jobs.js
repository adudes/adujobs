import { Schema, model } from "mongoose";
import Joi from "joi";
import mongoose from "mongoose";

const jobsSchema = new Schema({
  type: {
    type: String,
    enum: ["JV", "JVA"],
    required: [true, "You should choose a type"],
  },
  company: {
    type: String,
    required: function () {
      return this.type === "JV";
    },
  },

  categories: { type: String, required: true },
  jobTitle: { type: String, required: true },
  status: {
    type: String,
    required: function () {
      return this.type === "JV";
    },
  },
  jobDesc: {
    type: String,
    required: function () {
      return this.type === "JV";
    },
  },
  jobRequirements: {
    type: String,
    required: function () {
      return this.type === "JV";
    },
  },
  numberOfWorkers: {
    type: Number,
    required: function () {
      return this.type === "JV";
    },
  },
  // deadline: {
  //   type: Date,
  //   required: function () {
  //     return this.type === "JV";
  //   },
  // },
  address: {
    type: String,
    required: function () {
      return this.type === "JV";
    },
  },
  salary: {
    type: Number,
    required: function () {
      return this.type === "JV";
    },
  },
  images: {
    type: [String],
    required: function () {
      return this.type === "JVA";
    },
  },

  location: {
    latitude: {
      type: Number,
      required: [true, "Latitude is required"],
    },
    longitude: {
      type: Number,
      required: [true, "Longitude is required"],
    },
  },
  applicants: {
    type: [Schema.Types.ObjectId],
    ref: "User",
  },

  region: {
    type: String,
    required: function () {
      return this.type === "JVA";
    },
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Job = mongoose.model("Job", jobsSchema);

export default Job;

export const validateJob = (job) => {
  const schema = Joi.object({
    type: Joi.string().valid("JV", "JVA").required(),
    company: Joi.string().when("type", { is: "JV", then: Joi.required() }),
    categories: Joi.string().required(),
    jobTitle: Joi.string().required(),
    jobDesc: Joi.string().when("type", { is: "JV", then: Joi.required() }),
    jobRequirements: Joi.string().when("type", {
      is: "JV",
      then: Joi.required(),
    }),
    status: Joi.string().when("type", {
      is: "JV",
      then: Joi.required(),
    }),
    numberOfWorkers: Joi.number().when("type", {
      is: "JV",
      then: Joi.required(),
    }),
    // deadline: Joi.date().when("type", { is: "JV", then: Joi.required() }),
    address: Joi.string().when("type", { is: "JV", then: Joi.required() }),
    salary: Joi.number().when("type", { is: "JV", then: Joi.required() }),
    images: Joi.string().when("type", { is: "JVA", then: Joi.required() }),
    location: Joi.object({
      latitude: Joi.number().required(),
      longitude: Joi.number().required(),
    }).required(),
    applicants: Joi.array().items(Joi.objectId()),

    region: Joi.string().when("type", { is: "JVA", then: Joi.required() }),
    owner: Joi.objectId().required(),
    createdAt: Joi.date().default(Date.now),
    updatedAt: Joi.date().default(Date.now),
  });

  return schema.validate(job);
};
