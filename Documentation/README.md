# Centor - Documentación

## Introducción

Centor es una plataforma empresarial multiplataforma desarrollada como monorepo moderno que integra aplicaciones web y móvil para una gestión de negocios integral y unificada. El proyecto implementa Next.js 15+ con App Router para la aplicación web, Expo para las aplicaciones móviles iOS y Android, y Bun Workspaces para la gestión eficiente del monorepo, manteniendo una arquitectura limpia y modular sin la complejidad adicional de Turborepo.

## Índice

1. [Arquitectura del Sistema](./architecture.md)
2. [Tecnologías Utilizadas](./technologies.md)
3. [Justificación de Decisiones Arquitectónicas](./architectural-decisions.md)
4. [Guía de Instalación y Configuración](./installation.md)
5. [Desarrollo y Testing](./development.md)
6. [Debugging y Solución de Problemas](./debugging.md)
7. [Deployment y CI/CD](./deployment.md)
8. [Estado Actual y Roadmap](./roadmap.md)
9. [Guía de Contribución](./contributing.md)

## Objetivo del Proyecto

El objetivo principal de Centor es proporcionar una plataforma integral multiplataforma para la gestión empresarial, implementando las mejores prácticas de desarrollo moderno con:

- **Monorepo con código compartido** entre aplicaciones web y móvil para maximizar la reutilización
- **Arquitectura moderna** basada en Next.js 15+ App Router y Expo para interfaces de alta calidad
- **Base de datos escalable** con PostgreSQL y Prisma ORM para gestión de datos robusta
- **Testing unificado** con Jest para todas las plataformas garantizando calidad de código
- **CI/CD automatizado** con GitHub Actions para integración y despliegue continuos

## Características Principales

### Aplicación Web (Next.js 15+)
- **App Router**: Arquitectura moderna con Server Components y layouts anidados
- **Shadcn UI**: Sistema de componentes altamente personalizable basado en Radix UI
- **Tailwind CSS**: Diseño responsivo y consistente con utilidades de estilo
- **API Routes**: Backend integrado para servicios y endpoints de datos
- **Server Actions**: Mutaciones del servidor para operaciones de datos seguras
### Aplicación Móvil (Expo)
- **React Native**: Framework nativo para iOS y Android con una sola base de código
- **Expo Router**: Sistema de navegación declarativo basado en archivos
- **Offline Support**: Funcionalidad sin conexión con sincronización inteligente
- **Push Notifications**: Sistema integrado de notificaciones en tiempo real
- **Expo SDK**: Acceso a APIs nativas y servicios móviles con mínima configuración

### Paquetes Compartidos
- **@centor/logic**: Hooks, servicios y lógica de negocio compartida entre plataformas
- **@centor/design**: Sistema de diseño unificado con tokens compartidos para web y móvil
- **Type Safety**: TypeScript estricto para todas las aplicaciones y paquetes
- **API Clients**: Servicios compartidos para comunicación con backends

## Estructura del Monorepo

```
centor/
├── .github/              # Configuración de GitHub Actions y workflows CI/CD
├── package.json          # Configuración de Bun Workspaces y scripts centralizados
├── bun.lock              # Lock file único para todo el monorepo
├── apps/
│   ├── web/              # Aplicación web Next.js 15+
│   │   ├── app/          # App Router con Server y Client Components
│   │   ├── components/   # Componentes UI basados en Shadcn
│   │   ├── lib/          # Utilidades específicas para web
│   │   └── __tests__/    # Tests unitarios e integración
│   └── mobile/           # Aplicación móvil Expo
│       ├── app/          # Expo Router para navegación
│       ├── components/   # Componentes React Native
│       └── lib/          # Utilidades específicas para móvil
└── packages/
    ├── logic/            # Lógica de negocio compartida
    │   ├── src/          # Código fuente compartido
    │   └── __tests__/    # Tests unitarios
    └── design/           # Tokens de diseño y sistema de diseño
        ├── src/          # Componentes y tokens compartidos
        └── __tests__/    # Tests unitarios
```
    │   ├── hooks/        # Custom hooks
    │   ├── types/        # TypeScript types
    │   ├── utils/        # Utilidades compartidas
    │   └── api/          # API clients
    └── design/           # Design system compartido
        ├── tokens/       # Design tokens
        ├── config/       # Tailwind config
        └── assets/       # Iconos, imágenes, etc.
```

## Stack Tecnológico

### Frontend
- **Next.js 15+**: Framework React con App Router y Server Components
- **Expo SDK**: Plataforma para desarrollo iOS/Android con React Native
- **Shadcn UI**: Componentes UI personalizables para la web
- **Tailwind CSS**: Framework CSS utilitario para diseño consistente
- **React Native**: Desarrollo nativo para aplicaciones móviles
- **TypeScript**: Tipado estático para mejor calidad de código

### Backend
- **Next.js API Routes**: Backend integrado para la aplicación web
- **Prisma ORM**: ORM moderno con migraciones y cliente tipado
- **PostgreSQL**: Base de datos relacional robusta y escalable
- **NextAuth.js**: Sistema de autenticación para Next.js
- **Zod**: Validación de esquemas con inferencia de tipos

### DevOps & Tools
- **Bun**: Runtime y package manager rápido con soporte nativo de workspaces
- **Jest**: Framework de testing unificado para todas las plataformas
- **GitHub Actions**: Automatización de CI/CD para testing y deployment
- **Vercel**: Plataforma para despliegue de aplicaciones web
- **Expo EAS**: Servicio para build y distribución de aplicaciones móviles

## Principios de Desarrollo

- **Código Compartido**: Maximizar la reutilización de código entre plataformas
- **Type Safety**: TypeScript estricto en todo el monorepo
- **Test-Driven Development**: Tests para lógica de negocio y componentes UI
- **Modularidad**: Arquitectura modular para facilitar el mantenimiento
- **Consistencia**: Convenciones y estándares unificados en todo el proyecto

## Casos de Uso

Centor está diseñado para cubrir las necesidades de gestión empresarial moderna:

- **Gestión de Tareas y Proyectos**: Flujos de trabajo eficientes y organizados
- **Colaboración en Equipo**: Trabajo sincronizado entre miembros del equipo
- **Reporting y Analytics**: Métricas e insights para la toma de decisiones
- **Experiencia Multiplataforma**: UX consistente en web, iOS y Android
- **Sincronización en Tiempo Real**: Datos actualizados a través de dispositivos

## Ventajas de la Arquitectura

1. **Código Compartido**: Reutilización de 40-60% entre plataformas, reduciendo duplicación
2. **Desarrollo Paralelo**: Equipos de web y móvil pueden trabajar simultáneamente
3. **Consistencia**: Design system y lógica unificados para experiencia coherente
4. **Performance**: Optimizaciones específicas por plataforma (SSR para web, código nativo para móvil)
5. **Escalabilidad**: Fácil integración de nuevas aplicaciones o servicios
6. **Developer Experience**: Hot reloading, tipado estricto y herramientas modernas

## Estado Actual

El proyecto está actualmente en fase de desarrollo activo con:
- Estructura del monorepo configurada con Bun Workspaces
- Aplicaciones web (Next.js) y móvil (Expo) inicializadas
- Paquetes compartidos de lógica y diseño establecidos
- Testing unitario configurado con Jest para todas las plataformas
- CI/CD básico implementado con GitHub Actions

Para más detalles sobre el estado actual y próximos pasos, consulte el documento de [tareas](./tasks.md).

## Primeros Pasos

Para empezar a trabajar con el proyecto:

1. **Configuración inicial**: Sigue la [guía de instalación](./installation.md)
2. **Desarrollo local**: Revisa [desarrollo y testing](./development.md)
3. **Arquitectura**: Comprende la [arquitectura del sistema](./architecture.md)
4. **Deployment**: Configura [CI/CD y deployment](./deployment.md)

---

Documentación para Centor - Plataforma empresarial moderna con arquitectura monorepo.
