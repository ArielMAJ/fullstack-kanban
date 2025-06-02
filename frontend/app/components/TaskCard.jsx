import React from "react";

export default function TaskCard({ task }) {
  const handleDragStart = (e) => {
    e.dataTransfer.setData("text/plain", task.id);
    e.currentTarget.classList.add("opacity-50");
  };

  const handleDragEnd = (e) => {
    e.currentTarget.classList.remove("opacity-50");
  };

  return (
    <div
      className="bg-gray-100 px-3 py-2 mb-3 rounded-lg border-l-4 border-blue-600 break-words cursor-move"
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {task.title}
    </div>
  );
}