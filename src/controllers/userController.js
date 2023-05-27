import chalk from 'chalk';
import userModel from '../models/userModel.js';

export const getUser = async (req, res) => {
  try {
    const id = req.token;
    const user = await userModel.findOne({ _id: id });
    res.status(200).send({
      success: true,
      msg: 'success',
      data: user
    });
  } catch (error) {
    console.log(chalk.bgRed.bold(error?.message));
    res.status(500).send({
      success: false,
      msg: error?.message,
      data: {}
    });
  }
};
export const getAllUsers = async (req, res) => {
  try {
    const page = req.query?.page ?? 1;
    const limit = req.query?.limit ?? 10;

    const users = await userModel
      .find({})
      .limit(limit)
      .skip((page - 1) * limit);
    const count = await userModel.countDocuments({});
    res.status(200).send({
      success: true,
      msg: 'success',
      data: { users, count }
    });
  } catch (error) {
    console.log(chalk.bgRed.bold(error?.message));
    res.status(500).send({
      success: false,
      msg: error?.message,
      data: {}
    });
  }
};
