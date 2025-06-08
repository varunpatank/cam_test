"use client";
import { CreateChatModal } from "@/app/studyhub/_components/modals/create-chat-modal";
import { CreateRoomModal } from "@/app/studyhub/_components/modals/create-room-modal";
import { DeleteChatModal } from "@/app/studyhub/_components/modals/delete-chat-modal";
import { DeleteMessageModal } from "@/app/studyhub/_components/modals/delete-message-modal";
import { DeleteRoomModal } from "@/app/studyhub/_components/modals/delete-room-modal";
import { EditChatModal } from "@/app/studyhub/_components/modals/edit-chat-modal";
import { EditRoomModal } from "@/app/studyhub/_components/modals/edit-room-modal";
import { InitialModal } from "@/app/studyhub/_components/modals/initial-modal";
import { InviteModal } from "@/app/studyhub/_components/modals/invite-modal";
import { LeaveRoomModal } from "@/app/studyhub/_components/modals/leave-room-modal";
import { MembersModal } from "@/app/studyhub/_components/modals/members-modal";
import { MessageFileModal } from "@/app/studyhub/_components/modals/message-file-modal";
import { TaskModal } from "@/app/tracker/group/_components/modals/task-modal";
import { useEffect, useState } from "react";
export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CreateRoomModal />
      <InviteModal />
      <EditRoomModal />
      <MembersModal />
      <CreateChatModal />
      <LeaveRoomModal />
      <DeleteRoomModal />
      <DeleteChatModal />
      <EditChatModal />
      <MessageFileModal />
      <DeleteMessageModal />
      <TaskModal />
    </>
  );
};
