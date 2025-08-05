# Guía de Contribución

## Introducción

¡Gracias por tu interés en contribuir a Centor! Este documento proporciona las directrices y mejores prácticas para contribuir al proyecto de manera efectiva. Al seguir estas pautas, nos ayudas a mantener un código de alta calidad y un proceso de desarrollo eficiente.

## Configuración del Entorno de Desarrollo

Antes de empezar, asegúrate de tener configurado tu entorno siguiendo las instrucciones en la [guía de instalación](./installation.md).

## Flujo de Trabajo con Git

Seguimos un flujo de trabajo basado en Git Flow adaptado a nuestras necesidades:

### Branches

- **`main`**: Código de producción estable
- **`develop`**: Branch de integración principal para desarrollo
- **`feature/*`**: Nuevas características (ej: `feature/auth-system`)
- **`bugfix/*`**: Correcciones de bugs (ej: `bugfix/login-error`)
- **`release/*`**: Preparación para releases (ej: `release/1.0.0`)
- **`hotfix/*`**: Correcciones urgentes para producción (ej: `hotfix/critical-security`)

### Proceso para Contribuir

1. **Crear Issue**: Describe la característica o bug en el issue tracker
2. **Crear Branch**: Crea una branch desde `develop` con la nomenclatura adecuada
3. **Desarrollar**: Implementa los cambios necesarios
4. **Testing**: Escribe y ejecuta tests para tus cambios
5. **Pull Request**: Crea un PR dirigido a `develop`
6. **Code Review**: Solicita revisión del código
7. **Merge**: Después de aprobación, los cambios se integran a `develop`

### Convenciones de Commits

Usamos [Conventional Commits](https://www.conventionalcommits.org/) para mantener un historial claro:

```
<tipo>(<alcance>): <descripción>

[cuerpo opcional]

[pie opcional]
```

Tipos comunes:
- **feat**: Nueva característica
- **fix**: Corrección de bug
- **docs**: Cambios en documentación
- **style**: Cambios de formato (espacios, indentación)
- **refactor**: Refactorización de código existente
- **test**: Añadir o corregir tests
- **chore**: Tareas de mantenimiento

Ejemplo:
```
feat(auth): implementar sistema de login con Google

- Añadir componente de botón de Google
- Configurar NextAuth.js con proveedor de Google
- Actualizar tipos de usuario

Closes #123
```

## Estándares de Código

### Generales

- Usa TypeScript en modo estricto
- Sigue las reglas de ESLint y Prettier configuradas
- Escribe tests para tu código
- Mantén los componentes pequeños y enfocados en una responsabilidad

### Aplicación Web (Next.js)

- Distingue claramente entre Server y Client Components
- Sigue la estructura del App Router
- Usa los componentes de Shadcn UI siempre que sea posible
- Implementa las mejores prácticas de accesibilidad
- Optimiza las imágenes con `next/image`

### Aplicación Móvil (Expo)

- Sigue la estructura de Expo Router
- Optimiza para diferentes tamaños de pantalla
- Considera la usabilidad en touch screens
- Maneja adecuadamente el ciclo de vida de la aplicación
- Implementa soporte para modo offline cuando sea relevante

### Paquetes Compartidos

- Mantén la API consistente entre plataformas
- Documenta la funcionalidad compartida
- Evita dependencias específicas de plataforma

## Testing

- Escribe tests unitarios para funciones y hooks
- Implementa tests de integración para flujos importantes
- Asegúrate de que los tests sean deterministas
- Usa mocks apropiadamente para aislar componentes
- Mantén una cobertura de código razonable

## Documentación

- Actualiza la documentación cuando implementes cambios significativos
- Utiliza JSDoc para documentar funciones y componentes importantes
- Mantén los READMEs actualizados
- Proporciona ejemplos claros cuando sea relevante

## Pull Requests

### Template de PR

```markdown
## Descripción
[Describe los cambios implementados]

## Tipo de Cambio
- [ ] 🚀 Nueva característica
- [ ] 🐛 Corrección de bug
- [ ] 📚 Documentación
- [ ] ♻️ Refactorización
- [ ] ⚡ Mejora de rendimiento
- [ ] ✅ Cambios en tests

## ¿Cómo se ha probado?
[Describe cómo has probado tus cambios]

## Screenshots (si aplica)
[Adjunta screenshots relevantes]

## Issues relacionados
Closes #[número_de_issue]
```

### Proceso de Revisión

- Todos los PRs requieren al menos una revisión
- Los revisores deberán comprobar:
  - Funcionalidad correcta
  - Calidad del código
  - Adherencia a los estándares del proyecto
  - Cobertura de tests
  - Documentación
- Los comentarios deben ser constructivos y específicos

## Lanzamientos

- Los lanzamientos se preparan en branches `release/*`
- Seguimos versionado semántico (MAJOR.MINOR.PATCH)
- Se genera un changelog para cada release
- Las hotfixes se aplican directamente a `main` y luego se integran a `develop`

## Soporte

Si tienes preguntas o necesitas ayuda:

- Consulta la documentación existente
- Revisa los issues ya reportados
- Contacta al equipo de desarrollo
- Usa los canales de comunicación apropiados (Slack, Discord, etc.)

---

¡Esperamos tus contribuciones! Juntos podemos hacer de Centor una plataforma excepcional.
