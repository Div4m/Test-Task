import {Router} from "express";
import { AdminController } from "../controllers/adminController.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";
import { AuthMiddleware } from "../middleware/authmMiddleware.js";


const router = Router();
const auth = new AuthMiddleware();
const adminController = new AdminController();

router.get("/", auth.verifyToken, adminMiddleware, adminController.getAllUsers);
router.get("/:userId", auth.verifyToken, adminMiddleware, adminController.getUserById);
router.put("/:userId", auth.verifyToken, adminMiddleware, adminController.updateUser);
router.delete("/:userId", auth.verifyToken, adminMiddleware, adminController.deleteUser);

export default router;