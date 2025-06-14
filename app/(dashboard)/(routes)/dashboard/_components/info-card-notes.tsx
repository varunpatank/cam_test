// v.0.0.01 salah

import { IconBadge } from "@/components/icon-badge";
import { LucideIcon } from "lucide-react";
interface InfoCardProps {
  numberOfItems: number;
  variant?: "default" | "success";
  label: string;
  icon: LucideIcon;
}
export const InfoCardNotes = ({
  numberOfItems,
  variant,
  label,
  icon: Icon,
}: InfoCardProps) => {
  return (
    <div className="border rounded-md flex items-center gap-x-2 p-3">
      <IconBadge variant={variant} icon={Icon} />
      <div>
        <p className="font-medium">{label}</p>
        <p className="text-gray-400 text-sm">
          {numberOfItems}
          {"  "}
          {numberOfItems === 1 ? "Subject" : "Subjects"}
        </p>
      </div>
    </div>
  );
};
