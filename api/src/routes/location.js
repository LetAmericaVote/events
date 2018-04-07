const request = require('superagent');

async function getLocationFromIp(req, res) {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

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
