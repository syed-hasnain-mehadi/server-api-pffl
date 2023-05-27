import chalk from 'chalk';
import { verifyJWT } from '../services/jwt.js';
export const auth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const token = authorization?.split(' ')?.[1];
    const isValid = await verifyJWT(token);
    if (isValid?.id) {
      req.token = isValid.id;
      next();
    } else {
      res.status(402).send({ success: false, msg: 'token verification error' });
    }
  } catch (error) {
    console.log(chalk.bgRed.bold(error?.message));
    res.status(402).send({ success: false, msg: 'token verification error' });
  }
};
