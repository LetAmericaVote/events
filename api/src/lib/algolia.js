const algoliasearch = require('algoliasearch');
const client = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_WRITE_API_KEY);
const index = client.initIndex('events');

module.exports = {
  addEvent: function(event) {
    return new Promise((resolve, reject) => {
      index.addObject(event, (error) => {
        if (error) {
          reject(error);
        }

        resolve();
      });
    });
  },

  deleteEvent: function(event) {
    return new Promise((resolve, reject) => {
      index.deleteObject(event.id, (err) => {
        if (err) {
          return reject(err);
        }

        return resolve();
      });
    });
  },
};
