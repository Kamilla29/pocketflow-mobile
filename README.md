# PocketFlow Mobile

[![Mobile quality](https://github.com/Kamilla29/pocketflow-mobile/actions/workflows/ci.yml/badge.svg)](https://github.com/Kamilla29/pocketflow-mobile/actions/workflows/ci.yml)

PocketFlow is a **React Native + TypeScript** mobile companion for the fictional LoanFlow product family. It is a portfolio project focused on mobile product architecture, typed navigation, resilient data states, accessibility and reproducible quality gates rather than a copy of the web application.

## What it demonstrates

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
- Maestro mobile E2E smoke specification
- GitHub Actions + Jenkins Pipeline quality gates

## Product flow

The current mobile journey includes:

1. **Overview** — current application status, repayment progress and payment summary.
2. **Payment schedule** — generated amortization data from framework-independent domain logic.
3. **Application checklist** — validated fictional application requirements.
4. **Application details** — supporting product information.
5. **Activity** — deterministic application timeline.
6. **Settings** — persisted appearance and non-sensitive UI preferences.

The app also supports custom-scheme navigation such as `pocketflow://activity` and `pocketflow://payments`.

## Architecture

```text
src/
├── api/          # deterministic demo API + Zod contracts
├── components/   # reusable mobile UI primitives
├── domain/       # framework-independent types, formatting and loan math
├── navigation/   # typed stack, tabs and deep-link configuration
├── screens/      # route-level product composition
├── state/        # persisted local preferences
└── theme/        # system/light/dark theme resolution
```

The domain layer is independent from React Native. **TanStack Query** owns remote-like application data, while **Zustand** owns local preferences. This keeps server-state and client-state concerns separate and testable.

More detail: [`docs/architecture.md`](docs/architecture.md).

## Quality engineering

### Active GitHub Actions CI

Every push or pull request targeting `main` runs a reproducible pipeline:

```text
npm ci
  ↓
Expo dependency alignment
  ↓
Expo Doctor
  ↓
TypeScript strict check
  ↓
Jest tests
  ↓
iOS Metro export smoke test
```

### Jenkins Pipeline

A root-level [`Jenkinsfile`](Jenkinsfile) expresses the same quality gates using Declarative Pipeline syntax and a Node 22 Docker agent. GitHub Actions remains the hosted CI for this repository; Jenkins is included as a portable Pipeline-as-Code implementation of the same checks.

See [`docs/ci.md`](docs/ci.md).

### Mobile E2E

[`.maestro/smoke.yaml`](.maestro/smoke.yaml) defines a core mobile smoke journey covering navigation, payment schedule, checklist, application details, appearance settings and a deep-link route.

The flow is intentionally documented as a simulator/device test rather than falsely presented as part of the current hosted CI. Run details and prerequisites are in [`docs/e2e.md`](docs/e2e.md).

## Automated coverage

Current deterministic tests cover:

- amortized monthly payment calculation;
- payment schedule generation;
- repayment progress clamping;
- currency/date formatting;
- API schema rejection for invalid financial data;
- checklist contract validation;
- reusable status rendering;
- strict TypeScript compilation;
- Expo compatibility checks;
- Metro export smoke testing.

See [`docs/test-strategy.md`](docs/test-strategy.md).

## Run locally

Requirements: Node.js 22+ and an Expo-compatible local environment.

```bash
npm ci
npm start
```

Useful checks:

```bash
npm run typecheck
npm test
npm run doctor
npm run bundle
```

## Portfolio relationship

- **LoanFlow Web** — React/Nx web product flow
- **QA Automation Lab** — independent Playwright quality engineering
- **PocketFlow Mobile** — React Native mobile companion
- **Asteria** — reusable UI/design-system architecture

Together these projects show web development, mobile development, automated testing and reusable UI architecture as separate but connected engineering concerns.

## Disclaimer

PocketFlow uses deterministic fictional data. It does not process real identities, banking credentials, credit decisions, payments or financial accounts and is not affiliated with any bank.
