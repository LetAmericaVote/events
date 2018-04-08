const User = require('../models/User');
const { loadUser, requiresAuth } = require('../middleware/auth');

const getUsers = async (req, res) => {
  const { requestUser } = res.locals;
  const { start, limit } = req.query;
  const parsedLimit = Math.max(parseInt(limit), 0);

  const findQuery = start ? {'_id': { '$gt': start }} : {};
  const limitCount = parsedLimit > 25 ? 25 : parsedLimit;

  const users = await User.find(findQuery).limit(limitCount);

  const formattedUsers = await User.formatArrayOfUsers(users, requestUser);

  res.json({ users: formattedUsers });
};

const getUserById = async (req, res) => {
  const { requestUser } = res.locals;
  const { userId } = req.params;

  const user = await User.findOne({ _id: userId });

  if (! user) {
    return res.status(404).json({ error: true, message: 'Invalid user id.' });
  }

  const formattedUser = await user.getApiResponse(requestUser);

  res.json({ user: formattedUser });
};

const updateUserProfile = async (req, res) => {
  const { requestUser } = res.locals;
  const { body } = req;

  User.userModifiableFields.forEach(field => {
    if (typeof body[field] !== 'undefined') {
      requestUser[field] = body[field];
    }
  });

  await requestUser.save();

  const formattedUser = await requestUser.getApiResponse(requestUser);

  res.json({ user: formattedUser });
};

module.exports = [
  {
    route: '/v1/users',
    method: 'get',
    handler: getUsers,
    middleware: loadUser,
  },
  {
    route: '/v1/users/id/:userId',
    method: 'get',
    handler: getUserById,
    middleware: loadUser,
  },
  {
    route: '/v1/users',
    method: 'post',
    handler: updateUserProfile,
    middleware: requiresAuth,
  },
];
