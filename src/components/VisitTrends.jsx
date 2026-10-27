import { useMemo } from "react";
import { Line } from "react-chartjs-2";
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";
import { BarChart3, MousePointerClick } from "lucide-react";
import { cn } from "../lib/utils";
import { Badge } from "./ui/badge";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const dayKey = (value) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
};

function VisitTrends({ visitHistory = [], title = "Visitor trends", className, height = 240 }) {
  const { labels, counts, total } = useMemo(() => {
    const visitMap = visitHistory.reduce((accumulator, visit) => {
      const key = dayKey(visit.timestamp);
      if (!key) return accumulator;
      accumulator[key] = (accumulator[key] || 0) + 1;
      return accumulator;
    }, {});

    const sortedKeys = Object.keys(visitMap).sort();
    const formattedLabels = sortedKeys.map((key) => {
      const [year, month, day] = key.split("-").map(Number);
      return new Date(year, month - 1, day).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
      });
    });

    return {
      labels: formattedLabels,
      counts: sortedKeys.map((key) => visitMap[key]),
      total: visitHistory.length,
    };
  }, [visitHistory]);

  const data = useMemo(
    () => ({
      labels,
      datasets: [
        {
          label: "Daily visits",
          data: counts,
          fill: true,
          tension: 0.42,
          borderWidth: 2,
          borderColor: "#6d5ef6",
          pointBackgroundColor: "#6d5ef6",
          pointBorderColor: "#ffffff",
          pointBorderWidth: 2,
          pointRadius: 0,
          pointHoverRadius: 4,
          backgroundColor: (context) => {
            const { ctx, chartArea } = context.chart;
            if (!chartArea) return "rgba(109,94,246,0.08)";
            const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
            gradient.addColorStop(0, "rgba(109,94,246,0.22)");
            gradient.addColorStop(1, "rgba(109,94,246,0)");
            return gradient;
          },
        },
      ],
    }),
    [labels, counts]
  );

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: "index", intersect: false },
      animation: { duration: 650 },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: "#0b0b10",
          titleColor: "#ffffff",
          bodyColor: "#ffffff",
          titleFont: { family: "Inter", size: 11, weight: "600" },
          bodyFont: { family: "Inter", size: 11 },
          padding: 10,
          displayColors: false,
          callbacks: {
            label: (context) => `${context.parsed.y} ${context.parsed.y === 1 ? "visit" : "visits"}`,
          },
        },
      },
      scales: {
        x: {
          border: { display: false },
          grid: { display: false },
          ticks: {
            color: "#8a8a93",
            font: { family: "Inter", size: 10 },
            maxRotation: 0,
            autoSkip: true,
            maxTicksLimit: 7,
          },
        },
        y: {
          beginAtZero: true,
          border: { display: false },
          grid: { color: "rgba(11,11,16,0.06)" },
          ticks: {
            color: "#8a8a93",
            font: { family: "Inter", size: 10 },
            precision: 0,
            maxTicksLimit: 5,
          },
        },
      },
    }),
    []
  );

  return (
    <div className={cn("w-full", className)}>
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
            <BarChart3 className="h-4 w-4" />
          </span>
          <div>
            <p className="text-[12px] font-semibold text-ink">{title}</p>
            <p className="text-[10px] text-muted">Daily visits, grouped by date</p>
          </div>
        </div>
        <Badge variant="brand" className="gap-1">
          <MousePointerClick className="h-3 w-3" /> {total.toLocaleString()} total
        </Badge>
      </div>

      {total === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-ink/15 bg-canvas px-6 py-10 text-center">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-brand-500 shadow-sm">
            <MousePointerClick className="h-4 w-4" />
          </span>
          <p className="mt-3 text-[12px] font-semibold text-ink">No visits yet</p>
          <p className="mt-1 max-w-xs text-[11px] leading-5 text-muted">
            Share this link and its daily visits will appear here.
          </p>
        </div>
      ) : (
        <div style={{ height }}>
          <Line data={data} options={options} />
        </div>
      )}
    </div>
  );
}

export default VisitTrends;
