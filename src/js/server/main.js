// @flow
'use strict';

const express = require('express');
import Server from './server';

import {
  SERVER_PORT
} from '../shared/config';

function main () {
  const server = new Server(express(), SERVER_PORT, []);
  server.listen();
  server.get('*').subscribe(({ req, res }) => {
    res.status(200).send('Hello World!');
  });
}

main();
