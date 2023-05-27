import chalk from 'chalk';
import dotenv from 'dotenv';
import express from 'express';

import setupApp from './src/app.js';
import { dbConnection } from './src/config/dbConnection.js';
import cronJob from './src/services/cron.js';
import globalError from './src/validations/globalError.js';

const app = express();
dotenv.config();

// database connect
dbConnection();

// cron job register
cronJob();

// our setup app
setupApp(app);

const port = process.env.PORT ?? 3002;
const server = app.listen(port, () => {
  console.log(chalk.bgYellowBright.bold(`server is up and running on post ${port}`));
});

// global error handler
globalError(server);
