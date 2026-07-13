# React Mobile C

A React component library for mobile H5 applications and embedded WebViews. The project uses
pnpm workspaces and Turborepo to manage independently buildable packages.

## Requirements

- Node.js 20 or later
- pnpm 9.15.9

## Getting started

```bash
pnpm install
pnpm dev
pnpm build
```

The development server starts from the components package and prints the available local URL.

## Packages

- `@react-mobile-c/components`: public React components
- `@react-mobile-c/shared`: shared constants and TypeScript types

## Development commands

```bash
pnpm dev
pnpm build
pnpm lint
pnpm typecheck
pnpm format:check
pnpm format
```

## Package styles

Applications using the component package must import the generated stylesheet once at their
entry point:

```ts
import '@react-mobile-c/components/style.css';
```
