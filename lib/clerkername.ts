// v0.0.01 salah

import { clerkClient } from "@clerk/nextjs/server";

export const getUserFirstName = async (
  userId: string
): Promise<string | null> => {
  try {
    const user = await clerkClient.users.getUser(userId);
    return user.username || null;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};

interface UserDetails {
  fullname: string | null;
  username: string | null;
  imageUrl: string | null;
  email: string | null;
  lastActiveAt: Date | null;
}

export const getUsersFirstNames = async (
  userIds: string[]
): Promise<Record<string, UserDetails | null>> => {
  try {
    const users = await Promise.all(
      userIds.map((userId) => clerkClient.users.getUser(userId))
    );

    const userMap: Record<string, UserDetails | null> = {};

    users.forEach((user) => {
      userMap[user.id] = {
        fullname: user.fullName || null,
        username: user.username || null,
        imageUrl: user.imageUrl || null,
        email: user.emailAddresses[0]?.emailAddress || null,
        lastActiveAt: user.lastActiveAt ? new Date(user.lastActiveAt) : null,
      };
    });

    return userMap;
  } catch (error) {
    console.error("Error fetching users data:", error);

    return userIds.reduce((acc, userId) => {
      acc[userId] = {
        fullname: null,
        username: null,
        imageUrl: null,
        email: null,
        lastActiveAt: null,
      };
      return acc;
    }, {} as Record<string, UserDetails | null>);
  }
};
