import express from 'express';

import serverRenderer from './middleware/renderer';

const PORT = 3000;
const path = require('path');

const app = express();
const router = express.Router();

router.use('/', express.static(
  path.resolve(__dirname, '..', 'build'),
));

router.use('*', serverRenderer);

app.use(router);

app.listen(PORT, (error) => {
  console.log(`Listening on ${PORT}`);
});
