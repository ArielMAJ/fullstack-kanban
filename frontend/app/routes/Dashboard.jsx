import React, { useState } from "react";
import Board from "../components/Board";
import Trash from "../components/Trash";
import { v4 as uuidv4 } from "uuid";

export default function Dashboard() {
  const [boards, setBoards] = useState({
    todo: [],
    doing: [],
    done: [],
  });

  const addTask = (boardKey, title) => {
    const newTask = { id: uuidv4(), title, createdAt: new Date() };
    setBoards(prev => ({
      ...prev,
      [boardKey]: [...prev[boardKey], newTask]
    }));
  };

  const moveTask = (taskId, targetBoard) => {
    setBoards(prev => {
      const newBoards = { ...prev };
      let taskToMove = null;

      // Find and remove the task from its current board
      for (const boardKey in newBoards) {
        const taskIndex = newBoards[boardKey].findIndex(t => t.id === taskId);
        if (taskIndex !== -1) {
          [taskToMove] = newBoards[boardKey].splice(taskIndex, 1);
          break;
        }
      }

      // Add to target board if exists (if null, it means delete)
      if (taskToMove && targetBoard) {
        newBoards[targetBoard].push(taskToMove);
      }

      return newBoards;
    });
  };

  return (
    <div className="w-full min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold text-center py-6">Minha Agenda Kanban 📋</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-2 md:px-8">
        {Object.entries(boards).map(([key, tasks]) => (
          <Board
            key={key}
            title={key.toUpperCase()}
            tasks={tasks}
            onAdd={(title) => addTask(key, title)}
            onDrop={(taskId) => moveTask(taskId, key)}
          />
        ))}
        <Trash onDropTask={(taskId) => moveTask(taskId, null)} />
      </div>
    </div>
  );
}