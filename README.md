# Sales Reports App

Sales Reports Dashboard for Pulse Healthcare Supplies - A dedicated Next.js application for generating and exporting comprehensive sales reports.

## Features

- **Sales Report**: Revenue, orders, top products, and categories
- **Customer Report**: Customer analytics and lifetime value
- **Product Performance**: Product sales and performance metrics
- **Credit Report**: Credit management and overdue/due soon customers
- **Overdue Customers**: List of customers with overdue credit
- **Due Soon Customers**: List of customers with payments due soon

## Export Functionality

- **CSV Export**: Export any report to CSV format
- **Excel Export**: Export any report to Excel (XLSX) format

## Tech Stack

- Next.js 15
- React 18
- HeroUI (UI Components)
- Apollo Client (GraphQL)
- ExcelJS (Excel export)
- Recharts (Charts)
- TypeScript

## Getting Started

### Prerequisites

- Node.js 20+ and npm
- Backend API Gateway at `http://localhost:8000`

### Installation (from this app directory)

```bash
cd pulse-health-supplies-frontend/sales-reports-app

npm install --legacy-peer-deps

# Create .env.local with:
# NEXT_PUBLIC_API_GATEWAY_URL=http://localhost:8000
# NEXT_PUBLIC_GRAPHQL_ENDPOINT=http://localhost:8000/graphql/sales-reports
```

### From repo root (pulse-health-supplies-frontend)

```bash
cd pulse-health-supplies-frontend
make install-sales-reports
make setup
make dev-sales-reports
```

### Development

```bash
npm run dev
```

The app will be available at **http://localhost:3006**

### Build and production

```bash
npm run build
npm start
```

## Port

This app runs on port **3006** by default.

## Authentication

The app uses the same authentication system as the admin dashboard. Make sure you're logged in to the admin dashboard first, or implement authentication in this app.

## GraphQL Endpoint

The app connects to the dedicated sales reports GraphQL endpoint: `/graphql/sales-reports`

## Report Types

1. **Sales Report**: Comprehensive sales analytics with revenue breakdowns
2. **Customer Report**: Customer metrics and top customers
3. **Product Performance**: Product sales performance
4. **Credit Report**: Credit account management
5. **Overdue Customers**: Customers with overdue payments
6. **Due Soon Customers**: Customers with payments due soon

## 📁 Documentation

- **Historical / app-specific docs**: [archive/2026-01-29-root-cleanup/](archive/2026-01-29-root-cleanup/) (component guide, migration, security, setup).
