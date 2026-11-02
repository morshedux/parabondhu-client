import type { ReactNode } from "react";

interface Props {
  label: string;
  htmlFor: string;
  error?: string | null;
  children: ReactNode;
}

export default function Field({ label, htmlFor, error, children }: Props) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-semibold">
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 text-sm text-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
