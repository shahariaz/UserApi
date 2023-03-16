exports.getAllUsers = (req, res) => {
  res.status(200).json({
    message: 'All users',
    users: users,
  });
};
