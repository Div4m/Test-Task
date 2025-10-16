import {Router} from "express";
import { SignupController } from "../controllers/SinupController.js"; 
import { LoginController } from "../controllers/LoginController.js";

const router = Router();
const signupController = new SignupController();
const loginController  = new LoginController();


router.post("/signup",signupController.signup);
router.post("/login",loginController.login);


export default router;