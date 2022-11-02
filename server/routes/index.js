const router = require("express").Router();
const index = require("../controllers/indexController");

router.post("/signIn", index.signIn);
router.post("/logIn", index.logIn);
router.get("/logOut", index.logOut);

module.exports = { router };