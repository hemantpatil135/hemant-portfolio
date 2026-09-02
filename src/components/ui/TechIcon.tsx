import type { IconName } from "@/lib/data";

/**
 * Lightweight inline SVG glyphs for each technology.
 * Kept simple and self-contained (no icon CDN) so the tech grid stays fast.
 */
export function TechIcon({
  name,
  className = "h-8 w-8",
  style,
}: {
  name: IconName;
  className?: string;
  style?: React.CSSProperties;
}) {
  const common = { className, style, viewBox: "0 0 24 24", fill: "none" as const };
  switch (name) {
    case "react":
      return (
        <svg {...common} stroke="currentColor" strokeWidth={1.5}>
          <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" />
          <ellipse cx="12" cy="12" rx="10" ry="4" />
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
        </svg>
      );
    case "next":
      return (
        <svg {...common} stroke="currentColor" strokeWidth={1.5}>
          <circle cx="12" cy="12" r="10" />
          <path d="M8 8v8M8 8l8 10" strokeLinecap="round" />
          <path d="M15.5 8v5" strokeLinecap="round" />
        </svg>
      );
    case "typescript":
      return (
        <svg {...common} fill="currentColor">
          <rect x="2" y="2" width="20" height="20" rx="4" opacity="0.15" />
          <path d="M6 10h6v1.7H9.9V18H8.1v-6.3H6V10z" />
          <path d="M13 16.4c.5.3 1.2.6 2 .6.7 0 1.1-.3 1.1-.8 0-.4-.3-.7-1.2-1-1.3-.5-2-1.1-2-2.2 0-1.3 1-2.2 2.7-2.2.8 0 1.4.2 1.9.4l-.4 1.5c-.3-.1-.8-.4-1.5-.4s-1 .3-1 .7c0 .5.4.7 1.3 1 1.4.5 2 1.2 2 2.3 0 1.3-1 2.3-2.9 2.3-.8 0-1.6-.2-2-.5l.4-1.5z" />
        </svg>
      );
    case "javascript":
      return (
        <svg {...common} fill="currentColor">
          <rect x="2" y="2" width="20" height="20" rx="4" opacity="0.15" />
          <path d="M8 10v4.3c0 1.6-.7 2.4-2 2.4-.7 0-1.3-.3-1.6-.7l.8-1c.2.3.5.4.7.4.4 0 .6-.2.6-.9V10H8z" />
          <path d="M12.4 15.2c.4.3 1 .6 1.6.6.6 0 .9-.2.9-.6s-.3-.5-1-.8c-1-.4-1.7-.9-1.7-1.9 0-1 .8-1.8 2-1.8.6 0 1.1.1 1.5.3l-.4 1.2c-.2-.1-.6-.3-1.1-.3-.5 0-.8.2-.8.5s.3.5 1.1.8c1.1.4 1.6.9 1.6 1.9 0 1-.8 1.9-2.2 1.9-.6 0-1.3-.2-1.6-.4l.1-1.4z" />
        </svg>
      );
    case "redux":
      return (
        <svg {...common} stroke="currentColor" strokeWidth={1.5}>
          <path d="M9 15c-2-1-3-2.5-3-4.5C6 8 8 6.5 10.5 6.5" strokeLinecap="round" />
          <path d="M14 8c2 .5 3.5 2 3.5 4 0 2.2-2 3.7-4.5 3.7" strokeLinecap="round" />
          <path d="M12 18c-2 0-3.7-.8-4.5-2" strokeLinecap="round" />
          <circle cx="15" cy="7" r="1.6" fill="currentColor" stroke="none" />
          <circle cx="6.5" cy="15.5" r="1.6" fill="currentColor" stroke="none" />
          <circle cx="12" cy="18.5" r="1.6" fill="currentColor" stroke="none" />
        </svg>
      );
    case "tailwind":
      return (
        <svg {...common} fill="currentColor">
          <path d="M12 6c-2.7 0-4.3 1.3-5 4 1-1.3 2.2-1.8 3.5-1.5.7.2 1.3.8 1.9 1.4.9 1 2 2.1 4.1 2.1 2.7 0 4.3-1.3 5-4-1 1.3-2.2 1.8-3.5 1.5-.7-.2-1.3-.8-1.9-1.4C15.2 7.1 14.1 6 12 6z" />
          <path d="M7 12c-2.7 0-4.3 1.3-5 4 1-1.3 2.2-1.8 3.5-1.5.7.2 1.3.8 1.9 1.4.9 1 2 2.1 4.1 2.1 2.7 0 4.3-1.3 5-4-1 1.3-2.2 1.8-3.5 1.5-.7-.2-1.3-.8-1.9-1.4C10.2 13.1 9.1 12 7 12z" />
        </svg>
      );
    case "mui":
      return (
        <svg {...common} fill="currentColor">
          <path d="M2 6l5 3v5l-3-1.7v-3L2 12V6z" opacity="0.9" />
          <path d="M22 6l-9 5.2v3L22 9V6z" />
          <path d="M7 9l6 3.5 4-2.3V6l-4 2.3L7 5v4z" opacity="0.6" />
        </svg>
      );
    case "styled":
      return (
        <svg {...common} stroke="currentColor" strokeWidth={1.5}>
          <circle cx="12" cy="12" r="9" />
          <path d="M8 9c1-1 3-1 4 0M9 14c1 1 3 1 4-.5" strokeLinecap="round" />
          <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
        </svg>
      );
    case "sass":
      return (
        <svg {...common} fill="currentColor">
          <circle cx="12" cy="12" r="9" opacity="0.15" />
          <path d="M15 10.5c-1.5-.6-3-.3-3 .8 0 1.4 3.5 1.2 3.5 3.2 0 1.3-1.4 2-2.8 1.8M9 9c-1.3.3-2.2 1-2.2 1.9 0 1.6 3 1.4 3 2.9 0 .8-.9 1.3-1.9 1.2" strokeLinecap="round" stroke="currentColor" fill="none" strokeWidth={1.3} />
        </svg>
      );
    case "bootstrap":
      return (
        <svg {...common} stroke="currentColor" strokeWidth={1.5}>
          <rect x="3" y="4" width="18" height="16" rx="4" />
          <path d="M9 8h3.5c1.3 0 2 .7 2 1.7 0 1-.7 1.5-1.6 1.6.9.1 1.8.6 1.8 1.8 0 1.2-.9 1.9-2.3 1.9H9V8z" strokeLinejoin="round" />
        </svg>
      );
    case "html":
      return (
        <svg {...common} stroke="currentColor" strokeWidth={1.5}>
          <path d="M5 3l1.4 15.5L12 20l5.6-1.5L19 3H5z" strokeLinejoin="round" />
          <path d="M8 7h8l-.4 3.5H9m6.4 0l-.4 4-3 .9-3-.9-.2-2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "css":
      return (
        <svg {...common} stroke="currentColor" strokeWidth={1.5}>
          <path d="M5 3l1.4 15.5L12 20l5.6-1.5L19 3H5z" strokeLinejoin="round" />
          <path d="M8 7h8m-.3 3H9m6.4 0l-.4 4-3 .9-3-.9-.15-1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "jest":
      return (
        <svg {...common} fill="currentColor">
          <circle cx="12" cy="7" r="2.2" />
          <path d="M12 9v6M8 12c0 2.2 1.8 4 4 4s4-1.8 4-4" stroke="currentColor" strokeWidth={1.5} fill="none" strokeLinecap="round" />
          <circle cx="8" cy="12" r="1.4" />
          <circle cx="16" cy="12" r="1.4" />
        </svg>
      );
    case "git":
      return (
        <svg {...common} stroke="currentColor" strokeWidth={1.5}>
          <path d="M6 6v8M6 6a1.8 1.8 0 100-.1M6 14a1.8 1.8 0 100 .1M6 10h6m0 0a1.8 1.8 0 100 .1M12 10V7l4-3" strokeLinecap="round" />
          <circle cx="6" cy="6" r="1.8" />
          <circle cx="6" cy="15" r="1.8" />
          <circle cx="12" cy="10" r="1.8" />
        </svg>
      );
    case "api":
      return (
        <svg {...common} stroke="currentColor" strokeWidth={1.5}>
          <path d="M8 8l-4 4 4 4M16 8l4 4-4 4M13 5l-2 14" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "node":
      return (
        <svg {...common} stroke="currentColor" strokeWidth={1.5}>
          <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" strokeLinejoin="round" />
          <path d="M10 15c0 1 .6 1.5 1.7 1.5 1.2 0 1.8-.6 1.8-1.6 0-1-.6-1.4-2-1.7-1.2-.3-1.6-.6-1.6-1.3 0-.8.6-1.3 1.7-1.3.9 0 1.5.3 1.7 1" strokeLinecap="round" />
        </svg>
      );
    case "angular":
      return (
        <svg {...common} stroke="currentColor" strokeWidth={1.5}>
          <path d="M12 2.5l8.5 3-1.3 11.2L12 21.5l-7.2-4.8L3.5 5.5l8.5-3z" strokeLinejoin="round" />
          <path d="M9 15l3-7.5 3 7.5M10.1 12.6h3.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "mysql":
      return (
        <svg {...common} stroke="currentColor" strokeWidth={1.5}>
          <ellipse cx="12" cy="6" rx="7" ry="3" />
          <path d="M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6" strokeLinecap="round" />
          <path d="M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3" strokeLinecap="round" />
        </svg>
      );
    case "mongodb":
      return (
        <svg {...common} stroke="currentColor" strokeWidth={1.5}>
          <path d="M12 2.5c3.5 4 5.5 7 5.5 10.2 0 3.4-2.4 6-5.5 7.3-3.1-1.3-5.5-3.9-5.5-7.3C6.5 9.5 8.5 6.5 12 2.5z" strokeLinejoin="round" />
          <path d="M12 6v15.5" strokeLinecap="round" />
        </svg>
      );
    default:
      return (
        <svg {...common} stroke="currentColor" strokeWidth={1.5}>
          <circle cx="12" cy="12" r="9" />
        </svg>
      );
  }
}
