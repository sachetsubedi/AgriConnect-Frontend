"use client";

import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { FC } from "react";

export const description = "A line chart";

const chartConfig = {
  sales: {
    label: "sales",
    color: "green",
  },
} satisfies ChartConfig;

export const ChartLineDefault: FC<{
  title: string;
  data: { month: string; sales: number }[];
  userType: "seller" | "buyer";
}> = ({ title, data }) => {
  return (
    <Card className="col-span-2 lg:col-span-1">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>January - June 2025</CardDescription>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <div className="text-sm text-muted-foreground">No data available</div>
        ) : (
          <ChartContainer config={chartConfig}>
            <LineChart
              accessibilityLayer
              data={data}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value: any) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Line
                dataKey="sales"
                type="natural"
                stroke="green"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
};
