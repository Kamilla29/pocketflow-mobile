# Quality gates

The public release is validated in GitHub Actions with reproducible dependencies from the committed `package-lock.json`.

The pipeline runs:

1. `npm ci` from the committed lockfile;
2. Expo SDK dependency compatibility check;
3. Expo Doctor;
4. strict TypeScript typecheck;
5. Jest unit/component tests;
6. Metro iOS export smoke test.

The lockfile was generated only after the Expo dependency set passed compatibility checks, then committed so CI and future local installs resolve the same dependency graph.
