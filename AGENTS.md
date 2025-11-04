# Repository Guidelines

## Project Structure & Module Organization
- `src/main`, `src/preload`, and `src/renderer` hold the Electron main process, preload scripts, and React UI respectively; Webpack bundles each via `webpack.*.config.ts`.
- UI components generated via `shadcn` live under `src/components`, and shared utilities under `src/lib`.
- Packaged output lands in `.webpack/` during development builds and `dist/` once `electron-forge make` runs.

## Build, Test, and Development Commands
- `npm run start` – launches Electron Forge with the Webpack dev server for live reload.
- `npm run make` – produces platform installers (NSIS, deb, rpm, zip) using the Forge makers configured in `forge.config.ts`.
- `npm run lint` / `npm run fix` – runs ESLint or Biome auto-fixes against `src`.
- `npm run type-check` – compiles with `tsc --noEmit` to guard Electron main/preload contracts.
- `npm run test` – executes Vitest (jsdom) specs, matching component behavior in the renderer layer.

## Coding Style & Naming Conventions
- TypeScript everywhere; keep 2-space indentation and favor ES modules.
- React components use PascalCase filenames inside `src/components`, hooks stay in `src/hooks` and take `useX` names.
- Prefer functional components + hooks over class components; share UI primitives through the `components.json` catalog.
- Run `npm run lint` before pushing; configure editors to respect `.editorconfig`, `eslint.config.mts`, and `biome.json`.

## Testing Guidelines
- Add renderer tests in `src/**/__tests__/*.test.tsx` or colocated `*.test.ts`; name suites after the component under test.
- Use Vitest + Testing Library assertions (`@testing-library/react`, `jest-dom`) and mock Electron bridges through preload-safe facades.
- Aim for smoke coverage on new UI flows and regression tests for preload IPC contracts; document gaps in PR descriptions.

## Commit & Pull Request Guidelines
- Follow a concise, present-tense commit style (`feat: add settings dock`); avoid the existing `auto commit` placeholder when contributing manually.
- Each PR should describe the change, outline test coverage (`npm run test`, `npm run lint`), and link issues or feature tickets.
- Include screenshots or screen recordings for renderer-facing changes, plus installer notes when touching Forge makers.

## Security & Configuration Tips
- Keep secrets out of the repo; use `.env` files ignored by Git and reference them through preload-safe IPC, never in renderer bundles.
- After dependency updates via `npm run taze`, rerun `npm run lint && npm run test` to confirm Radix/shadcn components still tree shake correctly.
