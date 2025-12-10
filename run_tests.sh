#!/bin/sh
set -e

# Default to task-001 if not provided
TASK_ID=${1:-task-001}

# Run the task_tests.js for the TASK_ID using npx jest (ensures jest is in PATH inside container)
exec npx jest "tasks/${TASK_ID}/task_tests.js" --runInBand
