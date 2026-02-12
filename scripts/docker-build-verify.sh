#!/usr/bin/env bash
# Docker Build Verification Script for Sales Reports App
# Verifies Docker build succeeds and catches any build failures
# Usage: ./scripts/docker-build-verify.sh [--local] [--production] [--verbose]

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
VERBOSE=false
IMAGE_NAME="pulse-sales-reports-app"
CONTAINER_NAME="pulse-sales-reports-app-verify"
PORT=3004

# Parse arguments
for arg in "$@"; do
  case "$arg" in
    --local)
      BUILD_TYPE="local"
      ;;
    --production)
      BUILD_TYPE="production"
      ;;
    --verbose|-v)
      VERBOSE=true
      ;;
    -h|--help)
      echo "Usage: $0 [--local] [--production] [--verbose]"
      echo "  --local       Build with local development args (default)"
      echo "  --production  Build with production args"
      echo "  --verbose     Show verbose Docker build output"
      exit 0
      ;;
  esac
done

print_info() { echo -e "${BLUE}ℹ️  $1${NC}"; }
print_success() { echo -e "${GREEN}✅ $1${NC}"; }
print_warning() { echo -e "${YELLOW}⚠️  $1${NC}"; }
print_error() { echo -e "${RED}❌ $1${NC}"; }

# Build args based on type
if [ "$BUILD_TYPE" = "production" ]; then
  print_info "Building with PRODUCTION configuration..."
  BUILD_ARGS=(
    --build-arg NEXT_PUBLIC_API_URL=https://api.pulsehealth.com
    --build-arg NEXT_PUBLIC_APP_URL=https://reports.pulsehealth.com
    --build-arg NEXT_PUBLIC_PULSE_CORE_URL=https://api.pulsehealth.com
    --build-arg NEXT_PUBLIC_GRAPHQL_ENDPOINT=/graphql/sales-reports
    --build-arg NEXT_PUBLIC_GRAPHQL_AUTH_ENDPOINT=/graphql/auth
    --build-arg NEXT_SERVER_ACTIONS_ENCRYPTION_KEY=${NEXT_SERVER_ACTIONS_ENCRYPTION_KEY:-}
  )
  IMAGE_NAME="pulse-sales-reports-app:prod"
else
  print_info "Building with LOCAL development configuration..."
  BUILD_ARGS=(
    --build-arg NEXT_PUBLIC_API_URL=http://localhost:8000
    --build-arg NEXT_PUBLIC_APP_URL=http://localhost:${PORT}
    --build-arg NEXT_PUBLIC_PULSE_CORE_URL=http://localhost:8001
    --build-arg NEXT_PUBLIC_GRAPHQL_ENDPOINT=/graphql/sales-reports
    --build-arg NEXT_PUBLIC_GRAPHQL_AUTH_ENDPOINT=/graphql/auth
    --build-arg NEXT_SERVER_ACTIONS_ENCRYPTION_KEY=${NEXT_SERVER_ACTIONS_ENCRYPTION_KEY:-}
  )
  IMAGE_NAME="pulse-sales-reports-app:local"
fi

# Cleanup function
cleanup() {
  print_info "Cleaning up..."
  docker rm -f "$CONTAINER_NAME" 2>/dev/null || true
}

trap cleanup EXIT

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
  print_error "Docker is not running. Please start Docker and try again."
  exit 1
fi

print_info "Starting Docker build verification..."
print_info "Build type: $BUILD_TYPE"
print_info "Image name: $IMAGE_NAME"

# Build the Docker image
print_info "Building Docker image..."
BUILD_OUTPUT=$(mktemp)
BUILD_EXIT_CODE=0

if [ "$VERBOSE" = true ]; then
  docker build \
    "${BUILD_ARGS[@]}" \
    -t "$IMAGE_NAME" \
    . 2>&1 | tee "$BUILD_OUTPUT" || BUILD_EXIT_CODE=$?
else
  docker build \
    "${BUILD_ARGS[@]}" \
    -t "$IMAGE_NAME" \
    . > "$BUILD_OUTPUT" 2>&1 || BUILD_EXIT_CODE=$?
fi

# Check build result
if [ $BUILD_EXIT_CODE -ne 0 ]; then
  print_error "Docker build FAILED!"
  echo ""
  echo "Build output:"
  cat "$BUILD_OUTPUT"
  echo ""
  print_error "Please check the errors above and fix them."
  rm -f "$BUILD_OUTPUT"
  exit 1
fi

print_success "Docker image built successfully: $IMAGE_NAME"

# Verify image exists
if ! docker image inspect "$IMAGE_NAME" > /dev/null 2>&1; then
  print_error "Image verification failed - image not found after build"
  exit 1
fi

print_success "Image verification passed"

# Test container startup
print_info "Testing container startup..."
docker rm -f "$CONTAINER_NAME" 2>/dev/null || true

if docker run -d \
  --name "$CONTAINER_NAME" \
  -p ${PORT}:${PORT} \
  "$IMAGE_NAME" > /dev/null 2>&1; then
  
  # Wait a moment for container to start
  sleep 2
  
  # Check if container is running
  if docker ps | grep -q "$CONTAINER_NAME"; then
    print_success "Container started successfully"
    
    # Check container logs for errors
    print_info "Checking container logs for errors..."
    LOGS=$(docker logs "$CONTAINER_NAME" 2>&1 | head -20)
    
    if echo "$LOGS" | grep -qi "error\|failed\|fatal"; then
      print_warning "Potential errors found in container logs:"
      echo "$LOGS"
    else
      print_success "No errors found in container logs"
    fi
    
    # Stop the test container
    docker stop "$CONTAINER_NAME" > /dev/null 2>&1 || true
    docker rm "$CONTAINER_NAME" > /dev/null 2>&1 || true
  else
    print_error "Container failed to start"
    docker logs "$CONTAINER_NAME" 2>&1 || true
    exit 1
  fi
else
  print_error "Failed to start test container"
  exit 1
fi

# Cleanup
rm -f "$BUILD_OUTPUT"

print_success "=========================================="
print_success "Docker build verification PASSED"
print_success "=========================================="
print_info "Image: $IMAGE_NAME"
print_info "To run: docker run -p ${PORT}:${PORT} $IMAGE_NAME"
print_info "To push: docker tag $IMAGE_NAME <registry>/<image>:<tag>"
