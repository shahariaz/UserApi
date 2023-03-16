const User = require('../models/User');
const CryptoJS = require('crypto-js');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      message: 'All users',
      users: users,
    });
  } catch (err) {
    console.log('Error getting', err);
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { username } = user;

    res.status(200).json({
      message: 'User',
      user: username,
    });
  } catch (err) {
    console.log('Error getting', err);
  }
};
exports.registerUser = async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
  });
  try {
    await newUser.save();

    res.status(201).json({
      message: 'User created',
      user: newUser,
    });
  } catch (err) {
    res.status(400).json({
      message: 'User already exists',
      data: { newUser },
    });
  }
};
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    console.log(user.password);
    if (!user) {
      return res.status(400).json({
        message: 'User not found',
      });
    }
    const validPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    ).toString(CryptoJS.enc.Utf8);
    if (validPassword !== req.body.password) {
      return res.status(400).json({
        message: 'Invalid password',
      });
    }
    const { username } = user;
    res.status(200).json({
      message: 'User logged in',
      user: username,
    });
  } catch (err) {
    console.log('Error getting', err);
  }
};
