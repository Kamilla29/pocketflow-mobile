# Architecture

PocketFlow is a React Native companion application for the fictional LoanFlow product family.

## Layers

- **screens** — route-level UI composition;
- **components** — reusable mobile UI primitives;
- **domain** — framework-independent loan calculations and formatting;
- **api** — deterministic demo data validated with Zod;
- **state** — persisted non-sensitive preferences;
- **navigation** — typed stack + bottom tabs + deep-link configuration;
- **theme** — light/dark tokens resolved from system or local preference.

## State model

TanStack Query owns remote-like demo state:

- loan snapshot;
- activity feed;
- application checklist.

Zustand owns local preferences:

- product notifications;
- biometric shortcut preference;
- reduce-motion preference;
- appearance mode.

This keeps server state and client state conceptually separate.

## Resilience

- loading/error/retry UI states;
- pull-to-refresh on data screens;
- application-level error boundary;
- deterministic schema validation;
- no random API failures;
- no sensitive persisted financial or identity data.

## Design goals

1. Keep financial calculations independent from React Native UI.
2. Treat loading, error and refresh states as normal product states.
3. Store only harmless local preferences.
4. Keep the mobile product clearly fictional and non-transactional.
5. Reuse the TypeScript/product-quality narrative of LoanFlow without copying its web UI.
6. Show mobile-specific capabilities: navigation, deep links, safe-area layouts, appearance modes and touch-first controls.
