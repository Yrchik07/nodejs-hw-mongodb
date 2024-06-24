import { Router } from "express";
import { loginUserController, logoutController, refreshTokenController, registerUserController } from "../controllers/auth.js";
import { ctrlWrapper } from "../middlewares/ctrlWrapper.js";
import { validateBody } from "../middlewares/validateBody.js";
import { registerUserSchema } from "../validation/registerUserSchema.js";
import { loginUserSchema } from "../validation/loginValidatorSchema.js";

const registerUserHandler = ctrlWrapper(registerUserController);
const loginUserHandler = ctrlWrapper(loginUserController);
const refreshTokenHandler = ctrlWrapper(refreshTokenController);
const logoutHandler = ctrlWrapper(logoutController);

const authRouter = Router();
authRouter.post('/register', validateBody(registerUserSchema), registerUserHandler);
authRouter.post('/login', validateBody(loginUserSchema), loginUserHandler);
authRouter.post('/refresh-token', refreshTokenHandler);
authRouter.post('/logout', logoutHandler);
export default authRouter;