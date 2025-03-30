"use client";

import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { v4 as uuidv4 } from "uuid";

// Definir la estructura de una tarea
interface Task {
  id: string;
  title: string;
  description: string;
  responsible: string;
  dueDate: string;
  status: "pending" | "in-progress" | "completed";
  createdAt: string;
}

// Componente principal simplificado del gestor de tareas
export default function SimpleTaskManager() {
  // Estado para las tareas
  const [tasks, setTasks] = useState<Task[]>(() => {
    if (typeof window !== "undefined") {
      const savedTasks = localStorage.getItem("tasks");
      return savedTasks ? JSON.parse(savedTasks) : [];
    }
    return [];
  });
  
  // Estado para la tarea seleccionada (para edición)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  
  // Estado para controlar la visibilidad del formulario
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  // Formulario para nueva tarea
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    responsible: "",
    dueDate: new Date().toISOString().split("T")[0],
    status: "pending" as Task["status"],
  });

  // Efecto para guardar tareas en localStorage cuando cambian
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

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
      setIsFormOpen(true);
    }
  }, [selectedTask]);

  // Manejador para cambios en campos de texto
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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
    updatedTask: Partial<Omit<Task, "id" | "createdAt">>
  ) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, ...updatedTask } : task
      )
    );
  };

  // Función para eliminar una tarea
  const deleteTask = (taskId: string) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta tarea?")) {
      setTasks(tasks.filter((task) => task.id !== taskId));
      
      // Limpiar la tarea seleccionada si es la que se está eliminando
      if (selectedTask?.id === taskId) {
        setSelectedTask(null);
      }
    }
  };

  // Manejador para envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validación básica
    if (!formData.title.trim()) {
      alert("El título es obligatorio");
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
      
      setIsFormOpen(false);
    } catch (error) {
      console.error("Error al procesar el formulario:", error);
      alert("Ocurrió un error al guardar la tarea");
    }
  };

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

  return (
    <div className="flex flex-col h-full">
      {/* Sección del encabezado */}
      <div className="flex justify-between items-center mb-4 p-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold">Gestión de Tareas</h2>
        {/* Botón para crear nueva tarea */}
        <button
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          onClick={() => setIsFormOpen(true)}
        >
          <Icon icon="solar:add-circle-outline" />
          Nueva Tarea
        </button>
      </div>
      
      {/* Contenedor de la lista de tareas con scroll */}
      <div className="flex-1 overflow-auto p-4">
        {tasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full py-10">
            <Icon
              className="text-gray-500"
              height={48}
              icon="solar:notes-minimalistic-outline"
              width={48}
            />
            <p className="mt-4 text-gray-500">No hay tareas disponibles</p>
          </div>
        ) : (
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
                        Responsable: {task.responsible || "Sin asignar"}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon icon="solar:calendar-outline" />
                      <span>Fecha límite: {formatDate(task.dueDate)}</span>
                    </div>
                    <div className="flex items-center gap-1 mt-2 text-xs">
                      <Icon icon="solar:clock-outline" />
                      <span>Creado: {formatDate(task.createdAt)}</span>
                    </div>
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
                    onClick={() => deleteTask(task.id)}
                  >
                    <Icon icon="solar:trash-bin-outline" width={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Modal para crear/editar tarea */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl overflow-hidden">
            <div className="relative">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                onClick={() => {
                  setIsFormOpen(false);
                  setSelectedTask(null);
                }}
              >
                <Icon icon="solar:close-circle-outline" width={24} />
              </button>
              <form className="flex flex-col gap-4 p-4" onSubmit={handleSubmit}>
                {/* Título del formulario */}
                <h2 className="text-xl font-semibold">
                  {selectedTask ? "Editar Tarea" : "Crear Nueva Tarea"}
                </h2>
                
                {/* Campo para título */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="title" className="text-sm font-medium">
                    Título <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="title"
                    required
                    name="title"
                    placeholder="Título de la tarea"
                    value={formData.title}
                    onChange={handleChange}
                    className="border rounded-md p-2"
                  />
                </div>
                
                {/* Campo para descripción */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="description" className="text-sm font-medium">
                    Descripción
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={3}
                    placeholder="Descripción detallada de la tarea"
                    value={formData.description}
                    onChange={handleChange}
                    className="border rounded-md p-2"
                  />
                </div>
                
                {/* Campo para responsable */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="responsible" className="text-sm font-medium">
                    Responsable
                  </label>
                  <input
                    id="responsible"
                    name="responsible"
                    placeholder="Nombre del responsable"
                    value={formData.responsible}
                    onChange={handleChange}
                    className="border rounded-md p-2"
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
                    name="dueDate"
                    type="date"
                    value={formData.dueDate}
                    onChange={handleChange}
                    className="border rounded-md p-2"
                  />
                </div>
                
                {/* Campo para estado */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="status" className="text-sm font-medium">
                    Estado
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="border rounded-md p-2"
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
                    onClick={() => {
                      setIsFormOpen(false);
                      setSelectedTask(null);
                    }}
                    className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                  >
                    Cancelar
                  </button>
                  <button 
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    {selectedTask ? "Actualizar" : "Crear"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}