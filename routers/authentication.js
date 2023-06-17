const router = require("express").Router();
const { Login } = require("../controllers/login");
const { verifyToken } = require("../controllers/middleware/verifyToken");
const { register } = require("../controllers/register");

router.post("/register", register);
router.post("/login", Login);

module.exports = router;
