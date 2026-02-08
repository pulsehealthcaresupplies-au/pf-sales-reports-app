/**
 * Pulse Health Loader – logo on top, simple left-to-right progress bar, custom message below.
 * Same professional pattern across all apps for route transitions and loading contexts.
 */

'use client';

const PULSE_TEAL = '#0e9fb8';

export interface LoaderProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  text?: string;
  fullScreen?: boolean;
}

const sizePx = { sm: 32, md: 48, lg: 64, xl: 96 };

function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(' ');
}

const LOGO_SRC = '/assets/pulse-logo.png';

export function PulseHealthLoader({
  size = 'md',
  className = '',
  text,
  fullScreen = false,
}: LoaderProps) {
  const barWidth = sizePx[size] * 2.5;
  const logoWidth = Math.min(sizePx[size] * 2, 160);

  const content = (
    <div className={cn('flex flex-col items-center justify-center gap-5', className)}>
      <img
        src={LOGO_SRC}
        alt="Pulse Health"
        className="object-contain flex-shrink-0"
        style={{ width: logoWidth, height: 'auto' }}
      />
      <div
        className="relative overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700"
        style={{ width: barWidth, height: 4 }}
      >
        <div
          className="loading-bar absolute inset-y-0 rounded-full"
          style={{
            width: '30%',
            backgroundColor: PULSE_TEAL,
          }}
        />
      </div>
      <p className="text-sm font-medium text-center text-foreground/80 loading-fade-in max-w-xs min-h-[1.25rem]">
        {text ?? 'Loading...'}
      </p>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm loading-fade-in">
        {content}
      </div>
    );
  }
  return content;
}

export function MedicalPlusLoader(props: LoaderProps) {
  return <PulseHealthLoader {...props} />;
}

export default PulseHealthLoader;

export interface LoadingSpinnerProps extends LoaderProps {}

export function LoadingSpinner(props: LoadingSpinnerProps) {
  return <PulseHealthLoader {...props} />;
}

export function PageLoading({ text = 'Loading...' }: { text?: string }) {
  return (
    <div className="min-h-[50vh] flex items-center justify-center loading-fade-in">
      <LoadingSpinner size="lg" text={text} />
    </div>
  );
}

export function InlineLoading({ text }: { text?: string }) {
  return <LoadingSpinner size="sm" text={text} />;
}
