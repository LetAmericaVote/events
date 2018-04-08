const mongoose = require('mongoose');

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

    const populatedSignup = await this.populate(signup, 'user event');

    return populatedSignup;
  } catch(error) {
    console.error(error);
    return null;
  }
};

SignupSchema.statics.formatArrayOfSignups = async function(signups, requestUser) {
  const formattedSignups = await Promise.all(signups.map(async (signup) =>
    await signup.getApiResponse(requestUser)
  ));

  return formattedSignups;
};

SignupSchema.methods.getApiResponse = async function(requestUser) {
  const baseApiResponse = {
    id: this.id,
    createdAt: this.createdAt, 
  };

  try {
    const user = this.user && this.user.getApiResponse ?
      await this.user.getApiResponse(requestUser) : (this.user || null);

    const event = this.event && this.event.getApiResponse ?
      await this.event.getApiResponse(requestUser) : (this.event || null);

    return {
      ...baseApiResponse,
      user,
      event,
    };
  } catch (error) {
    console.error(error);
    return baseApiResponse;
  }
};

const Signup = mongoose.model('signup', SignupSchema);

module.exports = Signup;
