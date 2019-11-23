import configs from 'configs/index';
import jwt, { TokenExpiredError } from 'jsonwebtoken';
import { UnauthorizedError, InvalidTokenError } from 'common/error';

const secretKey = configs.SECRET_KEY;

function verifyToken(req, res, next) {
  const bearerHeader = req.headers.authorization;
  if (bearerHeader) {
    const splitedHeader = bearerHeader.split(' ');
    const token = splitedHeader[1];
    jwt.verify(token, secretKey, (err, result) => {
      if (err) {
        if (err instanceof TokenExpiredError) {
          throw new InvalidTokenError({ code: 40302, message: 'TokenExpired' });
        }
        throw new InvalidTokenError();
      }
      req.uid = result.uid;
      next();
    });
  } else {
    throw new UnauthorizedError();
  }
}

export default verifyToken;
