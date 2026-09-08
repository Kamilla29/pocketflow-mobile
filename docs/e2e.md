# Mobile E2E smoke testing

PocketFlow includes a Maestro smoke flow in `.maestro/smoke.yaml`.

## What the flow covers

The scenario exercises the main mobile journey rather than duplicating unit tests:

1. launches PocketFlow with clean local state;
2. verifies the overview screen;
3. opens the payment schedule;
4. opens the application checklist;
5. opens application details;
6. navigates to Settings and switches to dark appearance;
7. opens the Activity screen through the `pocketflow://activity` deep link.

## Prerequisites

- Maestro CLI installed;
- an Android emulator or iOS simulator/device available to Maestro;
- a locally installed PocketFlow native build using app id `dev.kamilla.pocketflow`.

The Expo project declares the same identifier for Android and iOS in `app.json`.

## Run

```bash
maestro test .maestro/smoke.yaml
```

## CI scope

The current GitHub Actions and Jenkins pipelines intentionally remain emulator-free. They run deterministic quality gates: dependency checks, Expo Doctor, strict TypeScript, Jest and an iOS Metro export smoke test.

The Maestro flow is committed as an executable mobile E2E specification and is intended for a machine with a configured simulator/emulator or for a future device-capable CI stage. The repository does not claim cloud E2E execution where none is configured.
