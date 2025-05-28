import React from "react";

export default function NotificationBanner({ message, type, onClose }) {
  if (!message) return null;
  const color = type === "error" ? "red" : "green";
  return (
    <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-${color}-100 border border-${color}-400 text-${color}-700 px-4 py-3 rounded shadow`}>
      <div className="flex items-center">
        <span className="flex-1">{message}</span>
        <button className="ml-4" onClick={onClose}>&times;</button>
      </div>
    </div>
  );
}
