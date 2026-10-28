"use client";

import { Bar, BarChart as ReBarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { SeriesPoint } from "@/data/types";
import { ChartTooltip, axisProps, gridProps } from "./chart-parts";

const palette = ["var(--violet)", "var(--sky)", "var(--mint)", "var(--peach)", "var(--rose)", "var(--amber)"];

export function BarChart({
  data, height = 240, name = "Value", multicolour = false, horizontal = false,
}: { data: SeriesPoint[]; height?: number | `${number}%`; name?: string; multicolour?: boolean; horizontal?: boolean }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <ReBarChart
        data={data}
        layout={horizontal ? "vertical" : "horizontal"}
        margin={{ top: 8, right: 8, bottom: 0, left: horizontal ? 8 : -16 }}
      >
        <CartesianGrid {...gridProps} vertical={horizontal} horizontal={!horizontal} />
        {horizontal ? (
          <>
            <XAxis type="number" {...axisProps} />
            <YAxis type="category" dataKey="label" {...axisProps} width={120} />
          </>
        ) : (
          <>
            <XAxis dataKey="label" {...axisProps} />
            <YAxis {...axisProps} width={48} />
          </>
        )}
        <Tooltip content={<ChartTooltip />} cursor={{ fill: "var(--surface-muted)" }} />
        <Bar dataKey="value" name={name} radius={horizontal ? [0, 6, 6, 0] : [6, 6, 0, 0]} maxBarSize={44}>
          {data.map((entry, i) => (
            <Cell key={entry.label} fill={multicolour ? palette[i % palette.length] : "var(--brand)"} />
          ))}
        </Bar>
      </ReBarChart>
    </ResponsiveContainer>
  );
}
