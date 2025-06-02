import React from "react";
import TaskCard from "./TaskCard";

export default function Column({ tasks }) {
  return (
    <div className="flex flex-col">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}
