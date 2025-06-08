// v0.0.01 salah
"use client";
import { UploadDropzone } from "@/lib/uploadthing";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import toast from "react-hot-toast";

interface FileUploadProps {
  onChange: (url?: string) => void;
  endpoint: keyof typeof ourFileRouter;
}
export const FileUpload = ({ onChange, endpoint }: FileUploadProps) => {
  return (
    <UploadDropzone
      className="
             ut-label:text-purple-600
             ut-allowed-content:text-purple-300
             ut-button:bg-purple-600
             ut-button:ut-readying:bg-purple-500
             ut-button:ut-uploading:bg-purple-400"
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
      }}
      onUploadError={(error: Error) => {
        toast.error(`${error.message}!`);
      }}
    />
  );
};
