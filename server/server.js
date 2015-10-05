import { addPath } from 'app-module-path';

addPath(__dirname);
addPath(__dirname + '/parts');

var app = require('fireblast-core/lib/entity/app');

app.root = __dirname;

app.setup();
app.start();
