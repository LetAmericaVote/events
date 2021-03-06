const User = require('../models/User');
const Token = require('../models/Token');
const { ADMIN_ROLE } = require('../lib/common');

async function loadUser(req, res, next) {
  const lavAuthId = req.headers.lav_auth_id;
  const lavAuthToken = req.headers.lav_auth_token;

  const result = await Token.validateUserToken(lavAuthId, lavAuthToken);

  if (result.isValid) {
    res.locals.requestUser = result.user;
  }

  next();
}

async function requiresAuth(req, res, next) {
  const lavAuthId = req.headers.lav_auth_id;
  const lavAuthToken = req.headers.lav_auth_token;

  const result = await Token.validateUserToken(lavAuthId, lavAuthToken);

  if (result.user && result.user.flag) {
    return res.status(401).json({ error: true, message: 'You\'re account has been suspended.' });
  }

  if (result.isValid) {
    res.locals.requestUser = result.user;
    return next();
  }

  res.status(401).json({ error: true, message: 'Unauthorized' });
}

async function requiresAdmin(req, res, next) {
  const lavAuthId = req.headers.lav_auth_id;
  const lavAuthToken = req.headers.lav_auth_token;

  const result = await Token.validateUserToken(lavAuthId, lavAuthToken);

  if (result.user && result.user.flag) {
    return res.status(401).json({ error: true, message: 'You\'re account has been suspended.' });
  }

  if (result.isValid && result.user.role === ADMIN_ROLE) {
    res.locals.requestUser = result.user;
    return next();
  }

  res.status(401).json({ error: true, message: 'Unauthorized. Requires administrator.' });
}

async function contentfulAuth(req, res, next) {
  const contentfulAuthKey = req.headers['x-rowboat-contentful-key'];

  if (contentfulAuthKey === process.env.CONTENTFUL_ROWBOAT_API_KEY) {
    return next();
  }

  res.status(401).json({ error: true, message: 'Invalid key' });
}

module.exports = {
  loadUser,
  requiresAuth,
  requiresAdmin,
  contentfulAuth,
};
