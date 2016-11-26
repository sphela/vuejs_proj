// @flow
'use strict';

const express = require('express');
const fs = require('fs');
import Server from './server';
import File from './file';

import {
  SERVER_PORT,
} from '../shared/config';

function main () {
  const server = new Server(express(), SERVER_PORT, [], new File(fs));
  server.listen();
  server.get('*', `${process.cwd()}/src/html/index.html`).subscribe(({ res, template }) => {
    res.status(200).send(template);
  });
}

main();
