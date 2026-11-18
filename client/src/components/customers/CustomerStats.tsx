import { Users, UserCheck, UserPlus, UserX } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import type { CustomerStats as CustomerStatsType } from "@/types/customer";

interface CustomerStatsProps {
  stats?: CustomerStatsType;
}

const CustomerStats = ({ stats }: CustomerStatsProps) => {
  const statsCards = [
    {
      title: "Total Customers",
      value: stats?.totalCustomers ?? 0,
      description: "All registered customers",
      icon: Users,
      color: "bg-amber-500/10 text-amber-400",
    },
    {
      title: "Active Customers",
      value: stats?.activeCustomers ?? 0,
      description: "Currently active accounts",
      icon: UserCheck,
      color: "bg-emerald-500/10 text-emerald-400",
    },
    {
      title: "New Customers",
      value: stats?.newCustomers ?? 0,
      description: "Registered within 30 days",
      icon: UserPlus,
      color: "bg-blue-500/10 text-blue-400",
    },
    {
      title: "Inactive Customers",
      value: stats?.inactiveCustomers ?? 0,
      description: "Currently inactive accounts",
      icon: UserX,
      color: "bg-red-500/10 text-red-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {statsCards.map((stat) => {
        const Icon = stat.icon;

        return (
          <Card
            key={stat.title}
            className="border-zinc-800/80 bg-zinc-900/40 text-white transition-colors hover:border-zinc-700"
          >
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div
                  className={`flex size-11 items-center justify-center rounded-xl ${stat.color}`}
                >
                  <Icon className="size-5" />
                </div>

                <span className="rounded-md border border-zinc-800 bg-zinc-950/50 px-2 py-1 text-xs text-zinc-500">
                  Customers
                </span>
              </div>

              <p className="mt-4 text-sm font-medium text-zinc-500">
                {stat.title}
              </p>

              <p className="mt-1 font-serif text-2xl font-semibold text-white sm:text-3xl">
                {stat.value.toLocaleString()}
              </p>

              <p className="mt-2 text-xs text-zinc-500">{stat.description}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default CustomerStats;
