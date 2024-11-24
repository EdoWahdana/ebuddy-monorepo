import { db } from "../config/firebaseConfig";
import { User } from "@repo/entities";

export class UserRepository {
  private collection = db.collection("users");

  async updateUser(email: string, userData: Partial<User>): Promise<User> {
    try {
      const existingUser = await this.getUser(email);

      if (existingUser) {
        const user = {
          ...existingUser,
          updatedAt: new Date().getTime(),
        };
        await this.collection.doc(email).update(user);

        return user
      } else {
        const user = {
          email: email,
          name: userData.name!,
          createdAt: new Date().getTime(),
          updatedAt: new Date().getTime(),
        };

        await this.collection.doc(email).set(user);

        return user
      }
    } catch (error) {
      console.error("Error updating user:", error);
      throw new Error("Failed to update user");
    }
  }

  async getUser(email: string): Promise<User | null> {
    try {
      const doc = await this.collection.doc(email).get();
      return doc.exists ? (doc.data() as User) : null;
    } catch (error) {
      console.error("Error updating user:", error);
      throw new Error("Failed to update user");
    }
  }
}
