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

async function contentfulUserSearch(req, res) {
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
  });
}

async function contentfulCreateHostLoginLink(req, res) {
  const { contentfulId } = req.body;

  const hostCode = await HostLink.make(contentfulId);
  const link = `${process.env.APP_URL}/host/${hostCode}`;

  res.json({ link });
}

module.exports = [
  {
    route: '/v1/contentful/webhook',
    method: 'post',
    handler: contentfulWebhook,
    middleware: contentfulAuth,
  },
  {
    route: '/v1/contentful/user/:email',
    method: 'get',
    handler: contentfulUserSearch,
    middleware: contentfulAuth,
  },
  {
    route: '/v1/contentful/:contentfulId/host',
    method: 'post',
    handler: contentfulCreateHostLoginLink,
    middleware: contentfulAuth,
  },
];
