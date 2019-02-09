/* tslint:disable:max-classes-per-file */

declare module '@feathersjs/errors' {
  class FeathersError<Code extends number, Name extends string> {
    public message: string;

    public code: Code;

    public name: Name;

    public className: string;

    public data: {};

    public constructor(msg?: string, name?: Name, code?: Code, className?: string, data?: {});
  }

  class BadRequest extends FeathersError<400, 'BadRequest'> {}

  class NotAuthenticated extends FeathersError<401, 'NotAuthenticated'> {}

  class PaymentError extends FeathersError<402, 'PaymentError'> {}

  class Forbidden extends FeathersError<403, 'Forbidden'> {}

  class NotFound extends FeathersError<404, 'NotFound'> {}

  class MethodNotAllowed extends FeathersError<405, 'MethodNotAllowed'> {}

  class NotAcceptable extends FeathersError<406, 'NotAcceptable'> {}

  class Timeout extends FeathersError<408, 'Timeout'> {}

  class Conflict extends FeathersError<409, 'Conflict'> {}

  class LengthRequired extends FeathersError<411, 'LengthRequired'> {}

  class Unprocessable extends FeathersError<422, 'Unprocessable'> {}

  class TooManyRequests extends FeathersError<429, 'TooManyRequests'> {}

  class GeneralError extends FeathersError<500, 'GeneralError'> {}

  class NotImplemented extends FeathersError<501, 'NotImplemented'> {}

  class BadGateway extends FeathersError<502, 'BadGateway'> {}

  class Unavailable extends FeathersError<503, 'Unavailable'> {}

  export {
    FeathersError,
    BadRequest,
    NotAuthenticated,
    PaymentError,
    Forbidden,
    NotFound,
    MethodNotAllowed,
    NotAcceptable,
    Timeout,
    Conflict,
    LengthRequired,
    Unprocessable,
    TooManyRequests,
    GeneralError,
    NotImplemented,
    BadGateway,
    Unavailable,
  };
}
