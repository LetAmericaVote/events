const faker = require('faker');
const User = require('../models/User');
const Event = require('../models/Event');
const Signup = require('../models/Signup');
const Comment = require('../models/Comment');
const common = require('../lib/common');
const { USER_ROLE, ADMIN_ROLE } = require('../lib/roles');

const PROFILE_PHOTO = 'https://collaborativecbt.com/wp-content/uploads/2016/12/default-avatar.png';
const EVENT_PHOTOS = [
  'https://antongorlin.com/wp-content/uploads/2018/04/fig-tree-fog-1920.jpg',
  'https://i.redd.it/dzmrwnhvuyq01.jpg',
  'https://i.redd.it/lxpqa7tvprq01.jpg',
  'https://i.redd.it/hzenut8udvq01.jpg',
];

const USER_GOAL = 200;
const EVENTS_GOAL = 10;
const SIGNUPS_GOAL = 100;
const COMMENTS_GOAL = 150;
const COMMENT_REPLY_MIN = 0;
const COMMENT_REPLY_MAX = 100;

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function generateUser(count) {
  if (count >= USER_GOAL) {
    return;
  }

  console.log(`Generating user ${count} of ${USER_GOAL}...`);

  try {
    const user = new User({
      email: faker.internet.email(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      zipcode: faker.address.zipCode(),
      profilePhoto: PROFILE_PHOTO,
      mobile: faker.phone.phoneNumber(),
      mobileCommonsProfileId: 'seed',
      role: Math.random() > 0.8 ? ADMIN_ROLE : USER_ROLE,
    });

    await user.save();

    return generateUser(count + 1);
  } catch(error) {
    console.error(error);
    return;
  }
}

async function generateEvent(count) {
  if (count >= EVENTS_GOAL) {
    return;
  }

  console.log(`Generating event ${count} of ${EVENTS_GOAL}...`);

  try {
    const title = faker.lorem.words(getRandomInt(2, 5));

    const day = 1000 * 60 * 60 * 24;
    const dateTime = Date.now() + (getRandomInt(-15, 15) * day);

    const headerPhoto = EVENT_PHOTOS[getRandomInt(0, EVENT_PHOTOS.length - 1)];

    const totalUsers = await User.count();
    const hostUser = await User.findOne().skip(getRandomInt(0, totalUsers - 1));

    const event = new Event({
      title,
      contentfulId: faker.random.uuid(),
      slug: faker.helpers.slugify(title),
      description: faker.lorem.paragraphs(getRandomInt(1, 3)),
      headerPhoto,
      dateTime,
      streetAddress: faker.address.streetAddress(),
      city: faker.address.city(),
      state: faker.address.state(),
      zipcode: faker.address.zipCode('#####'),
      hostUser,
      geoLocation: [faker.address.longitude(), faker.address.latitude()],
    });

    await event.save();

    return generateEvent(count + 1);
  } catch(error) {
    console.error(error);
    return;
  }
}

async function generateSignup(count) {
  if (count >= SIGNUPS_GOAL) {
    return;
  }

  console.log(`Generating signup ${count} of ${SIGNUPS_GOAL}...`);

  try {
    const totalUsers = await User.count();
    const user = await User.findOne().skip(getRandomInt(0, totalUsers - 1));

    const totalEvents = await Event.count();
    const event = await Event.findOne().skip(getRandomInt(0, totalEvents - 1));

    const signup = new Signup({ user, event });

    await signup.save();

    return generateSignup(count + 1);
  } catch (error) {
    console.error(error);
  }
}

async function generateReply(count, host, target) {
  if (count >= target) {
    return;
  }

  console.log(`Generating reply ${count} to ${host.id} of ${target}`);

  try {
    const { event } = host;

    const totalSignups = await Signup.count({ event });
    const signup = await Signup.findOne({ event }).skip(getRandomInt(0, totalSignups - 1));

    const { user } = signup;

    const comment = new Comment({
      event,
      user,
      inReplyTo: host,
      message: faker.lorem.sentence(getRandomInt(1, 20)),
    });

    await comment.save();

    return generateReply(count + 1, host, target);
  } catch (error) {
    console.error(error);
  }
}

async function generateComment(count) {
  if (count >= COMMENTS_GOAL) {
    return;
  }

  console.log(`Generating comment ${count} of ${COMMENTS_GOAL}`);

  try {
    const totalUsers = await User.count();
    const user = await User.findOne().skip(getRandomInt(0, totalUsers - 1));

    const totalEvents = await Event.count();
    const event = await Event.findOne().skip(getRandomInt(0, totalEvents - 1));

    const comment = new Comment({
      user,
      event,
      inReplyTo: null,
      message: faker.lorem.paragraphs(getRandomInt(1, 3)),
    });

    await comment.save();

    await generateReply(0, comment, getRandomInt(COMMENT_REPLY_MIN, COMMENT_REPLY_MAX));

    return generateComment(count + 1);
  } catch (error) {
    console.error(error);
  }
}

async function execute() {
  common.dbConnect();

  try {
    await generateUser(0);
    await generateEvent(0);
    await generateSignup(0);
    await generateComment(0);
    process.exit();
  } catch (error) {
    console.error(error);
  }
}

execute();
