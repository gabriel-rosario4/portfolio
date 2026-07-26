import Link from "next/link";

import { WaveMark } from "@/components/illustrations/doodles";
import { NightShore } from "@/components/illustrations/night-shore";
import { SocialLinks } from "@/components/layout/social-links";
import { nav, site, socials } from "@/lib/site";

/**
 * The footer is a destination, not a dead end: a full-bleed night scene, a
 * quote, and the three ways to reach him — sitemap links last, where they
 * belong.
 */
export function Footer() {
  return (
    <footer className="relative mt-32 overflow-hidden border-t border-line">
      {/* Scene sits behind the content and fades up into the canvas. */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-[420px]">
        <NightShore />
        <div className="absolute inset-0 bg-gradient-to-b from-canvas via-canvas/55 to-canvas/85" />
      </div>

      <div className="container-page relative pt-20 pb-10">
        <blockquote className="mx-auto max-w-2xl text-center">
          <p className="font-display text-2xl leading-snug tracking-[-0.02em] text-ink sm:text-3xl">
            “The best software disappears into the experience.”
          </p>
          <WaveMark
            aria-hidden
            className="mx-auto mt-6 h-6 w-24 text-brand-soft"
          />
        </blockquote>

        <div className="mt-20 grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="font-display text-xl font-bold tracking-[-0.03em] text-ink"
            >
              {site.initials}
              <span className="text-mint">.</span>
            </Link>
            <p className="mt-4 max-w-xs leading-relaxed text-ink-muted">
              Building software that solves real problems and improves
              people&apos;s lives.
            </p>
            <SocialLinks className="mt-6" size="sm" />
          </div>

          <nav aria-label="Footer">
            <h2 className="text-eyebrow uppercase text-ink-faint">
              Navigation
            </h2>
            <ul className="mt-4 space-y-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-ink-muted transition-colors hover:text-brand-soft"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={site.resumePath}
                  download
                  className="text-sm text-ink-muted transition-colors hover:text-brand-soft"
                >
                  Resume
                </a>
              </li>
            </ul>
          </nav>

          <div>
            <h2 className="text-eyebrow uppercase text-ink-faint">Connect</h2>
            <ul className="mt-4 space-y-3">
              {socials.map((social) => (
                <li key={social.id}>
                  <a
                    href={social.href}
                    {...(social.id !== "email"
                      ? { target: "_blank", rel: "me noopener noreferrer" }
                      : null)}
                    className="text-sm text-ink-muted transition-colors hover:text-brand-soft"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="/rss.xml"
                  className="text-sm text-ink-muted transition-colors hover:text-brand-soft"
                >
                  RSS
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-line pt-6 text-xs text-ink-faint sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>Let&apos;s build something great together.</p>
        </div>
      </div>
    </footer>
  );
}
