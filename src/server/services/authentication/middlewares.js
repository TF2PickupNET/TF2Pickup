// @flow

import {
  type ExpressRequest,
  type ExpressResponse,
} from '@feathersjs/express';
import ms from 'ms';

import { options } from '.';

const REDIRECT_URL_COOKIE = 'REDIRECT-URL';

export function redirectToUrlCookie(req: ExpressRequest, res: ExpressResponse, next: () => void) {
  if (req.cookies[REDIRECT_URL_COOKIE]) {
    res.redirect(req.cookies[REDIRECT_URL_COOKIE]);

    return;
  }

  next();
}

export function setUrlCookie(req: ExpressRequest, res: ExpressResponse, next: () => void) {
  // Set the current url as a cookie so we can redirect to the exact url afterwards
  if (req.query.url) {
    res.cookie(REDIRECT_URL_COOKIE, req.query.url);
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
