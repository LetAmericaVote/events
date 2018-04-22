const fs = require('fs');
const cmd = require('node-cmd');

const { TARGET_ENV } = process.env;

const BUILD_STEP = `
  react-scripts build &&
  cp ./build/index.html ./build/200.html &&
`;

const DEPLOY_SECRET_FILE = '.env.production.local';
const STAGING_SECRET_FILE = '.env.staging';
const PRODUCTION_SECRET_FILE = '.env.prod';

const WIPE_TMP_SECRET_FILE = `rm ${DEPLOY_SECRET_FILE}`;

const PRODUCTION_DEPLOY = `
  cp ${PRODUCTION_SECRET_FILE} ${DEPLOY_SECRET_FILE}
  ${BUILD_STEP}
  ${WIPE_TMP_SECRET_FILE}
`;

const STAGING_DEPLOY = `
  cp ${STAGING_SECRET_FILE} ${DEPLOY_SECRET_FILE}
  ${BUILD_STEP}
  ${WIPE_TMP_SECRET_FILE}
`;

if (! TARGET_ENV) {
  console.error('No target environment specified.');
  process.exit(1);
}

const isProduction = TARGET_ENV === 'production';
const pipeline = isProduction ? PRODUCTION_DEPLOY : STAGING_DEPLOY;

const pipelineProcess = cmd.get(pipeline, (err, data, stderr) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Built app for ${isProduction ? 'production' : 'staging'} successfully!`);
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
