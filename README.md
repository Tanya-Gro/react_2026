# RS School React 2026: Next.js Migration & SSR

Educational project migrated from Vite (SPA) to Next.js (App Router) focusing on Server-Side Rendering (SSR), Static Site Generation (SSG), and Server Actions.

---

## 🚀 Implemented Features

### Feature 1: Application Rebuild & Behavioral Parity

- Fully migrated from Vite to Next.js App Router setup using native file-based routing.
- Preserved all existing non-conflicting core functionality and modules while removing standalone forms modules.

### Feature 2: Internationalization (`next-intl`)

- Integrated `next-intl` for full multi-language UI support (at least two languages).
- Implemented a dynamic client-side switcher for changing the current UI locale.

### Feature 3: Shared Layout

- Implemented a persistent, unified layout component at the root level (`src/app/[locale]/layout.tsx`).
- Ensures seamless user transition and global navigation flow between different app states.

### Feature 4: Custom 404 Error Page

- Implemented an interactive error boundary fallback (`not-found.tsx`) for unknown routes.
- Automatically captures invalid path sequences and provides safe user navigation.

### Feature 5: Advanced Image Optimization

- Discarded classic `<img>` HTML tags in favor of Next.js native `next/image` engine.
- Out-of-the-box layout stability, smart lazy-loading, and responsive multi-format compression.

### Feature 6: Localized Navigation

- Switched all internal routing instances to custom links generated via `next-intl` `createNavigation` hook matrix.
- Keeps state and sub-paths synchronized across localized routing tables.

### Feature 7: Static About Page (SSG)

- Generated as a pure **Server Component** without heavy tracking runtime code or tracking client logic.
- Completely pre-rendered at compile time (Static Site Generation) for lightning-fast SEO-friendly metrics.

### Feature 8: Server-Side CSV Generation via Server Actions

- Built a server-side compiler wrapper that processes characters matrix directly on the server instance.
- Handled seamlessly using Next.js **Server Actions** (`useActionState`) or API Route Handlers for high-speed delivery.

### Feature 9: Server-Side Rendered Search Grid (Initial SSR)

- The main dashboard view (list view grid + detail skeleton wireframe) is fully generated via **Server Components**.
- Handles query params (`search`, `page`, `details`) on initial request, bypassing any client-side layout flashing.

### Feature 10: Server Actions for Search & Details Delivery

- Search form submissions are wired directly through native `<form action={...}>` server bindings instead of standard client-side `useEffect` handlers.
- Choosing a dedicated card element routes the query back to the server component pipeline to pull clean, individual Node data streams.

---

## ⚠️ Code Quality Standards & Zero-Tolerance Constraints

To ensure zero point penalties based on the technical specification, the codebase adheres to the following criteria:

1. **Strict TypeScript Types**: Completely forbidden use of `any` types or `// @ts-ignore` overrides.
2. **Clean Component Architecture**: No "God-objects", chunked template copy-pastes, or dangling commented code-blocks.
3. **Pure React Flow**: Zero direct browser DOM manipulations inside component life-cycles.
4. **No External Component Frameworks**: Completely vanilla Tailwind CSS v4 layout code without layout bloat libraries (like Material UI or Ant Design).
