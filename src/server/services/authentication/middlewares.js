// @flow

import {
  type ExpressRequest,
  type ExpressResponse,
} from '@feathersjs/express';

const REDIRECT_URL_COOKIE = 'REDIRECT-URL';

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

  if (req.cookies[REDIRECT_URL_COOKIE]) {
    res.redirect(`${req.cookies[REDIRECT_URL_COOKIE]}login/steam?token=${token}`);

    return;
  }

  next();
}
