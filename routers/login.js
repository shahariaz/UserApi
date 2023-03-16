const express = require('express');
const cryptoJS = require('crypto-js');
const user = require('../controllers/user');
const User = require('../models/User');

router.route('/').get(user.getAllUsers).post();
router.route('/:id').get().post().delete().patch().put();

module.exports = router;
