const mongoose = require('mongoose');
const User = require('./User');
const algolia = require('../lib/algolia');

const EventSchema = mongoose.Schema({
  contentfulId: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  description: {
    type: String,
    required: true,
  },
  headerPhoto: {
    type: String,
    required: true,
  },
  dateTime: {
    type: Date,
    required: true,
    index: true,
  },
  streetAddress: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zipcode: {
    type: Number,
    required: true,
  },
  hostUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  geoLocation: {
    type: [Number],
    index: '2dsphere',
    required: true,
  },
}, {
  timestamps: true,
});

EventSchema.post('save', async function(doc, next) {
  const index = await this.getAlgoliaIndex();
  algolia.addEvent(index).then(() => {
    next();
  });
});

EventSchema.post('remove', function() {
  algolia.deleteEvent(this);
});

EventSchema.statics.findById = async function(id) {
  try {
    const event = await this.findOne({ _id: id }).populate('hostUser');
    return event;
  } catch (error) {
    console.error(error);
    return null;
  }
};

EventSchema.statics.findBySlug = async function(slug) {
  try {
    const event = await this.findOne({ slug }).populate('hostUser');
    return event;
  } catch (error) {
    console.error(error);
    return null;
  }
};

EventSchema.statics.findByContentfulId = async function(contentfulId) {
  try {
    const event = await this.findOne({ contentfulId }).populate('hostUser');
    return event;
  } catch (error) {
    console.error(error);
    return null;
  }
};

EventSchema.statics.findByLatLong = async function(long, lat, minDistance, maxDistance, exlcudeId) {
  try {
    const events = await this.aggregate([
      {
        '$geoNear': {
          near: {
            type: 'Point',
            coordinates: [long, lat],
            spherical: true,
            distanceField: 'distance',
            query: {
              _id: {
                '$nin': exlcudeId,
              },
              dateTime: {
                '$gte': new Date(),
              },
            },
            limit: 25,
          },
        }
      },
    ]);

    const aggregateEvents = events.results;
    if (! aggregateEvents || ! aggregateEvents.length) {
      return [];
    }

    const populatedEvents = await this.populate(aggregateEvents, { path: 'hostUser' });

    return populatedEvents;
  } catch (error) {
    console.error(error);
    return null;
  }
};

EventSchema.statics.syncFromContentful = async function(entry) {
  const lang = 'en-US';

  try {
    const contentfulId = entry.sys.id;
    const fields = entry.fields;

    let event = await this.findByContentfulId(entry.sys.id);
    if (! event) {
      event = new this({ contentfulId });
    }

    event.title = fields.title[lang];
    event.slug = fields.slug[lang];
    event.description = fields.description[lang];
    event.headerPhoto = fields.headerPhoto[lang].fields.file[lang].url;
    event.dateTime = fields.dateTime[lang];
    event.hostUser = fields.hostUser[lang];
    event.streetAddress = fields.streetAddress[lang];
    event.city = fields.city[lang];
    event.state = fields.state[lang];
    event.zipcode = fields.zipcode[lang];
    event.geoLocation = [
      fields.geoLocation[lang].lon,
      fields.geoLocation[lang].lat,
    ];

    await event.save();

    return true;
  } catch(error) {
    console.error(error);
    return false;
  }
};

EventSchema.methods.getAlgoliaIndex = async function() {
  const hostUser = await User.findOne({ _id: this.hostUser });

  return {
    objectID: this.id,
    title: this.title,
    streetAddress: this.streetAddress,
    city: this.city,
    state: this.state,
    hostUser: {
      firstName: hostUser.firstName,
      lastName: hostUser.lastName,
    },
  };
};

const Event = mongoose.model('event', EventSchema);

module.exports = Event;
