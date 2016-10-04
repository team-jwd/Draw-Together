const https = require('https');
const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();

const options = {
  key: fs.readFileSync(path.join(`${__dirname}/config/server.key`), 'utf-8'),
  cert: fs.readFileSync(path.join(`${__dirname}/config/server.crt`), 'utf-8'),
  passphrase: 'boardroom',
};

const server = https.createServer(options, app);

server.listen(3000, () => {
  console.log('listnen on 3k');
});
