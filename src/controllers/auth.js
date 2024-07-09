import {
  createUser,
  loginOrSignupWithGoogleOAuth,
  loginUser,
  logoutUser,
  refreshSession,
  resetPassword,
  sendResetPassword,
} from '../services/auth.js';
import { generateOAuthURL } from '../utils/googleOAuth.js';

const setupSessionCookies = (res, session) => {
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expire: 30 * 24 * 60 * 60,
  });

  res.cookie('sessionToken', session.refreshToken, {
    httpOnly: true,
    expire: 30 * 24 * 60 * 60,
  });
};
export const registerUserController = async (req, res) => {
  const user = await createUser(req.body);
  res.status(201).json({
    status: 201,
    message: `Successfully created user  ${user.name}!`,
    data: user,
  });
};

export const loginUserController = async (req, res) => {
  const session = await loginUser(req.body);

  setupSessionCookies(res, session);
  res.json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: { accessToken: session.accessToken },
  });
};
export const logoutController = async (req, res) => {
  await logoutUser({
    sessionId: req.cookies.sessionId,
    sessionToken: req.cookies.sessionToken,
  });
  res.clearCookie('sessionId');
  res.clearCookie('sessionToken');

  res.status(204).send();
};

export const refreshTokenController = async (req, res) => {
  const { sessionId, sessionToken } = req.cookies;
  const session = await refreshSession({ sessionId, sessionToken });
  setupSessionCookies(res, session);

  res.json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: { accessToken: session.accessToken },
  });
};

export const sendResetPasswordEmailController = async (req, res) => {
  await sendResetPassword(req.body.email);
  res.json({
    status: 200,
    message: 'Reset password email has been successfully sent.',
    data: {},
  });
};

export const resetPasswordController = async (req, res) => {
  await resetPassword(req.body);

  res.json({
    status: 200,
    message: 'Password has been successfully reset.',
    data: {},
  });
};

export const getOAuthUrlController = (req, res) => {
  const url = generateOAuthURL();

  res.json({
    status: 200,
    message: 'Successfully received OAuth URL!',
    data: {
      url,
    },
  });
};

export const verifyGoogleOAuthController = async (req, res) => {
  const { code } = req.body;
  const session = await loginOrSignupWithGoogleOAuth(code);

  setupSessionCookies(res, session);

  res.json({
    status: 200,
    message: 'Logged in with Google OAuth!',
    data: { accessToken: session.accessToken },
  });
};
