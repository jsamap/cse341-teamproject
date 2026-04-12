const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;
const bcrypt = require('bcrypt');

const getAll = async (req, res) => {
    //#swagger.tags=["Users"]
    try {
        const users = await mongodb
            .getDatabase()
            .db("cse341-project")
            .collection("users")
            .find()
            .toArray();
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getSingle = async (req, res) => {
    //#swagger.tags=["Users"]
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json("Must use a valid id to find a user.");
        }

        const userId = new ObjectId(req.params.id);
        const users = await mongodb
            .getDatabase()
            .db("cse341-project")
            .collection("users")
            .find({ _id: userId })
            .toArray();
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(users[0]);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const createUser = async (req, res) => {
    //#swagger.tags=["Users"]    
    try {
        const user = {
            fname: req.body.fname,
            lname: req.body.lname,
            email: req.body.email,
            password: await bcrypt.hash(req.body.password, 10),
            role_id: new ObjectId(req.body.role_id),
        };
        const response = await mongodb
            .getDatabase()
            .db("cse341-project")
            .collection("users")
            .insertOne(user);
        if (response.acknowledged)
            res.status(201).json({ id: response.insertedId });
        else
            res.status(500).json(
                response.error || "Some error ocurred while creating the user.",
            );
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateUser = async (req, res) => {
    //#swagger.tags=["Users"]
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res
                .status(400)
                .json("Must use a valid id to update a user.");
        }
        const userId = new ObjectId(req.params.id);
        const user = {
            fname: req.body.fname,
            lname: req.body.lname,
            email: req.body.email,
            password: await bcrypt.hash(req.body.password, 10),
            role_id: new ObjectId(req.body.role_id),
        };
        const response = await mongodb
            .getDatabase()
            .db("cse341-project")
            .collection("users")
            .replaceOne({ _id: userId }, user);
        if (response.modifiedCount > 0) res.status(204).send();
        else
            res.status(500).json(
                response.error || "Some error ocurred while updating the user.",
            );
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deleteUser = async (req, res) => {
    //#swagger.tags=["Users"]
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res
                .status(400)
                .json("Must use a valid id to delete a user.");
        }
        const userId = new ObjectId(req.params.id);
        const response = await mongodb
            .getDatabase()
            .db("cse341-project")
            .collection("users")
            .deleteOne({ _id: userId });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(
                response.error ||
                    "Some error occurred while deleting the user.",
            );
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAll,
    getSingle,
    createUser,
    updateUser,
    deleteUser,
};
