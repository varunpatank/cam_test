// v0.0.01 salah

import { clerkClient } from "@clerk/nextjs/server";

export const getUserIMGURL = async (userId: string): Promise<string | null> => {
  try {
    const response = await clerkClient.users.getUser(userId);
    return response.imageUrl || null;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};
