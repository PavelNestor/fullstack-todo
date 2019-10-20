const express = require('express');
const userRoutes = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET = process.env.SECRET;

const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

const User = require('../../models/User');

userRoutes.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  };

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: 'Email already exists' });
    } else {
      const newUser = new User(req.body);

      newUser.save((err, user) => {
        if (err) return res.status(500).send({success: false, err});
        const token = jwt.sign(user.withoutPassword(), SECRET);
        return res.status(201).send({ user: user.withoutPassword(), token });
      });
    }
  });
});

userRoutes.post('/login', (req, res, next) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  };

  const email = req.body.email.toLowerCase();
  const password = req.body.password;

  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(404).json({ emailnotfound: 'Email not found' });
    };

    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const token = jwt.sign(user.withoutPassword(), SECRET);
        return res.send({ user: user.withoutPassword(), token })
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: 'Password incorrect' });
      }
    });
  });
});

userRoutes.get('/logout', function (req, res) {
  req.logout();
});

module.exports = userRoutes;
