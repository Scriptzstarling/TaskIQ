import React, { useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import NotificationBanner from "../components/NotificationBanner";
import axios from "../api/axios";

export default function Home() {
  const [editTask, setEditTask] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [notification, setNotification] = useState({ message: "", type: "" });

  const handleSuccess = () => {
    setEditTask(null);
    setRefresh(r => !r);
    setNotification({ message: "Task saved!", type: "success" });
  };

  const handleEdit = task => setEditTask(task);

  const handleDelete = async id => {
    if (!window.confirm("Delete this task?")) return;
    await axios.delete(`/tasks/${id}`);
    setRefresh(r => !r);
    setNotification({ message: "Task deleted.", type: "success" });
  };

  const handleNotify = async task => {
    try {
      if (task.email) {
        await axios.post("/notifications/email", {
          to: task.email,
          subject: "Task Reminder",
          content: `Reminder: "${task.title}" is due on ${task.due_date || "N/A"}`
        });
      }
      if (task.whatsapp) {
        await axios.post("/notifications/whatsapp", {
          to: task.whatsapp,
          content: `Reminder: "${task.title}" is due on ${task.due_date || "N/A"}`
        });
      }
      setNotification({ message: "Notification sent!", type: "success" });
    } catch {
      setNotification({ message: "Failed to send notification.", type: "error" });
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <NotificationBanner
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ message: "", type: "" })}
      />
      <TaskForm
        onSuccess={handleSuccess}
        editTask={editTask}
        onCancel={() => setEditTask(null)}
      />
      <TaskList
        key={refresh}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onNotify={handleNotify}
      />
    </div>
  );
}
