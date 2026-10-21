import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

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

import { useGetDailyProductAnalyticsQuery } from "@/store/slices/productAnalyticsApi";

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
      <Card className="border-zinc-800 bg-zinc-950">
        <CardContent className="p-6 text-sm text-zinc-400">
          Loading product analytics...
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="border-zinc-800 bg-zinc-950">
        <CardContent className="p-6 text-sm text-red-400">
          Failed to load product analytics.
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-zinc-800 bg-zinc-950 text-white">
      <CardHeader>
        <CardTitle>Product Activity</CardTitle>
        <CardDescription className="text-zinc-400">
          Daily product creation and updates
        </CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig} className="h-75 w-full">
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{ left: 0, right: 8, top: 8 }}
          >
            <CartesianGrid
              vertical={false}
              stroke="#27272a"
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              stroke="#a1a1aa"
            />

            <YAxis
              allowDecimals={false}
              tickLine={false}
              axisLine={false}
              width={35}
              stroke="#a1a1aa"
            />

            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />

            <Bar
              dataKey="created"
              fill="var(--color-created)"
              radius={[4, 4, 0, 0]}
            />

            <Bar
              dataKey="updated"
              fill="var(--color-updated)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
