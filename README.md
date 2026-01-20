# Multi-tenant SaaS Dashboard

Aplicación Next.js (App Router) para gestionar proyectos en una arquitectura multi-tenant.

## 🔗 Demo

- **Tenant Acme:** [/acme/dashboard](https://sweet-crisp-70a521.netlify.app/acme/dashboard) (3 proyectos: 2 active, 1 archived)
- **Tenant Umbrella:** [/umbrella/dashboard](https://sweet-crisp-70a521.netlify.app/umbrella/dashboard) (2 proyectos: 1 active, 1 archived)
- **Tenant Globex:** [/globex/dashboard](https://sweet-crisp-70a521.netlify.app/globex/dashboard) (3 proyectos: 1 active, 2 archived)

---

## 1. Decisiones Técnicas Clave

### Arquitectura de Carpetas

```
/src
├── domain/       → Interfaces puras (Project, Tenant) - sin lógica
├── services/     → Lógica de negocio con filtrado por tenant
├── mocks/        → Datos mock tipados, fácil swap a BD real
├── lib/          → Utilidades (tenant-resolver)
├── components/
│   ├── ui/       → Componentes atómicos genéricos (StatCard)
│   └── projects/ → Componentes de dominio (ProjectCard, StatusFilter)
└── app/          → Solo routing y Server Components
```

**Separación UI genérica vs UI de dominio:** `StatCard` es genérico (cualquier dashboard puede usarlo), `ProjectCard` conoce el modelo `Project` y vive en `/components/projects/`.

### Patrón Service Layer

Los services son **funciones async** pensando en una futura conexión a base de datos. El `tenantId` en cada `Project` actúa como **clave foránea** para garantizar aislamiento de datos.

### Filtros con URL State

Los filtros de estado (`?status=active`) persisten en la URL en lugar de useState. Esto permite:

- URLs compartibles
- Historial del navegador funcional
- Mantener el filtrado al recargar

Implementé **validación whitelist**: si el parámetro es inválido, se ignora y vuelve a "all".

---

## 2. Cómo Resolví el Multi-tenant

El tenant se extrae del segmento dinámico `[tenant]` en la URL.

**Patrón Guardia en Layout:** La validación ocurre en `app/[tenant]/layout.tsx`. Si el tenant es inválido, se dispara `notFound()` y ninguna página hija se ejecuta. Esto es más eficiente que validar en cada página individualmente.

```
/[tenant]/layout.tsx  → Valida tenant (Guardia)
    ├── /dashboard    → Hereda validación ✓
    ├── /projects     → Hereda validación ✓
    └── /projects/[id] → Valida que el proyecto pertenezca al tenant
```

El aislamiento de datos ocurre en el **service layer**, no en la UI. `getProjectsByTenant()` filtra por `tenantId`.

**Seguridad en detalle de proyecto:** En `/[tenant]/projects/[id]`, el aislamiento no es solo visual; el service layer exige ambos IDs (Project + Tenant) para retornar datos, evitando que un ID de proyecto válido sea expuesto en un tenant incorrecto. Si no coincide, se dispara `notFound()`.

---

## 3. Separación Server / Client

| Tipo                  | Uso                                     | Ejemplos           |
| --------------------- | --------------------------------------- | ------------------ |
| **Server Components** | Fetching de datos, resolución de tenant | Páginas, Layout    |
| **Client Components** | Interacciones, estado UI                | `StatusFilter.tsx` |

**Regla aplicada:** El único `"use client"` está en `StatusFilter.tsx`. Las páginas son 100% Server Components.

El filtrado de proyectos ocurre en el servidor. El Client Component solo maneja la interacción de los botones y modifica la URL.

---

## 4. Qué Mejoraría con Más Tiempo

- **Extraer Navbar a componente:** Actualmente está inline en el layout. Lo ideal sería moverlo a `/components/layouts/Navbar.tsx`.
- **Tests unitarios:** Para los services y validaciones.
- **Error boundaries:** Manejo granular de errores.
- **Persistencia real:** Conectar a una base de datos (los services ya son async).
- **Landing page:** Agregué una página de inicio simple que lista los tenants disponibles para facilitar la navegación, así como un botón para redirigir al home, esto puede mejorarse.

---

## 5. Qué Conscientemente Dejé Afuera

- **Autenticación:** No se solicitó.
- **CRUD de proyectos:** Solo lectura como se pidió.
- **Estilos elaborados:** El enunciado indica "no se evalúa estética".
- **i18n:** Fuera del alcance.

---

## 🛠️ Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS

Visitar: `https://sweet-crisp-70a521.netlify.app/`
