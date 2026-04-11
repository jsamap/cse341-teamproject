const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=["Roles"]
  try {
    const roles = await mongodb
      .getDatabase()
      .db("cse341-project")
      .collection("roles")
      .find()
      .toArray()
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(roles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSingle = async (req, res) => {
  //#swagger.tags=["Roles"]
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json("Must use a valid id to find a role.");
    }

    const roleId = new ObjectId(req.params.id);
    const roles = await mongodb
      .getDatabase()
      .db("cse341-project")
      .collection("roles")
      .find({ _id: roleId })
      .toArray()
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(roles[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createRole = async (req, res) => {
  //#swagger.tags=["Roles"]
  try {
    const role = {
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
      .collection("roles")
      .insertOne(role);
    if (response.acknowledged)
      res.status(201).json({ id: response.insertedId });
    else
      res
        .status(500)
        .json(
          response.error || "Some error ocurred while creating the role.",
        );
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateRole = async (req, res) => {
  //#swagger.tags=["Roles"]
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json("Must use a valid id to update a role.");
    }
    const roleId = new ObjectId(req.params.id);
    const role = {
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
      .collection("roles")
      .replaceOne({ _id: productId }, product);
    if (response.modifiedCount > 0) res.status(204).send();
    else
      res
        .status(500)
        .json(
          response.error || "Some error ocurred while updating the role.",
        );
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteRole = async (req, res) => {
  //#swagger.tags=["Roles"]
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json("Must use a valid id to delete a role.");
    }
    const roleId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDatabase()
      .db("project2")
      .collection("roles")
      .deleteOne({ _id: roleId });
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res
        .status(500)
        .json(
          response.error || "Some error occurred while deleting the role.",
        );
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createRole,
  updateRole,
  deleteRole,
};
