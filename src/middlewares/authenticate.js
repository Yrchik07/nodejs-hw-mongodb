import createHttpError from "http-errors";
import { Session } from "../db/models/session.js";
import { User } from "../db/models/user.js";

export const authenticate = async (req, res, next) => {
    const header = req.get('Authorization');
    if(!header) {
       return next(createHttpError(401, 'Auth header is not provided!')) ;
    }
    const [bearer, token] = header.split(' ');
    if(bearer !== 'Bearer' || !token) {
       return next(createHttpError(401, 'Auth header should be Bearer type!')) ;
    }
    const session = await Session.findOne({ accessToken: token });

    if(!session) {
       return next(createHttpError(401, 'Session not found!')) ;
    }
    if(new Date() > session.accessTokenValidUntil) {
       return next(createHttpError(401, 'Token is expired or invalid.')) ;
    }
   const user = await User.findById(session.userId);
    if(!user) {
       return next(createHttpError(401, 'User associated with thissession is not found!')) ;
    }
    req.user = user;
   return next();
};