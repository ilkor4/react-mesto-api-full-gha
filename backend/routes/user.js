const router = require('express').Router();
const { Joi, celebrate } = require('celebrate');
const auth = require('../middlewares/auth');
const { regex } = require('../utils/constants');

const {
  getUsers,
  getUser,
  signOut,
  getCurrentUser,
  login,
  createUser,
  updateUser,
  updateAvatar,
} = require('../controllers/user');

router.post('/signin', celebrate({
  body: Joi.object().keys({
    password: Joi.string().required(),
    email: Joi.string().required().email(),
  }),
}), login);
router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(regex),
    password: Joi.string().required(),
    email: Joi.string().required().email(),
  }),
}), createUser);
router.get('/signout', auth, signOut);
router.get('/users', auth, getUsers);
router.get('/users/me', auth, getCurrentUser);
router.get('/users/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
  }),
}), auth, getUser);
router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
}), auth, updateUser);
router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(regex).required(),
  }),
}), auth, updateAvatar);

module.exports = router;
