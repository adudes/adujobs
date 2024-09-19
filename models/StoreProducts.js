import { Schema, model } from "mongoose";
import Joi from "joi";

import mongoose from "mongoose";
const storeProductSchema = new Schema({
  type: {
    type: String,
    enum: ["DMP", "FS"],
    required: [true, "You should choose account type"],
  },
  categories: {
    type: String,
    required: [true, "Category is required"],
    lowercase: true,
  },
  subCategories: {
    type: String,
    required: [true, "Sub Category is required"],
    lowercase: true,
  },
  images: {
    type: [String],
    required: true,
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    minlength: [20, "Description must be at least 20 characters"],
    maxlength: [50, "Description must be less than 50 characters"],
    lowercase: true,
  },

  name: {
    type: String,
    required: [true, "Product name is required"],
    minlength: [4, "Product name must be at least 4 characters"],
    maxlength: [20, "Product name must be less than 20 characters"],
    lowercase: true,
  },
  times: {
    type: Number,
    default: 0,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const StoreProduct = mongoose.model("storeProduct", storeProductSchema);

export default StoreProduct;

export const validateStoreProduct = (product) => {
  const productSchema = Joi.object({
    type: Joi.string().valid("DMP", "FS").required().label("Type"),
    categories: Joi.string().required().min(2).max(50).label("Categories"),
    subCategories: Joi.string()
      .required()
      .min(2)
      .max(50)
      .label("Subcategories"),
    images: Joi.array()
      .items(Joi.string().required())
      .required()
      .label("Images"),
    description: Joi.string().required().min(20).max(50).label("Description"),
    name: Joi.string().required().min(4).max(20).label("Name"),
  });

  return productSchema.validate(product);
};
