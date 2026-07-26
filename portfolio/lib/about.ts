/**
 * The About page's content, kept out of the component so the story can be
 * rewritten without touching layout.
 *
 * This is deliberately *not* a résumé. Job titles and dates live in the PDF;
 * what goes here is the reasoning — why each move happened, and what changed
 * because of it.
 */

export type Chapter = {
  period: string;
  title: string;
  org?: string;
  body: string;
  /** Turning points get a filled node on the rail. */
  pivotal?: boolean;
};

export const chapters: Chapter[] = [
  {
    period: "The beginning",
    title: "A spreadsheet that got out of hand",
    body: "I started programming because I wanted to settle an argument about basketball. I had a spreadsheet tracking player efficiency, it grew past what spreadsheets should do, and someone told me the word for what I actually needed was “a script”. I have been chasing that feeling — the problem being slightly bigger than the tool — ever since.",
    pivotal: true,
  },
  {
    period: "Early career",
    title: "Learning that shipping is a skill",
    org: "Backend engineering",
    body: "My first few years were backend work: APIs, queues, databases, the unglamorous machinery under other people's features. I learned that writing the code is the easy half, and that the engineers I admired were the ones whose systems were still comprehensible a year later.",
  },
  {
    period: "The turn",
    title: "Why I went back for the AI degree",
    org: "M.S. in Artificial Intelligence",
    body: "I kept hitting problems where the answer was statistical rather than deterministic, and I could feel myself guessing. A master's was the slow, expensive way to stop guessing — and the part that stuck was not the models but the discipline of evaluation: how you know whether something actually works.",
    pivotal: true,
  },
  {
    period: "Since",
    title: "Building where the two meet",
    org: "Senior Software Engineer",
    body: "Most of my work now lives at the seam between machine learning and the systems that keep it honest — data pipelines, feature correctness, serving infrastructure, and the interfaces that let people tell a good prediction from a confident one. It turns out the backend years were the prerequisite, not a detour.",
  },
  {
    period: "Now",
    title: "What I'm chasing",
    body: "I want to build products where the intelligence is invisible and the usefulness is obvious. The best compliment a system of mine has ever received was someone not noticing it was doing anything clever.",
  },
];

export type Interest = {
  icon: "golf" | "brain" | "automation" | "basketball" | "book" | "learning";
  title: string;
  body: string;
};

export const interests: Interest[] = [
  {
    icon: "golf",
    title: "Golf",
    body: "A game that punishes overthinking, which makes it excellent practice for someone who does a lot of it.",
  },
  {
    icon: "basketball",
    title: "Basketball analytics",
    body: "The original reason I learned to code, and still the domain where I test every new idea first.",
  },
  {
    icon: "brain",
    title: "AI, applied",
    body: "Less interested in what models can do in a demo than in what they can do reliably, on a Tuesday, with real data.",
  },
  {
    icon: "automation",
    title: "Automation",
    body: "If I've done something tedious three times, the fourth time is a script. This is occasionally a net loss and always satisfying.",
  },
  {
    icon: "book",
    title: "Reading",
    body: "Mostly non-fiction, mostly outside software — the useful ideas tend to arrive from somewhere else.",
  },
  {
    icon: "learning",
    title: "Learning in public",
    body: "Writing things down is how I find out whether I actually understood them. Usually I didn't, at first.",
  },
];

/** Short, opinionated statements of how I like to work. */
export const principles = [
  {
    title: "Make the mistake impossible",
    body: "Conventions decay and vigilance has bad days. If something must not happen, the system should refuse it, not remind you.",
  },
  {
    title: "Optimise for the second reader",
    body: "Code is read far more than written, usually by someone with less context — often me, later.",
  },
  {
    title: "Be suspicious of good news",
    body: "Every genuinely surprising result I've produced has, so far, turned out to be a bug. Look for the leak before taking the credit.",
  },
];
