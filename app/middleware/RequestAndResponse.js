/**
 * Middleware for custom responses
 * @autor vutreras
 */

const logger = require('../utils/logger');
const { InternalErrorException } = require('../exception/HttpException');

module.exports = function(req, res, next) {

  res.responseOk = function(data) {
    res.set({ 'content-type': 'text/plain; charset=utf-8' });
    res.status(200).send(data);
  };

  res.responseError = function(error) {
    logger.error('Response error', error);
    if (error == undefined) {
      error = new InternalErrorException(5001, 'Internal Undefined Error');
    }
    if (error.httpStatus == null || error.httpStatus == undefined || isNaN(error.httpStatus)) {
      error = new InternalErrorException(5002, 'Internal Unknown Error');
    }
    return res.status(error.httpStatus).json(error.exception);
  };

  next();
};
