const Flag = require('../models/Flag');
const Comment = require('../models/Comment');
const Signup = require('../models/Signup');
const User = require('../models/User');
const Event = require('../models/Event');
const { loadUser, requiresUser } = require('../middleware/auth');
const { USER_ROLE, ADMIN_ROLE } = require('../lib/roles');

async function getFlag(req, res) {
  const { requestUser } = res.locals;
  const { flagId } = req.params;

  const flag = await Flag.findOne({ _id: flagId });

  if (! flag || ! flag.id) {
    return res.status(404).json({ error: true, message: 'Flag not found.' });
  }

  const formattedFlag = await flag.getApiResponse(requestUser);

  return res.json({
    flag: formattedFlag,
  });
}

async function postFlag(req, res) {
  const { requestUser } = res.locals;
  const { reason, targetType, targetId } = req.body;

  if (! reason || ! targetType || ! targetId) {
    return res.status(400).json({ error: true, message: 'Missing flag data.' });
  }

  if (! ['user', 'signup', 'comment'].includes(targetType)) {
    return res.status(400).json({ error: true, message: 'Invalid flag type.' });
  }

  const flag = new Flag({
    reason,
    judge: requestUser,
  });

  if (targetType === 'user') {
    if (requestUser.role !== ADMIN_ROLE) {
      return res.status(401).json({ error: true, message: 'You must be an admin to flag a user.' });
    }

    const user = await User.findOne({ _id: targetId });

    if (! user || ! user.id) {
      return res.status(404).json({ error: true, message: 'Target flag user not found.' });
    }

    flag.target = user;
    flag.targetType = 'user';
  }

  if (targetType === 'comment' || targetType === 'signup') {
    const Model = targetType === 'comment' ? Comment : Signup;
    const target = await Model.findOne({ _id: targetId });

    if (! target || ! target.id) {
      return res.status(404).json({ error: true, message: 'Target flag item not found.' });
    }

    const event = target.event ? await Event.findOne({ _id: target.event }) : null;
    const isHost = !!event ? event.hostUser === requestUser.id : false;

    if (requestUser.role !== ADMIN_ROLE || ! isHost) {
      return res.status(401).json({ error: true, message: 'You must be an admin or event host to flag this.' });
    }

    flag.target = target;
    flag.targetType = targetType;
  }

  await flag.save();

  const formattedFlag = await flag.getApiResponse(requestUser);

  return res.json({
    flag: formattedFlag,
  });
}

module.exports = [
  {
    route: '/v1/flags/id/:flagId',
    method: 'get',
    handler: getFlag,
    middleware: loadUser,
  },
  {
    route: '/v1/flags',
    method: 'post',
    handler: postFlag,
    middleware: requiresUser,
  },
];
