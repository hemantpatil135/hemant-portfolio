import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AuroraBackground } from "@/components/layout/AuroraBackground";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
      <AuroraBackground />
      <p className="eyebrow mb-6">Error 404</p>
      <h1 className="text-[22vw] font-black leading-none text-gradient sm:text-[16rem]">404</h1>
      <p className="mt-4 max-w-md text-balance text-lg text-muted">
        This route drifted out of orbit. The page you were looking for doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="group mt-8 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)] px-6 py-3 font-medium text-ink backdrop-blur-xl transition hover:border-accent/50 hover:shadow-glow-accent"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        Back to home
      </Link>
    </main>
  );
}
