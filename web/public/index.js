const path = require('path');
const fs = require('fs');

const express = require('express');
const fetch = require('node-fetch');
const UrlPattern = require('url-pattern');

const PORT = process.env.PORT || 3000;
const ROWBOAT_API_URI = process.env.REACT_APP_ROWBOAT_API_URI || 'http://localhost:5000';

const app = express();
const router = express.Router();

const filePath = path.resolve(__dirname, 'index.html');
const html = fs.readFileSync(filePath, 'utf8');

// @NOTE: There is intentionally no space between the string and closing bracket.
const DEFAULT_META_TITLE = `<meta type="og:title" content="Voting Rights House Party | Let America Vote"/>`;
const DEFAULT_META_DESCRIPTION = `<meta type="og:description" content="Voting Rights House Parties are taking place across the country in May 19, 2018. Sign in, RSVP and take action to protect access to the ballot box."/>`;
const DEFAULT_META_PHOTO = `<meta type="og:photo" content="https://cdn.letamericavote.org/wp-content/uploads/2017/02/Homepagebanner-1.jpg"/>`;

router.use('/', express.static(
  process.env.NOW ?
  path.resolve(__dirname) :
  path.resolve(__dirname, '..', 'build')
));

router.use('*', async (req, res, next) => {
  try {
    const requestPath = req.params['0'];
    const eventPageMatch = new UrlPattern('/event/:eventSlug').match(requestPath) ||
      new UrlPattern('/event/:eventSlug/comment/:commentId').match(requestPath);

    const { eventSlug } = eventPageMatch || {};
    let metaTitle = DEFAULT_META_TITLE
    let metaDescription = DEFAULT_META_DESCRIPTION;
    let metaPhoto = DEFAULT_META_PHOTO;

    if (eventSlug) {
      const endpoint = `${ROWBOAT_API_URI}/v1/events/slug/${eventSlug}`;
      const eventResponse = await fetch(endpoint);
      const json = await eventResponse.json();

      if (! json.error && eventResponse.status === 200) {
        const { event } = json;

        metaTitle = `<meta type="og:title" content="${event.title}" />`;
        metaDescription = `<meta type="og:description" content="${event.description}" />`;
        metaPhoto = `<meta type="og:photo" content="${event.headerPhoto}" />`;
      }
    }

    const page = html
      .replace(DEFAULT_META_TITLE, metaTitle || DEFAULT_META_TITLE)
      .replace(DEFAULT_META_DESCRIPTION, metaDescription || DEFAULT_META_DESCRIPTION)
      .replace(DEFAULT_META_PHOTO, metaPhoto || DEFAULT_META_PHOTO);

    res.send(page);
  } catch(error) {
    console.error(error);
    return res.status(500).send('Whoops. Looks like we had a problem. Check back later!');
  }
});

app.use(router);

app.listen(PORT, (error) => {
  console.log(`Listening on ${PORT}`);
});
