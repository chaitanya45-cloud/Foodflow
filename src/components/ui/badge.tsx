import { cn, statusBadge } from "@/lib/utils";

export function Badge({
  status,
  children,
  className,
}: {
  status?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize",
        status ? statusBadge(status) : "bg-stone-100 text-stone-600",
        className
      )}
    >
      {children}
    </span>
  );
}
