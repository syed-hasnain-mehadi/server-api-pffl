import fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

// Function to log messages to a file
export const logCreator = (message) => {
  const __dirname = dirname(fileURLToPath(import.meta.url));

  const path = __dirname.replace('src/validations', 'public/logs/') + 'app-errors-log.txt';
  const timestamp = new Date().toISOString();
  const logEntry = `${timestamp} - ${message}\n`;

  try {
    fs.appendFile(path, logEntry, (err) => {
      if (err) {
        console.error('Error writing to log file:', err);
      }
    });
  } catch (error) {
    console.log('error', error);
  }
};
