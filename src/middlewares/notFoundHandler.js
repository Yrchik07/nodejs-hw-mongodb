export const notFoundHandler = (req, res) => {
 return res.status(404).json({
    status: 404,
    message: 'Route not found',
  });
};
