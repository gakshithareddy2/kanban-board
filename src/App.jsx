import { useState } from "react";
import Column from "./Column";
import "./App.css";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const [tasks, setTasks] = useState([]);

  const addTask = (text, priority) => {
    setTasks((prev) => [
      ...prev,
      { id: Date.now(), text, status: "todo", priority },
    ]);

    toast.success("Task added ✅", { toastId: "add-task" });
  };

  const moveTask = (id) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          if (t.status === "todo") {
            toast.info("Moved to Progress 🚀", {
              toastId: `move-${id}`,
            });
            return { ...t, status: "progress" };
          }

          if (t.status === "progress") {
            toast.success("Task Completed 🎉", {
              toastId: `done-${id}`,
            });
            return { ...t, status: "done" };
          }
        }
        return t;
      })
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));

    toast.error("Task deleted ❌", { toastId: `delete-${id}` });
  };

  const getTasks = (status) => tasks.filter((t) => t.status === status);

  const total = tasks.length;
  const done = getTasks("done").length;
  const percent = total === 0 ? 0 : Math.round((done / total) * 100);

  const data = [
    { name: "To Do", value: getTasks("todo").length },
    { name: "Progress", value: getTasks("progress").length },
    { name: "Done", value: getTasks("done").length },
  ];

  const COLORS = ["#3b82f6", "#facc15", "#22c55e"];

  return (
    <div className="app">

      <div className="header">
        <h1>TaskFlow</h1>
        <p>Manage your workflow efficiently</p>
      </div>

      <div className="layout">

        <div className="board">
          <Column
            title="To Do"
            tasks={getTasks("todo")}
            onAdd={addTask}
            onMove={moveTask}
            onDelete={deleteTask}
          />

          <Column
            title="In Progress"
            tasks={getTasks("progress")}
            onMove={moveTask}
            onDelete={deleteTask}
          />

          <Column
            title="Done"
            tasks={getTasks("done")}
            onDelete={deleteTask}
          />
        </div>

        <div className="insights">
          <h3>Project Insights</h3>

          <div className="stats">
            <div className="box">
              <p>Total</p>
              <h2>{total}</h2>
            </div>

            <div className="box done">
              <p>Done</p>
              <h2>{done}</h2>
            </div>
          </div>

          <div className="chart">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={data} dataKey="value" outerRadius={60}>
                  {data.map((_, i) => (
                    <Cell key={i} fill={COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="progress">
            <div className="progress-top">
              <span>Completion</span>
              <span>{percent}%</span>
            </div>

            <div className="bar">
              <div style={{ width: `${percent}%` }}></div>
            </div>
          </div>
        </div>

      </div>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar
        theme="dark"
      />
    </div>
  );
}