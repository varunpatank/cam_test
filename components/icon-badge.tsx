// v0.0.01 salah

import { Icon, LucideIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
const backgroundVariants = cva(
  "rounded-full flex items-center justify-center",
  {
    variants: {
      variant: {
        default: "bg-purple-800",
        success: "bg-emerald-800",
        online: "bg-blue-800",
      },
      iconVariant: {
        default: "text-n-8",
        success: "text-n-8",
        online: "text-n-8",
      },
      size: {
        default: "p-2",
        sm: "p-1",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
const iconVariants = cva("", {
  variants: {
    variant: {
      default: "text-white",
      success: "text-white",
      online: "text-white",
    },
    size: {
      default: "h-8 w-8",
      sm: "h-4 w-4",
    },
  },
  defaultVariants: { variant: "default", size: "default" },
});
type BackgroundVariantsProps = VariantProps<typeof backgroundVariants>;
type IconVariantsProps = VariantProps<typeof iconVariants>;
interface IconBadgeProps extends BackgroundVariantsProps, IconVariantsProps {
  icon: LucideIcon;
}

export const IconBadge = ({ icon: Icon, variant, size }: IconBadgeProps) => {
  return (
    <div className={cn(backgroundVariants({ variant, size }))}>
      <Icon className={cn(iconVariants({ variant, size }))} />
    </div>
  );
};
