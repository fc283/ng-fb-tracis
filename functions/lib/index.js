"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const express = require("express");
const path = require("path");
require('zone.js/dist/zone-node');
const core_1 = require("@angular/core");
const platform_server_1 = require("@angular/platform-server");
const main_1 = require("../dist/server/main");
core_1.enableProdMode();
const fs = require("fs");
const index = fs.readFileSync(path.resolve(__dirname, '../dist/browser/index2.html'), 'utf8').toString();
const app = express();
app.get('**', (req, res) => {
    platform_server_1.renderModuleFactory(main_1.AppServerModuleNgFactory, {
        url: req.path,
        document: index
    })
        .then(html => res.status(200).send(html))
        .catch(err => console.log(err));
});
exports.ssr = functions.https.onRequest(app);
exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!");
});
//# sourceMappingURL=index.js.map