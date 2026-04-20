import { useState } from "react";
import TaskItem from "./TaskItem";

export default function Column({ title, tasks, onAdd, onMove, onDelete }) {
  const [text, setText] = useState("");
  const [priority, setPriority] = useState("medium");

  return (
    <div className="column">
      <h3>{title}</h3>

      {onAdd && (
        <>
          <input
            placeholder="Add task..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <button
            className="add-btn"
            disabled={!text.trim()}
            onClick={() => {
              onAdd(text, priority);
              setText("");
            }}
          >
            + Add Task
          </button>
        </>
      )}

      {tasks.map((t) => (
        <TaskItem
          key={t.id}
          task={t}
          onMove={onMove}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}