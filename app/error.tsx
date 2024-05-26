"use client";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div>
      <h2>Something went wrong - {error.message}</h2>
      <button onClick={reset}>Try again</button>
    </div>
  );
}
