# Sales Reports App

Next.js-based sales analytics and reporting application for Pulse Healthcare Supplies. Provides comprehensive sales reports, analytics dashboards, and business intelligence.

## Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Setup & Installation](#setup--installation)
4. [Environment Variables](#environment-variables)
5. [Docker](#docker)
6. [Local Development](#local-development)
7. [Testing](#testing)
8. [Production Deployment](#production-deployment)
9. [Features](#features)
10. [Usage](#usage)
11. [GraphQL Codegen](#graphql-codegen)
12. [Troubleshooting](#troubleshooting)

---

## Overview

The Sales Reports App is a Next.js 15 application designed for sales teams and management to view comprehensive sales analytics, generate reports, and track business performance.

**Port:** 3004  
**Technology:** Next.js 15, TypeScript, Apollo Client, HeroUI, Tailwind CSS, Recharts

**Key Features:**
- Sales dashboard with key metrics
- Revenue analytics
- Product performance reports
- Customer analytics
- Order analytics
- Exportable reports (Excel, PDF)
- Real-time data updates
- Custom date range filtering

---

## Prerequisites

| Requirement | Version |
|-------------|---------|
| Node.js | 20+ |
| npm | 10+ |
| Backend API | Running (API Gateway on port 8000) |

Optional: Docker / Docker Compose for containerized run.

---

## Setup & Installation

### Option A: Local Development (npm)

**1. Navigate to sales-reports-app directory**

```bash
cd pulse-health-supplies-frontend/sales-reports-app
```

**2. Install dependencies**

```bash
npm install --legacy-peer-deps
```

**3. Configure environment variables**

```bash
cp .env.local.example .env.local
# Edit .env.local with your configuration (see Environment Variables section)
```

**4. Ensure backend is running**

The Sales Reports App requires:
- API Gateway running on port 8000
- Pulse Core backend running on port 8001

**5. Generate GraphQL types (optional, but recommended)**

```bash
npm run codegen
```

**6. Run development server**

```bash
npm run dev
```

The app will be available at `http://localhost:3004`

### Option B: Docker

**1. From frontend root directory**

```bash
cd pulse-health-supplies-frontend
cp sales-reports-app/.env.local.example sales-reports-app/.env.local
# Edit sales-reports-app/.env.local if needed
docker-compose -f docker-compose.local.yml up sales-reports-app
```

**2. Or build and run standalone**

```bash
cd sales-reports-app
docker build \
  --build-arg NEXT_PUBLIC_API_URL=http://localhost:8000 \
  --build-arg NEXT_PUBLIC_GRAPHQL_ENDPOINT=http://localhost:8000/graphql/sales-reports \
  --build-arg NEXT_PUBLIC_WS_ENDPOINT=ws://localhost:8000/graphql \
  --build-arg NEXT_PUBLIC_APP_URL=http://localhost:3004 \
  -t pulse-sales-reports-app:local .
docker run -p 3004:3004 pulse-sales-reports-app:local
```

---

## Environment Variables

Copy `.env.local.example` to `.env.local` and configure:

### API Gateway Configuration

```bash
NEXT_PUBLIC_API_GATEWAY_URL=http://localhost:8000
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### GraphQL Endpoints

```bash
NEXT_PUBLIC_GRAPHQL_ENDPOINT=http://localhost:8000/graphql/sales-reports
NEXT_PUBLIC_GRAPHQL_URL=http://localhost:8000/graphql/sales-reports
```

### WebSocket Configuration

```bash
NEXT_PUBLIC_WS_ENDPOINT=ws://localhost:8000/graphql
NEXT_PUBLIC_WS_ENABLED=true
```

### Application URLs

```bash
NEXT_PUBLIC_APP_URL=http://localhost:3004
NEXT_PUBLIC_BASE_URL=http://localhost:3004
```

### Next.js Server Actions (Production)

```bash
# Generate once: openssl rand -base64 32
# Must be set at BUILD and RUNTIME (same value)
NEXT_SERVER_ACTIONS_ENCRYPTION_KEY=your-generated-key-here
```

### Environment

```bash
NODE_ENV=development
NEXT_PUBLIC_ENVIRONMENT=development
```

**Important:** All `NEXT_PUBLIC_*` variables are baked into the client bundle at build time. Rebuild after changing these values.

---

## Docker

### Development

```bash
docker build \
  --build-arg NEXT_PUBLIC_API_URL=http://localhost:8000 \
  --build-arg NEXT_PUBLIC_GRAPHQL_ENDPOINT=http://localhost:8000/graphql/sales-reports \
  --build-arg NEXT_PUBLIC_WS_ENDPOINT=ws://localhost:8000/graphql \
  --build-arg NEXT_PUBLIC_APP_URL=http://localhost:3004 \
  -t pulse-sales-reports-app:dev .
docker run -p 3004:3004 pulse-sales-reports-app:dev
```

### Production

```bash
docker build \
  --build-arg NEXT_PUBLIC_API_URL=https://api.yourdomain.com \
  --build-arg NEXT_PUBLIC_GRAPHQL_ENDPOINT=https://api.yourdomain.com/graphql/sales-reports \
  --build-arg NEXT_PUBLIC_WS_ENDPOINT=wss://api.yourdomain.com/graphql \
  --build-arg NEXT_PUBLIC_APP_URL=https://reports.yourdomain.com \
  --build-arg NEXT_SERVER_ACTIONS_ENCRYPTION_KEY=your-production-key \
  -t pulse-sales-reports-app:prod .
docker run -p 3004:3004 pulse-sales-reports-app:prod
```

---

## Local Development

### Running Development Server

```bash
npm run dev
```

### Running with GraphQL Codegen Watch

```bash
npm run codegen:watch
```

### Type Checking

```bash
npm run type-check
```

### Linting

```bash
npm run lint
```

---

## Testing

### Run Tests

```bash
npm test
```

### Run Tests in Watch Mode

```bash
npm run test:watch
```

---

## Production Deployment

### Build for Production

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

### AWS Deployment

1. **Set production environment variables**

```bash
cp .env.local.example .env.production
# Edit .env.production with production values:
# - NEXT_PUBLIC_API_URL=https://api.yourdomain.com
# - NEXT_PUBLIC_GRAPHQL_ENDPOINT=https://api.yourdomain.com/graphql/sales-reports
# - NEXT_PUBLIC_APP_URL=https://reports.yourdomain.com
# - NEXT_SERVER_ACTIONS_ENCRYPTION_KEY=<generated-key>
```

2. **Build production image**

```bash
docker build \
  --build-arg NEXT_PUBLIC_API_URL=https://api.yourdomain.com \
  --build-arg NEXT_PUBLIC_GRAPHQL_ENDPOINT=https://api.yourdomain.com/graphql/sales-reports \
  --build-arg NEXT_PUBLIC_WS_ENDPOINT=wss://api.yourdomain.com/graphql \
  --build-arg NEXT_PUBLIC_APP_URL=https://reports.yourdomain.com \
  --build-arg NEXT_SERVER_ACTIONS_ENCRYPTION_KEY=<your-key> \
  -t pulse-sales-reports-app:prod .
```

3. **Deploy to ECS/EC2**

Use your deployment pipeline or manually deploy the Docker image.

---

## Features

### Sales Dashboard

- Total revenue metrics
- Order count and trends
- Average order value
- Revenue by period (daily, weekly, monthly)
- Growth percentage indicators

### Revenue Analytics

- Revenue trends over time
- Revenue by product category
- Revenue by customer segment (B2B/B2C)
- Revenue by warehouse
- Revenue comparison (period over period)

### Product Performance

- Top-selling products
- Product revenue ranking
- Product sales trends
- Low-performing products
- Product category performance

### Customer Analytics

- Customer count and growth
- Customer lifetime value
- Top customers by revenue
- Customer acquisition trends
- Customer retention metrics

### Order Analytics

- Order volume trends
- Order status distribution
- Average order value trends
- Order fulfillment rates
- Order cancellation rates

### Report Export

- Export to Excel (.xlsx)
- Export to PDF
- Custom date range selection
- Filtered report export

### Real-time Updates

- WebSocket subscriptions for live data
- Real-time revenue updates
- Order count updates
- Dashboard auto-refresh

---

## Usage

### Authentication

Sales team members and management must log in with appropriate credentials. Authentication is handled via JWT tokens.

### Viewing Reports

1. Select report type from dashboard
2. Choose date range
3. Apply filters (if available)
4. View report data and charts
5. Export report if needed

### Custom Date Ranges

1. Click date range selector
2. Choose predefined range or custom dates
3. Reports update automatically
4. Data refreshes based on selected range

### Exporting Reports

1. Generate report with desired filters
2. Click export button
3. Choose format (Excel or PDF)
4. Download file

### GraphQL Queries

Example query for sales data:

```graphql
query GetSalesReport($startDate: Date!, $endDate: Date!) {
  salesReport(startDate: $startDate, endDate: $endDate) {
    totalRevenue
    orderCount
    averageOrderValue
    revenueByCategory {
      category
      revenue
    }
    revenueByPeriod {
      date
      revenue
    }
  }
}
```

---

## GraphQL Codegen

### Generate Types

```bash
npm run codegen
```

### Generate Sales Reports Types

```bash
npm run codegen:sales-reports
```

### Generate Auth Types

```bash
npm run codegen:auth
```

### Sync Schema and Generate Types

```bash
npm run codegen:sync
```

### Watch Mode (Auto-regenerate on schema changes)

```bash
npm run codegen:watch
```

---

## Troubleshooting

### API connection errors

**Error:** `Failed to fetch` or `Network error`

**Solution:**
1. Ensure API Gateway is running on port 8000
2. Check `NEXT_PUBLIC_API_URL` in `.env.local`
3. Verify CORS is configured correctly on backend
4. Check authentication token is valid

### Report data not loading

**Error:** `No data available` or reports empty

**Solution:**
1. Verify date range is valid
2. Check backend has data for selected period
3. Verify GraphQL query is correct
4. Check backend logs for query errors

### Chart rendering errors

**Error:** Charts not displaying or rendering incorrectly

**Solution:**
1. Check browser console for errors
2. Verify Recharts library is installed
3. Check data format matches chart expectations
4. Verify date formatting is correct

### Export functionality not working

**Error:** Export button doesn't work or file doesn't download

**Solution:**
1. Check ExcelJS library is installed (for Excel export)
2. Verify browser allows downloads
3. Check backend supports export endpoints (if applicable)
4. Verify file generation logic is correct

### Build errors

**Error:** `Module not found` or `Type errors`

**Solution:**
1. Run `npm install --legacy-peer-deps`
2. Run `npm run codegen` to generate types
3. Run `npm run type-check` to identify type errors
4. Clear `.next` folder and rebuild: `rm -rf .next && npm run build`

### Real-time updates not working

**Error:** Dashboard not updating in real-time

**Solution:**
1. Check WebSocket connection is active
2. Verify `NEXT_PUBLIC_WS_ENABLED=true` in `.env.local`
3. Check WebSocket URL uses `ws://` (or `wss://` in production)
4. Verify backend WebSocket subscriptions are working

---

## License

Proprietary – Pulse Healthcare Supplies
