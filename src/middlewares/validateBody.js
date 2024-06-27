import createHttpError from 'http-errors';

export const validateBody =(schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body, {
       abortEarly: false
      });
    next();
  } catch (err) {
      const errorMessages = err.details.map(detail => detail.message).join(', ');
      const error = createHttpError(400, errorMessages, {
        errors: err.details,
    });
    next(error);
  }
};
