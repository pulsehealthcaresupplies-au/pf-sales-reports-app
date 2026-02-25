#!/usr/bin/env bash
# Run the same build as CI (Dockerfile) locally to catch errors before pushing.
# Usage: from app root: ./scripts/build-like-ci.sh   OR   npm run build:ci

set -e
cd "$(dirname "$0")/.."

echo "=== Sales Reports: Same as CI (prebuild + build) ==="
npm run prebuild
npm run build

echo ""
echo "=== Build finished successfully (same steps as CI/Dockerfile) ==="
