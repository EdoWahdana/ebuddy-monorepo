import { Request, Response } from "express";
import { UserRepository } from "../repository/userCollection";
import { User } from "@repo/entities";

const userRepo = new UserRepository();

export const updateUserData = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const { email, name } = req?.user;
    const user: Partial<User> = {
      email: email,
      name: name,
    };

    const result = await userRepo.updateUser(email, user);
    res.status(200).json({ result, message: "User updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update user" });
  }
};

export const fetchUserData = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const email = req?.user.email;
    const user = await userRepo.getUser(email);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch user" });
  }
};
