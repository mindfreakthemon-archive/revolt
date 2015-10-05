import bootable from 'bootable';
import express from 'express';

import setup from 'fireblast-core/lib/app/setup';
import start from 'fireblast-core/lib/app/start';

var app = bootable(express());

app.db = {};
app.main = app;
app.setup = setup;
app.start = start;

export default app;