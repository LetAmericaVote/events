const mongoose = require('mongoose');

const FlagSchema = mongoose.Schema({
  target: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'targetType',
    required: true,
    index: true,
  },
  targetType: {
    type: String,
    enum: ['user', 'comment', 'signup'],
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  judge: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
}, {
  timestamps: true,
});

FlagSchema.methods.getApiResponse = async function(requestUser, populate) {
  const baseApiResponse = {
    id: this.id,
    reason: this.reason,
    targetType: this.targetType,
    createdAt: this.createdAt,
  };

  try {
    if (populate) {
      await Flag.populate(this, 'target judge');
    }

    baseApiResponse.target = this.target && this.target.getApiResponse ?
      await this.target.getApiResponse(requestUser) : (this.target || null);

    baseApiResponse.judge = this.judge && this.judge.getApiResponse ?
      await this.judge.getApiResponse(requestUser) : (this.judge || null);

    return baseApiResponse;
  } catch (error) {
    console.error(error);
    return baseApiResponse;
  }
};

const Flag = mongoose.model('flag', FlagSchema);

module.exports = Flag;
