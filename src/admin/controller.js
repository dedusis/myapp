const { getAllUsers } = require('./service');

const getAllUsersController = (req, res) => {
  const drivers = getAllUsers();
  res.send(drivers);
};

module.exports = { getAllUsersController };