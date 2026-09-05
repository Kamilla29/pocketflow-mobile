# Quality gates

The first public release is validated in CI with the following gates:

1. dependency installation;
2. Expo SDK dependency compatibility check;
3. Expo Doctor;
4. strict TypeScript typecheck;
5. Jest unit/component tests;
6. Metro iOS export smoke test.

A generated `package-lock.json` is uploaded as a CI artifact on the first run so it can be committed after the dependency set has been validated.
