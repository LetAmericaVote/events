require('dotenv').config({ path: './.env.local' });

const cmd = require('node-cmd');
const { DEPLOY_CONTENTFUL_SPACE } = process.env;

const DEPLOY = `
  react-scripts build &&
  cp ./build/index.html ./build/200.html &&
  cp ./extension.json ./build/extension.json &&
  surge ./build https://extension.votingrightshouseparty.com &&
  contentful extension update --space-id ${DEPLOY_CONTENTFUL_SPACE} --force
`;

const pipelineProcess = cmd.get(DEPLOY, (err, data, stderr) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Built & deployed extension successfully!`);
  }

  process.exit();
});

let log = '';
pipelineProcess.stdout.on('data', (data) => {
  log += data;

  if (log[log.length - 1] === '\n') {
    console.log(log);
    log = '';
  }
});
