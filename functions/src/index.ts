import * as functions from 'firebase-functions';
import * as express from 'express';
import * as path from 'path';
require('zone.js/dist/zone-node');

import { enableProdMode } from '@angular/core';
import { renderModuleFactory } from '@angular/platform-server';

import { AppServerModuleNgFactory } from '../dist/server/main';

enableProdMode();

import * as fs from 'fs';
const index = fs.readFileSync(path.resolve(__dirname, '../dist/browser/index2.html'), 'utf8').toString();

const app = express();

app.get('**', (req, res) => {
  renderModuleFactory(AppServerModuleNgFactory, {
    url: req.path,
    document: index
  })
  .then(html => res.status(200).send(html))
  .catch(err => console.log(err));
});

export const ssr = functions.https.onRequest(app);

export const helloWorld = functions.https.onRequest((request, response) => {
	response.send("Hello from Firebase!");
});