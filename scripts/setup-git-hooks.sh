#!/bin/sh
# Run once per clone: ./scripts/setup-git-hooks.sh
set -e
root=$(CDPATH= cd -- "$(dirname "$0")/.." && pwd)
cd "$root"
git config core.hooksPath scripts/git-hooks
printf '%s\n' "Set core.hooksPath to scripts/git-hooks (repo: $root)"
