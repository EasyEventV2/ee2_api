function verifyToken(req, res, next) {
  const bearerHeader = req.headers.authorization;
  if (typeof bearerHeader !== 'undefined') {
    const token = bearerHeader.split(' ')[1];
    req.token = token;
    next();
  } else {
    res.status(403).json({
      error: {
        code: 40301,
        message: 'Fobbiden: Unauthorized',
        data: {},
      },
    });
  }
}

export default verifyToken;
