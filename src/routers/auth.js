import { Router } from "express";
import { loginUserController, logoutController, refreshTokenController, registerUserController, resetPasswordController, sendResetPasswordEmailController } from "../controllers/auth.js";
import { ctrlWrapper } from "../middlewares/ctrlWrapper.js";
import { validateBody } from "../middlewares/validateBody.js";
import { registerUserSchema } from "../validation/registerUserSchema.js";
import { loginUserSchema } from "../validation/loginValidatorSchema.js";
import { setResedPasswordSchema } from "../validation/sendResetPasswordEmailSchema.js";
import { resetPasswordSchema } from "../validation/resetPasswordSchema.js";

const registerUserHandler = ctrlWrapper(registerUserController);
const loginUserHandler = ctrlWrapper(loginUserController);
const refreshTokenHandler = ctrlWrapper(refreshTokenController);
const logoutHandler = ctrlWrapper(logoutController);
const sendResetEmailHandler = ctrlWrapper(sendResetPasswordEmailController);
const resetPasswordHandler = ctrlWrapper(resetPasswordController);
const getOAuthUrlHandler = ctrlWrapper(getOAuthUrlController);

const authRouter = Router();

authRouter.post(
    '/register',
    validateBody(registerUserSchema),
    registerUserHandler
);

authRouter.post(
    '/login',
    validateBody(loginUserSchema),
    loginUserHandler
);

authRouter.post(
    '/refresh-token',
    refreshTokenHandler
);

authRouter.post(
    '/logout',
    logoutHandler
);

authRouter.post(
    '/send-reset-email',
    validateBody(setResedPasswordSchema),
    sendResetEmailHandler
);

authRouter.post(
    '/reset-password',
    validateBody(resetPasswordSchema),
    resetPasswordHandler
);

authRouter.post(
    '/get-oauth-url',
    getOAuthUrlHandler
);

export default authRouter;