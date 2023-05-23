const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');

const { cardsRouter, userRouter } = require('./routes');
const { PORT } = require('./utils/config');
const NotFoundError = require('./errors/not-found-err');
const globalErrorsHandler = require('./middlewares/globalErrorsHandler');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(express.json());
app.use(cookieParser());

app.use('/', userRouter);
app.use('/', cardsRouter);
app.use('*', (req, res, next) => {
  next(new NotFoundError('Ошибка 404. Данного ресурса не существует.'));
});

app.use(errors());

app.use(globalErrorsHandler);

app.listen(PORT);