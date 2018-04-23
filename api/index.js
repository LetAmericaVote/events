const express = require('express');
const common = require('./src/lib/common');
const requestHandler = require('./src/lib/requestHandler');
const middlewareWrapper = require('./src/lib/middlewareWrapper');

common.dbConnect();
const app = express();

app.use(express.json());
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, lav_auth_id, lav_auth_token, x-rowboat-contentful-key, Access-Control-Allow-Headers, Access-Control-Request-Headers');

  next();
});

const controllers = [
  ...require('./src/routes/auth'),
  ...require('./src/routes/comment'),
  ...require('./src/routes/contentful'),
  ...require('./src/routes/event'),
  ...require('./src/routes/hostLink'),
  ...require('./src/routes/location'),
  ...require('./src/routes/signup'),
  ...require('./src/routes/user'),
  ...require('./src/routes/flag'),
];

controllers.forEach(controller => {
  const { method, route, handler, middleware } = controller;

  const wrapperHandler = (req, res) =>
    requestHandler(req, res)(handler);

  const params = [route];

  if (!!middleware) {
    params.push((req, res, next) => middlewareWrapper(req, res, next)(middleware));
  }

  params.push(wrapperHandler);

  app[method](...params);
});

const port = process.env.PORT;
app.listen(port, () => console.log(`Listening on ${port}`));
