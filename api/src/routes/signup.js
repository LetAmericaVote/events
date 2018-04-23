const Signup = require('../models/Signup');
const HostLink = require('../models/HostLink');
const Event = require('../models/Event');
const { loadUser, requiresAuth } = require('../middleware/auth');

async function getUserSignups(req, res) {
  const { requestUser } = res.locals;
  const { start, limit } = req.query;
  const parsedLimit = Math.max(parseInt(limit), 0) || 25;

  const findQuery = { user: requestUser.id };
  if (start) {
    findQuery._id = { '$gt': start };
  }

  const limitCount = parsedLimit > 25 ? 25 : parsedLimit;

  const signups = await Signup.find(findQuery)
    .limit(limitCount);

  const formattedSignups = await Signup.formatArrayOfSignups(signups, requestUser, true);

  const remainingCount = await Signup.count(findQuery);
  const remaining = remainingCount - formattedSignups.length;
  const total = await Signup.count();

  return res.json({
    signups: formattedSignups,
    meta: {
      total,
      remaining,
    },
  });
}

async function getUserStatus(req, res) {
  const { requestUser } = res.locals;
  const { eventId } = req.params;

  const signup = await Signup.findOne({ user: requestUser, event: eventId });

  const formattedSignup = await signup.getApiResponse(requestUser, true);

  res.json({
    signupStatus: !!signup && !!signup.id,
    signup: formattedSignup,
  });
}

async function getEventSignups(req, res) {
  const { requestUser } = res.locals;
  const { eventId } = req.params;
  const { start, limit, sortBySignupDate } = req.query;
  const parsedLimit = Math.max(parseInt(limit), 0) || 25;

  const findQuery = { event: eventId };
  if (start) {
    findQuery._id = { '$gt': start };
  }

  const sortyQuery = sortBySignupDate ? { '_id': 1 } : {};

  const limitCount = parsedLimit > 25 ? 25 : parsedLimit;

  const signups = await Signup.find(findQuery)
    .sort(sortyQuery)
    .limit(limitCount)

  const formattedSignups = await Signup.formatArrayOfSignups(signups, requestUser, true);

  const remainingCount = await Signup.count(findQuery);
  const remaining = remainingCount - formattedSignups.length;
  const total = await Signup.count();

  return res.json({
    signups: formattedSignups,
    meta: {
      total,
      remaining,
    },
  });
}

async function postUserSignup(req, res) {
  const { requestUser } = res.locals;
  const { eventId } = req.params;
  const { hostCode } = req.body;

  if (hostCode) {
    const hostLink = await HostLink.findOne({ hostCode });

    if (! hostLink || ! hostLink.id) {
      return res.status(400).json({ error: true, message: 'Invalid host link' });
    }

    const inSynced = await hostLink.sync(requestUser);

    if (! isSynced) {
      return res.status(400).json({ error: true, message: 'Invalid host link' });
    }
  }

  const signup = await Signup.makeSignup(requestUser, eventId);
  const formattedSignup = await signup.getApiResponse(requestUser, true);

  res.json({
    signup: formattedSignup,
  });
}

module.exports = [
  {
    route: '/v1/signups/user',
    method: 'get',
    handler: getUserSignups,
    middleware: requiresAuth,
  },
  {
    route: '/v1/signups/user/status/:eventId',
    method: 'get',
    handler: getUserStatus,
    middleware: requiresAuth,
  },
  {
    route: '/v1/signups/event/:eventId',
    method: 'get',
    handler: getEventSignups,
    middleware: loadUser,
  },
  {
    route: '/v1/signups/event/:eventId',
    method: 'post',
    handler: postUserSignup,
    middleware: requiresAuth,
  },
];
