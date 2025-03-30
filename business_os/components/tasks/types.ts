// Define la estructura para un objeto Task
export interface Task {
  // Identificador único para la tarea
  id: string;
  // Título o nombre de la tarea
  title: string;
  // Descripción detallada de la tarea
  description: string;
  // Persona responsable de completar la tarea (nombre o email)
  responsible?: string;
  // ID del usuario asignado (en la base de datos)
  assigneeId?: string;
  // ID del creador de la tarea (en la base de datos)
  creatorId?: string;
  // Fecha límite para la tarea en formato de cadena ISO
  dueDate: string; // cadena de fecha ISO
  // Estado actual de la tarea: puede ser 'pending', 'in-progress', o 'completed'
  status: "pending" | "in-progress" | "completed";
  // Prioridad de la tarea: puede ser 'low', 'medium', o 'high'
  priority?: "low" | "medium" | "high";
  // ID del proyecto asociado (en la base de datos)
  projectId?: string;
  // Marca de tiempo cuando se creó la tarea en formato de cadena ISO
  createdAt: string; // cadena de fecha ISO
  // Marca de tiempo de la última actualización
  updatedAt?: string; // cadena de fecha ISO
  
  // Información relacionada (para cuando se incluyen relaciones)
  assignee?: {
    id: string;
    name?: string;
    email?: string;
    image?: string;
  };
  creator?: {
    id: string;
    name?: string;
    email?: string;
  };
}
