import Router from "express"
import {getAllCategory, createCategory, updateCategory, removeCategory , addItemsToCategoryById , removeItemFromCategory, addToWishlist,removeFromWishlist} from "../controllers/itemController.js";
import { authorizedRoles, isLoggedIn } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multerMiddleware.js"

const router = Router();

router.route('/')
        .get(getAllCategory)
        .post(isLoggedIn, authorizedRoles("ADMIN"),upload.single('thumbnail'), createCategory )
        .delete(isLoggedIn , authorizedRoles("ADMIN"), removeItemFromCategory)

router.route('/:id')        
        .put(isLoggedIn, authorizedRoles("ADMIN"), updateCategory )
        .delete(isLoggedIn,authorizedRoles('ADMIN'),removeCategory)
        .post(isLoggedIn,authorizedRoles("ADMIN"),upload.single('itemImage'),addItemsToCategoryById);

router.post("/wishlist", isLoggedIn, addToWishlist); 
router.delete("/wishlist/:itemId", isLoggedIn, removeFromWishlist);       

export default router;