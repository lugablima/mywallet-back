import { Router } from "express";
import { signUp, signIn } from "../controllers/authController.js";
import validateNewUser from "../middlewares/validateNewUser.js";
import validateLoginUser from "../middlewares/validateLoginUser.js";

const router = Router();

router.post("/sign-up", validateNewUser, signUp);

router.post("/sign-in", validateLoginUser, signIn);

export default router;
