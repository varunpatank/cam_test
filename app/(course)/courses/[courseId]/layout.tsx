// v.0.0.01 salah

import { getProgress } from "@/actions/get-progress";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { CourseSidebar } from "./_components/course-sidebar";
import { CourseNavbar } from "./_components/course-navbar";
import { cn } from "@/lib/utils";
// export const maxDuration = 300;

const CourseLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { courseId: string };
}) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/dashboard");
  }

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      chapters: {
        where: {
          isPublished: true,
        },
        include: {
          userProgress: {
            where: {
              userId,
            },
          },
        },
        orderBy: {
          position: "asc",
        },
      },
    },
  });

  if (!course) {
    return redirect("/search");
  }

  const progressCount = await getProgress(userId, course.id);
  const isChaptered = course.chapters.length > 0;
  return (
    <div className="h-full">
      <div
        className={cn(
          isChaptered
            ? "h-[80px] md:pl-80 fixed inset-y-0 w-full z-50"
            : "h-[80px] md:pl-0 fixed inset-y-0 w-full z-50"
        )}
      >
        <CourseNavbar course={course} progressCount={progressCount} />
      </div>
      {isChaptered && (
        <div className="hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50">
          <CourseSidebar course={course} progressCount={progressCount} />
        </div>
      )}
      <main className="h-full md:pl-80 pt-[80px]">{children}</main>
    </div>
  );
};
export default CourseLayout;
