/**
 * Logo HACKCBA — mark "/" vectorial + wordmark en la fuente del sitio.
 * Usa currentColor, así se adapta a dark/light por inversión.
 */
export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <svg
        viewBox="0 0 40 96"
        aria-hidden="true"
        className="h-[1.1em] w-auto shrink-0"
        fill="currentColor"
      >
        <path d="M2 88 L14 88 L38 8 L26 8 Z" />
      </svg>
      <span className="font-display text-xl font-semibold tracking-tight">
        Hackcba
      </span>
    </span>
  );
}
