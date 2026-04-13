const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=["Reviews"]
    try {
        const reviews = await mongodb
            .getDatabase()
            .db("cse341-project")
            .collection("reviews")
            .find()
            .toArray();
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(reviews);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getSingle = async (req, res) => {
    //#swagger.tags=["Reviews"]
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res
                .status(400)
                .json("Must use a valid id to find a review.");
        }

        const reviewId = new ObjectId(req.params.id);
        const reviews = await mongodb
            .getDatabase()
            .db("cse341-project")
            .collection("reviews")
            .find({ _id: reviewId })
            .toArray();
        res.setHeader("Content-Type", "application/json");
        if (reviews.length === 0) {
            return res
                .status(404)
                .json("No review found with the provided id.");
        }
        res.status(200).json(reviews[0]);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const createReview = async (req, res) => {
    //#swagger.tags=["Reviews"]
    try {
        const review = {
            product_id: new ObjectId(req.body.product_id),
            user_id: new ObjectId(req.body.user_id),
            rating: Number(req.body.rating),
            comment: req.body.comment,
            created: new Date(req.body.created),
        };
        const response = await mongodb
            .getDatabase()
            .db("cse341-project")
            .collection("reviews")
            .insertOne(review);
        if (response.acknowledged)
            res.status(201).json({ id: response.insertedId });
        else
            res.status(500).json(
                response.error ||
                    "Some error ocurred while creating the review.",
            );
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateReview = async (req, res) => {
    //#swagger.tags=["Reviews"]
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res
                .status(400)
                .json("Must use a valid id to update a review.");
        }
        const reviewId = new ObjectId(req.params.id);
        const review = {
            product_id: new ObjectId(req.body.product_id),
            user_id: new ObjectId(req.body.user_id),
            rating: Number(req.body.rating),
            comment: req.body.comment,
            created: new Date(req.body.created),
        };
        const response = await mongodb
            .getDatabase()
            .db("cse341-project")
            .collection("reviews")
            .replaceOne({ _id: reviewId }, review);
        if (response.modifiedCount > 0) res.status(204).send();
        else
            res.status(500).json(
                response.error ||
                    "Some error ocurred while updating the review.",
            );
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deleteReview = async (req, res) => {
    //#swagger.tags=["Reviews"]
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res
                .status(400)
                .json("Must use a valid id to delete a review.");
        }
        const reviewId = new ObjectId(req.params.id);
        const response = await mongodb
            .getDatabase()
            .db("cse341-project")
            .collection("reviews")
            .deleteOne({ _id: reviewId });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(
                response.error ||
                    "Some error occurred while deleting the review.",
            );
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAll,
    getSingle,
    createReview,
    updateReview,
    deleteReview,
};
