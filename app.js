import express from 'express';
import morgan from 'morgan';
import session from 'express-session';
import path from 'path';
import fS from 'session-file-store';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import userChecker from './middlemare/user.js';

import indexRouter from './routes/index.js';
import userRouter from './routes/user.js';
import sortRouter from './routes/sort.js';
import editRouter from './routes/edit.js';

dotenv.config();
const fileStore = fS(session);

const app = express();

app.use(morgan());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(process.env.PWD, 'public')));

app.use(
  session({
    store: new fileStore(),
    key: 'user_sid',
    secret: 'something',
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 1000 * 60 * 60,
    },
  }),
);
app.use(cookieParser());
app.use(userChecker);
app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/sort', sortRouter);
app.use('/edit', editRouter);
app.set('view engine', 'hbs');

app.listen(process.env.PORT ?? 3000, () => {
  console.log('server run on 3000 port');
});
