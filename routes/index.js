import express from 'express';
import { userModel, instrumentModel, styleModel } from '../database/database.js';

const router = express.Router();

router
  .route('/')

  .get(async (req, res) => {
    const users = await userModel.find();
    const instruments = await instrumentModel.find();
    const styles = await styleModel.find();

    res.render('index', { users, instruments, styles });
  });

export default router;
