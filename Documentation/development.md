# Desarrollo y Testing

## Flujo de Desarrollo

### Estructura de Desarrollo

El monorepo está organizado para facilitar el desarrollo paralelo y la compartición de código:

```
# Flujo típico de desarrollo
1. Desarrollar lógica compartida en packages/logic
2. Implementar UI en apps/web (Shadcn UI) y apps/mobile (React Native)
3. Usar design tokens de packages/design para consistencia
4. Escribir tests para cada capa
5. Validar con CI/CD antes de merge
```

### Comandos de Desarrollo Diarios

```bash
# Iniciar desarrollo local
bun run dev:web      # Aplicación web en http://localhost:3000
bun run dev:mobile   # Aplicación móvil con Expo

# Base de datos
bun run db:studio    # Prisma Studio en http://localhost:5555
bun run db:migrate   # Aplicar nuevas migraciones
bun run db:generate  # Regenerar cliente Prisma

# Testing
bun run test         # Todos los tests
bun run test:watch   # Tests en modo watch
bun run test:coverage # Tests con coverage

# Linting y formatting
bun run lint         # ESLint en todo el monorepo
bun run format       # Prettier en todo el monorepo
```

## Desarrollo de Aplicación Web

### Estructura del App Router

```
apps/web/app/
├── globals.css           # Estilos globales
├── layout.tsx           # Layout raíz con providers
├── page.tsx            # Página home
├── loading.tsx         # Loading UI global
├── error.tsx           # Error boundary global
├── not-found.tsx       # 404 page
├── (dashboard)/        # Route group
│   ├── dashboard/
│   │   ├── page.tsx    # Dashboard principal
│   │   └── loading.tsx # Dashboard loading
│   └── tasks/
│       ├── page.tsx    # Lista de tareas
│       ├── loading.tsx # Tasks loading
│       ├── [id]/
│       │   └── page.tsx # Detalle de tarea
│       └── new/
│           └── page.tsx # Nueva tarea
└── api/                # API Routes
    ├── auth/           # Endpoints de autenticación
    ├── tasks/          # CRUD de tareas
    │   ├── route.ts    # GET /api/tasks, POST /api/tasks
    │   └── [id]/
    │       └── route.ts # GET/PUT/DELETE /api/tasks/[id]
    └── users/          # Gestión de usuarios
```

### Server vs Client Components

```typescript
// Server Component (por defecto)
import { TaskList } from '@/components/tasks/task-list'
import { getTasks } from '@/lib/tasks'

export default async function TasksPage() {
  const tasks = await getTasks() // Fetch en el servidor

  return (
    <div>
      <h1>Tasks</h1>
      <TaskList tasks={tasks} />
    </div>
  )
}

// Client Component (cuando necesitas interactividad)
'use client'

import { useState } from 'react'
import { useTaskManager } from '@centor/logic/hooks'

export function TaskForm() {
  const [title, setTitle] = useState('')
  const { createTask } = useTaskManager()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await createTask({ title })
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Formulario interactivo */}
    </form>
  )
}
```

### Shadcn UI Components

```bash
# Agregar componentes específicos
cd apps/web
bunx shadcn@latest add button
bunx shadcn@latest add form
bunx shadcn@latest add dialog
bunx shadcn@latest add table

# Los componentes se copian a apps/web/components/ui/
```

Personalización de componentes:

```typescript
// apps/web/components/ui/button.tsx (copiado de Shadcn)
import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        // Agregar variantes personalizadas aquí
        centor: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

// Componente completamente personalizable
```

### API Routes con App Router

```typescript
// apps/web/app/api/tasks/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { taskSchema } from '@centor/logic/schemas'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const tasks = await prisma.task.findMany({
      where: { userId: session.user.id },
      include: { project: true },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(tasks)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch tasks' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = taskSchema.parse(body) // Validación con Zod

    const task = await prisma.task.create({
      data: {
        ...validatedData,
        userId: session.user.id,
      },
      include: { project: true }
    })

    return NextResponse.json(task, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: 'Failed to create task' }, { status: 500 })
  }
}
```

## Desarrollo de Aplicación Móvil

### Estructura con Expo Router

```
apps/mobile/app/
├── _layout.tsx          # Layout raíz
├── index.tsx           # Pantalla principal
├── +not-found.tsx      # 404 screen
├── (tabs)/            # Tab navigation
│   ├── _layout.tsx    # Tab layout
│   ├── dashboard.tsx  # Dashboard tab
│   ├── tasks.tsx      # Tasks tab
│   └── profile.tsx    # Profile tab
├── task/              # Modal routes
│   └── [id].tsx       # Modal de detalle
└── auth/              # Auth screens
    ├── login.tsx      # Login screen
    └── register.tsx   # Register screen
```

### Componentes React Native

```typescript
// apps/mobile/components/TaskCard.tsx
import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Task } from '@centor/logic/types'
import { colors, spacing } from '@centor/design/tokens'

interface TaskCardProps {
  task: Task
  onPress: () => void
}

export function TaskCard({ task, onPress }: TaskCardProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.title}>{task.title}</Text>
        <Text style={styles.status}>{task.status}</Text>
      </View>
      {task.description && (
        <Text style={styles.description} numberOfLines={2}>
          {task.description}
        </Text>
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    padding: spacing.md,
    marginVertical: spacing.xs,
    borderRadius: 8,
    shadowColor: colors.gray[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Android shadow
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.gray[900],
    flex: 1,
  },
  status: {
    fontSize: 12,
    color: colors.primary[600],
    fontWeight: '500',
  },
  description: {
    fontSize: 14,
    color: colors.gray[600],
    lineHeight: 20,
  },
})
```

### Navigation con Expo Router

```typescript
// apps/mobile/app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#3b82f6',
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#e5e7eb',
        },
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="tasks"
        options={{
          title: 'Tasks',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  )
}
```

## Desarrollo de Paquetes Compartidos

### Logic Package (packages/logic)

```typescript
// packages/logic/hooks/useTaskManager.ts
import { useState, useCallback } from 'react'
import { Task, CreateTaskInput, UpdateTaskInput } from '../types'
import { createTask as apiCreateTask, updateTask as apiUpdateTask } from '../api'

export function useTaskManager() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const createTask = useCallback(async (input: CreateTaskInput): Promise<Task | null> => {
    try {
      setLoading(true)
      setError(null)
      const task = await apiCreateTask(input)
      return task
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create task')
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  const updateTask = useCallback(async (id: string, input: UpdateTaskInput): Promise<Task | null> => {
    try {
      setLoading(true)
      setError(null)
      const task = await apiUpdateTask(id, input)
      return task
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update task')
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    createTask,
    updateTask,
    loading,
    error,
  }
}
```

### Design Package (packages/design)

```typescript
// packages/design/tokens/colors.ts
export const colors = {
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    500: '#3b82f6',
    600: '#2563eb',
    900: '#1e3a8a',
  },
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    500: '#6b7280',
    900: '#111827',
  },
  success: {
    500: '#10b981',
    600: '#059669',
  },
  error: {
    500: '#ef4444',
    600: '#dc2626',
  },
  white: '#ffffff',
  black: '#000000',
} as const

// packages/design/tokens/spacing.ts
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
} as const

// packages/design/config/tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#2563eb',
          900: '#1e3a8a',
        },
        // ... resto de colores
      },
      spacing: {
        xs: '0.25rem',
        sm: '0.5rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem',
        '2xl': '3rem',
      },
    },
  },
}
```

## Testing

### Testing Web (Jest + Testing Library)

```typescript
// apps/web/__tests__/components/TaskCard.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { TaskCard } from '@/components/tasks/TaskCard'
import { mockTask } from '@centor/logic/test-utils'

describe('TaskCard', () => {
  const task = mockTask({
    title: 'Test Task',
    description: 'Test Description',
    status: 'todo'
  })

  it('renders task information correctly', () => {
    const onEdit = jest.fn()

    render(<TaskCard task={task} onEdit={onEdit} />)

    expect(screen.getByText('Test Task')).toBeInTheDocument()
    expect(screen.getByText('Test Description')).toBeInTheDocument()
    expect(screen.getByText('todo')).toBeInTheDocument()
  })

  it('calls onEdit when edit button is clicked', () => {
    const onEdit = jest.fn()

    render(<TaskCard task={task} onEdit={onEdit} />)

    fireEvent.click(screen.getByRole('button', { name: /edit/i }))

    expect(onEdit).toHaveBeenCalledWith(task)
  })
})
```

### Testing Móvil (Jest + Testing Library RN)

```typescript
// apps/mobile/__tests__/components/TaskCard.test.tsx
import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import { TaskCard } from '@/components/TaskCard'
import { mockTask } from '@centor/logic/test-utils'

describe('TaskCard', () => {
  const task = mockTask({
    title: 'Test Task',
    description: 'Test Description',
    status: 'todo'
  })

  it('renders task information correctly', () => {
    const onPress = jest.fn()

    const { getByText } = render(<TaskCard task={task} onPress={onPress} />)

    expect(getByText('Test Task')).toBeTruthy()
    expect(getByText('Test Description')).toBeTruthy()
    expect(getByText('todo')).toBeTruthy()
  })

  it('calls onPress when pressed', () => {
    const onPress = jest.fn()

    const { getByTestId } = render(
      <TaskCard task={task} onPress={onPress} testID="task-card" />
    )

    fireEvent.press(getByTestId('task-card'))

    expect(onPress).toHaveBeenCalled()
  })
})
```

### Testing API Routes

```typescript
// apps/web/__tests__/api/tasks.test.ts
import { createMocks } from 'node-mocks-http'
import handler from '@/app/api/tasks/route'
import { getServerSession } from 'next-auth'

jest.mock('next-auth')
jest.mock('@/lib/prisma')

describe('/api/tasks', () => {
  beforeEach(() => {
    ;(getServerSession as jest.Mock).mockResolvedValue({
      user: { id: 'user1', email: 'test@example.com' }
    })
  })

  it('GET /api/tasks returns user tasks', async () => {
    const { req, res } = createMocks({
      method: 'GET',
    })

    await handler.GET(req)

    expect(res._getStatusCode()).toBe(200)
    const data = JSON.parse(res._getData())
    expect(Array.isArray(data)).toBe(true)
  })

  it('POST /api/tasks creates a new task', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        title: 'New Task',
        description: 'Task description',
        status: 'todo'
      },
    })

    await handler.POST(req)

    expect(res._getStatusCode()).toBe(201)
    const data = JSON.parse(res._getData())
    expect(data.title).toBe('New Task')
  })
})
```

## Debugging

### Web (Next.js)

```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js: debug server-side",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/apps/web/node_modules/next/dist/bin/next-dev",
      "args": ["dev"],
      "cwd": "${workspaceFolder}/apps/web",
      "console": "integratedTerminal",
      "skipFiles": ["<node_internals>/**"]
    }
  ]
}
```

### Móvil (Expo)

```bash
# Debugging con Flipper
cd apps/mobile
bunx expo install react-native-flipper

# React Native Debugger
# Instalar desde https://github.com/jhen0409/react-native-debugger
```

## Mejores Prácticas

### 1. Organización de Código

- Mantén los componentes pequeños y enfocados
- Usa custom hooks para lógica reutilizable
- Separa lógica de presentación
- Agrupa por funcionalidad, no por tipo de archivo

### 2. Performance

- Usa React.memo para componentes que no cambian frecuentemente
- Implementa lazy loading para rutas y componentes grandes
- Optimiza imágenes con Next.js Image component
- Usa Suspense y loading states apropiados

### 3. TypeScript

- Activa strict mode en tsconfig.json
- Define tipos explícitos para props y state
- Usa discriminated unions para estados complejos
- Evita `any`, usa `unknown` cuando sea necesario

### 4. Testing

- Escribe tests para lógica de negocio crítica
- Usa mocks para dependencias externas
- Testea comportamiento, no implementación
- Mantén tests simples y legibles

### 5. Git Workflow

```bash
# Feature branch workflow
git checkout -b feature/task-management
# Develop and commit
git push origin feature/task-management
# Create PR for review
```

## Troubleshooting Común

### Metro bundler cache issues (Móvil)

```bash
cd apps/mobile
bunx expo start --clear
```

### Next.js cache issues (Web)

```bash
cd apps/web
rm -rf .next
bun run dev
```

### TypeScript path mapping issues

Asegúrate de que `baseUrl` y `paths` estén configurados en `tsconfig.json`:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@centor/*": ["../../packages/*"]
    }
  }
}
```

---

Esta guía cubre los aspectos esenciales del desarrollo en el monorepo Centor. Para información específica sobre deployment, consulta [deployment.md](./deployment.md).
