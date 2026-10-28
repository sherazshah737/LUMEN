"use client";

import {
  Area, AreaChart as ReAreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import type { SeriesPoint } from "@/data/types";
import { ChartTooltip, axisProps, gridProps } from "./chart-parts";

export function AreaChart({
  data, height = 260, showPrevious = false,
}: { data: SeriesPoint[]; height?: number | `${number}%`; showPrevious?: boolean }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <ReAreaChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -16 }}>
        <defs>
          <linearGradient id="fillCurrent" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--brand)" stopOpacity={0.28} />
            <stop offset="100%" stopColor="var(--brand)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid {...gridProps} />
        <XAxis dataKey="label" {...axisProps} />
        <YAxis {...axisProps} width={48} />
        <Tooltip content={<ChartTooltip />} cursor={{ stroke: "var(--line-strong)" }} />
        {showPrevious && (
          <Area
            type="monotone" dataKey="previous" name="Last year" stroke="var(--line-strong)"
            strokeWidth={1.5} strokeDasharray="4 4" fill="none"
          />
        )}
        <Area
          type="monotone" dataKey="value" name="This year" stroke="var(--brand)"
          strokeWidth={2.5} fill="url(#fillCurrent)"
        />
      </ReAreaChart>
    </ResponsiveContainer>
  );
}
