import {Router} from "express";
import { AdminController } from "../controllers/adminController.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";
import { AuthMiddleware } from "../middleware/authmMiddleware.js";


const router = Router();
const auth = new AuthMiddleware();
const adminController = new AdminController();
//user routes
router.get("/users", auth.verifyToken, adminMiddleware, adminController.getAllUsers);
router.get("/users/:userId", auth.verifyToken, adminMiddleware, adminController.getUserById);
router.put("/users/:userId", auth.verifyToken, adminMiddleware, adminController.updateUser);
router.delete("/users/:userId", auth.verifyToken, adminMiddleware, adminController.deleteUser);

//role routes

router.post("/roles",auth.verifyToken,adminMiddleware,adminController.createRole);
router.get("/roles",auth.verifyToken,adminMiddleware,adminController.getRoles);
router.get("/roles/:roleId",auth.verifyToken,adminMiddleware,adminController.getRoleById)
router.delete("/roles/:roleId",auth.verifyToken,adminMiddleware,adminController.deleteRole)

//permission

router.post("/permissions",auth.verifyToken,adminMiddleware,adminController.createPermission);
router.get("/permissions",auth.verifyToken,adminMiddleware,adminController.getAllPermissions);

//permission role

router.post("/assign-permission",auth.verifyToken,adminMiddleware,adminController.assignPermissionToRole);
router.post("/remove-permission",auth.verifyToken,adminMiddleware,adminController.removePermissionFromRole);
router.post("/assign-role",auth.verifyToken,adminMiddleware,adminController.assignRoleToUser);

export default router;