import { firestore } from '../config/firebaseConfig';
import { User, UserUpdateData } from '../entities/user';

const USERS_COLLECTION = 'users';

// Calculate potential score for a user based on priority
const calculatePotentialScore = (user: any): number => {
  const RATING_WEIGHT = 1000; // Highest priority
  const RENTS_WEIGHT = 10;
  
  return (
    user.totalAverageWeightRatings * RATING_WEIGHT +
    user.numberOfRents * RENTS_WEIGHT +
    (1 / (Date.now() - user.recentlyActive + 1)) // Only need to normalize the delta value
  );
};

export const getUserById = async (userId: string): Promise<User | null> => {
  try {
    const userDoc = await firestore.collection(USERS_COLLECTION).doc(userId).get();
    
    if (!userDoc.exists) {
      return null;
    }
    
    return { id: userDoc.id, ...userDoc.data() } as User;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

export const updateUser = async (userId: string, userData: UserUpdateData): Promise<User> => {
  try {
    const updateData = {
      ...userData,
      updatedAt: new Date()
    };
    
    await firestore.collection(USERS_COLLECTION).doc(userId).update(updateData);
    
    const updatedUser = await getUserById(userId);
    if (!updatedUser) {
      throw new Error('User not found after update');
    }
    
    return updatedUser;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

export const getAllUsers = async () => {
  try {
    const usersRef = firestore.collection(USERS_COLLECTION);

    const totalSnapshot = await usersRef.count().get();
    const total = totalSnapshot.data().count;
    
    const snapshot = await usersRef.get();
    
    const usersWithScores = snapshot.docs.map(doc => {
      const userData = doc.data();
      return {
        id: doc.id,
        ...userData,
        potentialScore: calculatePotentialScore(userData)
      };
    });
    
    const users = usersWithScores.sort((a, b) => b.potentialScore - a.potentialScore);
    console.log(users)
    
    return { users, total };
  } catch (error) {
    console.error('Error getting all users:', error);
    throw error;
  }
};