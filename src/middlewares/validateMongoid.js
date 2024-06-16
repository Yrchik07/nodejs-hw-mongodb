import createHttpError from "http-errors";
import { isValidObjectId} from "mongoose";

export const validateMongoid = (idName = 'id') => (req, res, next) => {
    const contactId = req.params[idName];

    if(!contactId){
      throw new Error('id in validateMongoid is not provided!');
    }

    if(!isValidObjectId(contactId)){
      return next(createHttpError(400, 'Invalid contact id!'));
    }
    return next();
};