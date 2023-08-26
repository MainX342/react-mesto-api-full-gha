const router = require('express').Router();
const {
  getUsers, getUserInfo, getUsersById, updateUser, updateUserAvatar,
} = require('../controllers/users');
const { userIdValidation, updateUserValidation, updateUserAvatarValidation } = require('../middlewares/joiValidation');

router.get('/', getUsers);
router.get('/me', getUserInfo);
router.get('/:userId', userIdValidation, getUsersById);
router.patch('/me', updateUserValidation, updateUser);
router.patch('/me/avatar', updateUserAvatarValidation, updateUserAvatar);

module.exports = router;
