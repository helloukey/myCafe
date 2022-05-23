const express = require("express");
const router = express.Router();
const myController = require("../controllers/myController");
const { requireAuth, pageAuth } = require("../middleware/authMiddleware");

router.get("/", myController.landing)
router.get("/register", pageAuth, myController.registerGET)
router.post("/register", myController.registerPOST)
router.get("/login", pageAuth, myController.loginGET)
router.post("/login", myController.loginPOST)
router.get("/logout", requireAuth, myController.logout)
router.get("/create", requireAuth, myController.createRecipe)
router.post("/create", requireAuth, myController.postRecipe)
router.get("/recipes", requireAuth, myController.getRecipes)
router.get("/recipes/:id", requireAuth, myController.getDetails)
router.get("*", myController.ErrorPage)

module.exports = router;