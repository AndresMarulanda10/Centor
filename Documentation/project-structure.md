# Estructura del Proyecto

## Organización de Directorios

La estructura de directorios de Business OS sigue las convenciones de Next.js con algunas personalizaciones para mejorar la organización y mantenibilidad del código:

```
business_os/
├── app/                    # Directorio principal de la aplicación (Next.js App Router)
│   ├── api/                # API Routes de Next.js
│   ├── auth/               # Rutas relacionadas con autenticación
│   ├── dashboard/          # Rutas del panel de control
│   │   ├── layout.tsx      # Layout compartido para el dashboard
│   │   ├── page.tsx        # Página principal del dashboard
│   │   └── tasks/          # Módulo de gestión de tareas
│   │       └── page.tsx    # Página de gestión de tareas
│   └── ...
├── components/             # Componentes reutilizables
│   ├── navigation/         # Componentes de navegación
│   ├── sidebar/            # Componentes de la barra lateral
│   ├── tasks/              # Componentes del módulo de tareas
│   │   ├── TaskContext.tsx # Contexto para gestión del estado de tareas
│   │   ├── TaskForm.tsx    # Formulario para crear/editar tareas
│   │   ├── TaskList.tsx    # Lista de tareas
│   │   ├── TaskManager.tsx # Componente principal de gestión de tareas
│   │   └── types.ts        # Definiciones de tipos para tareas
│   └── ...
├── config/                 # Configuraciones de la aplicación
├── lib/                    # Utilidades y funciones auxiliares
├── prisma/                 # Configuración de Prisma ORM
│   ├── schema.prisma       # Esquema de la base de datos
│   └── ...
├── public/                 # Archivos estáticos
├── styles/                 # Estilos globales
├── types/                  # Definiciones de tipos globales
├── .env                    # Variables de entorno
├── next.config.js          # Configuración de Next.js
├── package.json            # Dependencias y scripts
└── ...
```

## Descripción de Directorios Clave

### `/app`
Utiliza el App Router de Next.js, que implementa el enrutamiento basado en el sistema de archivos. Cada carpeta representa una ruta, y los archivos `page.tsx` definen las páginas que se renderizan en esas rutas.

### `/app/api`
Contiene las API Routes de Next.js, que son endpoints serverless que se ejecutan en el servidor. Estas rutas manejan las solicitudes HTTP y se comunican con la base de datos a través de Prisma.

### `/app/dashboard`
Contiene las páginas relacionadas con el panel de control, incluyendo la página principal del dashboard y el módulo de gestión de tareas.

### `/components`
Contiene componentes React reutilizables organizados por funcionalidad o módulo:

#### `/components/tasks`
Componentes específicos para el módulo de gestión de tareas:

- **TaskContext.tsx**: Implementa el Context API de React para gestionar el estado global de las tareas.
- **TaskForm.tsx**: Formulario para crear y editar tareas.
- **TaskList.tsx**: Componente para mostrar la lista de tareas con opciones para editar y eliminar.
- **TaskManager.tsx**: Componente principal que integra TaskForm y TaskList.
- **types.ts**: Define la interfaz Task y otros tipos relacionados.

### `/prisma`
Contiene la configuración de Prisma ORM, incluyendo el esquema de la base de datos (`schema.prisma`) que define los modelos de datos y sus relaciones.

## Flujo de Datos y Comunicación entre Componentes

### Módulo de Gestión de Tareas

1. **TaskContext.tsx**: Proporciona un contexto global para las tareas, incluyendo:
   - Estado de las tareas (array de objetos Task)
   - Funciones para añadir, actualizar y eliminar tareas
   - Persistencia de datos mediante localStorage

2. **TaskManager.tsx**: Componente contenedor que:
   - Utiliza TaskContext para acceder al estado global
   - Coordina la interacción entre TaskForm y TaskList
   - Maneja la lógica de negocio relacionada con las tareas

3. **TaskForm.tsx**: Formulario que:
   - Captura los datos de entrada del usuario
   - Valida los datos antes de enviarlos
   - Utiliza funciones del contexto para crear o actualizar tareas

4. **TaskList.tsx**: Componente que:
   - Muestra la lista de tareas desde el contexto
   - Proporciona opciones para editar y eliminar tareas
   - Permite filtrar y ordenar tareas

### Navegación

La navegación entre páginas se implementa mediante:

1. **SidebarNavigation**: Componente personalizado que:
   - Maneja la navegación entre páginas
   - Actualiza la selección visual en la barra lateral
   - Utiliza el router de Next.js para la navegación programática

## Patrones de Diseño Implementados

1. **Context API**: Utilizado para gestionar el estado global de las tareas, evitando el prop drilling.

2. **Componentes Contenedores y Presentacionales**: Separación entre componentes que manejan la lógica (TaskManager) y componentes que se encargan de la presentación (TaskList, TaskForm).

3. **Hooks Personalizados**: Como `useTaskContext`, que encapsula la lógica de acceso al contexto.

4. **Renderizado Condicional**: Utilizado para mostrar diferentes interfaces según el estado de la aplicación.

5. **Composición de Componentes**: Los componentes más complejos se construyen componiendo componentes más simples.

## Convenciones de Nomenclatura

- **Archivos de Componentes**: PascalCase (ej. TaskManager.tsx)
- **Archivos de Utilidades**: camelCase (ej. formatDate.ts)
- **Interfaces y Tipos**: PascalCase (ej. Task, TaskContextType)
- **Variables y Funciones**: camelCase (ej. addTask, updateTask)
- **Constantes**: UPPER_SNAKE_CASE (ej. API_URL)

Esta estructura organizada facilita la escalabilidad del proyecto, permitiendo añadir nuevos módulos y funcionalidades de manera ordenada y mantenible.
