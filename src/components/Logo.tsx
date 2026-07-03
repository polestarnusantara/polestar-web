export function LogoDefs() {
  return (
    <svg width="0" height="0" aria-hidden="true" style={{ position: "absolute" }}>
      <defs>
        <linearGradient id="silverGrad" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0" stopColor="#F4F7FA" />
          <stop offset="0.45" stopColor="#C4CDD8" />
          <stop offset="1" stopColor="#8B97A5" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function Logo({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path
        d="M16 1 L18.7 13.3 L31 16 L18.7 18.7 L16 31 L13.3 18.7 L1 16 L13.3 13.3 Z"
        fill="url(#silverGrad)"
        stroke="#AEB8C4"
        strokeWidth={0.5}
      />
      <path
        d="M16 6.6 L17.5 14.5 L25.4 16 L17.5 17.5 L16 25.4 L14.5 17.5 L6.6 16 L14.5 14.5 Z"
        fill="#2563EB"
      />
    </svg>
  );
}
