function methodNotAllowedHandler(req, res, next) {
  res.status(405).json({
    error: {
      code: 405,
      message: `The ${req.method} for ${req.originalUrl} is not allowed`,
      data: {},
    },
  });
}

export default methodNotAllowedHandler;
