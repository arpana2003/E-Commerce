import Router from "express"
import { changePassword, forgotPassword, getProfile, login, logout, register, resetPassword, updateUser  } from "../controllers/userController.js";
import upload from "../middlewares/multerMiddleware.js"
import { isLoggedIn } from "../middlewares/authMiddleware.js";
const router = Router();

router.post("/register", upload.single("avatar"), register);
router.post("/login", login);
router.get("/logout",isLoggedIn, logout);

router.get("/me",isLoggedIn, getProfile)
router.post("/reset", forgotPassword)
router.post("/reset/:resetToken", resetPassword)
router.post("/change-password",isLoggedIn, changePassword)
router.put("/update/:id",isLoggedIn,upload.single("avatar"), updateUser)


export default router; 