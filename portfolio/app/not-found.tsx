import { ArrowRight, Home } from "lucide-react";

import { StarField } from "@/components/illustrations/doodles";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden">
      <StarField
        aria-hidden
        className="absolute inset-0 text-ink opacity-30"
        count={40}
        seed={9}
      />

      <div className="container-page relative flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
        {/* A small boat, adrift. Nothing else on this page needs to be clever. */}
        <svg
          viewBox="0 0 200 120"
          fill="none"
          aria-hidden
          className="mb-10 h-28 w-48 animate-float"
        >
          <path
            d="M40 78h120l-14 22H54L40 78Z"
            fill="#123454"
            stroke="#1D5E70"
            strokeWidth="2"
          />
          <path d="M98 74V20l42 54H98Z" fill="#1B6FA8" opacity="0.85" />
          <path d="M92 74V32L58 74h34Z" fill="#2E9E9B" opacity="0.7" />
          <path d="M95 74V14" stroke="#F5F7FA" strokeWidth="2.5" strokeLinecap="round" />
          <g stroke="#4F8CFF" strokeWidth="2" strokeLinecap="round" opacity="0.5">
            <path d="M18 108c12-6 24-6 36 0s24 6 36 0" />
            <path d="M110 108c12-6 24-6 36 0s24 6 36 0" />
          </g>
          <circle cx="164" cy="26" r="10" fill="#FFD166" opacity="0.9" />
        </svg>

        <p className="text-eyebrow uppercase text-brand-soft">404</p>

        <h1 className="text-heading sm:text-title mt-4 text-ink">
          This page drifted off
        </h1>

        <p className="text-lead mt-4 max-w-md text-ink-muted">
          The link is broken or the page moved. Here are two better places to
          be.
        </p>

        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Button href="/" variant="primary" size="lg">
            <Home aria-hidden className="size-4" />
            Back home
          </Button>
          <Button href="/projects" variant="secondary" size="lg">
            Browse projects
            <ArrowRight aria-hidden className="size-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
