import { UnauthorizedError, PermissionDeniedError } from 'common/error';

function verifyUser(req, res, next) {
  if (!req.uid) {
    throw new UnauthorizedError();
  }
  if (req.params.userId !== 'me' && req.params.userId !== req.uid) {
    throw new PermissionDeniedError();
  }
  next();
}

export default verifyUser;
