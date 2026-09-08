# Test strategy

PocketFlow focuses on deterministic domain logic, API contracts, reusable UI behavior, reproducible CI checks and a focused mobile smoke journey.

## Current automated CI coverage

GitHub Actions and the Jenkins Pipeline run:

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

## Mobile E2E specification

`.maestro/smoke.yaml` adds a device-level smoke journey for the highest-value paths:

- clean application launch;
- overview rendering;
- payment schedule navigation;
- checklist navigation;
- application-details navigation;
- Settings navigation and appearance change;
- custom-scheme deep link to Activity.

The Maestro flow requires an installed native build and a simulator/emulator or device. It is not currently executed by GitHub Actions or Jenkins, and the project documentation does not claim otherwise.

## Testing boundaries

PocketFlow deliberately keeps its portfolio data deterministic. Unit/component tests validate logic and contracts, while CI validates that the project remains type-safe, dependency-compatible and bundleable. The Maestro flow targets cross-screen behavior that is not efficiently proven by isolated unit tests.

## Next quality increment

Useful future additions, only if the project continues beyond the current portfolio scope:

- run Maestro on a device-capable CI worker;
- explicit deep-link navigation tests at the React Navigation layer;
- large-text and dynamic-type validation;
- VoiceOver/TalkBack focus-order checks;
- screenshot regression for light/dark/system appearance modes.
