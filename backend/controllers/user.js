const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const User = require('../models/user');

const CodeError = require('../errors/code-err');
const NotFoundError = require('../errors/not-found-err');
const ConflictError = require('../errors/conflict-err');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  const { id } = req.params;

  User.findById(id)
    .then((user) => {
      if (!user) next(new NotFoundError('Пользователь по указанному _id не найден.'));
      else res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') next(new CodeError('Переданы некорректные данные для поиска пользователя.'));
      else next(err);
    });
};

module.exports.getCurrentUser = (req, res, next) => {
  const { _id } = req.user;

  User.findOne({ _id })
    .then((user) => res.send(user))
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    password,
    email,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        name,
        about,
        avatar,
        password: hash,
        email,
      })
        .then((user) => res.status(201).send(user))
        .catch((err) => {
          if (err.code === 11000) next(new ConflictError('Пользователь с таким email уже существует.'));
          else if (err.name === 'ValidationError') next(new CodeError('Переданы некорректные данные для создания профиля.'));
          else next(err);
        });
    });
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      if (!user) next(new NotFoundError('Пользователь с указанным _id не найден.'));
      else res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') next(new CodeError('Переданы некорректные данные при обновлении профиля.'));
      else next(err);
    });
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      if (!user) next(new NotFoundError('Пользователь с указанным _id не найден.'));
      else res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') next(new CodeError('Переданы некорректные данные при обновлении аватара.'));
      else next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = JWT.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });

      res.cookie('jwt', token, {
        httpOnly: true,
        sameSite: true,
        maxAge: 3600000 * 7 * 24,
      })
        .send({ message: 'Авторизация прошла успешно.' })
        .end();
    })
    .catch(next);
};

module.exports.signOut = (req, res) => {
  res.cookie('jwt', 'aaaa', {
    httpOnly: true,
    sameSite: true,
    maxAge: 100,
  })
    .send({ message: 'Выход выполнен успешно.' })
    .end();
};
