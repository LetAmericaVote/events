const contentful = require('contentful');
const Event = require('../models/Event');
const common = require('../lib/common');

const { CONTENTFUL_SPACE, CONTENTFUL_ACCESS_KEY } = process.env;

const client = contentful.createClient({
  space: CONTENTFUL_SPACE,
  accessToken: CONTENTFUL_ACCESS_KEY,
});

async function executeSync(entries, index) {
  const entry = entries[index];
  if (! entry) {
    return;
  }

  console.log(`Syncing entry #${index + 1}...`);

  const isSynced = await Event.syncFromContentful(entry);

  if (! isSynced) {
    console.log(`Failed to sync entry #${index + 1}, ID: ${entry.sys.id}`);
  }

  return executeSync(entries, index + 1);
}

client.sync({ initial: true })
  .then((response) => {
    common.dbConnect();

    try {
      const { entries } = response;
      console.log(`Starting sync for ${entries.length} entries...`);

      return executeSync(response.entries, 0);
    } catch (error) {
      console.error(error);
      return null;
    }
  })
  .then(() => setTimeout(() => process.exit(), 1000))
  .catch((err) => console.log(err));
