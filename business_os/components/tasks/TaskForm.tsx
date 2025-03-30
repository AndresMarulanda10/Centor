"use client";

import React, { useEffect, useState } from "react";
import { useTaskContext } from "./TaskContext";
import { Task } from "./types";

// Props para el componente TaskForm
interface TaskFormProps {
  onClose: () => void;
}

export default function TaskForm({ onClose }: TaskFormProps) {
  // Obtener funciones y estado del contexto
  const { addTask, updateTask, selectedTask, setSelectedTask, isLoading } = useTaskContext();
  
  // Inicializar estado del formulario con valores predeterminados
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    responsible: "",
    dueDate: new Date().toISOString().split("T")[0],
    status: "pending" as Task["status"],
  });
  
  // Estado para errores de formulario
  const [formError, setFormError] = useState("");

  // Efecto para cargar datos cuando hay una tarea seleccionada para editar
  useEffect(() => {
    if (selectedTask) {
      setFormData({
        title: selectedTask.title || "",
        description: selectedTask.description || "",
        responsible: selectedTask.responsible || "",
        dueDate: selectedTask.dueDate ? selectedTask.dueDate.split("T")[0] : new Date().toISOString().split("T")[0],
        status: selectedTask.status || "pending",
      });
    }
  }, [selectedTask]);

  // Manejador para cambios en campos de texto
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormError("");
  };

  // Manejador para envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validación básica
    if (!formData.title.trim()) {
      setFormError("El título es obligatorio");
      return;
    }
    
    try {
      // Si hay una tarea seleccionada, actualizarla; si no, crear nueva
      if (selectedTask) {
        updateTask(selectedTask.id, formData);
        setSelectedTask(null);
      } else {
        addTask(formData);
      }
      
      // Resetear formulario a valores predeterminados
      setFormData({
        title: "",
        description: "",
        responsible: "",
        dueDate: new Date().toISOString().split("T")[0],
        status: "pending",
      });
      
      onClose();
    } catch (error) {
      console.error("Error al procesar el formulario:", error);
      setFormError("Ocurrió un error al guardar la tarea");
    }
  };

  return (
    <form className="flex flex-col gap-4 p-4" onSubmit={handleSubmit}>
      {/* Título del formulario */}
      <h2 className="text-xl font-semibold">
        {selectedTask ? "Editar Tarea" : "Crear Nueva Tarea"}
      </h2>
      
      {/* Mensaje de error */}
      {formError && (
        <div className="bg-red-50 text-red-600 p-2 rounded-md">
          {formError}
        </div>
      )}
      
      {/* Campo para título */}
      <div className="flex flex-col gap-1">
        <label htmlFor="title" className="text-sm font-medium">
          Título <span className="text-red-500">*</span>
        </label>
        <input
          id="title"
          required
          disabled={isLoading}
          name="title"
          placeholder="Título de la tarea"
          value={formData.title}
          onChange={handleChange}
          className="border rounded-md p-2 disabled:bg-gray-100"
        />
      </div>
      
      {/* Campo para descripción */}
      <div className="flex flex-col gap-1">
        <label htmlFor="description" className="text-sm font-medium">
          Descripción
        </label>
        <textarea
          id="description"
          disabled={isLoading}
          name="description"
          rows={3}
          placeholder="Descripción detallada de la tarea"
          value={formData.description}
          onChange={handleChange}
          className="border rounded-md p-2 disabled:bg-gray-100"
        />
      </div>
      
      {/* Campo para responsable */}
      <div className="flex flex-col gap-1">
        <label htmlFor="responsible" className="text-sm font-medium">
          Responsable
        </label>
        <input
          id="responsible"
          disabled={isLoading}
          name="responsible"
          placeholder="Nombre del responsable"
          value={formData.responsible}
          onChange={handleChange}
          className="border rounded-md p-2 disabled:bg-gray-100"
        />
      </div>
      
      {/* Campo para fecha límite */}
      <div className="flex flex-col gap-1">
        <label htmlFor="dueDate" className="text-sm font-medium">
          Fecha límite <span className="text-red-500">*</span>
        </label>
        <input
          id="dueDate"
          required
          disabled={isLoading}
          name="dueDate"
          type="date"
          value={formData.dueDate}
          onChange={handleChange}
          className="border rounded-md p-2 disabled:bg-gray-100"
        />
      </div>
      
      {/* Campo para estado */}
      <div className="flex flex-col gap-1">
        <label htmlFor="status" className="text-sm font-medium">
          Estado
        </label>
        <select
          id="status"
          disabled={isLoading}
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="border rounded-md p-2 disabled:bg-gray-100"
        >
          <option value="pending">Pendiente</option>
          <option value="in-progress">En progreso</option>
          <option value="completed">Completada</option>
        </select>
      </div>
      
      {/* Botones */}
      <div className="flex justify-end gap-2 mt-4">
        <button 
          type="button"
          disabled={isLoading}
          onClick={onClose}
          className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50"
        >
          Cancelar
        </button>
        <button 
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
        >
          {isLoading ? "Guardando..." : selectedTask ? "Actualizar" : "Crear"}
        </button>
      </div>
    </form>
  );
}
