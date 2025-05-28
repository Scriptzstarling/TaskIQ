import React, { useEffect, useState } from "react";
import axios from "../api/axios";

export default function TaskList({ onEdit, onDelete }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    setLoading(true);
    const res = await axios.get("/tasks/");
    let data = res.data;
    if (Array.isArray(data)) {
      setTasks(data);
    } else if (data && Array.isArray(data.tasks)) {
      setTasks(data.tasks);
    } else {
      setTasks([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Your Tasks</h2>
      {loading ? (
        <div>Loading...</div>
      ) : tasks.length === 0 ? (
        <div className="text-gray-500">No tasks yet.</div>
      ) : (
        <ul className="divide-y">
          {tasks.map(task => (
            <li key={task.id} className="py-4 flex items-center justify-between">
              <div>
                <div className="font-medium">{task.title}</div>
                <div className="text-gray-500 text-sm">{task.description}</div>
                <div className="text-xs text-gray-400">
                  Due: {task.due_date ? new Date(task.due_date).toLocaleString() : "N/A"} | Priority: {task.priority}
                </div>
              </div>
              <div className="flex gap-2">
                {/* Notify button removed */}
                <button
                  className="px-2 py-1 text-xs bg-yellow-100 text-yellow-700 rounded"
                  onClick={() => onEdit(task)}
                >
                  Edit
                </button>
                <button
                  className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded"
                  onClick={() => onDelete(task.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
