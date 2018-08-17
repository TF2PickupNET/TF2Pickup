// @flow

import {
  type ExpressRequest,
  type ExpressResponse,
} from '@feathersjs/express';
import ms from 'ms';

import { options } from '.';

const REDIRECT_URL_HEADER = 'Location';

export function redirectToUrlCookie(req: ExpressRequest, res: ExpressResponse, next: () => void) {
  const redirectUrl = req.get(REDIRECT_URL_HEADER);

  if (typeof redirectUrl === 'string') {
    res.redirect(redirectUrl);
  }

  next();
}

export function setUrlCookie(req: ExpressRequest, res: ExpressResponse, next: () => void) {
  // Set the current url as a cookie so we can redirect to the exact url afterwards
  if (req.query.url) {
    res.set(REDIRECT_URL_HEADER, req.query.url);
  }

  next();
}

export async function createJWT(req: ExpressRequest, res: ExpressResponse, next: () => void) {
  // Create a new jwt token
  const token = await req.app.passport.createJWT({ id: req.user.id }, req.app.get('auth'));

  // Set the new jwt token as a cookie
  res.cookie(options.cookie.name, token, { maxAge: ms(options.jwt.expiresIn) });

  next();
}
