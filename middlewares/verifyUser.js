import { UnauthorizedError, PermissionDeniedError } from 'common/error';

function verifyUser(req, res, next) {
  if (!req.uid) {
    throw new UnauthorizedError();
  }
  let reqUserId = req.params.userId;
  if (reqUserId === 'me') {
    reqUserId = req.uid;
  } else if (reqUserId !== req.uid) {
    throw new PermissionDeniedError();
  }
  next();
}

export default verifyUser;
