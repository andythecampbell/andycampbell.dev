/**
 * Site content as typed data (SPEC.md §7).
 *
 * Sections, links, and artifacts live here rather than in templates so that
 * adding a project or swapping a screenshot is a data edit. That property is
 * load-bearing for the visual gallery in particular — see SPEC.md §9.
 */

export interface NavSection {
  /** Anchor target. Must match the `id` on the corresponding <section>. */
  readonly id: string;
  readonly label: string;
}

export const SECTIONS: readonly NavSection[] = [
  { id: 'now', label: 'Now' },
  { id: 'work', label: 'Work' },
  { id: 'projects', label: 'Projects' },
  { id: 'arc', label: 'Arc' },
  { id: 'stack', label: 'Stack' },
  { id: 'contact', label: 'Contact' },
];

export const SITE = {
  name: 'Andy Campbell',
  role: 'Senior full-stack developer',
  location: 'San Diego, CA',
} as const;

export interface ContactLink {
  readonly label: string;
  readonly href: string;
  /** Shown instead of the raw href where the URL itself is noise. */
  readonly display: string;
  readonly external: boolean;
}

export const CONTACT_LINKS: readonly ContactLink[] = [
  {
    label: 'Email',
    href: 'mailto:andy@andycampbell.dev',
    display: 'andy@andycampbell.dev',
    external: false,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/andythecampbell',
    display: 'github.com/andythecampbell',
    external: true,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/andy-campbell-25982179/',
    display: 'linkedin.com/in/andy-campbell',
    external: true,
  },
];
