import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/user_model';
import { authenticateJWT, authorizeRole } from '../middleware/authMiddleware';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS || '10', 10);

//  Register Route
router.post('/register', async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email }).exec();
    if (existingUser) { 
      res.status(400).json({ message: 'Email already registered' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const newUser = new User({ name, email, password: hashedPassword, role });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Registration failed', error: err });
  }
});

//  Login Route
router.post('/login', async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).exec();
    if (!user) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err });
  }
});

//  Admin-only Route to Get All Users
router.get('/users', authenticateJWT, authorizeRole(['admin']), async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find({}, '-password').exec();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch users', error: err });
  }
});

export default router;
