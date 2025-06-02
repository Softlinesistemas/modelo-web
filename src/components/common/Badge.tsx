import cn  from "@/utils/cn";

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
