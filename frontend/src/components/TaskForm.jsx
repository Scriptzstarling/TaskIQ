import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import AISuggestion from "./AISuggestion";

const defaultTask = {
  title: "",
  description: "",
  due_date: "",
  email: "",
  whatsapp: ""
};

export default function TaskForm({ onSuccess, editTask, onCancel }) {
  const [task, setTask] = useState(editTask || defaultTask);
  const [loading, setLoading] = useState(false);
  const [aiPriority, setAiPriority] = useState(null);

  useEffect(() => {
    if (editTask) setTask(editTask);
  }, [editTask]);

  const handleChange = e => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleAISuggestion = async () => {
    if (!task.title) return;
    try {
      const res = await axios.post("/ai/suggest-priority", {
        title: task.title,
        description: task.description,
        due_date: task.due_date || null
      });
      setAiPriority(res.data.suggested_priority);
    } catch {
      setAiPriority("AI unavailable");
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editTask) {
        await axios.put(`/tasks/${editTask.id}`, task);
      } else {
        await axios.post("/tasks/", task);
      }
      onSuccess();
      setTask(defaultTask);
      setAiPriority(null);
    } catch (err) {
      alert("Error saving task.");
    }
    setLoading(false);
  };

  return (
    <form className="bg-white p-6 rounded shadow mb-6" onSubmit={handleSubmit}>
      <h2 className="text-xl font-semibold mb-4">{editTask ? "Edit Task" : "Add Task"}</h2>
      <div className="mb-3">
        <label className="block font-medium">Title</label>
        <input
          type="text"
          name="title"
          value={task.title}
          onChange={handleChange}
          className="mt-1 w-full border rounded px-3 py-2"
          required
        />
      </div>
      <div className="mb-3">
        <label className="block font-medium">Description</label>
        <textarea
          name="description"
          value={task.description}
          onChange={handleChange}
          className="mt-1 w-full border rounded px-3 py-2"
        />
      </div>
      <div className="mb-3">
        <label className="block font-medium">Due Date</label>
        <input
          type="datetime-local"
          name="due_date"
          value={task.due_date ? task.due_date.slice(0, 16) : ""}
          onChange={handleChange}
          className="mt-1 w-full border rounded px-3 py-2"
        />
      </div>
      <div className="mb-3 flex gap-4">
        <div className="flex-1">
          <label className="block font-medium">Email (for reminders)</label>
          <input
            type="email"
            name="email"
            value={task.email}
            onChange={handleChange}
            className="mt-1 w-full border rounded px-3 py-2"
          />
        </div>
        <div className="flex-1">
          <label className="block font-medium">WhatsApp (+countrycode...)</label>
          <input
            type="text"
            name="whatsapp"
            value={task.whatsapp}
            onChange={handleChange}
            className="mt-1 w-full border rounded px-3 py-2"
            placeholder="whatsapp:+1234567890"
          />
        </div>
      </div>
      <div className="mb-3 flex items-center gap-4">
        <button
          type="button"
          className="px-3 py-1 bg-blue-100 text-blue-700 rounded"
          onClick={handleAISuggestion}
        >
          Get AI Priority Suggestion
        </button>
        {aiPriority && <AISuggestion priority={aiPriority} />}
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          disabled={loading}
        >
          {editTask ? "Update" : "Add"}
        </button>
        {onCancel && (
          <button
            type="button"
            className="bg-gray-200 px-4 py-2 rounded"
            onClick={onCancel}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
