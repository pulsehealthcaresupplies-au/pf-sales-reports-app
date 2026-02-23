import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md text-center">
        <h1 className="mb-2 text-4xl font-bold text-foreground">404</h1>
        <h2 className="mb-2 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mb-6 text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
          >
            Home
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-input bg-background px-4 py-2 hover:bg-accent hover:text-accent-foreground"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
