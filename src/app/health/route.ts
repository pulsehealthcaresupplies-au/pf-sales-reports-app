import { NextResponse } from 'next/server';

/**
 * Health check at /health for ALB/ECS when path is /health.
 */
export async function GET() {
  const health = {
    status: 'healthy',
    service: 'sales-reports-app',
    timestamp: new Date().toISOString(),
  };
  return NextResponse.json(health, { status: 200 });
}

export async function HEAD() {
  return new NextResponse(null, { status: 200 });
}
