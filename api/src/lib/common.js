const mongoose = require('mongoose');
const crypto = require('crypto');

const dbConnect = () => mongoose.connect(process.env.MONGODB_URI);

const randomBytes = (length) => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(length, (err, buffer) => {
      if (err) {
        reject(err);
      } else {
        resolve(buffer.toString('hex'));
      }
    });
  });
};

const transformApiUser = (user, requestUser) => {
  if (! user) {
    return null;
  }

  return user.getApiProfile(requestUser);
};

module.exports = {
  dbConnect,
  randomBytes,
  transformApiUser
}
