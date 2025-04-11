import express from "express"
import signUp from "../controllers/user/user.signup.js";
import login from "../controllers/user/user.login.js";
import update from "../controllers/user/user.update.js";
import deleteUser from "../controllers/user/user.delete.js";
import authMiddleware from "../middlewares/user.middleware.js";
import profile from "../controllers/user/user.profile.js";
import logout from "../controllers/user/user.logout.js";

const userRouter = express.Router();

userRouter.post("/login",login);
userRouter.post("/signUp",signUp)
userRouter.get("/profile",authMiddleware,profile);
userRouter.delete("/delete",authMiddleware,deleteUser);
// userRouter.get("/favourite",favourite)
userRouter.put("/update/",authMiddleware,update);
userRouter.post("/logout",authMiddleware,logout)

export default userRouter