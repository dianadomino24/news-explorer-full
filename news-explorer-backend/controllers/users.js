const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_DEV_SECRET } = require('../config');
const User = require('../models/user');
const ConflictError = require('../errors/ConflictError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;

const getMe = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFoundError('The user is not found'))
    .then(({ email, name }) => res.status(200).send({ email, name }))
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    email, password, name,
  } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ConflictError('This user already exists');
      }
      return bcrypt.hash(password, 10);
    })
    .then((hash) => User.create({
      email,
      password: hash,
      name,
    }))
    .then((user) => res.status(200).send({ email: user.email, _id: user._id }))
    .catch(next);
};

function login(req, res, next) {
  const { email, password } = req.body;

  if (!(email && password)) {
    throw new BadRequestError('Both fields must be filled in');
  }

  User.findOne({ email })
    .select('+password')
    .orFail(new UnauthorizedError('Incorrect email or password'))
    .then((user) => bcrypt.compare(password, user.password).then((matched) => {
      if (matched) {
        const token = jwt.sign(
          { _id: user._id },
          NODE_ENV === 'production' ? JWT_SECRET : JWT_DEV_SECRET,
          { expiresIn: '7d' },
        );
        return res.status(200).send({ token });
      }
      throw new UnauthorizedError('Incorrect email or password');
    }))
    .catch(next);
}

module.exports = {
  createUser,
  login,
  getMe,
};
