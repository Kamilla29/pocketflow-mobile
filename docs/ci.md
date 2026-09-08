# CI quality gates

PocketFlow keeps the same core quality expectations across GitHub Actions and Jenkins.

## GitHub Actions

`.github/workflows/ci.yml` runs on pushes and pull requests targeting `main`.

## Jenkins

`Jenkinsfile` provides the same portfolio pipeline in Declarative Pipeline syntax. It uses a Node 22 Docker agent, so the Jenkins controller/agent must support the Docker Pipeline plugin and Docker execution.

## Quality sequence

1. `npm ci`
2. `npx expo install --check`
3. `npx expo-doctor@latest`
4. `npm run typecheck`
5. `npm test`
6. `npm run bundle`

The final bundle command performs an iOS Metro export smoke test. Neither CI configuration claims simulator/device E2E execution; the Maestro flow is documented separately in `docs/e2e.md`.

## Why two CI definitions?

GitHub Actions is the repository's active hosted CI. The Jenkinsfile demonstrates that the same reproducible quality gates can be expressed in a conventional Jenkins Pipeline without changing application code or weakening checks.
