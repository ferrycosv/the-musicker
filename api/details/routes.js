const controllers = require("./controllers.js");
const express = require("express");

const router = express.Router();

router.get("/:source/:id", controllers.detail);

module.exports = router;
