const express = require("express");
const router = express.Router();

const reviewsController = require("../controllers/reviews");
const validation = require("../middleware/validate");
const { isAuthenticated } = require("../middleware/authenticate");

router.get("/", reviewsController.getAll);

router.get("/:id", reviewsController.getSingle);

router.post(
    "/",
    isAuthenticated,
    validation.saveReview,
    reviewsController.createReview,
);

router.put(
    "/:id",
    isAuthenticated,
    validation.saveReview,
    reviewsController.updateReview,
);

router.delete("/:id", isAuthenticated, reviewsController.deleteReview);

module.exports = router;
