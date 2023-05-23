const jwt = require('jsonwebtoken');
const UnathorizedError = require('../errors/unauthorized-err');

module.exports = (req, res, next) => {
  if (!req.cookies.jwt) return next(new UnathorizedError('Ошибка авторизации.'));

  let payload;

  try {
    payload = jwt.verify(req.cookies.jwt, 'some-secret-key');
  } catch (err) {
    return next(new UnathorizedError('Ошибка авторизации.'));
  }

  req.user = payload;

  return next();
};
