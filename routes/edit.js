import express from 'express';
import bcrypt from 'bcrypt';
import { styleModel, instrumentModel, userModel } from '../database/database.js';

const router = express.Router();

router.get('/style', async (req, res) => {
  res.render('newstyle');
});

router.post('/style', async (req, res) => {
  const { name, displayed, about } = req.body;
  const needStyle = await styleModel.findOne({ name });
  if (!needStyle) {
    await styleModel.create({ name, displayed, about });
    const message = `you created ${name}`;
    res.render('success', { message });
  } else {
    const error = `${name} already exist`;
    res.render('error', { error });
  }
});

router.get('/instrument', async (req, res) => {
  res.render('newinstrument');
});

router.post('/instrument', async (req, res) => {
  const { name, displayed, about } = req.body;
  const needInstrument = await instrumentModel.findOne({ name });
  if (!needInstrument) {
    await instrumentModel.create({ name, displayed, about });
    const message = `you created ${name}`;
    res.render('success', { message });
  } else {
    const error = `${name} already exist`;
    res.render('error', { error });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const user = await userModel.findOne({ _id: id });
  const instruments = await instrumentModel.find();
  const styles = await styleModel.find();
  res.render('edituser', { user, instruments, styles });
});

router.post('/:id', async (req, res) => {
  const { id } = req.params;
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    socialNetworks,
    instrument,
    style,
    address,
    login,
    password,
    inSearch,
    about,
    admin,
  } = req.body;
  await userModel.findOneAndUpdate({ _id: id }, {
    $set: {
      firstName,
      lastName,
      email,
      phoneNumber,
      socialNetworks,
      instrument,
      style,
      address,
      login,
      password: await bcrypt.hash(password, 10),
      inSearch,
      about,
      admin,
    },
  });
  const message = 'changed';
  res.render('success', { message });
});

export default router;
