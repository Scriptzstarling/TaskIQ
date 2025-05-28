import React from "react";

export default function AISuggestion({ priority }) {
  let color =
    priority === "High"
      ? "red"
      : priority === "Medium"
      ? "yellow"
      : "green";
  return (
    <span
      className={`inline-block px-2 py-1 rounded bg-${color}-100 text-${color}-800 text-sm font-semibold`}
    >
      AI Suggests: {priority}
    </span>
  );
}
