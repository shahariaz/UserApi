const express = require('express');
const cryptoJS = require('crypto-js');
const user = require('../controllers/user');
const User = require('../models/User');

const router = express.Router();
router.route('/').get(user.getAllUsers).post();
router.route('/register').post(user.registerUser);
router.route('/login').post(user.login);
router.route('/:id').get(user.getUserById).post().delete().patch().put();

module.exports = router;
