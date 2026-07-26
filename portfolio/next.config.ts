import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // MDX files are content, not routes — they're imported by [slug] pages.
  // `pageExtensions` still needs them so the loader is wired up.
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

const withMDX = createMDX({
  options: {
    // Turbopack can't receive JS functions across the Rust boundary, so every
    // plugin is referenced by name with serializable options only.
    remarkPlugins: [
      "remark-gfm",
      "remark-frontmatter",
      ["remark-mdx-frontmatter", { name: "frontmatter" }],
    ],
    rehypePlugins: [
      "rehype-slug",
      [
        "rehype-autolink-headings",
        {
          behavior: "append",
          properties: { className: ["heading-anchor"], ariaHidden: true, tabIndex: -1 },
          content: { type: "text", value: "#" },
        },
      ],
      [
        "rehype-pretty-code",
        {
          theme: "github-dark-default",
          // The design system owns the code-block background.
          keepBackground: false,
        },
      ],
    ],
  },
});

export default withMDX(nextConfig);
