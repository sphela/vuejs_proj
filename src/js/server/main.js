// @flow
'use strict';

import Server from './server';
import File from './file';
import SiteRoute from './siteroute';
import APIRoute from './apiroute';
import { createApp } from '../shared/app';
import {
  POSTGRES_URI,
  POSTGRES_PORT,
  POSTGRES_DB_NAME,
  POSTGRES_USERNAME,
  POSTGRES_PASSWORD,
  SERVER_PORT,
  STATIC_JS_ROOT,
  STATIC_CSS_ROOT,
} from '../shared/config';
import Count from './models/count';

const express = require('express');
const fs = require('fs');
const vueRendererCreator = require('vue-server-renderer');
const Sequelize = require('sequelize');

function initSequelize (): Sequelize {
  return new Sequelize(
    POSTGRES_DB_NAME,
    POSTGRES_USERNAME,
    POSTGRES_PASSWORD,
    {
      dialect: 'postgres',
      host: POSTGRES_URI,
      port: POSTGRES_PORT,
    }
  );
}

function main () {
  const middleware = [];
  middleware.push([ '/static/css', express.static(STATIC_CSS_ROOT) ]);
  middleware.push([ '/static/js', express.static(STATIC_JS_ROOT) ]);

  const server = new Server(express(), SERVER_PORT, middleware, vueRendererCreator);
  server.listen();

  const count = new Count(initSequelize());

  const apiRoute = new APIRoute(count);
  apiRoute.getCount(server, '/api/count')
    .subscribe(apiRoute.send);

  apiRoute.postCount(server, '/api/count')
    .subscribe(apiRoute.send);

  const route = new SiteRoute(createApp());
  route.serve(server, '/', new File(`${process.cwd()}/src/html/index.html`, fs))
    .subscribe(route.send);
}

main();
