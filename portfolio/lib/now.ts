/**
 * "What I'm up to" — the section most likely to go stale, so it lives alone
 * in a file that takes ten seconds to edit.
 *
 * Update `lastUpdated` when you change a card; the section shows it, which is
 * the only thing that keeps a Now page honest.
 */
export const now = {
  lastUpdated: "2026-07-01",
  cards: [
    {
      id: "building",
      icon: "code",
      title: "Building",
      body: "An AI prediction platform that helps players and analysts make better decisions from messy, real-world sports data.",
    },
    {
      id: "learning",
      icon: "book",
      title: "Learning",
      body: "Deepening my knowledge of LLM agents, evaluation harnesses, and the system design that keeps them reliable.",
    },
    {
      id: "reading",
      icon: "coffee",
      title: "Reading",
      body: "“The Pragmatic Programmer” — a re-read. Different book at six years in than it was at one.",
    },
    {
      id: "listening",
      icon: "music",
      title: "Listening",
      body: "Lo-fi beats while building, and long-form engineering podcasts on the drive to the golf course.",
    },
  ],
} as const;

export type NowCard = (typeof now.cards)[number];
