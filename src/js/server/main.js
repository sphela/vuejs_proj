// @flow
'use strict';

const express = require('express');
const fs = require('fs');
const vueRendererCreator = require('vue-server-renderer');

import Server from './server';
import File from './file';
import Route from './route';
import { createApp } from '../shared/app';

import {
  SERVER_PORT,
} from '../shared/config';

function main () {
  const server = new Server(express(), SERVER_PORT, [], vueRendererCreator);
  server.listen();
  const route = new Route(createApp());
  route.serve(server, '*', new File(`${process.cwd()}/src/html/index.html`, fs))
    .subscribe(route.send);
}

main();
