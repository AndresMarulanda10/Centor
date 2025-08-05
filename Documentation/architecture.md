# Arquitectura del Sistema

## Visión General

Business OS implementa una arquitectura cliente/servidor moderna basada en componentes, utilizando Next.js como framework principal. Esta arquitectura proporciona una clara separación entre la interfaz de usuario (cliente) y la lógica de negocio/almacenamiento de datos (servidor).

````markdown
# Arquitectura del Sistema

## Visión General

Centor implementa una arquitectura de monorepo moderna con múltiples aplicaciones (web y móvil) que comparten lógica de negocio y tokens de diseño. La arquitectura se basa en Next.js 15+ para web, Expo para móvil, y utiliza Bun Workspaces para la gestión del monorepo sin la complejidad de Turborepo.

## Diagrama de Arquitectura del Monorepo

```
+------------------------------------------------------------------+
|                           MONOREPO (Bun Workspaces)             |
|                                                                  |
|  +-------------------------+    +-------------------------+     |
|  |      apps/web/          |    |     apps/mobile/        |     |
|  |   Next.js 15+ App       |    |   Expo React Native     |     |
|  |                         |    |                         |     |
|  |  +-----------------+    |    |  +-----------------+    |     |
|  |  | App Router      |    |    |  | Expo Router     |    |     |
|  |  | Server Components|   |    |  | Screens         |    |     |
|  |  | Client Components|   |    |  | Components      |    |     |
|  |  +-----------------+    |    |  +-----------------+    |     |
|  |           ↓             |    |           ↓             |     |
|  |  +-----------------+    |    |  +-----------------+    |     |
|  |  | Shadcn UI       |    |    |  | React Native    |    |     |
|  |  | Tailwind CSS    |    |    |  | Expo SDK        |    |     |
|  |  +-----------------+    |    |  +-----------------+    |     |
|  +-------------------------+    +-------------------------+     |
|              ↓                              ↓                   |
|  +----------------------------------------------------------+   |
|  |                  packages/logic/                        |   |
|  |          Shared Business Logic & Hooks                  |   |
|  |  - API clients    - Custom hooks    - Utilities        |   |
|  |  - Types          - Validation      - Constants        |   |
|  +----------------------------------------------------------+   |
|                                ↓                               |
|  +----------------------------------------------------------+   |
|  |                 packages/design/                        |   |
|  |            Shared Design System                         |   |
|  |  - Design tokens  - Tailwind config  - Brand assets    |   |
|  |  - Color palette  - Typography      - Icons           |   |
|  +----------------------------------------------------------+   |
+------------------------------------------------------------------+
                                ↓
+------------------------------------------------------------------+
|                         BACKEND SERVICES                        |
|                                                                  |
|  +----------------------------------------------------------+   |
|  |              Next.js API Routes (apps/web/api/)         |   |
|  |  - Authentication  - Task management  - User management |   |
|  +----------------------------------------------------------+   |
|                                ↓                               |
|  +----------------------------------------------------------+   |
|  |                    Prisma ORM Layer                     |   |
|  |  - Type-safe queries  - Migrations  - Schema management |   |
|  +----------------------------------------------------------+   |
|                                ↓                               |
|  +----------------------------------------------------------+   |
|  |                   PostgreSQL Database                   |   |
|  |  - User data  - Tasks  - Projects  - Audit logs        |   |
|  +----------------------------------------------------------+   |
+------------------------------------------------------------------+
```

## Arquitectura de la Aplicación Web

La aplicación web utiliza Next.js 15+ con App Router para una arquitectura moderna:

### 1. App Router Structure
```
apps/web/app/
├── layout.tsx           # Root layout con providers
├── page.tsx            # Landing page
├── dashboard/
│   ├── layout.tsx      # Dashboard layout
│   ├── page.tsx        # Dashboard overview
│   └── tasks/
│       ├── page.tsx    # Tasks list
│       └── [id]/
│           └── page.tsx # Task detail
└── api/
    ├── auth/           # Authentication endpoints
    ├── tasks/          # Task management endpoints
    └── users/          # User management endpoints
```

### 2. Componentes y Rendering
- **Server Components**: Por defecto para mejor performance
- **Client Components**: Cuando se necesita interactividad
- **Streaming**: Para loading states optimizados
- **Suspense Boundaries**: Para error handling granular

### 3. Shadcn UI Integration
- Componentes copiados al proyecto para máxima customización
- Basados en Radix UI para accesibilidad
- Styled con Tailwind CSS
- TypeScript-first con excelente tipado
````

## Arquitectura Cliente

La arquitectura del cliente sigue el patrón de componentes de React con una gestión de estado centralizada:

1. **Componentes de UI**: Implementados con React y Next.js, proporcionan la interfaz de usuario.
   - Componentes presentacionales: Encargados de la visualización (TaskList, TaskForm)
   - Componentes contenedores: Gestionan la lógica y el estado (TaskManager)

2. **Gestión de Estado**:
   - Context API de React para el estado global de la aplicación
   - Hooks personalizados para la lógica de negocio específica
   - Estado local para componentes individuales

3. **Enrutamiento**:
   - Sistema de enrutamiento basado en archivos de Next.js
   - Navegación entre páginas con estado preservado

## Arquitectura Servidor

La arquitectura del servidor utiliza Next.js API Routes y Prisma ORM:

1. **API Routes**:
   - Endpoints RESTful para interactuar con los datos
   - Manejo de autenticación y autorización

2. **Capa de Servicios**:
   - Implementación de la lógica de negocio
   - Validación de datos
   - Manejo de errores

3. **Capa de Persistencia**:
   - Prisma ORM para interactuar con la base de datos
   - Modelos de datos definidos en schema.prisma
   - Migraciones y gestión del esquema de base de datos

## Arquitectura de la Aplicación Móvil

La aplicación móvil utiliza Expo con React Native para desarrollo multiplataforma:

### 1. Expo Router Structure
```
apps/mobile/app/
├── _layout.tsx         # Root layout con providers
├── index.tsx          # Home screen
├── (tabs)/
│   ├── _layout.tsx    # Tab layout
│   ├── dashboard.tsx  # Dashboard tab
│   ├── tasks.tsx      # Tasks tab
│   └── profile.tsx    # Profile tab
└── task/
    └── [id].tsx       # Task detail modal
```

### 2. Componentes Nativos
- **Expo SDK**: APIs nativas para funcionalidades del dispositivo
- **React Native Components**: Componentes base optimizados para móvil
- **Custom Components**: Componentes personalizados usando design tokens
- **Navigation**: React Navigation integrado con Expo Router

### 3. Sincronización de Datos
- **API Clients**: Compartidos desde `packages/logic`
- **Offline Support**: Capacidades offline con AsyncStorage
- **Background Sync**: Sincronización en background cuando sea posible

## Arquitectura de Paquetes Compartidos

### packages/logic
Contiene toda la lógica de negocio compartida entre aplicaciones:

```typescript
// Estructura típica
export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: Date;
  updatedAt: Date;
}

export const useTaskManager = () => {
  // Lógica compartida para gestión de tareas
  const createTask = async (task: CreateTaskInput) => { ... };
  const updateTask = async (id: string, updates: UpdateTaskInput) => { ... };
  const deleteTask = async (id: string) => { ... };

  return { createTask, updateTask, deleteTask };
};
```

### packages/design
Contiene todos los tokens de diseño y configuraciones compartidas:

```typescript
// Design tokens
export const colors = {
  primary: {
    50: '#eff6ff',
    500: '#3b82f6',
    900: '#1e3a8a',
  },
  // ...
};

export const spacing = {
  xs: '0.5rem',
  sm: '1rem',
  md: '1.5rem',
  // ...
};
```

## Flujo de Datos

### Aplicación Web
1. Usuario interactúa con componentes de Shadcn UI
2. Server Components manejan data fetching inicial
3. Client Components manejan interactividad
4. API Routes procesan requests del cliente
5. Prisma ORM interactúa con PostgreSQL
6. Datos fluyen de vuelta a través de Server/Client Components

### Aplicación Móvil
1. Usuario interactúa con componentes React Native
2. Hooks compartidos (packages/logic) manejan estado
3. API clients realizan requests a Next.js API Routes
4. Datos se almacenan localmente para offline support
5. Sincronización periódica con el servidor

### Sincronización Cross-Platform
1. Ambas aplicaciones utilizan los mismos API endpoints
2. Lógica de negocio compartida garantiza consistencia
3. Design tokens mantienen coherencia visual
4. TypeScript shared types previenen inconsistencias

## Ventajas de esta Arquitectura

1. **Compartición de Código**: 40-60% del código compartido entre web y móvil
2. **Desarrollo Paralelo**: Equipos pueden trabajar independientemente
3. **Consistencia**: Design system y lógica unificados
4. **Scalabilidad**: Fácil agregar nuevas aplicaciones al monorepo
5. **Performance**:
   - Web: Server Components + streaming
   - Móvil: Optimizaciones nativas de React Native
6. **Developer Experience**:
   - Hot reloading en ambas plataformas
   - TypeScript strict mode
   - Testing unificado con Jest
7. **Deployment**:
   - Web: Vercel con CI/CD automático
   - Móvil: EAS Build con distribución automática

## Testing Strategy

### Unit Testing
```bash
# Testing compartido
bun test packages/logic
bun test packages/design

# Testing específico
bun test:web    # Jest + Testing Library para web
bun test:mobile # Jest + Testing Library RN para móvil
```

### Integration Testing
- API Routes testing con Supertest
- Database testing con test database
- Cross-platform integration tests

### E2E Testing
- Web: Playwright para testing end-to-end
- Móvil: Detox para testing en simuladores/dispositivos

## Deployment Architecture

### Web Application
```
GitHub → GitHub Actions → Vercel
├── Build Next.js app
├── Run migrations (Prisma)
├── Deploy to production
└── Environment variables injection
```

### Mobile Application
```
GitHub → GitHub Actions → EAS Build → App Stores
├── Build iOS/Android binaries
├── Run tests
├── Submit to Apple App Store / Google Play
└── OTA updates with Expo Updates
```

### Database
```
PostgreSQL (Production)
├── Prisma migrations
├── Connection pooling
├── Backup strategies
└── Monitoring and alerts
```

## Consideraciones de Seguridad

1. **Authentication**: NextAuth.js con JWT/sessions
2. **Authorization**: Role-based access control (RBAC)
3. **API Security**: Rate limiting, input validation
4. **Database**: Prepared statements via Prisma
5. **Mobile**: Secure storage para tokens
6. **Environment**: Variables de entorno para secrets

Esta arquitectura proporciona una base sólida para una aplicación moderna multiplataforma, con excelente developer experience, performance optimizada y capacidades de scaling futuras.
````
