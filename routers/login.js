const express = require('express');
const router = express.Router();
const user = require('../controllers/user');

router.route('/').get(user.getAllUsers).post();
router.route('/:id').get().post().delete().patch().put();

module.exports = router;
