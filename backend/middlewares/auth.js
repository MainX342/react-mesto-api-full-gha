require('dotenv').config();
const jwt = require('jsonwebtoken');

const { SECRET_KEY = 'mainx-yandex' } = process.env;
const UnautorizedError = require('../errors/UnautorizedError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnautorizedError('Необходимо авторизоваться');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch (err) {
    throw new UnautorizedError('Необходимо авторизоваться');
  }
  req.user = payload;
  next();
};
