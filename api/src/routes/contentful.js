const Event = require('../models/Event');
const { CONTENTFUL_WEBHOOK_KEY } = process.env;

async function contentfulWebhook(req, res) {
  const contentfulWebhookKey = req.headers['X-Contentful-Webhook-Key'];
  if (contentfulWebhookKey !== CONTENTFUL_WEBHOOK_KEY) {
    return res.status(401).json({ error: true, message: 'Unauthorized webhook' });
  }

  // TODO: Check if deletion.

  const isSynced = await Event.syncFromContentful(req.body); // TODO: Check if this is the right body...

  if (isSynced) {
    res.send('ok');
  } else {
    res.status(500).send('failed sync');
  }
}

module.exports = [
  {
    route: '/v1/contentful/webhook',
    method: 'post',
    handler: contentfulWebhook,
  },
];
