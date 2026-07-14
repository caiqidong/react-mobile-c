# React Mobile C

[![CI](https://github.com/caiqidong/react-mobile-c/actions/workflows/ci.yml/badge.svg)](https://github.com/caiqidong/react-mobile-c/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/caiqidong/react-mobile-c/branch/main/graph/badge.svg)](https://codecov.io/gh/caiqidong/react-mobile-c)
[![npm](https://img.shields.io/npm/v/@react-mobile-c/components.svg)](https://www.npmjs.com/package/@react-mobile-c/components)

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
pnpm changeset
```

## Release workflow

Add a changeset for every user-facing package change with `pnpm changeset`. Merging to `main`
updates a release pull request; merging that pull request publishes the changed packages to npm.
The repository must provide an `NPM_TOKEN` Actions secret with publish access to the
`@react-mobile-c` scope.

Coverage uploads use GitHub OIDC. Import the repository into Codecov to activate uploads and the
coverage badge; an unavailable Codecov project does not block the core CI quality gates.

## Package styles

Applications using the component package must import the generated stylesheet once at their
entry point:

```ts
import '@react-mobile-c/components/style.css';
```
