# Sales Reports App - Setup Guide

## Quick Start

1. **Install Dependencies**:
   ```bash
   cd pulse-health-supplies-frontend/sales-reports-app
   npm install
   ```

2. **Configure Environment**:
   Create `.env.local`:
```env
NEXT_PUBLIC_API_GATEWAY_URL=http://localhost:8000
NEXT_PUBLIC_GRAPHQL_ENDPOINT=http://localhost:8000/graphql/sales-reports
```

3. **Run Development Server**:
   ```bash
   npm run dev
   ```

4. **Access the App**:
   Open `http://localhost:3006` in your browser

## Features

- ✅ 6 Report Types (Sales, Customer, Product, Credit, Overdue, Due Soon)
- ✅ CSV Export
- ✅ Excel Export (XLSX)
- ✅ HeroUI Components
- ✅ Responsive Design
- ✅ Date Filtering
- ✅ Type Filtering
- ✅ Pagination

## Authentication

The app expects an authentication token in localStorage (`access_token`). You may need to:

1. Log in to the admin dashboard first
2. Or implement authentication in this app

## Port

Default port: **3006**

## Troubleshooting

### TypeScript Errors
If you see TypeScript errors, run:
```bash
npm install
```

### GraphQL Connection Issues
Check that:
- API Gateway is running on port 8000
- GraphQL endpoint is accessible
- Authentication token is present

### Export Not Working
Ensure `exceljs` is installed:
```bash
npm install exceljs
```
