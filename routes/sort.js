import express from 'express';
import { userModel, instrumentModel, styleModel } from '../database/database.js';

const router = express.Router();

router
  .route('/')

  .post(async (req, res) => {
    const { instrument } = req.body;
    const users = await userModel.find({ instrument });
    const instruments = await instrumentModel.find();
    const styles = await styleModel.find();
    res.json({ users, instruments, styles });
  });

export default router;
