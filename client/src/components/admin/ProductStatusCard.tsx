import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Skeleton } from "../ui/skeleton";

interface ProductStatusCardProps {
  title: string;
  count: number;
  icon: React.ReactNode;
  status:
    | "In Stock"
    | "Low Stock"
    | "Out of Stock"
    | "Total Revenue"
    | "Total Orders"
    | "Products"
    | "Customers"
    | "Total Stocks";
  isLoading?: boolean;
}

const statusStyles = {
  "In Stock": {
    icon: "bg-emerald-500/10 text-emerald-400",
    badge: "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
    dot: "bg-emerald-400",
  },
  "Low Stock": {
    icon: "bg-amber-500/10 text-amber-400",
    badge: "border-amber-500/20 bg-amber-500/10 text-amber-400",
    dot: "bg-amber-400",
  },
  "Out of Stock": {
    icon: "bg-red-500/10 text-red-400",
    badge: "border-red-500/20 bg-red-500/10 text-red-400",
    dot: "bg-red-400",
  },
  "Total Revenue": {
    icon: "bg-emerald-500/10 text-emerald-400",
    badge: "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
    dot: "bg-emerald-400",
  },
  "Total Orders": {
    icon: "bg-amber-500/10 text-amber-400",
    badge: "border-amber-500/20 bg-amber-500/10 text-amber-400",
    dot: "bg-amber-400",
  },
  "Products": {
    icon: "bg-sky-500/10 text-sky-400",
    badge: "border-sky-500/20 bg-sky-500/10 text-sky-400",
    dot: "bg-sky-400",
  },
  "Customers": {
    icon: "bg-fuchsia-500/10 text-fuchsia-400",
    badge: "border-fuchsia-500/20 bg-fuchsia-500/10 text-fuchsia-400",
    dot: "bg-fuchsia-400",
  },
  "Total Stocks": {
    icon: "bg-blue-500/10 text-blue-400",
    badge: "border-blue-500/20 bg-blue-500/10 text-blue-400",
    dot: "bg-blue-400",
  },
};

export default function ProductStatusCard({
  title,
  count,
  icon,
  status,
  isLoading = false,
}: ProductStatusCardProps) {
  const styles = statusStyles[status];

  return (
    <Card className="group border-zinc-800/80 bg-zinc-900/40 text-white shadow-sm transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-900/70">
      {isLoading ? (
        <Skeleton className="h-full w-full p-5 sm:p-6" />
      ) : (
        <CardContent className=" p-5 sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <div
              className={`flex size-11 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105 ${styles.icon}`}
            >
              {icon}
            </div>

            <Badge
              variant="outline"
              className={`gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium ${styles.badge}`}
            >
              <span className={`size-1.5 rounded-full ${styles.dot}`} />
              {status}
            </Badge>
          </div>

          <div className="mt-5 space-y-1">
            <p className="text-sm font-medium text-zinc-400">{title}</p>

            <p className="text-3xl font-semibold tracking-tight text-white">
              {count.toLocaleString()}
            </p>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
