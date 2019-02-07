import {
  ExpressRequest,
  ExpressResponse,
} from '@feathersjs/express';

import { isString } from '@utils/string';

const REDIRECT_URL_COOKIE = 'REDIRECT-URL';

function setUrlCookie(req: ExpressRequest, res: ExpressResponse, next: () => void) {
  // Set the current url as a cookie so we can redirect to the exact url afterwards
  if (req.query.url) {
    res.cookie(REDIRECT_URL_COOKIE, req.query.url);
  }

  next();
}

async function createJWT(req: ExpressRequest, res: ExpressResponse, next: () => void) {
  // Create a new jwt token
  // @ts-ignore
  const { accessToken } = await req.app.service('authentication').create(
    {},
    { payload: { id: req.user.id } },
  );

  if (req.cookies && isString(req.cookies[REDIRECT_URL_COOKIE])) {
    res.redirect(`${req.cookies[REDIRECT_URL_COOKIE]}?token=${accessToken}`);

    return;
  }

  next();
}

export {
  createJWT,
  setUrlCookie,
};
