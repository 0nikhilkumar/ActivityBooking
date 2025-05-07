import { Router } from "express"
import { validate } from "../middlewares/validation.middleware.js";
import { loginSchema, registerSchema } from "../validators/auth.validation.js";
import { login, register } from "../controllers/user.controller.js";

const router = Router();

router.route("/register").post(validate(registerSchema), register);
router.route("/login").post(validate(loginSchema), login);

export default router;