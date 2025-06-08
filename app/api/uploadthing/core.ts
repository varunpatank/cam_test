// v0.0.01 salah

import { isTutor } from "@/lib/tutor";
import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

const handleAuth = () => {
  const { userId } = auth();
  const isAuthorized = isTutor(userId);
  if (!userId || !isAuthorized) throw new Error("Unauthorized!");
  return { userId };
};

export const ourFileRouter = {
  courseImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(() => auth())
    .onUploadComplete(() => {}),
  roomImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(() => auth())
    .onUploadComplete(() => {}),
  messageFile: f({
    text: { maxFileSize: "512MB", maxFileCount: 500 },
    image: { maxFileSize: "512MB", maxFileCount: 500 },
    pdf: { maxFileSize: "512MB", maxFileCount: 500 },
  })
    .middleware(() => auth())
    .onUploadComplete(() => {}),
  courseAttachment: f({
    text: { maxFileSize: "512MB", maxFileCount: 1 },
    image: { maxFileSize: "512MB", maxFileCount: 1 },
    video: { maxFileSize: "512MB", maxFileCount: 1 },
    pdf: { maxFileSize: "512MB", maxFileCount: 1 },
  })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
  noteAttachment: f({
    text: { maxFileSize: "512MB", maxFileCount: 1 },
    image: { maxFileSize: "512MB", maxFileCount: 1 },
    video: { maxFileSize: "512MB", maxFileCount: 1 },
    pdf: { maxFileSize: "512MB", maxFileCount: 1 },
  })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
  chapterVideo: f({ video: { maxFileSize: "512GB", maxFileCount: 1 } })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
