const { loadUser } = require('../middleware/auth');
const Event = require('../models/Event');

async function getEvents(req, res) {
  const { requestUser } = res.locals;
  const { start, limit, sortByDateTime } = req.query;
  const parsedLimit = Math.max(parseInt(limit), 0);

  const findQuery = {
    dateTime: {
      '$gte': new Date(),
    },
  };

  if (start) {
    findQuery['_id'] = {
      '$gt': start,
    };
  }

  const limitCount = parsedLimit > 25 ? 25 : parsedLimit;
  const sortQuery = (sortByDateTime === 'true') ? { dateTime: 1 } : {};

  const events = await Event.find(findQuery)
    .sort(sortQuery)
    .limit(limitCount);

  res.json({
    events: events.map(event => ({
      ...event,
      hostUser: event.hostUser.getApiProfile(requestUser),
    })),
  });
}

async function getEventById(req, res) {
  const { requestUser } = res.locals;
  const { eventId } = req.params;

  const event = await Event.findById(eventId);
  if (! event) {
    return res.status(404).json({ error: true, message: 'Event not found' });
  }

  return res.json({
    event: {
      ...event,
      hostUser: event.hostUser.getApiProfile(requestUser),
    },
  });
}

async function getEventBySlug(req, reas) {
  const { requestUser } = res.locals;
  const { eventSlug } = req.params;

  const event = await Event.findBySlug(eventSlug);
  if (! event) {
    return res.status(404).json({ error: true, message: 'Event not found' });
  }

  return res.json({
    event: {
      ...event,
      hostUser: event.hostUser.getApiProfile(requestUser),
    },
  });
}

async function getEventsByGeoLocation(req, res) {
  const { requestUser } = res.locals;
  const { long, lat, minDistance, maxDistance, excludeId } = req.query;

  if (! long || ! lat) {
    return res.status(400).json({ error: true, message: 'Missing lat/long' });
  }

  const parsedLong = parseFloat(long);
  const parsedLat = parseFloat(lat);

  if (isNaN(parsedLong) || isNaN(parsedLat)) {
    return res.status(400).json({ error: true, message: 'Invalid lat/long' });
  }

  if (excludeId && (! Array.isArray(excludeId) || excludeId.length > 25)) {
    return res.status(400).json({ error: true, message: 'Invalid excludeId parameter' });
  }

  const searchArgs = [
    parsedLong,
    parsedLat,
    (parseFloat(minDistance) || 0),
    (parseFloat(maxDistance) || 50000),
    (excludeId || []),
  ];

  const events = await Event.findByLatLong(...searchArgs);

  res.json({
    events: events.map(event => ({
      ...event,
      hostUser: event.hostUser.getApiProfile(requestUser),
    })),
  });
}

module.exports = [
  {
    route: '/v1/events',
    method: 'get',
    handler: getEvents,
    middleware: loadUser,
  },
  {
    route: '/v1/events/id/:eventId',
    method: 'get',
    handler: getEventById,
    middleware: loadUser,
  },
  {
    route: '/v1/events/slug/:eventSlug',
    method: 'get',
    handler: getEventBySlug,
    middleware: loadUser,
  },
  {
    route: '/v1/events/location',
    method: 'get',
    handler: getEventsByGeoLocation,
    middleware: loadUser,
  },
];
