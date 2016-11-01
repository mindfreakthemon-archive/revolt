import express from 'express';

import { setup } from 'fireblast-core/lib/app/setup';
import { phase, boot } from 'fireblast-core/lib/app/phase';

export let app = express();

app.db = {};
app.model = {};

app.main = app;
app.setup = setup;
app.phase = phase;
app.boot = boot;
