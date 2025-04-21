// FILE: components/performance-insights.tsx
"use client";

import type { Question } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// --- ADD export HERE ---
export interface PerformanceInsightsProps {
  results: (Question & { timeSpent: number })[];
}

// --- KEEP export HERE ---
export function PerformanceInsights({ results }: PerformanceInsightsProps) {
  // Prepare data for time spent per question chart
  const timeSpentData = results.map((result, index) => ({
    name: `Q${index + 1}`,
    value: result.timeSpent,
    correct: result.userAnswer === result.correctAnswer,
    questionId: result.id,
    userAnswer: result.userAnswer,
    status:
      result.userAnswer === result.correctAnswer
        ? "correct"
        : result.userAnswer === null
          ? "unanswered"
          : "incorrect",
  }));

  // Prepare data for correct vs incorrect pie chart
  const correctCount = results.filter(
    (r) => r.userAnswer === r.correctAnswer,
  ).length;
  const incorrectCount = results.filter(
    (r) => r.userAnswer !== null && r.userAnswer !== r.correctAnswer,
  ).length;
  const unansweredCount = results.filter((r) => r.userAnswer === null).length;

  const pieChartData = [
    { name: "Correct", value: correctCount, color: "#22c55e" },
    { name: "Incorrect", value: incorrectCount, color: "#ef4444" },
    { name: "Unanswered", value: unansweredCount, color: "#94a3b8" },
  ].filter((item) => item.value > 0);

  // Prepare data for time vs correctness scatter plot
  const scatterData = results.map((result, index) => ({
    x: index + 1, // Question number
    y: result.timeSpent, // Time spent
    correct: result.userAnswer === result.correctAnswer,
    userAnswer: result.userAnswer,
  }));

  // Calculate average time spent
  const totalTimeSpent = results.reduce(
    (acc, result) => acc + result.timeSpent,
    0,
  );
  const averageTimeSpent =
    results.length > 0 ? Math.round(totalTimeSpent / results.length) : 0; // Avoid division by zero

  // Calculate fastest and slowest times
  const validTimes = results
    .map((r) => r.timeSpent)
    .filter((t) => t !== undefined && t !== null); // Filter out potential undefined/null
  const fastestTime = validTimes.length > 0 ? Math.min(...validTimes) : 0;
  const slowestTime = validTimes.length > 0 ? Math.max(...validTimes) : 0;

  return (
    // --- NO STYLE CHANGES HERE ---
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Time spent per question */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Time Spent (seconds)</CardTitle>
        </CardHeader>
        <CardContent className="p-1 sm:p-4">
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={timeSpentData}
                margin={{ top: 20, right: 20, left: 5, bottom: 25 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 12 }}
                  interval={results.length > 10 ? 1 : 0}
                  angle={-45}
                  textAnchor="end"
                  height={40}
                />
                <YAxis
                  tick={{ fontSize: 12 }}
                  label={{
                    value: "Seconds",
                    angle: -90,
                    position: "insideLeft",
                    style: {
                      textAnchor: "middle",
                      fontSize: "12px",
                      fill: "var(--muted-foreground)",
                    },
                  }}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-background border p-2 rounded-md shadow-sm">
                          <p className="font-medium">
                            Question {data.name.substring(1)}
                          </p>
                          <p>Time spent: {data.value} seconds</p>
                          <p>
                            Status:{" "}
                            {data.status === "correct"
                              ? "Correct"
                              : data.status === "unanswered"
                                ? "Unanswered"
                                : "Incorrect"}
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="value" fill="#3b82f6" maxBarSize={40}>
                  {timeSpentData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        entry.status === "correct"
                          ? "#22c55e"
                          : entry.status === "unanswered"
                            ? "#94a3b8"
                            : "#ef4444"
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 text-sm text-muted-foreground">
            <p>Average time: {averageTimeSpent} seconds</p>
            <p>Fastest response: {fastestTime} seconds</p>
            <p>Slowest response: {slowestTime} seconds</p>
          </div>
        </CardContent>
      </Card>

      {/* Pie chart for performance distribution */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Performance Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="p-1 sm:p-4">
          <div className="w-full h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={70}
                  innerRadius={30}
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  labelLine={false}
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-background border p-2 rounded-md shadow-sm">
                          <p className="font-medium">{data.name}</p>
                          <p>
                            {data.value} questions (
                            {((data.value / results.length) * 100).toFixed(1)}%)
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex justify-center space-x-4 text-sm">
            <div className="flex items-center">
              <span className="inline-block w-3 h-3 mr-1 bg-green-500 rounded-full"></span>
              <span>Correct</span>
            </div>
            <div className="flex items-center">
              <span className="inline-block w-3 h-3 mr-1 bg-red-500 rounded-full"></span>
              <span>Incorrect</span>
            </div>
            {unansweredCount > 0 && (
              <div className="flex items-center">
                <span className="inline-block w-3 h-3 mr-1 bg-slate-400 rounded-full"></span>
                <span>Unanswered</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Time analysis card */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Time vs Question Performance</CardTitle>
        </CardHeader>
        <CardContent className="p-1 sm:p-4">
          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart
                margin={{ top: 20, right: 30, bottom: 40, left: 40 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis
                  type="number"
                  dataKey="x"
                  name="Question"
                  domain={[0.5, results.length + 0.5]}
                  ticks={Array.from(
                    { length: results.length },
                    (_, i) => i + 1,
                  )}
                  label={{
                    value: "Question Number",
                    position: "bottom",
                    offset: 15,
                    style: {
                      textAnchor: "middle",
                      fontSize: "12px",
                      fill: "var(--muted-foreground)",
                    },
                  }}
                  tick={{ fontSize: 11 }}
                />
                <YAxis
                  type="number"
                  dataKey="y"
                  name="Time"
                  label={{
                    value: "Time (seconds)",
                    angle: -90,
                    position: "insideLeft",
                    style: {
                      textAnchor: "middle",
                      fontSize: "12px",
                      fill: "var(--muted-foreground)",
                    },
                  }}
                  tick={{ fontSize: 11 }}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-background border p-2 rounded-md shadow-sm">
                          <p className="font-medium">Question {data.x}</p>
                          <p>Time spent: {data.y} seconds</p>
                          <p>
                            Status:{" "}
                            {data.correct
                              ? "Correct"
                              : data.userAnswer === null
                                ? "Unanswered"
                                : "Incorrect"}
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Scatter
                  name="Correct"
                  data={scatterData.filter((d) => d.correct)}
                  fill="#22c55e"
                  shape="circle"
                  legendType="circle"
                />
                <Scatter
                  name="Incorrect"
                  data={scatterData.filter(
                    (d) => !d.correct && d.userAnswer !== null,
                  )}
                  fill="#ef4444"
                  shape="circle"
                  legendType="circle"
                />
                {unansweredCount > 0 && (
                  <Scatter
                    name="Unanswered"
                    data={scatterData.filter((d) => d.userAnswer === null)}
                    fill="#94a3b8"
                    shape="circle"
                    legendType="circle"
                  />
                )}
                <Legend
                  verticalAlign="top"
                  height={36}
                  wrapperStyle={{ fontSize: "12px" }}
                />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 text-sm text-muted-foreground">
            <p>
              This scatter plot shows your time spent on each question and
              whether you answered correctly.
            </p>
            <p className="mt-1">
              {results.filter(
                (r) =>
                  r.userAnswer === r.correctAnswer &&
                  r.timeSpent < averageTimeSpent,
              ).length > 0
                ? "You answered some questions correctly in less than average time - excellent efficiency!"
                : "Try to balance speed and accuracy for better overall performance."}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
