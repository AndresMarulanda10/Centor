"use client";

import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { TaskProvider } from "@/components/tasks/TaskContext";
import TaskList from "@/components/tasks/TaskList";
import TaskForm from "@/components/tasks/TaskForm";

export default function TaskManager() {
  // Estado para controlar la visibilidad del modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Manejador para abrir el modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  
  // Manejador para cerrar el modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  
  return (
    <TaskProvider>
      {/* Contenedor principal */}
      <div className="flex flex-col h-full">
        {/* Sección del encabezado */}
        <div className="flex justify-between items-center mb-4 p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold">Gestión de Tareas</h2>
          {/* Botón para crear nueva tarea */}
          <button
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            onClick={handleOpenModal}
          >
            <Icon icon="solar:add-circle-outline" />
            Nueva Tarea
          </button>
        </div>
        
        {/* Contenedor de la lista de tareas con scroll */}
        <div className="flex-1 overflow-auto p-4">
          <TaskList />
        </div>
        
        {/* Modal para crear nueva tarea */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl overflow-hidden">
              <div className="relative">
                <button
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                  onClick={handleCloseModal}
                >
                  <Icon icon="solar:close-circle-outline" width={24} />
                </button>
                <div className="p-1">
                  <TaskForm onClose={handleCloseModal} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </TaskProvider>
  );
}
