import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';         // optional
import Driver from '../driver/model.js';

export const loginService = async (username, password) => {
  const driver = await Driver.findOne({ username });
  if (!driver) {
    throw new Error('Invalid credentials');
  };

  const passwordMatches = await bcrypt.compare(password, driver.password);
  if (!passwordMatches) {
    throw new Error('Invalid credentials');
  } 

  const payload = {
    id: driver._id,
    username: driver.username,
    role: 'driver'
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '1h'
  });

  return {
    token,
    driver: {
      _id: driver._id,
      name: driver.name,
      lastname: driver.lastname,
      licenseNumber: driver.licenseNumber,
      username: driver.username
    }
  };
};
