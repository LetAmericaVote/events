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

const Signup = mongoose.model('signup', SignupSchema);

module.exports = Signup;
