// v0.0.01 salah

import { defaultIds } from "@/app/(dashboard)/(routes)/users";

export const isTutor = (userId?: string | null): boolean => {
  if (!userId) return false;
  const tutorIds =
    process.env.NEXT_PUBLIC_TUTOR_IDS?.split(",") || defaultIds.tutorIds
      ? process.env.NEXT_PUBLIC_TUTOR_IDS?.split(",") || defaultIds.tutorIds
      : [];

  return tutorIds.includes(userId);
};
