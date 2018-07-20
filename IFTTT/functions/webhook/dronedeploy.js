'use strict';
require('dotenv').config()

global.APP_SLUG = process.env.APP_SLUG || undefined;

const bootstrap = require('dronedeploy-functions-api');
const handler = require('./handler');

let config = require('./config.json');

exports.webhook = function (req, res) {
  if (!global.APP_SLUG) {
    const msg = 'App slug not available, did you deploy using DroneDeploy-Cli?';
    console.error(msg);
    res.status(500).send(msg)
  }
  bootstrap(config, req, res, (err, ctx) => {
    if (err) {
      console.error(err, err.stack);
      console.warn('An error occurred during the bootstrapping process. A default response has been sent and code paths have been stopped.');
      return;
    }
    handler.routeHandler(req, res, ctx);
  });
};