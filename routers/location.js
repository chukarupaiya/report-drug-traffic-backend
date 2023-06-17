const { GetLocationDetailsAll } = require("../controllers/GetLocationDetailsAll");
const { AddLocation } = require("../controllers/AddLocation");
const { verifyToken } = require("../controllers/middleware/verifyToken");

const router = require("express").Router();

router.post("/fetch/all",GetLocationDetailsAll);
router.post("/add",AddLocation);

module.exports = router;
