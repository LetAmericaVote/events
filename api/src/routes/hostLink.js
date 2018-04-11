const { loadUser } = require('../middleware/auth');
const Event = require('../models/Event');
const HostLink = require('../models/HostLink');

async function getEventForHostCode(req, res) {
  const { requestUser } = res.locals;
  const { hostCode } = req.params;

  const hostLink = await HostLink.findOne({ hostCode });

  if (! hostLink || ! hostLink.id) {
    return res.status(404).json({ error: true, message: 'Invalid host code' });
  }

  const event = await Event.findOne({ contentfulId: hostLink.contentfulId });

  if (! event || ! event.id) {
    return res.status(404).json({ error: true, message: 'Invalid host code' });
  }

  const formattedEvent = await event.getApiResponse(requestUser);

  return res.json({
    event: formattedEvent,
  });
}

module.exports = [
  {
    route: '/v1/host/event/:hostCode',
    method: 'get',
    handler: getEventForHostCode,
    middleware: loadUser,
  },
];
