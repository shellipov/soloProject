import express from 'express';
import bcrypt from 'bcrypt';
import checker from '../middlemare/checker.js';
import { userModel, instrumentModel, styleModel } from '../database/database.js';

const router = express.Router();

router
  .route('/register', checker)

  .get(async (req, res) => {
    const instruments = await instrumentModel.find();
    const styles = await styleModel.find();
    res.render('register', { instruments, styles });
  })

  .post(async (req, res) => {
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

    try {
      const newUser = await new userModel({
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
      });
      await newUser.save();
      req.session.user = newUser;
      res.locals.user = req.session.user;
      const message = `you registred as ${newUser.login}`;
      res.render('success', { message });
    } catch {
      res.render('error');
    }
  });

router
  .route('/login', checker)

  .get((req, res) => {
    res.render('login');
  })

  .post(async (req, res) => {
    const user = req.body;
    const needUser = await userModel.findOne({ login: user.login });
    if (needUser && await bcrypt.compare(user.password, needUser.password)) {
      req.session.user = needUser;
      res.locals.user = req.session.user;
      const message = `you login as ${needUser.login}`;
      res.render('success', { message });
    } else {
      res.render('error');
    }
  });

router
  .route('/logout')

  .get((req, res) => {
    req.session.destroy();
    res.clearCookie('user_sid');
    res.redirect('/');
  });

router.get('/:id', async (req, res) => {
  const { id } = req.params;
   console.log(id);
  const user = await userModel.findOne({ _id: id });
  if (user._id == res.locals.user._id) {
    const adm = true;
    res.render('oneuser', { user, adm });
  } else {
    res.render('oneuser', { user });
  }
});

router
  .route('/getuser')

  .post(async (req, res) => {
    const user = await userModel.findOne({ _id: req.body.id });
    res.json(user);
  });

export default router;
