declare module '@feathersjs/errors' {
  export class FeathersError<Code extends number, Name extends string> {
    public message: string;

    public code: Code;

    public name: Name;

    public className: string;

    public data: {};

    public constructor(msg?: string, name?: Name, code?: Code, className?: string, data?: {});
  }

  export class BadRequest extends FeathersError<400, 'BadRequest'> {}

  export class NotAuthenticated extends FeathersError<401, 'NotAuthenticated'> {}

  export class PaymentError extends FeathersError<402, 'PaymentError'> {}

  export class Forbidden extends FeathersError<403, 'Forbidden'> {}

  export class NotFound extends FeathersError<404, 'NotFound'> {}

  export class MethodNotAllowed extends FeathersError<405, 'MethodNotAllowed'> {}

  export class NotAcceptable extends FeathersError<406, 'NotAcceptable'> {}

  export class Timeout extends FeathersError<408, 'Timeout'> {}

  export class Conflict extends FeathersError<409, 'Conflict'> {}

  export class LengthRequired extends FeathersError<411, 'LengthRequired'> {}

  export class Unprocessable extends FeathersError<422, 'Unprocessable'> {}

  export class TooManyRequests extends FeathersError<429, 'TooManyRequests'> {}

  export class GeneralError extends FeathersError<500, 'GeneralError'> {}

  export class NotImplemented extends FeathersError<501, 'NotImplemented'> {}

  export class BadGateway extends FeathersError<502, 'BadGateway'> {}

  export class Unavailable extends FeathersError<503, 'Unavailable'> {}
}
