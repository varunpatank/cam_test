// v.0.0.01 salah

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { Chapter, Course, UserProgress } from "@prisma/client";
import { redirect } from "next/navigation";
import { CourseSidebarItem } from "./course-sidebar-item";
import { CourseProgress } from "@/components/course-progress";

interface CourseSidebarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
}
export const CourseSidebar = async ({
  course,
  progressCount,
}: CourseSidebarProps) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/dashboard");
  }

  const enrollment = await db.enrollment.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId: course.id,
      },
    },
  });
  return (
    <>
      <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
        <div className="p-8 flex flex-col border-b">
          <h1 className="font-semibold">{course.title}</h1>
          {enrollment && (
            <div className="mt-10">
              <CourseProgress variant="success" value={progressCount} />
            </div>
          )}
        </div>
        <div className="flex flex-col w-full">
          {course.chapters.map((chapter, index) => (
            <CourseSidebarItem
              key={chapter.id}
              id={chapter.id}
              label={chapter.title}
              isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
              isLocked={
                !enrollment &&
                !chapter.title.toLowerCase().includes("intr".toLowerCase())
              }
              courseId={course.id}
            />
          ))}
        </div>
      </div>
    </>
  );
};
