import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useGetDailyProductAnalyticsQuery } from "@/store/slices/api/productAnalyticsApi";

const chartConfig = {
  created: {
    label: "Created",
    color: "#818cf8",
  },
  updated: {
    label: "Updated",
    color: "#34d399",
  },
} satisfies ChartConfig;

export default function DailyProductChart() {
  const { data, isLoading, isError } = useGetDailyProductAnalyticsQuery();

  const chartData = (data?.data ?? []).map((item) => ({
    ...item,
    date: item.date.slice(5),
  }));

  if (isLoading) {
    return (
      <Card className="overflow-hidden border-zinc-800/80 bg-zinc-950 text-white shadow-xl shadow-black/10">
        <CardContent className="flex h-90 items-center justify-center">
          <div className="flex items-center gap-3 text-sm text-zinc-400">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-zinc-700 border-t-indigo-400" />
            Loading product analytics...
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="border-red-900/40 bg-zinc-950 text-white">
        <CardContent className="flex h-90 flex-col items-center justify-center gap-2">
          <p className="text-sm font-medium text-red-400">
            Failed to load product analytics
          </p>
          <p className="text-xs text-zinc-500">Please try again later.</p>
        </CardContent>
      </Card>
    );
  }

  const totalCreated = (data?.data ?? []).reduce(
    (sum, item) => sum + item.created,
    0,
  );

  const totalUpdated = (data?.data ?? []).reduce(
    (sum, item) => sum + item.updated,
    0,
  );

  return (
    <Card className="overflow-hidden border-zinc-800/80 bg-zinc-950 text-white shadow-xl shadow-black/10">
      <CardHeader className="gap-5 pb-2 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1.5">
          <CardTitle className="text-lg font-semibold tracking-tight">
            Product Activity
          </CardTitle>

          <CardDescription className="text-sm text-zinc-500">
            Daily product creation and updates
          </CardDescription>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 rounded-lg border border-indigo-400/15 bg-indigo-400/6 px-3 py-2">
            <span className="h-2 w-2 rounded-full bg-indigo-400" />
            <div>
              <p className="text-[11px] text-zinc-500">Created</p>
              <p className="text-sm font-semibold tabular-nums text-indigo-300">
                {totalCreated.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-lg border border-emerald-400/15 bg-emerald-400/6 px-3 py-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <div>
              <p className="text-[11px] text-zinc-500">Updated</p>
              <p className="text-sm font-semibold tabular-nums text-emerald-300">
                {totalUpdated.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-2 pb-5 pt-4 sm:px-5">
        {chartData.length === 0 ? (
          <div className="flex h-75 items-center justify-center">
            <p className="text-sm text-zinc-500">
              No product activity available yet.
            </p>
          </div>
        ) : (
          <ChartContainer config={chartConfig} className="h-75 w-full sm:h-85">
            <AreaChart
              accessibilityLayer
              data={chartData}
              margin={{
                top: 12,
                right: 12,
                left: -18,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient
                  id="createdGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor="var(--color-created)"
                    stopOpacity={0.35}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-created)"
                    stopOpacity={0.01}
                  />
                </linearGradient>

                <linearGradient
                  id="updatedGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor="var(--color-updated)"
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-updated)"
                    stopOpacity={0.01}
                  />
                </linearGradient>
              </defs>

              <CartesianGrid
                vertical={false}
                stroke="#27272a"
                strokeDasharray="4 4"
              />

              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={12}
                minTickGap={24}
                tick={{ fill: "#71717a", fontSize: 11 }}
              />

              <YAxis
                allowDecimals={false}
                tickLine={false}
                axisLine={false}
                width={35}
                tick={{ fill: "#71717a", fontSize: 11 }}
              />

              <ChartTooltip
                cursor={{
                  stroke: "#52525b",
                  strokeDasharray: "4 4",
                }}
                content={<ChartTooltipContent indicator="dot" />}
              />

              <Area
                type="monotone"
                dataKey="created"
                stroke="var(--color-created)"
                strokeWidth={2.5}
                fill="url(#createdGradient)"
                fillOpacity={1}
                dot={false}
                activeDot={{
                  r: 5,
                  strokeWidth: 2,
                  stroke: "#09090b",
                  fill: "var(--color-created)",
                }}
              />

              <Area
                type="monotone"
                dataKey="updated"
                stroke="var(--color-updated)"
                strokeWidth={2.5}
                fill="url(#updatedGradient)"
                fillOpacity={1}
                dot={false}
                activeDot={{
                  r: 5,
                  strokeWidth: 2,
                  stroke: "#09090b",
                  fill: "var(--color-updated)",
                }}
              />
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
