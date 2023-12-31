require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes/routes');
const centralizedError = require('./middlewares/centralized-error');
const { DB_ADDRESS } = require('./config');

mongoose.connect(DB_ADDRESS);

const app = express();

app.use(cors());

app.use(express.json());

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(router);

app.use(errorLogger);

app.use(errors());

app.use(centralizedError);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
