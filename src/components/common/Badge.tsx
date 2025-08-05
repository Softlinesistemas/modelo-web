import cn  from "@/utils/cn"; 
import { FiMessageSquare } from "react-icons/fi";

interface BadgeProps {
  variant?: "success" | "warning" | "destructive";
  children: React.ReactNode;
}

export function Badge({ variant = "success", children }: BadgeProps) {
  const baseStyle = "px-2 py-1 text-xs font-semibold rounded-full";
  const variants = {
    success: "bg-green-100 text-green-700",
    warning: "bg-yellow-100 text-yellow-700",
    destructive: "bg-red-100 text-red-700",
  };
  return <span className={cn(baseStyle, variants[variant])}>{children}</span>;
}

export function MessageIconWithBadge({ count }: { count: number }) {
  return (
    <div className="relative w-7 h-7 flex items-center justify-center">
      <FiMessageSquare className="text-2xl text-gray-700" />
      {count > 0 && (
        <span className="absolute -top-0 -right-1 bg-red-600 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
          {count < 10 ? `0${count}` : count}
        </span>
      )}
    </div>
  );
}