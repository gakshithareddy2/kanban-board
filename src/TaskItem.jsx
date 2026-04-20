export default function TaskItem({ task, onMove, onDelete }) {
  return (
    <div className="task">

      <div className="task-header">
        <span className={`badge ${task.priority}`}>
          {task.priority}
        </span>

        <button
          className="delete-btn"
          onClick={() => onDelete(task.id)}
        >
          ✕
        </button>
      </div>

      <p className="task-text">{task.text}</p>

      {onMove && (
        <span className="move" onClick={() => onMove(task.id)}>
          Move →
        </span>
      )}
    </div>
  );
}