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

/**
 * A before/after pair. The movement is the interesting part — a bare "52%"
 * hides whether that's on a base of thousands or millions (SPEC.md §6.2).
 */
export interface Metric {
  readonly label: string;
  readonly from: string;
  readonly to: string;
  readonly change: string;
}

export const NOW = {
  lede: 'Senior full-stack developer at Stratasys since 2022, building production software for industrial 3D printing.',
  body: 'Mostly .NET and Angular, on systems where what gets ordered is a physical part rather than a row in a database. Most of the work comes down to the same shape: more throughput, less time spent waiting. The numbers below are from the quoting portal redesign I led.',
  /* Two, not five. The resume carries the other three; a wall of percentages
     reads as padding and undercuts the voice. SPEC.md §6.2 */
  metrics: [
    { label: 'Revenue', from: '$2.56M', to: '$3.89M', change: '+52%' },
    { label: 'Checkout', from: '15s', to: '6s', change: '60% faster' },
  ] as readonly Metric[],
} as const;

/**
 * A visual artifact in the work gallery.
 *
 * Kept as data so an artifact can be added, swapped, or removed in one edit —
 * a hard requirement, not a convenience: the DFM capture is employer product UI
 * and has to be pullable in minutes without touching layout (SPEC.md §9).
 */
export interface Artifact {
  readonly src: string;
  readonly alt: string;
  readonly caption: string;
  /**
   * Displayed aspect ratio, as `width/height`. Often narrower than the file's
   * own ratio because the frame crops — see the note on this capture below.
   */
  readonly ratio: string;
}

export const VISUAL_WORK = {
  lede: 'A part gets checked against the process that will actually build it, before anyone quotes a price.',
  body: 'A customer uploads a part and it gets checked against the real constraints of the process that will build it. The thickness analysis comes out of Polygonica, a licensed geometry kernel; the work was the pipeline around it — C# turning an uploaded STL into glTF with per-vertex thickness baked into the mesh, so the browser renders the analysis directly instead of recomputing it.',
  artifacts: [
    {
      src: 'media/rapidquotes-dfm-heatmap.png',
      alt: 'A 3D model of a moulded housing shaded green, with red and orange patches marking walls thinner than the printing process can reliably build. Beside it, automated design-for-manufacturability checks for part size, model integrity, and feature size — the feature size check showing a warning.',
      caption:
        'RapidQuotes manufacturability validation. Green is within tolerance; red and orange mark walls too thin for the process. The customer can accept the risk or send the part for manual review.',
      /* Source file is 1846x842. Cropped to 1846x750 to drop the pricing strip
         along the bottom, which was cut mid-element and pulled the read toward
         "shopping cart" rather than "engineering". SPEC.md §6.3 */
      ratio: '1846/750',
    },
  ] as readonly Artifact[],
} as const;

export interface Project {
  readonly name: string;
  readonly href: string;
  readonly hrefLabel: string;
  /** Sets expectation before the click — a login wall shouldn't read as a dead link. */
  readonly access: string;
  readonly lede: string;
  readonly body: readonly string[];
  /** Why this matters to a reader who doesn't care about the domain. */
  readonly generalization: string;
  readonly stack: readonly string[];
  readonly artifact: Artifact;
}

export const PROJECTS: readonly Project[] = [
  {
    name: 'Side Quest Quant',
    href: 'https://sidequestquant.com',
    hrefLabel: 'sidequestquant.com',
    access: 'Live — request access',
    /* Leads with the problem. Trading is the venue, not the subject, and the
       "not a finance person" note appears once as a clause. SPEC.md §6.4 */
    lede: 'Letting someone write their own code and run it inside your application — safely, at scale, in a loop that never stops.',
    body: [
      'Side Quest Quant is a platform for writing, testing, and running trading strategies. I don’t trade; I wanted to know whether untrusted, user-authored code could be executed safely in a live loop. That turned out to be the entire problem.',
      'Strategies are written in C# and compiled at runtime with Roslyn, then replayed against billions of records of history before they go near a live market. Agents running across several LLM providers help draft and revise them, and a custom MCP server exposes the same tools to Claude Desktop and Cursor.',
    ],
    generalization:
      'The pattern outlives the domain. Safely running customer-authored logic inside a host application is the same problem as enterprise CPQ rules, manufacturing business logic, and CAM toolpath validation — anywhere the customer knows their own domain better than the vendor ever will.',
    stack: ['ASP.NET Core', 'Angular', 'SQL Server', 'Roslyn', 'Auth0', 'Docker', 'MCP'],
    artifact: {
      src: 'media/side-quest-quant-backtests.png',
      alt: 'A dark application interface. On the left, an agent conversation with the LLM provider set to Claude and a model selected, showing a dispatched job with an ID and running status. On the right, a column of completed backtest cards, each with a line chart of its output.',
      /* Describes what is on screen and nothing more. The curves are evidence the
         loop runs end to end; presenting them as results to admire would be the
         exact register §6.4 avoids. */
      caption:
        'A batch of backtests. Left, an agent session with the provider and model chosen explicitly. Right, completed runs and their output.',
      /* Not cropped. The partly visible third card reads as a list continuing;
         cropping higher would cut the chat input mid-element, which reads as broken. */
      ratio: '1880/881',
    },
  },
];

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
