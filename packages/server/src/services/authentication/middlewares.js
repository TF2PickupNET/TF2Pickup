// @flow

import {
  type ExpressRequest,
  type ExpressResponse,
} from '@feathersjs/express';
import ms from 'ms';

import { options } from '.';

export function redirectOnSuccess(req: ExpressRequest, res: ExpressResponse, next: () => void) {
  console.log(req.cookies);

  if (req.cookies && req.cookies.url) {
    res.clearCookie('url');

    res.redirect(req.cookies.url);
  }

  next();
}

export function setUrlCookie(req: ExpressRequest, res: ExpressResponse, next: () => void) {
  // Set the current url as a cookie so we can redirect to the exact url afterwards
  console.log(req.query);

  if (req.query.url) {
    res.cookie('url', req.query.url.slice(1));
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
