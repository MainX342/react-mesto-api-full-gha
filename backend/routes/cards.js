const router = require('express').Router();
const {
  getCards, deleteCard, createCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const { cardIdValidation, createCardValidation } = require('../middlewares/joiValidation');

router.get('/', getCards);
router.delete('/:cardId', cardIdValidation, deleteCard);
router.post('/', createCardValidation, createCard);
router.put('/:cardId/likes', cardIdValidation, likeCard);
router.delete('/:cardId/likes', cardIdValidation, dislikeCard);

module.exports = router;
