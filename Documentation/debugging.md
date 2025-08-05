# Debugging y Solución de Problemas

Este documento proporciona guías para resolver problemas comunes encontrados durante el desarrollo del proyecto Centor.

## Testing con Next.js 15+ y Server Components

### Problema: Componentes de Server No Renderizándose en Tests

**Síntomas:**
- Error "TestingLibraryElementError: Unable to find an accessible element"
- Cuerpo del DOM vacío (`<body><div /></body>`) en los logs de error
- Advertencias de "An update to Root inside a test was not wrapped in act(...)"

**Solución:**

1. **Enfoque Asincrónico**: Usa `findByRole` en lugar de `getByRole`:

```tsx
// ❌ Enfoque síncrono (problemático)
it('renders a heading', () => {
  render(<Home />)
  const heading = screen.getByRole('heading', { name: /título/i })
  expect(heading).toBeInTheDocument()
})

// ✅ Enfoque asincrónico (recomendado)
it('renders a heading', async () => {
  render(<Home />)
  const heading = await screen.findByRole('heading', { name: /título/i })
  expect(heading).toBeInTheDocument()
})
```

2. **Mock de Server Components**: Crea mocks para componentes de servidor:

```tsx
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn()
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams()
}))
```

3. **Wrapper para Jest**: Crea un wrapper personalizado para proporcionar el contexto necesario:

```tsx
// test-utils.tsx
import { render } from '@testing-library/react'

const AllTheProviders = ({ children }) => {
  return (
    <ThemeProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </ThemeProvider>
  )
}

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'
export { customRender as render }
```

4. **Jest Config Optimizado**:

```js
// jest.config.js
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(@swc|next|react-dnd|dnd-core|@react-dnd)/)',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
}

module.exports = createJestConfig(customJestConfig)
```

## Problemas de Expo CLI

### Problema: CLI Legado vs. Nueva CLI

**Síntomas:**
- Warning "The global expo-cli package has been deprecated"
- Error "expo-cli does not support Node +17"
- Error "ExpoMetroConfig.loadAsync is not a function"

**Soluciones:**

1. **Desinstalar CLI Global**:
```bash
npm uninstall -g expo-cli
# o con bun
bun remove -g expo-cli
```

2. **Usar CLI Local**:
```bash
npx expo start
# Para iOS
npx expo start --ios
# Para Android
npx expo start --android
```

3. **Arreglar Dependencias Incompatibles**:
```bash
npx expo doctor --fix-dependencies
```

## Problemas con Bun Workspaces

### Problema: Dependencias No Resueltas entre Workspaces

**Síntomas:**
- Error "Cannot find module '@centor/logic'"
- Problemas de build con referencias entre paquetes

**Soluciones:**

1. **Verificar Configuración de Workspaces**:
```json
// package.json en la raíz
{
  "workspaces": ["apps/*", "packages/*"]
}
```

2. **Usar Protocolo Workspace**:
```json
// packages/design/package.json
{
  "dependencies": {
    "@centor/logic": "workspace:*"
  }
}
```

3. **Actualizar Dependencias**:
```bash
bun install
```

4. **Configuración de TypeScript**:
```json
// tsconfig.json en la raíz
{
  "compilerOptions": {
    "paths": {
      "@centor/logic/*": ["./packages/logic/src/*"],
      "@centor/design/*": ["./packages/design/src/*"]
    }
  }
}
```

## Problemas de CI/CD

### Problema: Fallos en GitHub Actions

**Síntomas:**
- Tests fallando en CI pero pasando localmente
- Errores de build en deploy automático

**Soluciones:**

1. **Cacheo de Dependencias**:
```yaml
- name: Cache dependencies
  uses: actions/cache@v3
  with:
    path: '**/node_modules'
    key: ${{ runner.os }}-modules-${{ hashFiles('**/bun.lock') }}
```

2. **Verificar Versiones**:
```yaml
- name: Setup Bun
  uses: oven-sh/setup-bun@v1
  with:
    bun-version: 'latest'
```

3. **Variables de Entorno**:
```yaml
- name: Run tests
  env:
    NODE_ENV: test
    DATABASE_URL: ${{ secrets.TEST_DATABASE_URL }}
  run: bun test
```

## Buenas Prácticas para Debugging

1. **Logs Estructurados**:
```tsx
console.log(JSON.stringify({
  component: 'TaskList',
  action: 'fetch',
  data: tasks,
  error
}, null, 2))
```

2. **Testing Incremental**:
```bash
# Test específico
bun test --testPathPattern=TaskList
# Test con debug
bun test --testPathPattern=TaskList --debug
```

3. **Herramientas DevTools**:
   - React DevTools para componentes
   - Redux DevTools para estado (si aplica)
   - React Query DevTools para fetching de datos
   - Prisma Studio para visualizar la base de datos

4. **Error Boundaries**:
```tsx
<ErrorBoundary fallback={<ErrorFallback />}>
  <TaskList />
</ErrorBoundary>
```

5. **Environments de Testing**:
   - Mantener un environment de staging para pruebas
   - Usar bases de datos locales para desarrollo
   - Implementar feature flags para releases incrementales

---

Este documento se actualizará continuamente conforme se identifiquen y resuelvan nuevos problemas en el desarrollo.
