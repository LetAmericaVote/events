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
const DEFAULT_META_TITLE = `<meta property="og:title" content="Voting Rights House Party | Let America Vote">`;
const DEFAULT_META_DESCRIPTION = `<meta property="og:description" content="Voting Rights House Parties are taking place across the country in May 19, 2018. Sign in, RSVP and take action to protect access to the ballot box.">`;
const DEFAULT_META_PHOTO = `<meta property="og:image" content="https://votingrightshouseparty.com/LAV_Meta.png">`;
const DEFAULT_META_URL = `<meta property="og:url" content="https://votingrightshouseparty.com">`;

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
    let metaUrl = DEFAULT_META_URL;

    if (eventSlug) {
      const endpoint = `${ROWBOAT_API_URI}/v1/events/slug/${eventSlug}`;
      const eventResponse = await fetch(endpoint);
      const json = await eventResponse.json();

      if (! json.error && eventResponse.status === 200) {
        const { event } = json;

        metaTitle = `<meta property="og:title" content="${event.title}" />`;
        metaDescription = `<meta property="og:description" content="${event.description}" />`;
        metaPhoto = `<meta property="og:image" content="${event.headerPhoto}" />`;
        metaUrl = `<meta property="og:url" content="${req.protocol + '://' + req.get('host') + req.originalUrl}">`;
      }
    }

    const page = html
      .replace(DEFAULT_META_TITLE, metaTitle || DEFAULT_META_TITLE)
      .replace(DEFAULT_META_DESCRIPTION, metaDescription || DEFAULT_META_DESCRIPTION)
      .replace(DEFAULT_META_PHOTO, metaPhoto || DEFAULT_META_PHOTO)
      .replace(DEFAULT_META_URL, metaUrl || DEFAULT_META_URL);

    res
      .set('Content-Type', 'text/html')
      .set('Content-Length', require('buffer').Buffer.byteLength(page))
      .send(page);
  } catch(error) {
    console.error(error);
    return res.status(500).send('Whoops. Looks like we had a problem. Check back later!');
  }
});

app.use(router);

app.listen(PORT, (error) => {
  console.log(`Listening on ${PORT}`);
});
