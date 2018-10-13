const faker = require('faker');
const postal = require('postal-abbreviations');
const randomEmoji = require('random-emoji');
const superagent = require('superagent');
const addresses = require('rrad/addresses-us-all.json').addresses
const User = require('../models/User');
const Event = require('../models/Event');
const Signup = require('../models/Signup');
const Comment = require('../models/Comment');
const common = require('../lib/common');
const { USER_ROLE, ADMIN_ROLE } = require('../lib/roles');

// Let's start with smaller values and test this slowly...
const USER_GOAL = 4000;
const EVENTS_GOAL = 50;
const SIGNUPS_GOAL = 2000;
const COMMENTS_GOAL = 2000;
const COMMENT_REPLY_MIN = 0;
const COMMENT_REPLY_MAX = 25;
const FLAG_GOAL = 200;

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function generateUser(count) {
  if (count >= USER_GOAL) {
    return;
  }

  console.log(`Generating user ${count} of ${USER_GOAL}...`);

  const role = Math.random() > 0.95 ? ADMIN_ROLE : USER_ROLE;
  const randomAddress = addresses[Math.floor(Math.random() * addresses.length)];

  const zipcode = (('' + randomAddress.postalCode).length === 4 ? '0' : '') + randomAddress.postalCode;

  try {
    const user = new User({
      email: faker.internet.email(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      zipcode,
      profilePhoto: faker.image.avatar(),
      mobile: faker.phone.phoneNumber(),
      mobileCommonsProfileId: 'seed',
      role,
    });

    await user.save();

    return generateUser(count + 1);
  } catch(error) {
    console.error(error);
    return generateUser(count + 1);
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

    const { redirects } = await superagent('https://source.unsplash.com/1600x900/?house,mansion');
    const headerPhoto = redirects[0];

    const totalUsers = await User.count();
    const hostUser = await User.findOne().skip(getRandomInt(0, totalUsers - 1));

    const randomAddress = addresses[Math.floor(Math.random() * addresses.length)];

    const zipcode = (('' + randomAddress.postalCode).length === 4 ? '0' : '') + randomAddress.postalCode;

    const event = new Event({
      title,
      slug: faker.helpers.slugify(title),
      description: faker.lorem.paragraphs(getRandomInt(1, 3)),
      headerPhoto,
      dateTime,
      hostUser,
      streetAddress: `${randomAddress.address1} ${randomAddress.address2}`,
      city: randomAddress.city,
      state: postal(randomAddress.state),
      zipcode,
      geoLocation: [
        randomAddress.coordinates.lng,
        randomAddress.coordinates.lat,
      ],
    });

    await event.save();
    await event.syncToContentful();

    return generateEvent(count + 1);
  } catch(error) {
    console.error(error);
    return generateEvent(count + 1);
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
    return generateSignup(count + 1);
  }
}

async function generateReply(count, host, target) {
  if (count >= target) {
    return;
  }

  console.log(`Generating reply ${count} to ${host.id} of ${target}`);

  try {
    const { event } = host;
    let user = null;

    if (event) {
      const totalSignups = await Signup.count({ event });
      const signup = await Signup.findOne({ event }).skip(getRandomInt(0, totalSignups - 1));

      user = signup.user;
    } else {
      const totalUsers = await User.count();
      user = await User.findOne().skip(getRandomInt(0, totalUsers - 1));
    }

    const emojiCount = getRandomInt(0, 3);
    const emoji = randomEmoji.random({ count: emojiCount });

    const minLorem = emojiCount ? 0 : 1;
    const lorem = faker.lorem.words(getRandomInt(minLorem, 3));

    const comment = new Comment({
      event,
      user,
      inReplyTo: host,
      message: `${lorem} ${emoji.map(emoji => emoji.character).join(' ')}`,
    });

    await comment.save();

    return generateReply(count + 1, host, target);
  } catch (error) {
    console.error(error);
    return generateReply(count + 1, host, target);
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
      event: Math.random() > 0.4 ? event : null,
      inReplyTo: null,
      message: faker.lorem.paragraphs(getRandomInt(1, 3)),
    });

    await comment.save();

    await generateReply(0, comment, getRandomInt(COMMENT_REPLY_MIN, COMMENT_REPLY_MAX));

    return generateComment(count + 1);
  } catch (error) {
    console.error(error);
    return generateComment(count + 1);
  }
}

async function execute() {
  common.dbConnect();

  try {
    await generateUser(0);
    await generateEvent(0);
    await generateSignup(0);
    // await generateComment(0);
    // process.exit();
  } catch (error) {
    console.error(error);
  }
}

execute();
