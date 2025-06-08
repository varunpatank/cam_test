// v0.0.01 salah

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized!", { status: 401 });
    }
    const course = await db.course.findUnique({
      where: { id: params.courseId, userId },
      include: {
        chapters: {
          include: {
            cloudinaryData: true,
          },
        },
      },
    });
    if (!course) {
      return new NextResponse("not found!", { status: 401 });
    }
    if (
      !course.title ||
      !course.description ||
      !course.imageUrl ||
      !course.subjectId
    ) {
      return new NextResponse("Please fill all required fields", {
        status: 401,
      });
    }
    const publishedCourse = await db.course.update({
      where: {
        id: params.courseId,
        userId,
      },
      data: {
        isPublished: true,
      },
    });
    // const hasPublishedChapter = course.chapters.some(
    //   (chapter) => chapter.isPublished
    // );
    return NextResponse.json(publishedCourse);
  } catch (error) {
    console.error("Course publishing ERROR:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
