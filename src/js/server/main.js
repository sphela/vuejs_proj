// @flow
'use strict';

const express = require('express');
const fs = require('fs');
const vueRendererCreator = require('vue-server-renderer');

import Server from './server';
import File from './file';
import SiteRoute from './siteroute';
import APIRoute from './apiroute';
import { createApp } from '../shared/app';

import {
  SERVER_PORT,
  STATIC_ROOT,
} from '../shared/config';

function main () {
  const middleware = [];
  middleware.push([ '/static/js', express.static(STATIC_ROOT) ]);

  const server = new Server(express(), SERVER_PORT, middleware, vueRendererCreator);
  server.listen();

  const apiRoute = new APIRoute();
  apiRoute.getCount(server, '/api/count')
    .subscribe(apiRoute.send);

  const route = new SiteRoute(createApp());
  route.serve(server, '/', new File(`${process.cwd()}/src/html/index.html`, fs))
    .subscribe(route.send);
}

main();
