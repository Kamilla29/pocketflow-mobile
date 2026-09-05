# PocketFlow Mobile

PocketFlow is a **React Native + TypeScript** mobile companion for the fictional LoanFlow product family. It is a portfolio project focused on mobile product architecture, typed navigation, resilient data states and accessibility rather than a copy of the web application.

## Highlights

- Expo SDK 57, React Native 0.86 and React 19.2
- TypeScript with strict mode
- typed native stack + bottom-tab navigation
- deep links through `pocketflow://...`
- loan overview, repayment progress and amortization schedule
- application checklist and activity timeline
- pull-to-refresh and recoverable loading/error states
- TanStack Query for remote-like demo state
- Zustand + AsyncStorage for non-sensitive preferences
- system/light/dark appearance modes
- Zod validation for demo API contracts
- app-level error boundary
- accessibility semantics for headings, progress and controls
- Jest + React Native Testing Library coverage

## Architecture

```text
src/
├── api/
├── components/
├── domain/
├── navigation/
├── screens/
├── state/
└── theme/
```

The domain layer is independent from React Native. TanStack Query owns remote-like application data, while Zustand owns local preferences. This keeps server-state and client-state concerns separate and testable.

## Portfolio relationship

- **LoanFlow Web** — React/Nx web product flow
- **QA Automation Lab** — independent Playwright quality engineering
- **PocketFlow Mobile** — React Native mobile companion
- **Asteria** — reusable UI/design-system architecture

## Quality gates

The GitHub Actions pipeline installs dependencies, checks Expo compatibility, runs Expo Doctor, TypeScript, Jest and an iOS Metro export.

## Disclaimer

PocketFlow uses deterministic fictional data. It does not process real identities, banking credentials, credit decisions, payments or financial accounts and is not affiliated with any bank.
