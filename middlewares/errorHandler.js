import { ServerAPIError } from 'common/error';
import { Error as MongooseError } from 'mongoose';

function errorHandler(err, req, res, next) {
  if (err) {
    if (err instanceof ServerAPIError) {
      const { code, message, data } = err;
      res.status(err.status).json({
        error: {
          code,
          message,
          data,
        },
      });
    } else if (err instanceof MongooseError) {
      res.status(400).json({
        error: {
          code: 40000,
          message: 'Can\'t handle request',
          data: {},
        },
      });
    } else {
      res.status(500).json({
        error: {
          code: 500,
          message: 'Internal Server Error',
          data: {},
        },
      });
    }
  }

  return next(err);
}

export default errorHandler;
