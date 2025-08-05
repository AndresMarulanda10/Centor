# Guía de Instalación y Configuración

## Prerrequisitos

Antes de comenzar, asegúrate de tener instalado:

- **Bun**: v1.0.0 o superior ([Descargar Bun](https://bun.sh))
- **Node.js**: v18.0.0 o superior (requerido por algunas dependencias)
- **Git**: Para control de versiones
- **PostgreSQL**: v14 o superior para la base de datos
- **iOS Simulator** (macOS) o **Android Studio** (para desarrollo móvil)

## Instalación Inicial

### 1. Clonar el Repositorio

```bash
git clone https://github.com/tu-usuario/centor.git
cd centor
```

### 2. Configurar Bun Workspaces

El proyecto ya está configurado como monorepo. Verifica que el `package.json` raíz contenga:

```json
{
  "private": true,
  "workspaces": ["apps/*", "packages/*"]
}
```

### 3. Instalar Dependencias

```bash
# Instalar todas las dependencias del monorepo
bun install
```

Este comando instalará las dependencias para todas las aplicaciones y paquetes compartidos.

## Configuración de la Base de Datos

### 1. Configurar PostgreSQL

Crea una base de datos PostgreSQL para el proyecto:

```sql
CREATE DATABASE centor_dev;
CREATE USER centor_user WITH PASSWORD 'tu_password_seguro';
GRANT ALL PRIVILEGES ON DATABASE centor_dev TO centor_user;
```

### 2. Variables de Entorno

Crea un archivo `.env` en `apps/web/`:

```env
# Database
DATABASE_URL="postgresql://centor_user:tu_password_seguro@localhost:5432/centor_dev"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="tu_nextauth_secret_muy_seguro"

# OAuth Providers (opcional)
GOOGLE_CLIENT_ID="tu_google_client_id"
GOOGLE_CLIENT_SECRET="tu_google_client_secret"
```

### 3. Configurar Prisma

```bash
# Navegar a la aplicación web
cd apps/web

# Generar el cliente Prisma
bunx prisma generate

# Ejecutar migraciones iniciales
bunx prisma migrate dev --name init

# (Opcional) Poblar la base de datos con datos de prueba
bunx prisma db seed
```

## Configuración de la Aplicación Web

### 1. Configurar Shadcn UI

Shadcn UI ya debe estar configurado, pero verifica la configuración:

```bash
cd apps/web

# Verificar configuración de Shadcn
bunx shadcn@latest init
```

### 2. Configurar Tailwind CSS

Verifica que `tailwind.config.ts` esté configurado correctamente:

```typescript
import type { Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    '../../packages/design/**/*.{ts,tsx}', // Incluir design package
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config
```

## Configuración de la Aplicación Móvil

### 1. Configurar Expo

```bash
# Navegar a la aplicación móvil
cd apps/mobile

# Verificar configuración de Expo
bunx expo install --fix
```

### 2. Configurar Variables de Entorno

Crea un archivo `.env` en `apps/mobile/`:

```env
EXPO_PUBLIC_API_URL="http://localhost:3000/api"
```

### 3. Configurar EAS (opcional para desarrollo local)

```bash
# Instalar EAS CLI globalmente
bun add -g eas-cli

# Login a Expo
bunx eas login

# Configurar EAS Build
bunx eas build:configure
```

## Configuración de Paquetes Compartidos

### 1. Package Logic

Verifica que `packages/logic/package.json` tenga la configuración correcta:

```json
{
  "name": "@centor/logic",
  "version": "1.0.0",
  "main": "index.ts",
  "exports": {
    ".": "./index.ts",
    "./hooks": "./hooks/index.ts",
    "./types": "./types/index.ts",
    "./utils": "./utils/index.ts"
  },
  "dependencies": {
    "react": "^18.0.0",
    "zod": "^3.22.0"
  }
}
```

### 2. Package Design

Configura el paquete de diseño en `packages/design/package.json`:

```json
{
  "name": "@centor/design",
  "version": "1.0.0",
  "main": "index.ts",
  "exports": {
    ".": "./index.ts",
    "./tokens": "./tokens/index.ts",
    "./config": "./config/index.ts"
  },
  "dependencies": {
    "tailwindcss": "^3.4.0"
  }
}
```

## Configuración de Testing

### 1. Jest para Web

Verifica la configuración de Jest en `apps/web/jest.config.js`:

```javascript
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^@centor/(.*)$': '<rootDir>/../../packages/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
}

module.exports = createJestConfig(customJestConfig)
```

### 2. Jest para Móvil

Configura Jest en `apps/mobile/jest.config.js`:

```javascript
module.exports = {
  preset: 'jest-expo',
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  moduleNameMapper: {
    '^@centor/(.*)$': '<rootDir>/../../packages/$1',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(@react-native|expo|@expo|react-native|@testing-library/react-native)/)',
  ],
}
```

## Scripts de Desarrollo

Agrega estos scripts al `package.json` raíz:

```json
{
  "scripts": {
    "dev": "bun run dev:web",
    "dev:web": "cd apps/web && bun run dev",
    "dev:mobile": "cd apps/mobile && bunx expo start",
    "build": "bun run build:web && bun run build:mobile",
    "build:web": "cd apps/web && bun run build",
    "build:mobile": "cd apps/mobile && bunx eas build --platform all",
    "test": "bun run test:web && bun run test:mobile",
    "test:web": "cd apps/web && bun run test",
    "test:mobile": "cd apps/mobile && bun run test",
    "lint": "bun run lint:web && bun run lint:mobile",
    "lint:web": "cd apps/web && bun run lint",
    "lint:mobile": "cd apps/mobile && bun run lint",
    "db:migrate": "cd apps/web && bunx prisma migrate dev",
    "db:generate": "cd apps/web && bunx prisma generate",
    "db:studio": "cd apps/web && bunx prisma studio"
  }
}
```

## Verificación de la Instalación

### 1. Aplicación Web

```bash
# Iniciar la aplicación web
bun run dev:web
```

Visita `http://localhost:3000` para verificar que la aplicación funciona.

### 2. Aplicación Móvil

```bash
# Iniciar Expo
bun run dev:mobile
```

Escanea el código QR con la app Expo Go en tu dispositivo móvil.

### 3. Base de Datos

```bash
# Abrir Prisma Studio
bun run db:studio
```

Verifica que puedes acceder a `http://localhost:5555` y ver las tablas.

### 4. Tests

```bash
# Ejecutar todos los tests
bun run test

# Tests específicos
bun run test:web    # Solo tests web
bun run test:mobile # Solo tests móvil
```

## Solución de Problemas Comunes

### Error: "Module not found @centor/logic"

**Solución**: Asegúrate de que las dependencias están instaladas correctamente:

```bash
bun install
cd apps/web && bun install
cd ../mobile && bun install
```

### Error: "Database connection failed"

**Solución**: Verifica que PostgreSQL esté ejecutándose y las credenciales sean correctas:

```bash
# Verificar conexión
cd apps/web
bunx prisma db push
```

### Error: "Expo Go can't connect"

**Solución**: Asegúrate de que tu dispositivo y computadora están en la misma red WiFi, o usa un túnel:

```bash
cd apps/mobile
bunx expo start --tunnel
```

### Error: "Tailwind classes not working"

**Solución**: Verifica que la configuración de Tailwind incluya los paquetes compartidos:

```typescript
// En tailwind.config.ts
content: [
  './app/**/*.{js,ts,jsx,tsx}',
  '../../packages/**/*.{js,ts,jsx,tsx}', // Importante
]
```

## Próximos Pasos

Una vez completada la instalación:

1. Lee la [guía de desarrollo](./development.md)
2. Revisa la [arquitectura del sistema](./architecture.md)
3. Explora las [decisiones arquitectónicas](./architectural-decisions.md)
4. Configura el [deployment y CI/CD](./deployment.md)

## Soporte

Si encuentras problemas durante la instalación:

1. Revisa los logs de error completos
2. Verifica que todas las versiones de las herramientas sean correctas
3. Consulta la documentación oficial de cada herramienta
4. Abre un issue en el repositorio del proyecto

---

¡La instalación está completa! Ahora puedes comenzar a desarrollar en el monorepo Centor.
