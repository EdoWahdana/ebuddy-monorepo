import { Request, Response } from 'express';
import { getUserById, updateUser, getAllUsers } from '../repository/userCollection';
import { UserUpdateData } from '@repo/interface';

interface AuthRequest extends Request {
  user?: {
    uid: string;
    email: string;
    role?: string;
  };
}

export const fetchUserData = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.params.userId || req.user?.uid;
    
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }
    
    const user = await getUserById(userId);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    return res.status(200).json({ user });
  } catch (error) {
    console.error('Error fetching user data:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateUserData = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.params.userId || req.user?.uid;
    const userData: UserUpdateData = req.body;
    
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }
    
    // Validate user data
    if (Object.keys(userData).length === 0) {
      return res.status(400).json({ error: 'No update data provided' });
    }
    
    const updatedUser = await updateUser(userId, userData);
    
    return res.status(200).json({ 
      message: 'User updated successfully',
      user: updatedUser 
    });
  } catch (error) {
    console.error('Error updating user data:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const fetchAllUsers = async (req: Request, res: Response) => {
  try {
    // Might implement pagination with limit here
    const { users, total } = await getAllUsers();
    
    if (!users || users.length === 0) {
      return res.status(200).json({ 
        users: [],
        pagination: {
          total: 0,
        }
      });
    }
    
    return res.status(200).json({
      users,
      pagination: {
        total,
      }
    });
  } catch (error) {
    console.error('Error fetching all users:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};