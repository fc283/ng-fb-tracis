import * as functions from 'firebase-functions';
import * as express from 'express';
import * as path from 'path';
import * as fs from 'fs';
require('zone.js/dist/zone-node');

import { enableProdMode } from '@angular/core';
import { renderModuleFactory } from '@angular/platform-server';

import { AppServerModuleNgFactory } from '../dist/server/main';
import { prerenderedRoutes } from '../prerendered-routes.config';

enableProdMode();

const index = fs.readFileSync(path.resolve(__dirname, '../dist/browser/index2.html'), 'utf8').toString();

const app = express();

app.get('**', (req, res) => {
   if (prerenderedRoutes.includes(req.path)) {
      renderModuleFactory(AppServerModuleNgFactory, {
         url: req.path,
         document: index
      })
      .then(html => {
         res.set('Cache-Control', 'public, max-age=600, s-maxage=1200');
         res.status(200).send(html);
      })
      .catch(err => console.log(err));
   } else {
      res.status(200).send(index);
   }
});

export const ssr = functions.https.onRequest(app);

export const helloWorld = functions.https.onRequest((request, response) => {
	response.send("Hello from Firebase!");
});