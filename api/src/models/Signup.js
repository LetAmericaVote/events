const mongoose = require('mongoose');
const Event = require('./Event');
const { ADMIN_ROLE } = require('../lib/roles');

const SignupSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    index: true,
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'event',
    required: true,
    index: true,
  },
  flag: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'flag',
  },
}, {
  timestamps: true,
});

SignupSchema.statics.makeSignup = async function(user, event) {
  try {
    const existingSignup = await this.findOne({ user, event }).populate('user event');

    if (existingSignup) {
      return existingSignup;
    }

    const signup = new this({ user, event });
    await signup.save();

    return signup;
  } catch(error) {
    console.error(error);
    return null;
  }
};

SignupSchema.statics.formatArrayOfSignups = async function(signups, requestUser, populate = false) {
  const formattedSignups = await Promise.all(signups.map(async (signup) =>
    await signup.getApiResponse(requestUser, populate)
  ));

  return formattedSignups;
};

SignupSchema.methods.getApiResponse = async function(requestUser, populate = false) {
  const baseApiResponse = {
    id: this.id,
    createdAt: this.createdAt,
    isFlagged: !!this.flag,
  };

  try {
    // The flagged check is to prevent the unnecessary query if its false.
    const isHostUser = (requestUser && requestUser.id && !!this.flag) ?
      await Event.isHostUser(requestUser.id || requestUser) : false;

    const hideDetails = !!this.flag && (
      (requestUser || {}).role !== ADMIN_ROLE || ! isHostUser
    );

    if (populate) {
      await Signup.populate(this, 'user event flag');
    }

    const user = !hideDetails && this.user && this.user.getApiResponse ?
      await this.user.getApiResponse(requestUser) : (this.user || null);

    const event = this.event && this.event.getApiResponse ?
      await this.event.getApiResponse(requestUser) : (this.event || null);

    const flag = this.flag && this.flag.getApiResponse ?
      await this.flag.getApiResponse(requestUser) : (this.flag || null);

    return {
      ...baseApiResponse,
      user,
      event,
      flag,
    };
  } catch (error) {
    console.error(error);
    return baseApiResponse;
  }
};

const Signup = mongoose.model('signup', SignupSchema);

module.exports = Signup;
