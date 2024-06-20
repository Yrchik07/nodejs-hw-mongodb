import createHttpError from 'http-errors';
import { Contact } from '../db/models/сontact.js';

export const checkUserPermissions =
  (...roles) =>
  async (req, res, next) => {
    const user = req.user;
    const { contactId } = req.params;
    if (roles.includes('admin') && user.role === 'admin') {
      return next();
    }
    if (roles.includes('user') && user.role === 'user') {
      const contact = await Contact.findOne({
        _id: contactId,
        parentId: user._id,
      });
      if (!contact) {
        return next(createHttpError(403, 'This is not your contact!'));
      }
      return next();
    }
    return next(createHttpError(403, 'Forbidden!'));

  };
