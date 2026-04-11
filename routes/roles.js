const express = require("express");
const router = express.Router();

const rolesController = require("../controllers/roles");
const validation = require("../middleware/validate");
const { isAuthenticated } = require("../middleware/authenticate");

router.get("/", rolesController.getAll);

router.get("/:id", rolesController.getSingle);

router.post(
    "/",
    isAuthenticated,
    validation.saveRole,
    rolesController.createRole,
);

router.put(
    "/:id",
    isAuthenticated,
    validation.saveRole,
    rolesController.updateRole,
);

router.delete("/:id", isAuthenticated, rolesController.deleteRole);

module.exports = router;
