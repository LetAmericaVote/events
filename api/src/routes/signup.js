const Signup = require('../models/Signup');
const { loadUser, requiresAuth } = require('../middleware/auth');

async function getUserSignups(req, res) {
  const { requestUser } = res.locals;
  const { start, limit } = req.query;
  const parsedLimit = Math.max(parseInt(limit), 0);

  const findQuery = { user: requestUser.id };
  if (start) {
    findQuery.event = { '$gt': start };
  }

  const limitCount = parsedLimit > 25 ? 25 : parsedLimit;

  const signups = await this.find(findQuery)
    .limit(limitCount)
    .populate('event');

  return res.json({
    signups: signups.map(signup => ({
      ...signup,
      user: signup.user.getApiProfile(requestUser),
    }))
  });
}

async function getUserStatus(req, res) {
  const { requestUser } = res.locals;
  const { eventId } = req.params;

  const signup = await Signup.findOne({ user: requestUser, event: eventId });

  res.json({
    signupStatus: !!signup && !!signup.id,
  });
}

async function getEventSignups(req, res) {
  const { requestUser } = res.locals;
  const { eventId } = req.params;
  const { start, limit, sortBySignupDate } = req.query;
  const parsedLimit = Math.max(parseInt(limit), 0);

  const findQuery = { event: eventId };
  if (start) {
    findQuery.user = { '$gt': start };
  }

  const sortyQuery = sortBySignupDate ? { '_id': 1 } : {};

  const limitCount = parsedLimit > 25 ? 25 : parsedLimit;

  const signups = await this.find(findQuery)
    .sort(sortyQuery)
    .limit(limitCount)
    .populate('event user');

  return res.json({
    signups: signups.map(signup => ({
      ...signup,
      user: signup.user.getApiProfile(requestUser),
    }))
  });
}

async function postUserSignup(req, res) {
  const { requestUser } = res.locals;
  const { eventId } = req.params;

  const signup = Signup.makeSignup(requestUser, eventId);

  res.json({
    signup: {
      ...signup,
      user: signup.user.getApiProfile(requestUser),
    },
  });
}

module.exports = [
  {
    route: '/v1/signups/user',
    method: 'get',
    handler: getUserSignups,
    middleware: loadUser,
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
