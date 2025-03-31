# Tecnologías Utilizadas

## Stack Tecnológico Principal

### Frontend
- **Next.js**: Framework de React que permite renderizado del lado del servidor (SSR), generación estática (SSG) y creación de API Routes.
- **React**: Biblioteca JavaScript para construir interfaces de usuario basadas en componentes.
- **TypeScript**: Superset de JavaScript que añade tipado estático, mejorando la robustez del código y la experiencia de desarrollo.
- **Tailwind CSS**: Framework CSS utilitario para diseño rápido y responsivo.
- **HeroUI**: Biblioteca de componentes UI basada en Tailwind CSS para crear interfaces modernas y accesibles.

### Backend
- **Next.js API Routes**: Endpoints de API integrados en el framework Next.js.
- **Prisma ORM**: ORM (Object-Relational Mapping) moderno para Node.js y TypeScript.
- **SQLite**: Sistema de gestión de bases de datos relacional ligero para desarrollo.

### Autenticación
- **NextAuth.js**: Solución de autenticación completa para aplicaciones Next.js.
- **Bcrypt**: Biblioteca para el hash seguro de contraseñas.

## Herramientas de Desarrollo

- **ESLint**: Herramienta de análisis estático para identificar patrones problemáticos en el código JavaScript/TypeScript.
- **Prettier**: Formateador de código para mantener un estilo consistente.
- **TypeScript**: Proporciona verificación de tipos en tiempo de compilación.
- **Bun**: Entorno de ejecución JavaScript y gestor de paquetes rápido y eficiente.

## Bibliotecas Adicionales

- **UUID**: Generación de identificadores únicos universales.
- **Iconify**: Sistema de iconos con amplia variedad de conjuntos de iconos.
- **Recharts**: Biblioteca de gráficos basada en React para visualización de datos.
- **Framer Motion**: Biblioteca para animaciones en React.
- **clsx**: Utilidad para construir strings de nombres de clase condicionales.
- **next-themes**: Soporte para temas (claro/oscuro) en aplicaciones Next.js.

## Justificación de las Tecnologías Elegidas

### Next.js
Next.js fue elegido como framework principal por varias razones:
- **Arquitectura híbrida**: Permite implementar tanto renderizado del lado del servidor (SSR) como del cliente (CSR).
- **API Routes**: Facilita la creación de endpoints de API sin necesidad de un servidor separado.
- **Enrutamiento basado en archivos**: Simplifica la estructura del proyecto y la navegación.
- **Optimización de rendimiento**: Incluye características como división de código, precarga de enlaces y optimización de imágenes.
- **Ecosistema maduro**: Amplio soporte de la comunidad y documentación extensa.

### React + TypeScript
La combinación de React y TypeScript proporciona:
- **Componentes reutilizables**: Facilita la creación de interfaces modulares.
- **Seguridad de tipos**: Reduce errores en tiempo de ejecución mediante verificación estática.
- **Mejor documentación**: Los tipos sirven como documentación integrada en el código.
- **Refactorización segura**: Facilita los cambios en la base de código.

### Prisma ORM
Prisma fue seleccionado como ORM por:
- **Tipado seguro**: Genera tipos TypeScript basados en el esquema de la base de datos.
- **Migraciones automáticas**: Simplifica la evolución del esquema de la base de datos.
- **Cliente intuitivo**: API declarativa y fácil de usar.
- **Soporte para múltiples bases de datos**: Facilita la migración entre diferentes sistemas de bases de datos.

### Tailwind CSS + HeroUI
Esta combinación fue elegida para el diseño UI porque:
- **Desarrollo rápido**: Permite crear interfaces responsivas con clases utilitarias.
- **Personalización**: Fácil de adaptar a la identidad visual del proyecto.
- **Componentes predefinidos**: HeroUI proporciona componentes accesibles y estilizados.
- **Rendimiento**: Optimiza el CSS final mediante purga de clases no utilizadas.

### NextAuth.js
Se eligió para la autenticación debido a:
- **Integración con Next.js**: Diseñado específicamente para trabajar con Next.js.
- **Múltiples proveedores**: Soporte para OAuth, email/password, y más.
- **Seguridad**: Implementa las mejores prácticas de seguridad.
- **Sesiones JWT**: Manejo eficiente de sesiones de usuario.

### Bun
Se eligió como entorno de ejecución y gestor de paquetes por:
- **Velocidad**: Significativamente más rápido que Node.js y npm/yarn.
- **Compatibilidad**: Compatible con el ecosistema de Node.js.
- **Todo en uno**: Incluye ejecutor, empaquetador y gestor de paquetes.
- **Optimización**: Mejor rendimiento en tiempo de ejecución.
