# Deployment y CI/CD

## Estrategia de Deployment

Centor utiliza una estrategia de deployment moderna con CI/CD automatizado:

- **Aplicación Web**: Vercel para hosting y deployment automático
- **Aplicación Móvil**: EAS (Expo Application Services) para builds y distribución
- **Base de Datos**: PostgreSQL en producción (Railway, Supabase, o AWS RDS)
- **CI/CD**: GitHub Actions para testing, building y deployment

## Configuración de CI/CD

### GitHub Actions Workflow

Crea `.github/workflows/ci.yml`:

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest

    services:
      postgres:
        image: postgres:14
        env:
          POSTGRES_PASSWORD: postgres
          POSTGRES_DB: centor_test
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 5432:5432

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Bun
        uses: oven-sh/setup-bun@v1
        with:
          bun-version: latest

      - name: Install dependencies
        run: bun install

      - name: Setup database
        run: |
          cd apps/web
          bunx prisma migrate deploy
        env:
          DATABASE_URL: postgresql://postgres:postgres@localhost:5432/centor_test

      - name: Run linting
        run: bun run lint

      - name: Run type checking
        run: bun run type-check

      - name: Run tests
        run: bun run test:ci
        env:
          DATABASE_URL: postgresql://postgres:postgres@localhost:5432/centor_test

      - name: Build web app
        run: |
          cd apps/web
          bun run build
        env:
          DATABASE_URL: postgresql://postgres:postgres@localhost:5432/centor_test
          NEXTAUTH_SECRET: test-secret
          NEXTAUTH_URL: http://localhost:3000

      - name: Build mobile app (if changed)
        if: contains(github.event.head_commit.modified, 'apps/mobile/')
        run: |
          cd apps/mobile
          bunx expo export

  deploy-web:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'

    steps:
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          working-directory: apps/web

  build-mobile:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main' && contains(github.event.head_commit.modified, 'apps/mobile/')

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Bun
        uses: oven-sh/setup-bun@v1

      - name: Setup EAS
        uses: expo/expo-github-action@v8
        with:
          expo-version: latest
          eas-version: latest
          token: ${{ secrets.EXPO_TOKEN }}

      - name: Install dependencies
        run: bun install

      - name: Build mobile app
        run: |
          cd apps/mobile
          eas build --platform all --non-interactive
```

### Configuración de Secrets

En GitHub, configura estos secrets (Settings > Secrets and variables > Actions):

```
# Vercel
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=your_org_id
VERCEL_PROJECT_ID=your_project_id

# Expo
EXPO_TOKEN=your_expo_token

# Database (production)
DATABASE_URL=your_production_database_url

# NextAuth
NEXTAUTH_SECRET=your_production_secret
NEXTAUTH_URL=https://your-domain.vercel.app
```

## Deployment Web (Vercel)

### 1. Configuración de Vercel

Crea `apps/web/vercel.json`:

```json
{
  "buildCommand": "cd ../.. && bun run build:web",
  "installCommand": "cd ../.. && bun install",
  "framework": "nextjs",
  "env": {
    "DATABASE_URL": "@database-url",
    "NEXTAUTH_SECRET": "@nextauth-secret",
    "NEXTAUTH_URL": "@nextauth-url"
  },
  "build": {
    "env": {
      "DATABASE_URL": "@database-url"
    }
  },
  "functions": {
    "app/api/**/*.ts": {
      "maxDuration": 30
    }
  }
}
```

### 2. Configuración de Build

En `apps/web/package.json`:

```json
{
  "scripts": {
    "build": "next build",
    "start": "next start",
    "postbuild": "bunx prisma generate"
  }
}
```

### 3. Environment Variables en Vercel

```bash
# Via Vercel CLI
vercel env add DATABASE_URL production
vercel env add NEXTAUTH_SECRET production
vercel env add NEXTAUTH_URL production

# O via dashboard de Vercel
# https://vercel.com/dashboard > Project > Settings > Environment Variables
```

### 4. Deploy Manual

```bash
# Instalar Vercel CLI
bun add -g vercel

# Login
vercel login

# Deploy desde apps/web
cd apps/web
vercel --prod
```

## Deployment Móvil (EAS)

### 1. Configuración de EAS

Crea `apps/mobile/eas.json`:

```json
{
  "cli": {
    "version": ">= 5.0.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "ios": {
        "resourceClass": "m-medium"
      }
    },
    "preview": {
      "distribution": "internal",
      "ios": {
        "resourceClass": "m-medium"
      }
    },
    "production": {
      "ios": {
        "resourceClass": "m-medium"
      }
    }
  },
  "submit": {
    "production": {
      "ios": {
        "appleId": "your-apple-id@example.com",
        "ascAppId": "your-app-store-connect-app-id",
        "appleTeamId": "your-apple-team-id"
      },
      "android": {
        "serviceAccountKeyPath": "../path/to/api-key.json",
        "track": "production"
      }
    }
  }
}
```

### 2. App Configuration

Actualiza `apps/mobile/app.json`:

```json
{
  "expo": {
    "name": "Centor",
    "slug": "centor",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "assetBundlePatterns": ["**/*"],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.yourcompany.centor",
      "buildNumber": "1"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "package": "com.yourcompany.centor",
      "versionCode": 1
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "extra": {
      "eas": {
        "projectId": "your-eas-project-id"
      }
    },
    "plugins": [
      "expo-router"
    ]
  }
}
```

### 3. Build Commands

```bash
cd apps/mobile

# Build para desarrollo
eas build --profile development --platform ios
eas build --profile development --platform android

# Build para preview/testing
eas build --profile preview --platform all

# Build para producción
eas build --profile production --platform all

# Submit a app stores
eas submit --platform ios
eas submit --platform android
```

### 4. OTA Updates

```bash
# Actualización OTA (sin rebuild)
cd apps/mobile

# Update para preview
eas update --branch preview

# Update para producción
eas update --branch production
```

## Base de Datos en Producción

### Opción 1: Railway

```bash
# 1. Crear proyecto en Railway
railway login
railway init

# 2. Agregar PostgreSQL
railway add postgresql

# 3. Configurar variables de entorno
railway variables set DATABASE_URL=postgresql://...
```

### Opción 2: Supabase

```bash
# 1. Crear proyecto en Supabase Dashboard
# 2. Obtener connection string
# 3. Configurar en Vercel y GitHub Secrets
```

### Opción 3: Vercel Postgres

```bash
# 1. Instalar Vercel Postgres en tu proyecto
# 2. Usar @vercel/postgres en tu código
# 3. Connection string automático
```

### Migraciones en Producción

```bash
# Agregar step en CI/CD
- name: Run database migrations
  run: |
    cd apps/web
    bunx prisma migrate deploy
  env:
    DATABASE_URL: ${{ secrets.DATABASE_URL }}
```

## Monitoring y Analytics

### 1. Vercel Analytics

```bash
cd apps/web
bun add @vercel/analytics

# En layout.tsx
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

### 2. Sentry para Error Tracking

```bash
# Web
cd apps/web
bun add @sentry/nextjs

# Mobile
cd apps/mobile
bunx expo install @sentry/react-native
```

Configuración de Sentry:

```javascript
// apps/web/sentry.client.config.js
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
})

// apps/mobile/App.tsx
import * as Sentry from '@sentry/react-native'

Sentry.init({
  dsn: 'your-dsn',
})
```

### 3. Uptime Monitoring

- **Uptime Robot**: Para monitoring básico
- **Better Uptime**: Para monitoring avanzado
- **Vercel Analytics**: Para web vitals

## Environments

### Development
```bash
# Local development
bun run dev:web     # http://localhost:3000
bun run dev:mobile  # Expo Go app
```

### Staging
```bash
# Preview deployments
vercel --preview    # Preview URL
eas build --profile preview
```

### Production
```bash
# Production deployments
vercel --prod       # Production domain
eas build --profile production
eas submit
```

## Rollback Strategy

### Web (Vercel)
```bash
# Via dashboard: Deployments > Previous deployment > Promote to Production
# Via CLI:
vercel rollback [deployment-url]
```

### Mobile (EAS)
```bash
# OTA rollback
eas update --branch production --message "Rollback to previous version"

# Binary rollback (app stores)
# Requires manual submission of previous build
```

## Performance Optimization

### Web Optimization

1. **Bundle Analysis**
```bash
cd apps/web
ANALYZE=true bun run build
```

2. **Image Optimization**
```typescript
import Image from 'next/image'

<Image
  src="/image.jpg"
  alt="Description"
  width={500}
  height={300}
  priority={true} // For above-the-fold images
/>
```

3. **Code Splitting**
```typescript
import dynamic from 'next/dynamic'

const DynamicComponent = dynamic(() => import('./Component'), {
  ssr: false,
  loading: () => <p>Loading...</p>
})
```

### Mobile Optimization

1. **Bundle Size Analysis**
```bash
cd apps/mobile
bunx expo bundle-size
```

2. **Image Optimization**
```typescript
import { Image } from 'expo-image'

<Image
  source={{ uri: 'https://example.com/image.jpg' }}
  style={{ width: 200, height: 200 }}
  placeholder="blurhash-placeholder"
  transition={1000}
/>
```

## Security Checklist

### Pre-deployment Security

- [ ] Environment variables no están hardcodeadas
- [ ] Secrets están en GitHub Secrets / Vercel Environment Variables
- [ ] Database usa conexiones SSL
- [ ] API routes validan entrada con Zod
- [ ] Authentication está implementada correctamente
- [ ] CORS está configurado apropiadamente
- [ ] Rate limiting está habilitado
- [ ] Headers de seguridad están configurados

### Post-deployment Security

- [ ] Monitor logs regularmente
- [ ] Configurar alertas para errores
- [ ] Revisar dependencias vulnerables
- [ ] Backup de base de datos configurado
- [ ] SSL/TLS certificados válidos

## Troubleshooting Deployment

### Vercel Issues

```bash
# Check build logs
vercel logs [deployment-url]

# Local build test
cd apps/web
bun run build
```

### EAS Issues

```bash
# Check build logs
eas build:list
eas build:view [build-id]

# Local build test
cd apps/mobile
bunx expo export
```

### Database Issues

```bash
# Test connection
cd apps/web
bunx prisma db push --skip-generate

# Check migrations
bunx prisma migrate status
```

## Cost Optimization

### Vercel
- Usa ISR (Incremental Static Regeneration) para páginas estáticas
- Optimiza function duration
- Monitor bandwidth usage

### EAS
- Usa resource class apropiada (m-medium vs m-large)
- Build solo cuando sea necesario
- Usa OTA updates para cambios menores

### Database
- Monitor connection pooling
- Usa read replicas si es necesario
- Optimize queries y índices

---

Esta guía cubre todos los aspectos del deployment y CI/CD para el monorepo Centor. Para más detalles sobre desarrollo, consulta [development.md](./development.md).
