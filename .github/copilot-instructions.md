# Copilot Instructions for LiveTrip

## Project Overview
- **Framework:** Next.js (App Router, TypeScript)
- **Structure:**
  - `src/app/` — Route-based pages and layouts (including nested layouts)
  - `src/components/` — Reusable UI components, organized by feature (e.g., `button/`, `dialog/`, `dropdown/`)
  - `public/` — Static assets (fonts, images, SVGs)
  - Utilities in `src/utils/`

## Key Patterns & Conventions
- **Component Organization:**
  - Each component folder contains its main file and a `type.ts` for TypeScript types.
  - Subcomponents and assets (SVGs) are nested within their parent component folder.
- **Styling:**
  - Global styles: `src/app/globals.css`
  - Component styles: co-located or in global if shared.
- **TypeScript:**
  - All code is written in TypeScript. Types are defined in `type.ts` files next to components.
- **Icons/Assets:**
  - SVGs and images are imported from `public/` or component-specific `assets/` folders.

## Developer Workflows
- **Start Dev Server:** `npm run dev` (or `yarn dev`, `pnpm dev`, `bun dev`)
- **Build:** `npm run build`
- **No explicit test setup** detected; add tests in `src/` if needed.
- **No custom scripts** beyond Next.js defaults in `package.json`.

## Integration & Data Flow
- **No backend/services** detected in this repo; all logic is client-side.
- **Component communication** via props and context (see `dropdownContext.tsx`).
- **No API routes** or external API integrations found in this codebase.

## Examples
- **Add a new badge component:**
  - Create a folder in `src/components/`, add `ComponentName.tsx` and `type.ts`.
  - Import SVGs to `assets/` if needed.
- **Add a new page:**
  - Add a folder and `page.tsx` under `src/app/` (use nested folders for layouts).

## References
- See `README.md` for Next.js basics and deployment.
- Use `src/components/` for reusable UI, `src/app/` for routing/pages.

---
If you add new conventions or workflows, update this file to help future AI agents and developers.
