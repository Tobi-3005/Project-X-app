"use client";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { SensorReading } from "../types/sensor";

function formatTimestamp(ts: string): string {
  const d = new Date(ts);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");
  return `${day}.${month} ${hours}:${minutes}`;
}

type ChartRow = {
  label: string;
  temperature: number;
  energy: number;
};

type Props = {
  readings: SensorReading[];
};

export default function SensorCharts({ readings }: Props) {
  const data: ChartRow[] = readings.map((r) => ({
    label: formatTimestamp(r.timestamp),
    temperature: r.temperature,
    energy: r.energyKwh,
  }));

  const tickInterval = Math.max(0, Math.floor(data.length / 7) - 1);

  return (
    <div className="space-y-6">
      {/* Temperature */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-5">
          Temperaturverlauf · °C
        </p>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart
            data={data}
            margin={{ top: 4, right: 12, left: -8, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
            <XAxis
              dataKey="label"
              tick={{ fontSize: 11, fill: "#9CA3AF" }}
              tickLine={false}
              interval={tickInterval}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "#9CA3AF" }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v: number) => `${v}°`}
              domain={["auto", "auto"]}
            />
            <Tooltip
              formatter={(v: unknown) => [`${v} °C`, "Temperatur"]}
              labelStyle={{ color: "#374151", fontWeight: 600, fontSize: 12 }}
              contentStyle={{
                borderRadius: 8,
                border: "1px solid #E5E7EB",
                fontSize: 12,
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              }}
            />
            <Line
              type="monotone"
              dataKey="temperature"
              stroke="#185FA5"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: "#185FA5" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Energy */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-5">
          Energieverbrauch · kWh
        </p>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart
            data={data}
            margin={{ top: 4, right: 12, left: -8, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#F3F4F6"
              vertical={false}
            />
            <XAxis
              dataKey="label"
              tick={{ fontSize: 11, fill: "#9CA3AF" }}
              tickLine={false}
              interval={tickInterval}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "#9CA3AF" }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v: number) => `${v}`}
              domain={[0, "auto"]}
            />
            <Tooltip
              formatter={(v: unknown) => [`${v} kWh`, "Verbrauch"]}
              labelStyle={{ color: "#374151", fontWeight: 600, fontSize: 12 }}
              contentStyle={{
                borderRadius: 8,
                border: "1px solid #E5E7EB",
                fontSize: 12,
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              }}
            />
            <Bar dataKey="energy" fill="#EF9F27" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
