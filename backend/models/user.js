const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { urlRegex, emailRegex } = require('../utils/regexPatterns');
const UnautorizedError = require('../errors/UnautorizedError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, 'Минимальная длина имени 2 символа'],
    maxlength: [30, 'Макимальная длина имени 30 символов'],
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: [2, 'Минимальная длина описания 2 символа'],
    maxlength: [30, 'Макимальная длина описания 30 символов'],
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator(url) {
        return urlRegex.test(url);
      },
      message: 'Неправильный формат ссылки',
    },
  },
  email: {
    type: String,
    required: [true, 'Требуется указать email'],
    unique: true,
    validate: {
      validator(email) {
        return emailRegex.test(email);
      },
      message: 'Неправильный формат email',
    },
  },
  password: {
    type: String,
    required: [true, 'Требуется указать пароль'],
    select: false,
  },
}, { versionKey: false });

async function findUserByCredentials(email, password) {
  const user = await this.findOne({ email }).select('+password');

  if (!user) {
    throw new UnautorizedError(`Пользователь с email: ${email} не найден`);
  }

  const matched = await bcrypt.compare(password, user.password);
  if (!matched) {
    throw new UnautorizedError('Неправильные почта или пароль');
  }

  return user;
}

userSchema.statics.findUserByCredentials = findUserByCredentials;

module.exports = mongoose.model('user', userSchema);
