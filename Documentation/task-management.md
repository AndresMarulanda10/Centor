# Módulo de Gestión de Tareas

## Visión General

El módulo de gestión de tareas es una de las funcionalidades principales de Business OS, permitiendo a los usuarios crear, editar, eliminar y dar seguimiento a tareas dentro de la organización. Este módulo implementa una interfaz intuitiva y un sistema de almacenamiento persistente utilizando localStorage (en la fase actual).

## Características Principales

1. **Creación de Tareas**: Formulario completo para crear nuevas tareas con campos como título, descripción, responsable, fecha límite y estado.
2. **Edición de Tareas**: Capacidad para modificar cualquier aspecto de una tarea existente.
3. **Eliminación de Tareas**: Opción para eliminar tareas que ya no son necesarias.
4. **Sistema de Estados**: Seguimiento del progreso de las tareas mediante estados (pendiente, en progreso, completada).
5. **Priorización**: Asignación de prioridades a las tareas (baja, media, alta).
6. **Interfaz Responsiva**: Diseño adaptable a diferentes tamaños de pantalla.
7. **Navegación Integrada**: Acceso directo desde el dashboard y la barra lateral.

## Componentes del Módulo

### TaskContext

El corazón del sistema de gestión de tareas es el `TaskContext`, que implementa el Context API de React para proporcionar un estado global y funciones de manipulación de tareas a todos los componentes.

```tsx
// Definición del contexto
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
```

**Funcionalidades principales**:
- Almacenamiento del estado de las tareas
- Persistencia mediante localStorage
- Funciones CRUD para manipular tareas
- Gestión de la tarea seleccionada para edición
- Manejo de estados de carga y errores

### TaskManager

Componente principal que integra todos los demás componentes del módulo de tareas.

**Responsabilidades**:
- Orquestar la interacción entre los diferentes componentes
- Proporcionar la estructura de la interfaz de usuario
- Manejar la lógica de negocio de alto nivel

### TaskForm

Formulario para la creación y edición de tareas.

**Características**:
- Validación de campos obligatorios
- Manejo de diferentes tipos de inputs (texto, fecha, selección)
- Modo de creación y modo de edición
- Feedback visual para el usuario

### TaskList

Componente para mostrar la lista de tareas con opciones para interactuar con ellas.

**Funcionalidades**:
- Visualización de tareas en formato de lista o tarjetas
- Opciones para editar y eliminar tareas
- Filtrado por estado o prioridad
- Ordenación por diferentes criterios
- Indicadores visuales de estado y prioridad

### Tipos de Datos

La interfaz `Task` define la estructura de los datos de una tarea:

```tsx
interface Task {
  id: string;
  title: string;
  description: string;
  responsible?: string;
  assigneeId?: string;
  creatorId?: string;
  dueDate: string;
  status: "pending" | "in-progress" | "completed";
  priority?: "low" | "medium" | "high";
  projectId?: string;
  createdAt: string;
  updatedAt?: string;
  
  // Información relacionada
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
```

## Flujo de Trabajo

1. **Acceso al Módulo**:
   - Desde el botón en el dashboard
   - Desde el enlace "Tasks" en la barra lateral

2. **Visualización de Tareas**:
   - La lista de tareas se carga automáticamente al acceder al módulo
   - Las tareas se muestran con información resumida

3. **Creación de Tareas**:
   - El usuario hace clic en "Nueva Tarea"
   - Completa el formulario con la información requerida
   - Envía el formulario para crear la tarea
   - La nueva tarea aparece en la lista

4. **Edición de Tareas**:
   - El usuario selecciona una tarea para editar
   - El formulario se carga con los datos actuales de la tarea
   - El usuario modifica los campos necesarios
   - Guarda los cambios para actualizar la tarea

5. **Eliminación de Tareas**:
   - El usuario selecciona la opción de eliminar en una tarea
   - Se muestra una confirmación
   - Al confirmar, la tarea se elimina de la lista

6. **Navegación de Retorno**:
   - El botón "Volver" permite regresar al dashboard

## Implementación Técnica

### Almacenamiento de Datos

En la fase actual, el módulo utiliza localStorage para la persistencia de datos:

```tsx
// Inicialización del estado desde localStorage
const [tasks, setTasks] = useState<Task[]>(() => {
  if (typeof window !== "undefined") {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  }
  return [];
});

// Persistencia en localStorage cuando cambia el estado
useEffect(() => {
  if (typeof window !== "undefined") {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
}, [tasks]);
```

### Generación de IDs

Se utiliza la biblioteca UUID para generar identificadores únicos para cada tarea:

```tsx
import { v4 as uuidv4 } from "uuid";

const addTask = (task: Omit<Task, "id" | "createdAt">) => {
  const newTask: Task = {
    ...task,
    id: uuidv4(),
    createdAt: new Date().toISOString(),
  };
  setTasks([...tasks, newTask]);
};
```

### Navegación

La navegación se implementa utilizando el router de Next.js:

```tsx
import { useRouter } from "next/navigation";

const TasksPage = () => {
  const router = useRouter();
  
  const handleGoBack = () => {
    router.push("/dashboard");
  };
  
  return (
    <div>
      <button onClick={handleGoBack}>Volver al Dashboard</button>
      <TaskManager />
    </div>
  );
};
```

## Integración con la Barra Lateral

El módulo de tareas está integrado con la barra lateral mediante el componente `SidebarNavigation`, que maneja la navegación y la selección visual:

```tsx
const handleItemClick = React.useCallback((item: SidebarItem) => {
  if (item.href) {
    window.location.href = item.href;
  }
}, []);
```

## Mejoras Futuras

1. **Integración con Base de Datos**: Reemplazar localStorage por almacenamiento persistente en base de datos mediante Prisma.
2. **Asignación de Tareas**: Implementar la asignación de tareas a usuarios específicos.
3. **Notificaciones**: Sistema de notificaciones para fechas límite y cambios de estado.
4. **Filtros Avanzados**: Opciones de filtrado y búsqueda más sofisticadas.
5. **Etiquetas y Categorías**: Permitir la categorización de tareas mediante etiquetas.
6. **Adjuntos**: Capacidad para adjuntar archivos a las tareas.
7. **Comentarios**: Sistema de comentarios para discusiones sobre las tareas.
8. **Integración con Proyectos**: Vincular tareas a proyectos específicos.
9. **Reportes y Estadísticas**: Visualización de datos sobre el progreso y distribución de tareas.

## Conclusión

El módulo de gestión de tareas proporciona una solución completa para la administración de tareas dentro de Business OS. Su diseño modular y la separación clara de responsabilidades facilitan el mantenimiento y la expansión futura. La implementación actual con localStorage permite un desarrollo y prueba rápidos, mientras que la arquitectura está preparada para la integración con una base de datos en fases posteriores.
