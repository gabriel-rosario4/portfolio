/**
 * Single source of truth for identity, navigation and the small pieces of
 * copy that appear in more than one place. Editing the portfolio's "facts"
 * should never require touching a component.
 */

export const site = {
  name: "Gabriel Rosario",
  initials: "GR",
  role: "Senior Software Engineer",
  tagline:
    "I build software that transforms complex ideas into products people love using.",
  description:
    "Senior Software Engineer with 6+ years of experience and an M.S. in Artificial Intelligence. I design and ship AI-powered products and the scalable systems behind them.",
  // Used for canonical URLs, OG images, sitemap and RSS. Override in prod.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://gabrielrosario.dev",
  locale: "en_US",
  email: "gabriel.rosario2015@gmail.com",
  resumePath: "/resume.pdf",
  location: "United States",
  yearsOfExperience: "6+",
  degree: "M.S. in Artificial Intelligence",
} as const;

export const nav = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/writing", label: "Writing" },
  { href: "/about", label: "About" },
] as const;

export type SocialId = "linkedin" | "email";

export const socials: {
  id: SocialId;
  label: string;
  href: string;
  handle: string;
}[] = [
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/gabrielrosario",
    handle: "in/gabrielrosario",
  },
  {
    id: "email",
    label: "Email",
    href: `mailto:${site.email}`,
    handle: site.email,
  },
];

/**
 * The portrait shown inside the hero illustration.
 *
 * Drop a square image at `public/portraits/gabriel.jpg` and flip `enabled` to
 * true. Until then the hero renders an illustrated stand-in that belongs to
 * the same visual world, so the page never looks unfinished.
 */
export const portrait = {
  enabled: false,
  src: "/portraits/gabriel.jpg",
  alt: `${site.name}, ${site.role}`,
} as const;
