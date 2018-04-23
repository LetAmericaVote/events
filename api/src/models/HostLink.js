const mongoose = require('mongoose');
const contentful = require('contentful-management');
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

HostLinkSchema.methods.sync = async function(requestUser) {
  try {
    const { contentfulId } = hostLink;
    const event = await Event.findOne({ contentfulId });

    if (! event || ! event.id) {
      return false;
    }

    event.hostUser = requestUser;
    await event.save();

    const client = contentful.createClient({
      accessToken: process.env.CONTENTFUL_MANAGEMENT_KEY,
    });

    const space = await client.getSpace(process.env.CONTENTFUL_SPACE);
    const environment = await space.getEnvironment('master');

    const entry = await environment.getEntry(contentfulId);
    entry.fields.hostUser['en-US'] = requestUser;

    await entry.update();

    await this.remove();

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

const HostLink = mongoose.model('hostLink', HostLinkSchema);

module.exports = HostLink;
