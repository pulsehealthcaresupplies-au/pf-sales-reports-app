#!/usr/bin/env bash
# Docker Run Script for Sales Reports App
# Usage: ./scripts/docker-run.sh [--local] [--production] [--detach] [--port PORT]

set -e

APP_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$APP_ROOT"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Defaults
BUILD_TYPE="local"
DETACH=false
PORT=3004
IMAGE_NAME="pulse-sales-reports-app:local"
CONTAINER_NAME="pulse-sales-reports-app-run"

# Parse arguments
for arg in "$@"; do
  case "$arg" in
    --local)
      BUILD_TYPE="local"
      IMAGE_NAME="pulse-sales-reports-app:local"
      ;;
    --production)
      BUILD_TYPE="production"
      IMAGE_NAME="pulse-sales-reports-app:prod"
      ;;
    --detach|-d)
      DETACH=true
      ;;
    --port=*)
      PORT="${arg#*=}"
      ;;
    -h|--help)
      echo "Usage: $0 [--local] [--production] [--detach] [--port=PORT]"
      echo "  --local       Use local development image (default)"
      echo "  --production  Use production image"
      echo "  --detach      Run in detached mode"
      echo "  --port=PORT   Map container port to host port (default: 3004)"
      exit 0
      ;;
  esac
done

print_info() { echo -e "${BLUE}ℹ️  $1${NC}"; }
print_success() { echo -e "${GREEN}✅ $1${NC}"; }
print_error() { echo -e "${RED}❌ $1${NC}"; }

# Check if image exists
if ! docker image inspect "$IMAGE_NAME" > /dev/null 2>&1; then
  print_error "Docker image not found: $IMAGE_NAME"
  print_info "Building image first..."
  ./scripts/docker-build-verify.sh --"$BUILD_TYPE" || exit 1
fi

# Stop and remove existing container if running
if docker ps -a | grep -q "$CONTAINER_NAME"; then
  print_info "Stopping existing container..."
  docker stop "$CONTAINER_NAME" > /dev/null 2>&1 || true
  docker rm "$CONTAINER_NAME" > /dev/null 2>&1 || true
fi

# Run container
print_info "Starting container: $CONTAINER_NAME"
print_info "Image: $IMAGE_NAME"
print_info "Port: $PORT:3004"

if [ "$DETACH" = true ]; then
  docker run -d \
    --name "$CONTAINER_NAME" \
    -p "$PORT:3004" \
    "$IMAGE_NAME"
  print_success "Container started in detached mode"
  print_info "View logs: docker logs -f $CONTAINER_NAME"
  print_info "Stop container: docker stop $CONTAINER_NAME"
  print_info "Access app: http://localhost:$PORT"
else
  print_info "Starting container (press Ctrl+C to stop)..."
  docker run --rm \
    --name "$CONTAINER_NAME" \
    -p "$PORT:3004" \
    "$IMAGE_NAME"
fi
