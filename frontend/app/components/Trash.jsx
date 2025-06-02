import React from "react";

export default function Trash({ onDropTask }) {
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("text/plain");
    onDropTask(taskId);
  };

  return (
    <div
      className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 mx-auto my-4 text-xl md:text-2xl bg-red-100 rounded-full border-2 border-red-300 hover:bg-red-200 transition"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      🗑️ Lixeira
    </div>
  );
}