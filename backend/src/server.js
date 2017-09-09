// @flow
import cors from 'cors';
import bodyParser from 'body-parser';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import env from './lib/env';
import apiRouter from './api';
import './lib/mongoClient';

const app = express();

app.use(helmet());

// CORS
const originWhitelist = env.CORS_WHITELIST.split(',');
const corsHandler = cors({
  methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'PATCH', 'DELETE'],
  origin(origin, cb) {
    cb(null, originWhitelist.indexOf(origin) !== -1);
  },
});

// Cors
app.use(corsHandler);

// Logging
app.use(morgan('dev'));

// Body Parser
app.use(bodyParser.json());

// Router
app.get('/status', (req, res) => {
  res.status(200).send('ok');
});
app.get('/brew', (req, res) => {
  res.status(418).send('short and stout');
});

app.use('/api', apiRouter());

const server = app.listen(env.BACKEND_HTTP_PORT, () => {
  const port = server.address().port;
  console.log(`shopify-testing-backend API listening at http://localhost:${port}`);
});
