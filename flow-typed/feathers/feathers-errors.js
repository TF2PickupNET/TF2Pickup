// @flow strict-local

declare module '@feathersjs/errors' {
  declare export class FeathersError<Code: number, Name: string> {
    constructor(msg: string, name: Name, code: Code, className: string, data: {}): this,
    message: string,
    code: Code,
    name: Name,
    className: string,
    data: {},
  }

  declare export class BadRequest extends FeathersError<400, 'BadRequest'> {}

  declare export class NotAuthenticated extends FeathersError<401, 'NotAuthenticated'> {}

  declare export class PaymentError extends FeathersError<402, 'PaymentError'> {}

  declare export class Forbidden extends FeathersError<403, 'Forbidden'> {}

  declare export class NotFound extends FeathersError<404, 'NotFound'> {}

  declare export class MethodNotAllowed extends FeathersError<405, 'MethodNotAllowed'> {}

  declare export class NotAcceptable extends FeathersError<406, 'NotAcceptable'> {}

  declare export class Timeout extends FeathersError<408, 'Timeout'> {}

  declare export class Conflict extends FeathersError<409, 'Conflict'> {}

  declare export class LengthRequired extends FeathersError<411, 'LengthRequired'> {}

  declare export class Unprocessable extends FeathersError<422, 'Unprocessable'> {}

  declare export class TooManyRequests extends FeathersError<429, 'TooManyRequests'> {}

  declare export class GeneralError extends FeathersError<500, 'GeneralError'> {}

  declare export class NotImplemented extends FeathersError<501, 'NotImplemented'> {}

  declare export class BadGateway extends FeathersError<502, 'BadGateway'> {}

  declare export class Unavailable extends FeathersError<503, 'Unavailable'> {}

  declare export default {
    BadRequest: Class<BadRequest>,
    NotAuthenticated: Class<NotAuthenticated>,
    PaymentError: Class<PaymentError>,
    Forbidden: Class<Forbidden>,
    NotFound: Class<NotFound>,
    MethodNotAllowed: Class<MethodNotAllowed>,
    NotAcceptable: Class<NotAcceptable>,
    Timeout: Class<Timeout>,
    Conflict: Class<Conflict>,
    LengthRequired: Class<LengthRequired>,
    Unprocessable: Class<Unprocessable>,
    TooManyRequests: Class<TooManyRequests>,
    GeneralError: Class<GeneralError>,
    NotImplemented: Class<NotImplemented>,
    BadGateway: Class<BadGateway>,
    Unavailable: Class<Unavailable>,
  }
}
