import StoreProduct, {
  validateStoreProduct as validateProduct,
} from "../models/StoreProducts.js";

export default {
  createStoreProduct: async (req, res) => {
    // const { error } = validateProduct(req.body);
    // if (error) return res.status(400).send(error.details[0].message);
    console.log(req.body);
    let storeProduct = new StoreProduct(req.body);
    storeProduct = await storeProduct.save();
    console.log(storeProduct);
    res.send(storeProduct);
  },

  getAllStoreProduct: async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const storeProducts = await StoreProduct.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    const count = await StoreProduct.countDocuments();
    console.log(count);
    res.json({
      storeProducts,
      totalPages: Math.ceil(count / limit),
      count: count,
      currentPage: page,
    });
  },

  getStoreProductByCategory: async (req, res) => {
    const { category } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const storeProducts = await StoreProduct.find({ categories: category })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    const count = await StoreProduct.countDocuments({ categories: category });
    res.json({
      storeProducts,
      totalPages: Math.ceil(count / limit),
      count: count,
      currentPage: page,
    });
  },

  getStoreProductBySubCategory: async (req, res) => {
    const { subCategory } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const storeProducts = await StoreProduct.find({
      subCategories: subCategory,
    })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    const count = await StoreProduct.countDocuments({
      subCategories: subCategory,
    });
    res.json({
      storeProducts,
      totalPages: Math.ceil(count / limit),
      count: count,
      currentPage: page,
    });
  },

  deleteStoreProduct: async (req, res) => {
    const storeProduct = await StoreProduct.findByIdAndDelete(req.params.id);
    if (!storeProduct) {
      console.log("Deleted Succesfully");
      return res.status(404).send("Product not found");
    }
    res.send(storeProduct);
  },

  updateStoreProduct: async (req, res) => {
    // const { error } = validateProduct(req.body);
    // if (error) return res.status(400).send(error.details[0].message);

    const storeProduct = await StoreProduct.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!storeProduct) return res.status(404).send("Product not found");
    console.log(storeProduct);
    res.send(storeProduct);
  },
};
