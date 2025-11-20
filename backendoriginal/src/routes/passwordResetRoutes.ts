import {Router} from "express";
import { PasswordResetController } from "../controllers/passwordController.js";

const router = Router();
const resetController = new PasswordResetController();

router.post("/request",resetController.resetReq);
router.post("/reset",resetController.passwordRes);

export default router;