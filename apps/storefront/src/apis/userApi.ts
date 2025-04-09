import axios from 'axios';
import { auth, functions } from '../config/firebase';
import { httpsCallable } from 'firebase/functions';
import { User, UserUpdateData } from '@repo/interface';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5001/your-project-id/us-central1/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use(async (config) => {
  try {
    const currentUser = auth.currentUser;
    if (currentUser) {
      const token = await currentUser.getIdToken();
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  } catch (error) {
    console.error('Error getting auth token:', error);
    return config;
  }
});

export const fetchAllUsers = async (): Promise<{
  users: Array<{
    id: string;
    email: string;
    name: string;
    createdAt: number;
    updatedAt: number;
    totalAverageWeightRatings: number;
    numberOfRents: number;
    recentlyActive: number;
  }>,
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  }
}> => {
  try {
    const response = await axios.get(`http://localhost:5001/api/users/fetch-all-users`);
    return response.data;
  } catch (error) {
    console.error('Error fetching all users:', error);
    throw error;
  }
};

export const updateUserData = async (userId: string, userData: UserUpdateData): Promise<{ user: User }> => {
  try {
    if (process.env.NODE_ENV === 'development') {
      const response = await api.put(`/api/users/update-user-data${userId ? `/${userId}` : ''}`, userData);
      return response.data;
    } else {
      const updateUserFn = httpsCallable(functions, 'api-users-update-user-data');
      const result = await updateUserFn({ userId, userData });
      return result.data as { user: User };
    }
  } catch (error) {
    console.error('Error updating user data:', error);
    throw error;
  }
}