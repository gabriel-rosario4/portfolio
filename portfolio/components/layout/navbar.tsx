"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Download, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { nav, site } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Sticky navigation.
 *
 * Starts transparent over the hero and gains a background once the page has
 * scrolled, so the top of the site reads as one uninterrupted image.
 */
export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile sheet whenever the route changes — including on browser
  // back/forward. Adjusting state during render (rather than in an effect)
  // avoids a frame where the sheet is still open over the new page.
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  // Lock the page behind the open sheet.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-[background-color,border-color,backdrop-filter]",
        "duration-300 ease-soft",
        scrolled || open
          ? "border-b border-line bg-canvas/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <nav
        aria-label="Main"
        className="container-page flex h-18 items-center justify-between gap-6"
      >
        <Link
          href="/"
          className="group flex items-center gap-0.5 font-display text-xl font-bold tracking-[-0.03em] text-ink"
        >
          {site.initials}
          <span className="text-mint transition-colors duration-200 group-hover:text-brand-soft">
            .
          </span>
          <span className="sr-only">{site.name} — home</span>
        </Link>

        {/* --- Desktop links --- */}
        <ul className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "relative rounded-pill px-3.5 py-2 text-sm font-medium",
                  "transition-colors duration-200",
                  isActive(item.href)
                    ? "text-ink"
                    : "text-ink-muted hover:text-ink",
                )}
              >
                {item.label}
                {isActive(item.href) && (
                  <span
                    aria-hidden
                    className="absolute inset-x-3.5 -bottom-px h-px bg-gradient-to-r from-transparent via-mint to-transparent"
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Button
            href={site.resumePath}
            variant="secondary"
            size="sm"
            download
            className="hidden sm:inline-flex"
          >
            Download Resume
            <Download aria-hidden className="size-4" />
          </Button>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-10 place-items-center rounded-pill border border-line-strong text-ink-muted transition-colors hover:text-ink md:hidden"
          >
            {open ? (
              <X aria-hidden className="size-5" />
            ) : (
              <Menu aria-hidden className="size-5" />
            )}
          </button>
        </div>
      </nav>

      {/* --- Mobile sheet --- */}
      <div
        id="mobile-nav"
        hidden={!open}
        className="border-t border-line bg-canvas md:hidden"
      >
        <ul className="container-page flex flex-col py-4">
          {nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "block border-b border-line py-3.5 text-lg font-medium transition-colors",
                  isActive(item.href) ? "text-mint" : "text-ink-muted",
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li className="pt-5">
            <Button
              href={site.resumePath}
              variant="primary"
              size="md"
              download
              className="w-full"
            >
              Download Resume
              <Download aria-hidden className="size-4" />
            </Button>
          </li>
        </ul>
      </div>
    </header>
  );
}
