import compression from 'compression';
import cors from 'cors';
import express from 'express';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

import security from './config/security.js';
import authRoute from './routes/authRoute.js';
import userRoute from './routes/userRoute.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const setupApp = (app) => {
  // middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true, limit: '1024px' }));
  app.use(cors());
  app.use(compression());
  app.set('trust proxy', true);

  // production only code
  if (process.env.NODE_ENV === 'production') {
    security(app);
  }

  // public path
  const basePath = __dirname?.split('/src')[0];
  app.use('/images', express.static(basePath + '/public/images'));
  app.use('/upload', express.static(basePath + '/public/uploads'));
  app.use('/logs', express.static(basePath + '/public/logs'));

  // app routes
  app.get('/', (req, res) => res.status(200).send('<h2>Server is running...</h2>'));
  app.use('/auth', authRoute);
  app.use('/user', userRoute);

  // route not found
  app.use('*', (req, res) => {
    res.status(404).send({ success: 'false', msg: `${req.originalUrl} not found`, data: {} });
  });
};
export default setupApp;
