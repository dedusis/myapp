import { loginService } from './service.js';

const loginController = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    const { token, driver } = await loginService(username, password);
    return res.status(200).json({ token, driver });
  } catch (err) {
    console.error('Login failed:', err.message);
    return res.status(401).json({ error: 'Invalid credentials' });
  }
};

export default loginController;
