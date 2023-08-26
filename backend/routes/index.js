const router = require('express').Router();
const { loginValidation, registerValidation } = require('../middlewares/joiValidation');
const { login, createUser } = require('../controllers/users');
const userRouter = require('./users');
const cardRouter = require('./cards');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.use('/signin', loginValidation, login);
router.use('/signup', registerValidation, createUser);

router.use(auth);
router.use('/users', userRouter);
router.use('/cards', cardRouter);
router.use('*', (req, res, next) => {
  next(new NotFoundError('Запрашиваемая странница не найдена'));
});

module.exports = router;
