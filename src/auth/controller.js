import { loginService } from './service.js';

const loginController = async (req, res) => {
    try {

      const username = req.params.username;
      const password = req.params.password;

      const driver = loginService(username, password);
      res.status(201).json({ driver });
    } catch (err) {
      console.error('Driver not found', err);
      res.status(500).json({ error: 'Login failed' });
    }
};
  

export default {loginController};