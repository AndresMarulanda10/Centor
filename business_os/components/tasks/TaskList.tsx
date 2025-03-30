"use client";

import React from "react";
import { Icon } from "@iconify/react";
import { useTaskContext } from "./TaskContext";

export default function TaskList() {
  // Obtener funciones y estado del contexto
  const { tasks, deleteTask, setSelectedTask, isLoading, error } = useTaskContext();

  // Mostrar estado de carga
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-10">
        <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full"></div>
        <p className="mt-4 text-gray-500">Cargando tareas...</p>
      </div>
    );
  }
  
  // Mostrar estado de error
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-10">
        <Icon
          className="text-red-500"
          height={48}
          icon="solar:danger-triangle-outline"
          width={48}
        />
        <p className="mt-4 text-red-500">{error}</p>
      </div>
    );
  }

  // Mostrar estado vacío si no hay tareas
  if (!tasks || tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-10">
        <Icon
          className="text-gray-500"
          height={48}
          icon="solar:notes-minimalistic-outline"
          width={48}
        />
        <p className="mt-4 text-gray-500">No hay tareas disponibles</p>
      </div>
    );
  }

  // Función para formatear fechas al formato español
  const formatDate = (dateString?: string) => {
    if (!dateString) return "Sin fecha";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("es-ES", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch (e) {
      console.error("Error al formatear fecha:", e);
      return "Fecha inválida";
    }
  };

  // Función para determinar el color del chip según el estado
  const getStatusColor = (status?: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"; // amarillo para pendiente
      case "in-progress":
        return "bg-blue-100 text-blue-800"; // azul para en progreso
      case "completed":
        return "bg-green-100 text-green-800"; // verde para completado
      default:
        return "bg-gray-100 text-gray-800"; // gris por defecto
    }
  };

  // Función para traducir el estado al español
  const getStatusText = (status?: string) => {
    switch (status) {
      case "pending":
        return "Pendiente";
      case "in-progress":
        return "En progreso";
      case "completed":
        return "Completada";
      default:
        return status || "Sin estado";
    }
  };

  // Manejador para eliminar tareas con confirmación
  const handleDeleteTask = (taskId: string) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta tarea?")) {
      deleteTask(taskId);
    }
  };

  // Renderizar la lista de tareas
  return (
    <div className="flex flex-col gap-4">
      {tasks.map((task) => (
        <div key={task.id} className="border rounded-lg overflow-hidden shadow-sm">
          {/* Cuerpo de la tarjeta */}
          <div className="p-4">
            {/* Cabecera con título y estado */}
            <div className="flex justify-between mb-2">
              <h3 className="text-lg font-semibold">{task.title || "Sin título"}</h3>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}
              >
                {getStatusText(task.status)}
              </span>
            </div>
            {/* Descripción */}
            <p className="text-gray-500 mb-2">{task.description || "Sin descripción"}</p>
            {/* Metadatos */}
            <div className="flex flex-col gap-1 text-sm text-gray-400">
              <div className="flex items-center gap-1">
                <Icon icon="solar:user-outline" />
                <span>
                  Responsable: {task.assignee?.name || task.responsible || "Sin asignar"}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Icon icon="solar:calendar-outline" />
                <span>Fecha límite: {formatDate(task.dueDate)}</span>
              </div>
              {task.updatedAt && (
                <div className="flex items-center gap-1 mt-2 text-xs">
                  <Icon icon="solar:clock-outline" />
                  <span>Actualizado: {formatDate(task.updatedAt)}</span>
                </div>
              )}
              {task.priority && (
                <div className="flex items-center gap-1">
                  <Icon icon="solar:flag-bold" />
                  <span>Prioridad: {
                    task.priority === "low" ? "Baja" :
                    task.priority === "medium" ? "Media" :
                    task.priority === "high" ? "Alta" : "Media"
                  }</span>
                </div>
              )}
            </div>
          </div>
          {/* Pie de la tarjeta con botones */}
          <div className="p-2 flex justify-end gap-2 bg-gray-50">
            <button
              className="p-2 text-gray-600 hover:bg-gray-200 rounded-full transition"
              onClick={() => setSelectedTask(task)}
            >
              <Icon icon="solar:pen-outline" width={20} />
            </button>
            <button
              className="p-2 text-red-500 hover:bg-red-100 rounded-full transition"
              onClick={() => handleDeleteTask(task.id)}
            >
              <Icon icon="solar:trash-bin-outline" width={20} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
