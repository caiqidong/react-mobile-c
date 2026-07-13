# React Mobile C

A React component library for mobile H5 applications and embedded WebViews. The project uses
pnpm workspaces and Turborepo to manage independently buildable packages.

## Requirements

- Node.js 20 or later
- pnpm 9.15.9

## Getting started

```bash
pnpm install
pnpm build
```

## Packages

- `@react-mobile-c/components`: public React components
- `@react-mobile-c/shared`: shared constants and TypeScript types

## Development commands

```bash
pnpm build
pnpm lint
pnpm typecheck
pnpm format:check
pnpm format
```

See [DEVELOPMENT_PLAN.md](./DEVELOPMENT_PLAN.md) for milestones and the component development
workflow.
