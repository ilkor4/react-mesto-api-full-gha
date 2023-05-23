const Card = require('../models/card');
const CodeError = require('../errors/code-err');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate(['likes', 'owner'])
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.postCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user })
    .then((card) => card.populate('owner'))
    .then(((card) => res.status(201).send(card)))
    .catch((err) => {
      if (err.name === 'ValidationError') next(new CodeError('Переданы некорректные данные при создании карточки.'));
      else next(err);
    });
};

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findById(cardId)
    .populate('owner')
    .then((card) => {
      if (!card) next(new NotFoundError('Пост не найден.'));
      else if (String(req.user._id) === String(card.owner._id)) {
        card.deleteOne()
          .then(() => res.send({ message: 'Пост успешно удалён.' }))
          .catch(next);
      } else next(new ForbiddenError('Доступ запрещён'));
    })
    .catch((err) => {
      if (err.name === 'CastError') next(new CodeError('Переданы некорректные данные для удаления поста.'));
      else next(err);
    });
};

module.exports.likeCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .populate(['owner', 'likes'])
    .then((card) => {
      if (!card) next(new NotFoundError('Передан несуществующий _id карточки.'));
      else res.send(card.likes);
    })
    .catch((err) => {
      if (err.name === 'CastError') next(new CodeError('Переданы некорректные данные для постановки лайка.'));
      else next(err);
    });
};

module.exports.deleteLike = (req, res, next) => {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .populate(['owner', 'likes'])
    .then((card) => {
      if (!card) next(new NotFoundError('Передан несуществующий _id карточки.'));
      else res.send(card.likes);
    })
    .catch((err) => {
      if (err.name === 'CastError') next(new CodeError('Переданы некорректные данные для снятия лайка.'));
      else next(err);
    });
};
