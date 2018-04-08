const mongoose = require('mongoose');
const { randomBytes } = require('../lib/common');

const TOKEN_SESSION_LENGTH = 1000 * 60 * 60 * 24 * 30; // 30 Days

const TokenSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
  toObject: {
    virtuals: true,
  },
  toJSON: {
    virtuals: true,
  },
});

TokenSchema.index({ 'createdAt': 1 }, { expires: TOKEN_SESSION_LENGTH });

TokenSchema.index({ user: 1, value: 1 });

TokenSchema.virtual('expirationTime').get(function() {
  return new Date(this.createdAt).getTime() + TOKEN_SESSION_LENGTH;
});

TokenSchema.statics.validateUserToken = async function(user, value) {
  try {
    const token = await this.findOne({ user, value }).populate('user');
    const isValid = !!token && token.expirationTime > Date.now();

    return {
      isValid,
      user: isValid ? token.user : null,
    };
  } catch (error) {
    console.error(error);
    return false;
  }
};

TokenSchema.statics.generateToken = async function(user) {
  if (! user) {
    return null;
  }

  try {
    const value = await randomBytes(24);
    const token = new Token({ user, value });
    await token.save();

    return token;
  } catch (error) {
    console.error(error);
    return null;
  }
};

TokenSchema.methods.getApiResponse = async function(requestUser) {
  const baseResponse = {
    value: this.value,
  };

  try {
    const user = !!this.user ? await this.user.getApiResponse(requestUser) : null;
    
    return {
      ...baseResponse,
      user,
    };
  } catch (error) {
    console.error(error);
    return baseResponse;
  }
};

const Token = mongoose.model('token', TokenSchema);

module.exports = Token;
