"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Task } from "./types";

// Define el tipo de nuestro contexto de tareas
interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, "id" | "createdAt">) => void;
  updateTask: (taskId: string, updatedTask: Partial<Omit<Task, "id" | "createdAt">>) => void;
  deleteTask: (taskId: string) => void;
  selectedTask: Task | null;
  setSelectedTask: (task: Task | null) => void;
  isLoading: boolean;
  error: string | null;
}

// Crear el contexto con undefined como valor inicial
const TaskContext = createContext<TaskContextType | undefined>(undefined);

// Componente TaskProvider que envuelve la app y proporciona la funcionalidad de gestión de tareas
export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Estado para almacenar tareas
  const [tasks, setTasks] = useState<Task[]>(() => {
    if (typeof window !== "undefined") {
      const savedTasks = localStorage.getItem("tasks");
      return savedTasks ? JSON.parse(savedTasks) : [];
    }
    return [];
  });
  
  // Estado para la tarea seleccionada
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  // Estados para gestión de carga y errores
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Efecto para guardar tareas en localStorage cuando cambian
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  // Función para añadir una nueva tarea
  const addTask = (task: Omit<Task, "id" | "createdAt">) => {
    const newTask: Task = {
      ...task,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
    };
    setTasks([...tasks, newTask]);
  };

  // Función para actualizar una tarea existente
  const updateTask = (
    taskId: string,
    updatedTask: Partial<Omit<Task, "id" | "createdAt">>,
  ) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, ...updatedTask } : task
      )
    );
  };

  // Función para eliminar una tarea
  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
    
    // Limpiar la tarea seleccionada si es la que se está eliminando
    if (selectedTask?.id === taskId) {
      setSelectedTask(null);
    }
  };

  // Proporcionar el valor del contexto a todos los componentes hijos
  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        updateTask,
        deleteTask,
        selectedTask,
        setSelectedTask,
        isLoading,
        error,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

// Hook personalizado para usar el contexto de tareas
export const useTaskContext = () => {
  const context = useContext(TaskContext);
  
  // Lanzar error si el hook se usa fuera de TaskProvider
  if (context === undefined) {
    throw new Error("useTaskContext debe usarse dentro de un TaskProvider");
  }
  
  return context;
};
