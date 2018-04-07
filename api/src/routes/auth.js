const { OAuth2Client } = require('google-auth-library');
const { NODE_ENV, GOOGLE_CLIENT_ID } = process.env;
const User = require('../models/User');
const Token = require('../models/Token');
const { USER_ROLE, ADMIN_ROLE } = require('../lib/roles');

const googleAuthVerification = async (req, res) => {
  const { token } = req.body;

  if (! token) {
    return res.json({
      error: true,
      message: 'Missing OAuth Token',
    });
  }

  const client = new OAuth2Client(GOOGLE_CLIENT_ID);
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();

  const googleId = payload['sub'];
  const email = payload['email'];
  const profilePhoto = payload['picture'];
  const firstName = payload['given_name'];
  const lastName = payload['family_name'];
  const hostedDomain = payload['hd'];

  const role = hostedDomain ? (
    ['joekent.nyc', 'letamericavote.org'].includes(hostedDomain) ? ADMIN_ROLE : USER_ROLE
  ) : USER_ROLE;

  let user = await User.findByEmail(email);
  if (! user) {
    user = new User({
      googleId,
      email,
    });
  }

  if (! user.firstName) {
    user.firstName = firstName;
  }

  if (! user.lastName) {
    user.lastName = lastName;
  }

  if (! user.profilePhoto) {
    user.profilePhoto = profilePhoto;
  }

  user.role = role;

  await user.save();

  const lavToken = await Token.generateToken(user);

  res.json({
    user,
    token: lavToken,
  });
};

// TODO: ?
async function testAuthEndpoint(req, res) {
  if (NODE_ENV !== 'development') {
    return res.status(404).json({ error: true, message: 'Test auth unavailable.' });
  }

  // const adminUser =
};

module.exports = [
  {
    route: '/v1/auth/google',
    method: 'post',
    handler: googleAuthVerification
  },
  {
    route: '/v1/auth/test',
    method: 'get',
    handler: testAuthEndpoint,
  },
];
