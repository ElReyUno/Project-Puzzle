#!/bin/sh
set -e


# If a task ID is provided, run only that task's tests. Otherwise, run all task test files.
if [ -n "$1" ]; then
	TASK_ID="$1"
	exec npx jest "tasks/${TASK_ID}/task_tests.js" --runInBand
else
	# Find all task test files and run them sequentially
	for testfile in tasks/task-*/task_tests.js; do
		echo "Running tests in $testfile"
		npx jest "$testfile" --runInBand || exit 1
	done
fi
