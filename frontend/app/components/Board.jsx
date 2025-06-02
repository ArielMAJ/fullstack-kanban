import React, { useState } from "react";
import TaskCard from "./TaskCard";

export default function Board({ title, tasks, onAdd, onDrop }) {
  const [taskTitle, setTaskTitle] = useState("");

  const handleAdd = () => {
    if (taskTitle.trim()) {
      onAdd(taskTitle);
      setTaskTitle("");
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add("ring-2", "ring-blue-400");
  };

  const handleDragLeave = (e) => {
    e.currentTarget.classList.remove("ring-2", "ring-blue-400");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove("ring-2", "ring-blue-400");
    const taskId = e.dataTransfer.getData("text/plain");
    onDrop(taskId);
  };

  return (
    <div
      className="bg-white rounded-xl p-4 shadow min-h-[200px] flex flex-col"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <h2 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-200 text-gray-800">{title}</h2>
      <div className="flex-1">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
      <div className="flex flex-col gap-2 mt-4 sm:flex-row">
        <input
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          placeholder="Nova tarefa"
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          className="flex-grow px-2 py-1 border border-gray-300 rounded-md"
        />
        <button
          onClick={handleAdd}
          className="px-4 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          +
        </button>
      </div>
    </div>
  );
}