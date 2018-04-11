const Event = require('../models/Event');
const User = require('../models/User');
const HostLink = require('../models/HostLink');
const { contentfulAuth } = require('../middleware/auth');

async function contentfulWebhook(req, res) {
  // TODO: Check if req.body contains the right data or if its nested
  const isSynced = await Event.syncFromContentful(req.body);

  if (isSynced) {
    res.send('ok');
  } else {
    res.status(500).send('failed sync');
  }
}

async function contentfulUserEmailSearch(req, res) {
  const { email } = req.params;

  const user = await User.findOne({ email });

  if (! user) {
    return res.status(404).json({ error: true, message: 'User not found' });
  }

  return res.json({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: email,
    profilePhoto: user.profilePhoto,
  });
}

async function contentfulUserIdSearch(req, res) {
  const { userId } = req.params;

  const user = await User.findOne({ _id: userId });

  if (! user) {
    return res.status(404).json({ error: true, message: 'User not found' });
  }

  return res.json({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    profilePhoto: user.profilePhoto,
  });
}

async function contentfulCreateHostLoginLink(req, res) {
  const { contentfulId } = req.params;

  const hostCode = await HostLink.make(contentfulId);
  const link = `${process.env.APP_URL}/host/${hostCode}`;

  res.json({ link });
}

async function contentfulKeyVerify(req, res) {
  res.json({ ok: true });
}

module.exports = [
  {
    route: '/v1/contentful/webhook',
    method: 'post',
    handler: contentfulWebhook,
    middleware: contentfulAuth,
  },
  {
    route: '/v1/contentful/user/email/:email',
    method: 'get',
    handler: contentfulUserEmailSearch,
    middleware: contentfulAuth,
  },
  {
    route: '/v1/contentful/user/id/:userId',
    method: 'get',
    handler: contentfulUserIdSearch,
    middleware: contentfulAuth,
  },
  {
    route: '/v1/contentful/:contentfulId/host',
    method: 'post',
    handler: contentfulCreateHostLoginLink,
    middleware: contentfulAuth,
  },
  {
    route: '/v1/contentful/verify',
    method: 'get',
    handler: contentfulKeyVerify,
    middleware: contentfulAuth,
  },
];
