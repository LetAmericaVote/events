// const faker = require('faker');
// const request = require('superagent');
// const User = require('../models/User');
// const Event = require('../models/Event');
// const common = require('../lib/common');
// const { USER_ROLE, ADMIN_ROLE } = require('../lib/roles');
//
// const USER_GOAL = 200;
// const EVENTS_GOAL = 10;
//
// function getRandomInt(min, max) {
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }
//
// async function catPhoto() {
//   try {
//     const photoUrlReq = await request('http://thecatapi.com/api/images/get?format=src&type=png');
//     const { redirects } = photoUrlReq;
//     const headerPhoto = redirects[redirects.length - 1];
//
//     return headerPhoto;
//   } catch(error) {
//     console.error(error);
//     return null;
//   }
// }
//
// async function generateUser(count) {
//   if (count >= USER_GOAL) {
//     return;
//   }
//
//   console.log(`Generating user ${count} of ${USER_GOAL}...`);
//
//   try {
//     const profilePhoto = await catPhoto();
//
//     const user = new User({
//       email: faker.internet.email(),
//       firstName: faker.name.firstName(),
//       lastName: faker.name.lastName(),
//       zipcode: faker.address.zipCode(),
//       profilePhoto,
//       mobile: faker.phone.phoneNumber(),
//       mobileCommonsProfileId: 'seed',
//       role: Math.random() > 0.8 ? ADMIN_ROLE : USER_ROLE,
//     });
//
//     await user.save();
//
//     return generateUser(count + 1);
//   } catch(error) {
//     console.error(error);
//     return;
//   }
// }
//
// async function generateEvent(count) {
//   if (count >= EVENTS_GOAL) {
//     return;
//   }
//
//   console.log(`Generating event ${count} of ${EVENTS_GOAL}...`);
//
//   try {
//     const title = faker.lorem.words(getRandomInt(2, 5));
//
//     const day = 1000 * 60 * 60 * 24;
//     const dateTime = Date.now() + (getRandomInt(-15, 15) * day);
//
//     const headerPhoto = await catPhoto();
//
//     const totalUsers = await User.count();
//     const hostUser = await User.findOne().skip(getRandomInt(0, totalUsers));
//
//     const event = new Event({
//       title,
//       slug: faker.helpers.slugify(title),
//       description: fake.lorem.paragraphs(getRandomInt(1, 3)),
//       headerPhoto,
//       dateTime,
//       streetAddress: faker.address.streetAddress(),
//       city: faker.address.city(),
//       state: faker.address.state(),
//       zipcode: faker.address.zipCode(),
//       hostUser,
//       geoLocation: [faker.address.longitude(), faker.address.latitude()],
//     });
//
//     await event.save();
//
//     return generateEvent(count + 1);
//   } catch(error) {
//     console.error(error);
//     return;
//   }
// }
//
// async function execute() {
//   common.dbConnect();
//
//   try {
//     await generateUser(0);
//     // await generateEvent(0);
//     // process.exit();
//   } catch (error) {
//     console.error(error);
//   }
// }
//
// execute();
