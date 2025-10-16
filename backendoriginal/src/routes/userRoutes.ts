import {Router} from "express";
import { AuthMiddleware } from "../middleware/authmMiddleware.js";
import { UserController } from "../controllers/userProController.js";


const router = Router();
const userController  = new UserController();
const authMiddleware = new AuthMiddleware();


router.get("/me",authMiddleware.verifyToken,userController.getProfile);
router.put("/me",authMiddleware.verifyToken,userController.updateProfile);


export default router;