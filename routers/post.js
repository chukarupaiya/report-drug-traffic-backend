
const { GetPostDetailsById } = require("../controllers/GetPostDetailsById");
const { GetPostDetailsAll } = require("../controllers/GetPostDetailsAll");
const { AddPost } = require("../controllers/AddPost");
const { UpdatePost } = require("../controllers/UpdatePost");
const { verifyToken } = require("../controllers/middleware/verifyToken");


const router = require("express").Router();


router.post("/fetch/byid",GetPostDetailsById);
router.post("/fetch/all",GetPostDetailsAll);
router.post("/add",AddPost);
router.post("/update",UpdatePost);


module.exports = router;
