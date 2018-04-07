const request = require('superagent');
const { DEVELOPMENT_IP, NODE_ENV } = process.env;

async function getLocationFromIp(req, res) {
  const ip = NODE_ENV === 'development' && DEVELOPMENT_IP ? DEVELOPMENT_IP : (
    req.headers['x-forwarded-for'] || req.connection.remoteAddress
  );

  const locationInfoRes = await request(`http://getcitydetails.geobytes.com/GetCityDetails?fqcn=${ip}`);
  const locationInfo = JSON.parse(locationInfoRes.text);

  res.json({
    state: locationInfo.geobytesregion,
    city: locationInfo.geobytescity,
    lat: locationInfo.geobyteslatitude,
    lon: locationInfo.geobyteslongitude,
  });
}

module.exports = [
  {
    route: '/v1/location',
    method: 'get',
    handler: getLocationFromIp,
  },
];
