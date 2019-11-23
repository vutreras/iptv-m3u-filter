/**
 * Exceptions by status http definitions
 * @autor vutreras
 */

class HttpException {

  constructor(httpStatus, code, message){
    this.httpStatus = httpStatus;
    this.exception = {
      code: code ? code.toString() : '',
      messade: message || '',
      details: undefined
    };
  }

  addDetail(field, message) {

    if (this.exception.details == undefined) {
      this.exception.details = [];
    }

    this.exception.details.push({
      field: field,
      message: message
    });

    return this;
  }
}

class BadRequestException extends HttpException {
  constructor(code, message){
    super(400, code, message);
  }
}

class ForbiddenException extends HttpException {
  constructor(code, message){
    super(403, code, message);
  }
}

class NotFoundException extends HttpException {
  constructor(code, message){
    super(404, code, message);
  }
}

class UnprocessableEntityException extends HttpException {
  constructor(code, message){
    super(422, code, message);
  }
}

class InternalErrorException extends HttpException {
  constructor(code, message){
    super(500, code, message);
  }
}

class BadGatewayException extends HttpException {
  constructor(code, message){
    super(502, code, message);
  }
}

module.exports = {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
  UnprocessableEntityException,
  InternalErrorException,
  BadGatewayException
};
