/**
 * Route-level loading state shown while the page segment is being prepared.
 * Matches the site's dark, amber-accented design language.
 */
export default function Loading() {
  return (
    <div
      className="grid min-h-screen place-items-center bg-background"
      role="status"
      aria-label="Loading"
    >
      <div className="flex flex-col items-center gap-5">
        <span className="relative grid h-12 w-12 place-items-center">
          <span className="absolute inset-0 animate-ping rounded-2xl bg-accent/30" />
          <span className="relative h-12 w-12 animate-pulse rounded-2xl bg-gradient-to-br from-accent to-amber-600" />
        </span>
        <p className="text-sm text-white/45">Loading…</p>
      </div>
    </div>
  );
}
