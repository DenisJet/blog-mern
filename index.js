import express from 'express';
import mongoose from 'mongoose';
import {} from 'dotenv/config';

import { registerValidation } from './validations/auth.js';
import checkAuth from './utils/checkAuth.js';
import * as UserController from './controllers/userControllers.js';

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('DB ok'))
  .catch((err) => console.log('DB error', err));

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/auth/login', UserController.login);
app.post('/auth/register', registerValidation, UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe);

app.listen(process.env.PORT, (err) => {
  if (err) {
    return console.error(err);
  }

  console.log('Server OK');
});
