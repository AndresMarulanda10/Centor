# Guía de Instalación y Ejecución

Esta guía proporciona instrucciones detalladas para configurar y ejecutar el proyecto Business OS en un entorno de desarrollo local.

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado lo siguiente:

1. **Node.js** (versión 18.0.0 o superior)
2. **Bun** (opcional, pero recomendado para mejor rendimiento)
3. **Git** (para clonar el repositorio)

## Pasos de Instalación

### 1. Clonar el Repositorio

```bash
git clone https://github.com/AndresMarulanda10/Business_OS
cd Business_OS
```

### 2. Instalar Dependencias

Utilizando npm:
```bash
npm install
```

O utilizando Bun (recomendado):
```bash
bun install
```

### 3. Configurar Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```
# Base de datos
DATABASE_URL="file:./dev.db"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="tu-secreto-seguro-aqui"

# Opcional: Proveedores de autenticación
# GITHUB_ID="tu-github-id"
# GITHUB_SECRET="tu-github-secret"
# GOOGLE_ID="tu-google-id"
# GOOGLE_SECRET="tu-google-secret"
```

Reemplaza los valores de ejemplo con tus propias credenciales.

### 4. Configurar la Base de Datos

Inicializa la base de datos SQLite y aplica las migraciones:

```bash
npx prisma migrate dev --name init
```

Este comando:
- Crea la base de datos SQLite si no existe
- Aplica las migraciones basadas en el esquema definido en `prisma/schema.prisma`
- Genera el cliente Prisma

### 5. Generar Datos de Prueba (Opcional)

Si deseas poblar la base de datos con datos de prueba:

```bash
npm run seed
```

o

```bash
bun run seed
```

## Ejecución del Proyecto

### Modo Desarrollo

Para ejecutar el proyecto en modo desarrollo con recarga en caliente:

```bash
npm run dev
```

o

```bash
bun run dev
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000).

### Construcción para Producción

Para construir la aplicación para producción:

```bash
npm run build
```

o

```bash
bun run build
```

### Ejecutar en Modo Producción

Para iniciar la aplicación en modo producción después de construirla:

```bash
npm run start
```

o

```bash
bun run start
```

## Estructura de la Base de Datos

Business OS utiliza Prisma ORM con SQLite para desarrollo. El esquema de la base de datos incluye las siguientes entidades principales:

- **User**: Usuarios del sistema con roles y permisos
- **Task**: Tareas con propiedades como título, descripción, estado, etc.
- **Project**: Proyectos que pueden contener múltiples tareas
- **Comment**: Comentarios asociados a tareas
- **Activity**: Registro de actividades relacionadas con tareas

Puedes explorar la base de datos utilizando Prisma Studio:

```bash
npx prisma studio
```

Esto abrirá una interfaz web en [http://localhost:5555](http://localhost:5555) donde podrás ver y editar los datos.

## Acceso a la Aplicación

Una vez que la aplicación esté en ejecución, puedes acceder a ella a través de tu navegador web:

1. Abre [http://localhost:3000](http://localhost:3000)
2. Inicia sesión con las credenciales predeterminadas:
   - Email: admin@example.com
   - Contraseña: password123
   
   (O registra un nuevo usuario si has configurado la autenticación)

3. Explora las diferentes secciones de la aplicación, incluyendo el módulo de gestión de tareas.

## Solución de Problemas Comunes

### Error al iniciar la aplicación

Si encuentras errores al iniciar la aplicación, verifica:

1. Que todas las dependencias estén instaladas correctamente
2. Que las variables de entorno estén configuradas adecuadamente
3. Que la base de datos esté inicializada

### Error de conexión a la base de datos

Si hay problemas con la conexión a la base de datos:

1. Verifica que la URL de la base de datos en el archivo `.env` sea correcta
2. Asegúrate de que las migraciones se hayan aplicado correctamente
3. Comprueba los permisos del archivo de la base de datos SQLite

### Problemas con Next.js

Si encuentras errores relacionados con Next.js:

1. Limpia la caché de Next.js:
   ```bash
   rm -rf .next
   ```
2. Reinstala las dependencias y vuelve a iniciar la aplicación

## Desarrollo y Pruebas

### Ejecutar Linting

Para verificar y corregir problemas de estilo en el código:

```bash
npm run lint
```

### Estructura de Archivos para Desarrollo

Al desarrollar nuevas características, sigue la estructura de archivos existente:

- Componentes en `/components/[módulo]`
- Páginas en `/app/[ruta]`
- Tipos en `/types` o junto a los componentes relevantes
- API Routes en `/app/api/[recurso]`

## Despliegue

Para desplegar la aplicación en un entorno de producción, se recomienda:

1. Cambiar la base de datos a una solución más robusta como PostgreSQL o MySQL
2. Configurar variables de entorno para producción
3. Utilizar servicios como Vercel o Netlify para el despliegue automatizado

## Recursos Adicionales

- [Documentación de Next.js](https://nextjs.org/docs)
- [Documentación de Prisma](https://www.prisma.io/docs)
- [Documentación de NextAuth.js](https://next-auth.js.org/getting-started/introduction)
- [Documentación de Tailwind CSS](https://tailwindcss.com/docs)
- [Documentación de HeroUI](https://heroui.com/docs)
