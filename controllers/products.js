const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=["Products"]
  try {
    const products = await mongodb
      .getDatabase()
      .db("cse341-project")
      .collection("products")
      .find()
      .toArray()
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSingle = async (req, res) => {
  //#swagger.tags=["Products"]
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json("Must use a valid id to find a product.");
    }

    const productId = new ObjectId(req.params.id);
    const products = await mongodb
      .getDatabase()
      .db("cse341-project")
      .collection("products")
      .find({ _id: productId })
      .toArray()
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(products[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createProduct = async (req, res) => {
  //#swagger.tags=["Products"]
  try {
    const product = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      image: req.body.image,
      rating: req.body.rating,
      reviews: req.body.reviews,
      created: req.body.created,
    };
    const response = await mongodb
      .getDatabase()
      .db("project2")
      .collection("products")
      .insertOne(product);
    if (response.acknowledged)
      res.status(201).json({ id: response.insertedId });
    else
      res
        .status(500)
        .json(
          response.error || "Some error ocurred while creating the product.",
        );
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateProduct = async (req, res) => {
  //#swagger.tags=["Products"]
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json("Must use a valid id to update a product.");
    }
    const productId = new ObjectId(req.params.id);
    const product = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      image: req.body.image,
      rating: req.body.rating,
      reviews: req.body.reviews,
      created: req.body.created,
    };
    const response = await mongodb
      .getDatabase()
      .db("project2")
      .collection("products")
      .replaceOne({ _id: productId }, product);
    if (response.modifiedCount > 0) res.status(204).send();
    else
      res
        .status(500)
        .json(
          response.error || "Some error ocurred while updating the product.",
        );
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteProduct = async (req, res) => {
  //#swagger.tags=["Products"]
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json("Must use a valid id to delete a product.");
    }
    const productId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDatabase()
      .db("project2")
      .collection("products")
      .deleteOne({ _id: productId });
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res
        .status(500)
        .json(
          response.error || "Some error occurred while deleting the product.",
        );
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createProduct,
  updateProduct,
  deleteProduct,
};
