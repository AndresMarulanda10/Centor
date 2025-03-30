"use client";

import React, { useState, useEffect } from "react";

const TaskManagerWrapper: React.FC = () => {
  const [TaskManager, setTaskManager] = useState<React.ComponentType | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTaskManager = async () => {
      try {
        const module = await import("@/components/tasks/SimpleTaskManager");
        setTaskManager(() => module.default);
      } catch {
        setError(
          "No se pudo cargar el gestor de tareas. Por favor, intenta recargar la página."
        );
      }
    };

    loadTaskManager();
  }, []);

  if (error) {
    return (
      <div>
        <p>{error}</p>
        <p>Mientras tanto, puedes intentar una versión simplificada del gestor de tareas:</p>
      </div>
    );
  }

  if (!TaskManager) {
    return (
      <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full" />
    );
  }

  return <TaskManager />;
};

export default TaskManagerWrapper;