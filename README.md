# Project Puzzle

## Overview

Project Puzzle is a dataset creation initiative designed to train and evaluate AI coding agents. This repository contains a full-stack e-commerce application built with Node.js and React, along with 10 independent implementation tasks. Each task challenges AI models to make multi-file changes, pass comprehensive tests, and generate verifiable Git diffs.

The project serves as a benchmark for AI capabilities in real-world software development, focusing on non-trivial, human-created code.

## Repository Structure

```
Project Root
├─ backend/                         # Express backend (routes, models, server)
│  ├─ [server.js]                   # Entry point for server, exports app for tests
│  ├─ routes/                       # API routes (products, users)
│  └─ models/                       # Data containers (in-memory for demo)
├─ src/                             # React app source (frontend)
│  └─ components/                   # ProductList, ShoppingCart, Login, Signup
│  └─ utils/                        # fetchProducts and API helpers
│     ├─ components/                # ProductList, ShoppingCart, Login, Signup
│     ├─ utils/                     # fetchProducts and API helpers
│     └─ [index.js]                 # React entrypoint (client-side)
├─ tasks/                           # Tasks & tests
│  └─ task-001/
│     ├─ [task_description.txt]
│     ├─ [task_tests.js]
│     └─ [task_diff.txt]            # single-commit diff for this task
├─ Dockerfile                       # Multi-stage to build & run app for tests
├─ [docker-compose.yaml]            # Container orchestration for dev/test
├─ [run_tests.sh]                   # Entrypoint per-task to run Jest inside container
├─ [package.json]                   # Dependencies and scripts (ESM)
└─ [babel.config.cjs]               # Babel config for Jest/Babel transforms (CJS)
```

## Tasks

This repository includes 10 tasks, each starting from the same starter project state. Tasks are categorized as Features, Bugs, Refactors, or Performance optimizations. Each task folder has:

- `task_description.txt`: YAML description of the problem
- `task_tests.js`: Jest test suite (6+ tests)
- `task_diff.txt`: Git diff showing the implementation changes

Task 001 builds the starter project itself.

## Acceptance Criteria

To be accepted, the repository must meet:

- 10+ files, non-Python, full-stack, compiles without errors
- Docker-compatible, original human code
- Each task: 3+ files changed, 20+ lines, 10+ hunks in diff, all tests pass
- Tasks are independent

## Running the Project

Use Docker: `docker compose up --build` to build and run the container. To run tests for a specific task set `TASK_ID` (default is task-001) and run:

```
TASK_ID=task-001 docker compose run --rm vendoverse
```

Notes:
- The frontend source is located in `src/` (not `src`). Running `npm run build` creates a `build/` directory at project root which the backend serves in production.

# GitHub Actions

Enable:
* CI (node build/test/lint): install deps, build, run tests (Node 20).
* Docker image build + test: run image and execute tests in container.
* Lint & static analysis: eslint + prettier checks.
* Dependency check: run depcheck and optionally fail on unused deps.
* Security: enable Dependabot alerts and CodeQL analysis.

## Task Summaries

### Task 001: VendoVerse
- **Description:** Sets up the initial VendoVerse full-stack e-commerce application using Node.js and React.
- **Category:** Feature
- **Tags:** nodejs, react, ecommerce, fullstack

### Task 002: CI/CD & Security Automation
- **Description:** Implements continuous integration and security automation using GitHub Actions, Docker, linting, dependency checks, Dependabot, and CodeQL.
- **Category:** Feature
- **Tags:** github-actions, ci, docker, lint, security, dependabot, codeql

### Task 003: Implement Product CRUD API Endpoints
- **Description:** Adds backend API endpoints for product Create, Read, Update, and Delete (CRUD) operations with validation, using Express and RESTful conventions.
- **Category:** Feature
- **Tags:** backend, api, crud, express, validation, rest

---

**Testing:**  
Each task includes a comprehensive Jest test suite (`task_tests.js`) with 6+ AAA-style tests, ensuring robust validation of new features and bug fixes.

**Diffs:**  
Implementation changes for each task are documented in `task_diff.txt`, showing multi-file, multi-hunk diffs for transparency and reproducibility.

**Independence:**  
Tasks are designed to be independent and can be applied in any order to the starter project.

**Contribution:**  
For best results, review each task's description and test suite before applying its diff to the codebase.

---

*For details on running and testing each task, see the instructions above.*
