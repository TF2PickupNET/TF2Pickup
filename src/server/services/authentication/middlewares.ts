import {
  Response,
  Request,
} from '@feathersjs/express';
import { isString } from '@utils/string';

import { options } from '.';

const REDIRECT_URL_COOKIE = 'REDIRECT-URL';

function setUrlCookie(req: Request, res: Response, next: () => void) {
  // Set the current url as a cookie so we can redirect to the exact url afterwards
  if (req.query.url) {
    res.cookie(REDIRECT_URL_COOKIE, req.query.url);
  }

  next();
}

async function handleSuccessfulAuthentication(
  req: Request,
  res: Response,
  next: () => void
) {
  // If the user is not logged in for some reason
  if (!req.user) {
    return res.sendStatus(401);
  }

  // Create a new jwt token
  const accessToken = await req.app.passport.createJWT({ id: req.user.id }, options);
  const url = req.cookies && req.cookies[REDIRECT_URL_COOKIE];

  if (isString(url)) {
    return res.redirect(`${url}?token=${accessToken}`);
  }

  return next();
}

export {
  handleSuccessfulAuthentication,
  setUrlCookie,
};
