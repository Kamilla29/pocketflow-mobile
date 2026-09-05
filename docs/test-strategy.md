# Test strategy

PocketFlow v1 focuses on deterministic domain logic, API contracts, reusable UI behavior and a reproducible mobile build smoke test.

## Current automated coverage

- amortized monthly payment calculation;
- payment schedule generation;
- repayment progress clamping;
- currency/date formatting;
- API schema rejection for invalid financial data;
- checklist contract validation;
- readable rendering of domain status;
- strict TypeScript compilation;
- Expo dependency compatibility and Expo Doctor;
- Metro iOS export smoke test.

## Next quality increment

A later enhancement release can extend coverage with:

- navigation tests for deep links and stack flows;
- a mobile E2E smoke flow, preferably Maestro;
- iOS simulator and Android emulator execution;
- large text and dynamic-type validation;
- VoiceOver/TalkBack focus-order checks;
- explicit light/dark/system appearance regression tests.

These are follow-up improvements rather than requirements claimed as completed in v1.
