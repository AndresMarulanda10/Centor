# Tecnologías Utilizadas

## Stack Tecnológico Principal

### Frontend Web
- **Next.js 15+**: Framework React con App Router que proporciona Server Components, renderizado del lado del servidor (SSR), y generación estática (SSG).
- **React 19**: Biblioteca JavaScript moderna para construir interfaces de usuario basadas en componentes.
- **TypeScript 5**: Superset de JavaScript con tipado estático para desarrollo más robusto y mejor experiencia de desarrollo.
- **Tailwind CSS**: Framework CSS utilitario que facilita el diseño rápido, responsivo y consistente.
- **Shadcn UI**: Colección de componentes UI reutilizables basados en Radix UI y Tailwind CSS, diseñados para ser accesibles y altamente personalizables.

### Frontend Móvil
- **Expo SDK**: Plataforma para desarrollo React Native que simplifica el desarrollo para iOS y Android.
- **React Native**: Framework para desarrollo de aplicaciones móviles nativas utilizando React.
- **Expo Router**: Sistema de navegación basado en archivos, similar a Next.js App Router, para aplicaciones Expo.
- **React Native Reanimated**: Biblioteca para animaciones fluidas en React Native.
- **Expo EAS**: Servicios para build, submit y updates de aplicaciones Expo.

### Backend
- **Next.js API Routes**: Endpoints de API integrados en Next.js, proporcionando un backend serverless.
- **Prisma ORM**: ORM (Object-Relational Mapping) moderno para Node.js y TypeScript con generación automática de cliente tipado.
- **PostgreSQL**: Sistema de gestión de bases de datos relacional robusto y escalable para entornos de producción.
- **NextAuth.js**: Solución completa de autenticación para aplicaciones Next.js con soporte para múltiples proveedores.
- **Zod**: Biblioteca de validación de esquemas con inferencia de tipos para TypeScript.

### Entorno de Desarrollo
- **Bun**: Runtime JavaScript ultrarrápido y gestor de paquetes con soporte nativo para workspaces y mejor rendimiento que npm/yarn.
- **TypeScript**: Usado en modo estricto en todo el proyecto para garantizar la seguridad de tipos.
- **ESLint**: Herramienta de análisis estático para identificar y corregir patrones problemáticos.
- **Prettier**: Formateador de código opinado para mantener un estilo consistente.
- **Bun Workspaces**: Sistema de monorepo nativo que permite gestionar múltiples paquetes sin herramientas adicionales como Turborepo.

## Testing

- **Jest**: Framework de testing unificado para todo el monorepo.
- **@testing-library/react**: Utilities para testing de componentes React con enfoque en comportamiento del usuario.
- **@testing-library/react-native**: Adaptación de Testing Library para componentes React Native.
- **jest-expo**: Preset de Jest configurado específicamente para proyectos Expo.
- **msw**: Biblioteca para mockear requests HTTP durante los tests.

## Arquitectura de Monorepo

### Estructura del Proyecto
```
centor/
├── .github/           # GitHub Actions y workflows CI/CD
├── apps/
│   ├── web/           # Aplicación Next.js 15+ (App Router, Shadcn UI)
│   │   ├── app/       # Estructura de App Router
│   │   ├── components/# Componentes UI específicos de web
│   │   └── __tests__/ # Tests para aplicación web
│   └── mobile/        # Aplicación Expo (React Native)
│       ├── app/       # Estructura de Expo Router
│       ├── components/# Componentes específicos de móvil
│       └── __tests__/ # Tests para aplicación móvil
└── packages/
    ├── logic/         # Lógica de negocio compartida
    │   ├── src/       # Hooks, utils, types, etc.
    │   └── __tests__/ # Tests para lógica compartida
    └── design/        # Sistema de diseño compartido
        ├── src/       # Tokens, temas y componentes base
        └── __tests__/ # Tests para componentes compartidos
```

### Gestión de Dependencias
- **Bun Workspaces**: Sistema nativo para compartir y gestionar dependencias entre aplicaciones.
- **Workspace Protocol**: Referencias entre paquetes con `workspace:*` para sincronización de versiones.
- **package.json en raíz**: Scripts centralizados accesibles desde cualquier parte del monorepo.
- **Hoisting**: Deduplicación de dependencias para optimizar el tamaño del `node_modules`.

## Bibliotecas y Herramientas Adicionales

### Frontend Web
- **SWR**: Biblioteca para data fetching con caché, revalidación y focus tracking.
- **Radix UI**: Primitivos de UI accesibles y sin estilos que forman la base de Shadcn UI.
- **Class Variance Authority (CVA)**: Utilidad para crear variantes de componentes tipados.
- **clsx/cn**: Utilidades para construir nombres de clase condicionales de forma elegante.
- **next-themes**: Soporte para temas (claro/oscuro) en aplicaciones Next.js.
- **Lucide Icons**: Conjunto de iconos SVG consistentes y personalizables.

### Frontend Móvil
- **React Native Gesture Handler**: API unificada para gestos táctiles.
- **Expo Image**: Componente optimizado para manejo de imágenes en React Native.
- **Expo Secure Store**: Almacenamiento seguro para datos sensibles.
- **AsyncStorage**: Almacenamiento persistente simple para datos no sensibles.
- **Expo Status Bar**: Control de la barra de estado en iOS y Android.

### CI/CD y DevOps
- **GitHub Actions**: Automatización de CI/CD para testing y despliegue.
- **Vercel**: Plataforma para despliegue de aplicaciones Next.js.
- **EAS Build**: Servicio de Expo para construir aplicaciones nativas.
- **EAS Submit**: Herramienta para enviar aplicaciones a App Store y Play Store.
- **EAS Update**: Actualizaciones over-the-air para aplicaciones Expo.

## Justificación de Tecnologías Clave

### Next.js 15+ con App Router
- **Server Components**: Permite renderizar componentes en el servidor para mejor performance y SEO.
- **Streaming**: Capacidad de enviar partes de la UI al cliente a medida que están listas.
- **Server Actions**: Permite ejecutar mutaciones directamente en el servidor.
- **API Routes**: Backend integrado sin necesidad de servidor separado.
- **Escalabilidad**: Arquitectura preparada para aplicaciones complejas.

### Bun como Runtime y Package Manager
- **Velocidad**: Significativamente más rápido que Node.js y npm/yarn.
- **Compatibilidad**: Compatible con el ecosistema de Node.js.
- **Workspaces**: Soporte nativo para monorepos sin herramientas adicionales.
- **Bundler integrado**: Incluye un bundler rápido para build y transpilación.
- **Testing**: Framework de testing integrado compatible con Jest.

### Expo para Desarrollo Móvil
- **Desarrollo Rápido**: Hot reloading y herramientas de desarrollo avanzadas.
- **Multiplataforma**: Una sola base de código para iOS y Android.
- **EAS Services**: Solución completa para build, distribución y actualizaciones.
- **Expo Router**: Navegación declarativa similar a Next.js para consistencia.
- **Acceso Nativo**: APIs para acceder a funcionalidades nativas del dispositivo.

### Jest para Testing
- **Unificación**: Framework de testing compatible tanto con web como con móvil.
- **Integraciones**: Excelente soporte con @testing-library para ambas plataformas.
- **Mocking**: Capacidades avanzadas para mock de componentes y servicios.
- **Snapshots**: Soporte para testing de snapshots para UI.
- **Paralelización**: Ejecución de tests en paralelo para mejor rendimiento.

### Desafíos y Soluciones en la Implementación

#### Testing de Server Components
- **Desafío**: Los Server Components de Next.js no son compatibles directamente con Jest.
- **Solución**: Uso de mocks adecuados y configuración especial para renderizar estos componentes.
- **Técnicas**: Uso de findByRole en lugar de getByRole para manejar la asincronía de renderizado.

#### Gestión de Monorepo
- **Desafío**: Compartir código entre apps sin duplicación ni complejidad innecesaria.
- **Solución**: Bun Workspaces ofrece una alternativa más simple que Turborepo.
- **Ventajas**: Menor configuración, mejor performance y compatibilidad total con Node.js.

---

Esta lista de tecnologías se revisa y actualiza regularmente para asegurar que el proyecto utiliza las mejores herramientas disponibles para sus necesidades.
Next.js 15+ fue elegido como framework principal para la aplicación web por varias razones:
- **App Router**: Nueva arquitectura que permite layouts anidados y mejor organización del código.
- **Server Components**: Mejora el rendimiento al renderizar componentes en el servidor.
- **API Routes**: Facilita la creación de endpoints de API sin necesidad de un servidor separado.
- **Optimización de rendimiento**: Incluye características como división de código, precarga de enlaces y optimización de imágenes.
- **TypeScript nativo**: Soporte completo para TypeScript sin configuración adicional.

### Expo para Desarrollo Móvil
Expo fue seleccionado para el desarrollo móvil por:
- **Desarrollo unificado**: Permite desarrollar para iOS y Android desde una sola base de código.
- **Expo Router**: Sistema de enrutamiento basado en archivos similar a Next.js.
- **EAS Services**: Servicios integrados para build, distribución y actualizaciones OTA.
- **Desarrollo rápido**: Herramientas como Expo Go facilitan el testing en dispositivos reales.
- **TypeScript nativo**: Soporte completo para TypeScript desde el inicio.

### React + TypeScript
La combinación de React y TypeScript proporciona:
- **Componentes reutilizables**: Facilita la creación de interfaces modulares tanto en web como móvil.
- **Seguridad de tipos**: Reduce errores en tiempo de ejecución mediante verificación estática.
- **Mejor documentación**: Los tipos sirven como documentación integrada en el código.
- **Refactorización segura**: Facilita los cambios en la base de código compartida.

### Prisma ORM con PostgreSQL
Prisma fue seleccionado como ORM por:
- **Tipado seguro**: Genera tipos TypeScript basados en el esquema de la base de datos.
- **Migraciones automáticas**: Simplifica la evolución del esquema de la base de datos.
- **Cliente intuitivo**: API declarativa y fácil de usar.
- **PostgreSQL**: Base de datos robusta y escalable para aplicaciones de producción.

### Shadcn UI en lugar de HeroUI
Se migró a Shadcn UI por:
- **Personalización completa**: Componentes que se copian al proyecto y pueden modificarse libremente.
- **Basado en Radix UI**: Primitivos accesibles y probados en batalla.
- **Integración con Tailwind**: Diseñado específicamente para trabajar con Tailwind CSS.
- **TypeScript-first**: Diseñado desde el inicio para TypeScript con excelente tipado.
- **Comunidad activa**: Mayor adopción y mejor documentación.

### Jest como Framework de Testing Unificado
Jest fue elegido para testing en ambas plataformas porque:
- **Unificación**: Un solo framework para web (Next.js) y móvil (Expo).
- **Testing Library**: Excelente integración con @testing-library para ambas plataformas.
- **Configuración sencilla**: Presets oficiales tanto para Next.js como para Expo.
- **Mocking avanzado**: Capacidades robustas de mocking para APIs y módulos.

### Bun Workspaces sin Turborepo
Se eligió Bun Workspaces en lugar de Turborepo por:
- **Simplicidad**: Configuración más sencilla sin la complejidad adicional de Turborepo.
- **Velocidad**: Bun es significativamente más rápido que npm/yarn para instalación de dependencias.
- **Workspace Protocol**: Soporte nativo para referencias entre paquetes.
- **Catalogs**: Sistema integrado para gestión de versiones de dependencias.
- **Compatibilidad**: Totalmente compatible con el ecosistema Node.js existente.
