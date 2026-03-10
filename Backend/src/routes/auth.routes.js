const authRouter = require("express").Router();
const authController = require("../controllers/auth.controller");
const { authUser } = require("../middlewares/auth.middleware");



authRouter.post("/register", authController.registerNewUserController);



authRouter.post("/login", authController.loginUserController)



authRouter.get("/getme", authUser, authController.getMeController);



authRouter.get("/logout", authUser, authController.logoutUserController)








module.exports = { authRouter };