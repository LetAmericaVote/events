const mongoose = require('mongoose');
const { loadUser } = require('../middleware/auth');
const Event = require('../models/Event');

async function getEvents(req, res) {
  const { requestUser } = res.locals;
  const { start, limit, sortByUpcoming } = req.query;
  const parsedLimit = Math.max(parseInt(limit), 0) || 25;

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
  const sortQuery = (sortByUpcoming === 'true') ? { dateTime: -1 } : {};

  const events = await Event.find(findQuery)
    .sort(sortQuery)
    .limit(limitCount)
    .populate('hostUser');

  const formattedEvents = await Event.formatArrayOfEvents(events, requestUser);

  const remainingCount = await Event.count(findQuery);
  const remaining = remainingCount - formattedEvents.length;
  const total = await Event.count();

  res.json({
    events: formattedEvents,
    meta: {
      total,
      remaining,
    },
  });
}

async function getEventById(req, res) {
  const { requestUser } = res.locals;
  const { eventId } = req.params;

  const event = await Event.findById(eventId);
  if (! event) {
    return res.status(404).json({ error: true, message: 'Event not found' });
  }

  const formattedEvent = await event.getApiResponse(requestUser);

  return res.json({
    event: formattedEvent,
  });
}

async function getEventBySlug(req, res) {
  const { requestUser } = res.locals;
  const { eventSlug } = req.params;

  const event = await Event.findBySlug(eventSlug);
  if (! event) {
    return res.status(404).json({ error: true, message: 'Event not found' });
  }

  const formattedEvent = await event.getApiResponse(requestUser);

  return res.json({
    event: formattedEvent,
  });
}

async function getEventsByGeoLocation(req, res) {
  const { requestUser } = res.locals;
  const { lon, lat, minDistance, maxDistance, excludeId } = req.query;

  if (! lon || ! lat) {
    return res.status(400).json({ error: true, message: 'Missing lat/long' });
  }

  const parsedLong = parseFloat(lon);
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

  const formattedEvents = await Event.formatArrayOfEvents(events, requestUser);

  res.json({
    events: formattedEvents,
  });
}

async function getBulkEvents(req, res) {
  const { requestUser } = res.locals;
  const { eventIds } = req.query;

  const parsedIds = Array.isArray(eventIds) ? eventIds : Object.values(eventIds);

  if (! parsedIds || ! parsedIds.length || parsedIds.length > 25) {
    return res.status(400).json({ error: true, message: 'Invalid event ids' });
  }

  const events = await Event.find({
    '_id': {
      '$in': parsedIds.map(eventId => mongoose.Types.ObjectId(eventId)),
    },
  });

  const formattedEvents = await Event.formatArrayOfEvents(events, requestUser);

  res.json({
    events: formattedEvents,
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
    route: '/v1/events/bulk',
    method: 'get',
    handler: getBulkEvents,
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
