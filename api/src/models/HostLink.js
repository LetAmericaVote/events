const mongoose = require('mongoose');
const { randomBytes } = require('../lib/common');

const HostLinkSchema = mongoose.Schema({
  hostCode: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },
  contentfulId: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

HostLinkSchema.statics.make = async function(contentfulId) {
  try {
    const hostCode = await randomBytes(6);
    const hostLoginLink = new this({ hostCode, contentfulId });

    await hostLoginLink.save();

    return hostCode;
  } catch (error) {
    console.error(error);
  }
};

// TODO: Add method function here for linking the event & the user, updating contentful, instead of in the signup route.

const HostLink = mongoose.model('hostLink', HostLinkSchema);

module.exports = HostLink;
