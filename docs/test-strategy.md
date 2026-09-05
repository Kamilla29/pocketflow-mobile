# Test strategy

The local release focuses on deterministic domain logic, contracts and reusable UI behavior.

## Current test coverage

- amortized monthly payment calculation;
- payment schedule generation;
- repayment progress clamping;
- currency/date formatting;
- API schema rejection for invalid financial data;
- checklist contract validation;
- readable rendering of domain status.

## Final publication gate

Before GitHub publication:

- align dependencies with the then-current supported Expo SDK;
- generate and commit a lockfile;
- run TypeScript in strict mode;
- run Jest + React Native Testing Library;
- add navigation tests for deep links and stack flows;
- add one mobile E2E smoke flow, preferably Maestro;
- test iOS simulator and Android emulator builds;
- validate large text/dynamic type;
- validate VoiceOver/TalkBack labels and focus order;
- validate light/dark/system appearance modes.
