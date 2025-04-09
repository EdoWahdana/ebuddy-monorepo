export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: number
  updatedAt: number
  totalAverageWeightRatings: number,
  numberOfRents: number,
  recentlyActive: number,
}

export interface UserUpdateData {
  name?: string;
}