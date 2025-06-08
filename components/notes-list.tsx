// v0.0.01 salah
import { NoteBoard, Note, NoteSubject } from "@prisma/client";
import Image from "next/image";
import { FaFaceGrinBeamSweat } from "react-icons/fa6";
import { NoteCard } from "./note-card";
import { NoteCardMol } from "./note-card-mol";

type NoteWithProgressWithSubject = Note & {
  notesubject: NoteSubject | null;
  noteboard: NoteBoard | null;
  notechapters: { id: string; sessionlink: string }[];
  progress: number | null;
};
interface NotesListProps {
  prevImage?: boolean; // Optional prop
  items: NoteWithProgressWithSubject[];
}
export const NotesList = ({ items, prevImage = true }: NotesListProps) => {
  return (
    <div>
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grod-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
        {/* <NoteCardMol
          key={"albiology-edexcel"}
          zoomed="scale-150"
          id={"albiology-edexcel"}
          title={"IAL/AS Biology "}
          smth={"[New Spec]"}
          imageUrl={"/dna.png"}
          chaptersLength={36}
          progress={54}
          subject={"AL/AS Biology"}
          board={"Edexcel"}
          isOnline={Boolean(false)}
          noteOwner={"user_2lFzt9TAlxAqaiWPbYNCDmQv8kL"}
        />{" "} */}
        <NoteCardMol
          zoomed="scale-150"
          key={"x"}
          id={"alchemistry"}
          title={"AL/AS Chemistry"}
          imageUrl={"/beaker.png"}
          chaptersLength={12}
          // showChaps={false}
          progress={34}
          subject={"AL/AS Chemistry"}
          board={"Cambridge"}
          isOnline={Boolean(false)}
          noteOwner={"user_2lFzt9TAlxAqaiWPbYNCDmQv8kL"}
        />{" "}
        {/* <NoteCardMol
          key={"y"}
          zoomed="scale-150"
          id={"alphysics"}
          title={"AL/AS Physics"}
          imageUrl={"/apple.png"}
          chaptersLength={14}
          progress={1}
          subject={"AL/AS Physics"}
          board={"Cambridge"}
          isOnline={Boolean(false)}
          noteOwner={"user_2lFzt9TAlxAqaiWPbYNCDmQv8kL"}
        />{" "} */}
        <NoteCardMol
          key={"naa"}
          id={"efl"}
          title={"English As First Language"}
          imageUrl={"/britain.png"}
          zoomed="scale-150"
          chaptersLength={6}
          progress={78}
          subject={"EFL"}
          board={"Cambridge IGCSE"}
          isOnline={Boolean(false)}
          noteOwner={"user_2lFzt9TAlxAqaiWPbYNCDmQv8kL"}
        />{" "}
        {/* <NoteCardMol
          key={"ys"}
          zoomed="scale-150"
          id={"almaths"}
          title={"AL/AS Maths"}
          imageUrl={"/pi.png"}
          chaptersLength={14}
          progress={1}
          subject={"AL/AS Mathematics"}
          board={"Cambridge"}
          isOnline={Boolean(false)}
          noteOwner={"user_2lFzt9TAlxAqaiWPbYNCDmQv8kL"}
        />{" "} */}
        {/* <NoteCardMol
          key={"ydas"}
          zoomed="scale-150"
          id={"al-further-maths"}
          title={"AL/AS Further Maths"}
          imageUrl={"/further.png"}
          chaptersLength={14}
          progress={1}
          subject={"AL/AS Further Maths"}
          board={"Cambridge"}
          isOnline={Boolean(false)}
          noteOwner={"user_2lFzt9TAlxAqaiWPbYNCDmQv8kL"}
        />{" "} */}
        {items.map((item) => (
          <NoteCard
            key={item.id}
            id={item.id}
            title={item.title}
            imageUrl={item.imageUrl!}
            chaptersLength={item.notechapters.length}
            progress={item.progress}
            subject={item.notesubject?.name!}
            board={item.noteboard?.name!}
            isOnline={Boolean(
              item?.notechapters.map((chapter) => chapter?.sessionlink)
            )}
            noteOwner={item.userId}
          />
        ))}{" "}
      </div>
      {/* {items.length === 0 && (
        <div className="flex flex-col items-center justify-center  text-center text-sm text-muted-foreground">
          <div className="flex items-center gap-2  text-xl mt-8">
            <span>No notes found</span>
            <FaFaceGrinBeamSweat className="text-lg" />
          </div>{" "}
          {prevImage === true && (
            <Image
              src={"/notfoundbook.svg"}
              height={600}
              width={600}
              alt="no notes found"
              className="mt-9"
            />
          )}
        </div>
      )} */}
    </div>
  );
};
