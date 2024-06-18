import { Router } from "express";
import { loginUserController, logoutController, refreshTokenController, registerUserController } from "../controllers/auth.js";
import { ctrlWrapper } from "../middlewares/ctrlWrapper.js";
import { validateBody } from "../middlewares/validateBody.js";
import { registerUserSchema } from "../validation/registerUserSchema.js";
import { loginUserSchema } from "../validation/loginValidatorSchema.js";

const authRouter = Router();
authRouter.post('/register', validateBody(registerUserSchema), ctrlWrapper(registerUserController));
authRouter.post('/login', validateBody(loginUserSchema), ctrlWrapper(loginUserController));
authRouter.post('/refresh-token', ctrlWrapper(refreshTokenController));
authRouter.post('/logout', ctrlWrapper(logoutController));
export default authRouter;