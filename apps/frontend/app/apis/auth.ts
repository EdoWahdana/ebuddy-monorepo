import { User } from "@repo/entities";

export const registerUser = async (idToken: string): Promise<User | null> => {
  try {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/update-user-data`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
      }
    );

    if (!result.ok) {
      console.error(`Failed API register account`);
      return null;
    }
    const resultJson = await result.json();
    const user: User = resultJson.result

    return {
      email: user.email,
      name: user.name,
      updatedAt: user.updatedAt,
      createdAt: user.createdAt,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
};
