import { Board, Course, Subject } from "@prisma/client";
import Image from "next/image";
import { FaFaceGrinBeamSweat } from "react-icons/fa6";
import { CourseCard } from "./course-card";

type CourseWithProgressWithSubject = Course & {
  subject: Subject | null;
  board: Board | null;
  chapters: { id: string; sessionlink: string }[];
  progress: number | null;
};

interface CoursesListProps {
  prevImage?: boolean; // Optional prop
  items: CourseWithProgressWithSubject[];
}

export const CoursesList = ({ items, prevImage = true }: CoursesListProps) => {
  return (
    <div>
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
        {items.map((item) => (
          <CourseCard
            key={item.id}
            id={item.id}
            title={item.title}
            imageUrl={item.imageUrl!}
            chaptersLength={item.chapters.length}
            progress={item.progress}
            subject={item.subject?.name!}
            board={item.board?.name!}
            isOnline={Boolean(
              item?.chapters.map((chapter) => chapter?.sessionlink)
            )}
            courseOwner={item.userId}
          />
        ))}
      </div>

      {/* Only show the "No Courses Found" message if prevImage is true and there are no items */}
      {items.length === 0 && (
        <div className="flex flex-col items-center justify-center text-center text-sm text-muted-foreground">
          <div className="flex items-center gap-2 text-xl mt-8">
            <span>No Courses found</span>
            <FaFaceGrinBeamSweat className="text-lg" />
          </div>
          {prevImage === true && (
            <Image
              src="/nocourses.svg"
              height={600}
              width={600}
              alt="No courses found"
              className="mt-9"
            />
          )}
        </div>
      )}
    </div>
  );
};
