import { loginService } from './service.js';
import { getUserProfile } from './service.js';


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

const profileController = async (req, res) => {
  try {
    const user = await getUserProfile(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error('Profile error:' , err);
    res.status(500).json({ error:'Server error' });
  }
};

export default loginController;
export { profileController };