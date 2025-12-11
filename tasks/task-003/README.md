# Task 002: CI/CD & Security Automation

## Task Description

This task adds robust CI/CD and security automation to Project Puzzle using GitHub Actions and Dependabot. It covers Node.js CI (build, test, lint), Docker image build/test, lint/static analysis, dependency scanning, and security workflows.

### Workflows Added

- **Node.js CI:** Installs dependencies, builds, runs tests and lint on Node 20.
- **Docker Build/Test:** Builds Docker image and runs tests inside container.
- **Lint/Static Analysis:** Runs eslint and prettier checks.
- **Depcheck:** Scans for unused dependencies.
- **Dependabot:** Monitors dependency updates for security.
- **CodeQL:** Enables code security analysis.

### Acceptance Criteria

- All workflows are present in `.github/workflows/`.
- All workflows are valid YAML and pass on push/PR.
- Dependabot config is present in `.github/dependabot.yml`.
- CodeQL analysis is enabled.
- All tests in `task_tests.js` pass and validate workflow presence/configuration.

### Technology

- **GitHub Actions** for CI/CD
- **Dependabot** for dependency updates
- **CodeQL** for security analysis
- **Jest** for test validation

### File Count Target

- 5+ workflow/config files added or modified.

### Test Framework

- Jest (validates workflow presence and config)