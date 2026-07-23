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
  // Visual work + Projects merged into one "Selected work" carousel (experiment).
  { id: 'work', label: 'Work' },
  { id: 'arc', label: 'Arc' },
  { id: 'teammate', label: 'Teammate' },
  { id: 'stack', label: 'Stack' },
  { id: 'contact', label: 'Contact' },
];

export const SITE = {
  name: 'Andy Campbell',
  role: 'Senior full-stack developer',
  location: 'San Diego, CA',
} as const;

/**
 * The hero thesis (profile v2). The positioning moved from "manufacturing-software
 * engineer" to "versatile problem-solver whose center of gravity is the
 * physical/digital boundary." SPEC.md §6.1.
 *
 * Andy's own words (verbatim). The distinctive clause ("the domain changes, my
 * appetite for solving problems doesn't") carries the versatility idea; the second
 * sentence names the rare part, the spatial specialty.
 */
export const HERO = {
  lede: 'I meet challenges where they are. The domain changes, my appetite for solving problems doesn’t. Finding solutions lights me up, especially where software meets the physical world: 3D, geometry, manufacturing.',
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
  /* Andy's own words (verbatim). SPEC.md §6.2 */
  lede: 'Creating production software for industrial 3D printing, at Stratasys since 2022.',
  body: 'Primarily .NET and Angular, on customer facing systems where what gets ordered turns into a physical part as it moves through our shop floor and MES system. The work typically comes down to the same shape: more throughput, less time spent waiting. The numbers below reflect the quoting portal redesign that I led.',
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

/**
 * EXPERIMENT (2026-07-23) — "Selected work" carousel. SPEC.md §6.3.
 *
 * Merges the old Visual work and Projects sections into one horizontal carousel
 * of case studies. Every case study follows the same three-part template so the
 * section reads as a consistent pattern rather than two bespoke layouts. Labels
 * are global (below); each study supplies exactly three bodies in the same order.
 *
 * Draft copy — Andy will refine. Voice rules honoured: no em dashes, contractions,
 * problem-first framing, Polygonica named as a licensed kernel (not something he
 * built), no trading-culture language, "billions of records" not a precise count.
 */
export const CASE_STUDY_SECTIONS = ['The Challenge', 'The Constraints', 'The Solution'] as const;

export interface CaseStudy {
  readonly id: string;
  readonly name: string;
  /** One line under the name. What the thing is, in plain terms. */
  readonly tagline: string;
  readonly artifact: Artifact;
  /**
   * Bodies for The Challenge / The Constraints / The Solution, in that order.
   * A fixed-length tuple so a study can't silently drop a part of the template.
   */
  readonly sections: readonly [string, string, string];
  readonly stack: readonly string[];
  /** Optional public link. Access state set before the click, so a login wall
      doesn't read as a dead link. */
  readonly link?: {
    readonly href: string;
    readonly label: string;
    readonly access: string;
  };
}

export const CASE_STUDIES: readonly CaseStudy[] = [
  {
    id: 'rapidquotes',
    name: 'RapidQuotes manufacturability',
    tagline: 'Instant design-for-manufacturing checks on customer-uploaded parts.',
    artifact: {
      src: 'media/rapidquotes-dfm-heatmap.png',
      alt: 'A 3D model of a moulded housing shaded green, with red and orange patches marking walls thinner than the printing process can reliably build. Beside it, automated design-for-manufacturability checks for part size, model integrity, and feature size, with the feature size check showing a warning.',
      caption:
        'RapidQuotes manufacturability validation. Green is in tolerance; red and orange mark walls too thin for the process.',
      /* Source file is 1846x842. Cropped to 1846x750 to drop the pricing strip
         along the bottom, which was cut mid-element and pulled the read toward
         "shopping cart" rather than "engineering". SPEC.md §6.3 */
      ratio: '1846/750',
    },
    sections: [
      'Customers upload a 3D model and expect a price in seconds, but not every part can actually be built. Walls below the process minimum fail on the machine, and catching that by hand doesn’t scale to a self-serve portal.',
      'The check had to run on geometry we’d never seen, fast enough to live inside a checkout that dropped from 15 seconds to 6. The thickness math comes from Polygonica, a licensed C kernel, so the real work was getting its output into the browser without shipping the whole model and recomputing it there. And a customer, not an engineer, has to read the result at a glance.',
      'A C# pipeline takes the uploaded STL, runs the analysis, and writes a glTF with wall thickness baked into the mesh as per-vertex data. The browser renders the heatmap straight from that. Green is in tolerance, red and orange are too thin, and the customer can accept the risk or send the part for review.',
    ],
    stack: ['C#', 'ASP.NET Core', 'Polygonica', 'three.js', 'glTF', 'Angular'],
  },
  {
    id: 'side-quest-quant',
    name: 'Side Quest Quant',
    tagline: 'Running untrusted, user-authored code safely in a live loop.',
    artifact: {
      src: 'media/side-quest-quant-backtests.png',
      alt: 'A dark application interface. On the left, an agent conversation with the LLM provider set to Claude and a model selected, showing a dispatched job with an ID and running status. On the right, a column of completed backtest cards, each with a line chart of its output.',
      caption:
        'A batch of backtests. Left, an agent session with the provider and model chosen explicitly. Right, completed runs and their output.',
      /* Not cropped. The partly visible third card reads as a list continuing;
         cropping higher would cut the chat input mid-element, which reads as broken. */
      ratio: '1880/881',
    },
    sections: [
      'Let someone write their own strategy code and run it inside the application, safely, in a loop that never stops. I don’t trade. I wanted to know whether untrusted, user-authored code could run safely in a live system, and that turned out to be the whole problem.',
      'The code is untrusted, so it can be broken or hostile. It has to compile and run at runtime, replay against billions of records of history, then trade live, without ever taking the host down with it. Several LLM providers are in the mix, and I own the deployment end to end.',
      'Strategies are written in C# and compiled at runtime with Roslyn, then run inside a constrained sandbox. Agents across several providers help draft and revise them, and a custom MCP server exposes the same tools to Claude Desktop and Cursor. The whole loop runs from idea to code to backtest to live.',
    ],
    stack: ['ASP.NET Core', 'Angular', 'SQL Server', 'Roslyn', 'Auth0', 'Docker', 'MCP'],
    link: {
      href: 'https://sidequestquant.com',
      label: 'sidequestquant.com',
      access: 'Live, request access',
    },
  },
];

/**
 * SPEC.md §6.5 — Andy's own words (verbatim).
 *
 * Rewritten by Andy to lead with breadth+depth as a strength rather than as an
 * apology. The lead names his pattern (find the pain points, build solutions);
 * the rest tells it plainly, keeping the non-linear step because that's what
 * makes the "knows a real shop" claim credible rather than asserted.
 */
export const ARC: readonly string[] = [
  'Always looking to expand my skillsets, I follow a pattern of spotting the pain points (for me or the business), then either finding or building the solution.',
  'I started from installing kitchen cabinets, moved to producing them, then CNC programming for large shops. The first code anyone paid me for was VBA automating my own job: machining wood doors on a CNC router.',
  'By 2011, while going to school on the side, I was writing .NET add-ins for Inventor and AutoCAD, used daily by a fifteen-person engineering department. I went back to manufacturing engineering where I learned how to build systems for different business practices, and which abstractions survive contact with a real shop vs falling apart the first time someone has to cut a part from them.',
  'Six years of design-automation consulting produced a platform to quickly build web based configurators that generated instant quoting and drove CAD drawings to the shop floor. Now writing production software at Stratasys. No computer science degree. An associate’s in computer information systems, and the rest learned on the job, solving real problems, building real solutions.',
];

/**
 * SPEC.md §6.6 — "Working with me". New in profile v2, and the thing a resume
 * genuinely can't do.
 *
 * HIGHEST VOICE RISK ON THE SITE. Claims about one's own character read as
 * boasting the instant they're phrased as claims, and the voice guide forbids
 * self-aggrandizement outright. Written to describe behaviour concretely and let
 * the reader draw the conclusion — "the friction is cheaper than the rework",
 * not "I'm a great collaborator." This is the section most likely to need Andy's
 * own hand; it's his voice about himself, which no one else can ghost-write well.
 */
export const TEAMMATE = {
  lede: 'The part a resume can’t show is what it’s like to work next to me.',
  body: [
    'I’ll argue a design decision with you — directly, and early — because the friction is cheaper than the rework. It’s not about winning the point; the team just lands a better answer when someone actually pushes on it.',
    'I like teaching, and I like the kind of team where people get sharper for being near each other. My best work happens in real one-on-one relationships, not in a standup performance or a broadcast channel.',
    'Mostly I try to be the coworker I’d want to have.',
  ],
} as const;

export interface TechGroup {
  readonly label: string;
  readonly items: readonly string[];
  /**
   * The center-of-gravity cluster (profile v2). Rendered with the accent label
   * so the eye lands on it first — "feature it accordingly" without breaking the
   * restraint of the section. Exactly one group should set this.
   */
  readonly featured?: boolean;
}

/**
 * Grouped, scannable, text only. No logo grid — vendor logos are noise and age
 * badly as brands rebrand (SPEC.md §6.6).
 *
 * Profile v2 folds the old "CAD / manufacturing / geometry" and "Applied math"
 * groups into one featured cluster. The merge is the point: the spatial work and
 * the math under it are the same strength, and shown together they read as the
 * center of gravity rather than as two adjacent lists.
 */
export const TECH_GROUPS: readonly TechGroup[] = [
  {
    label: 'Core',
    items: [
      'C#',
      '.NET / ASP.NET Core',
      'C',
      'TypeScript',
      'Angular',
      'NgRx',
      'SQL Server',
      'Entity Framework',
    ],
  },
  {
    label: 'Physical, digital & spatial',
    featured: true,
    items: [
      'Autodesk Inventor API',
      'AutoCAD API',
      'iLogic',
      'CAD automation',
      'ETO configurators',
      'parametric modelling',
      'KCL (Zoo / KittyCAD)',
      'three.js',
      'WebGL',
      'glTF',
      'Polygonica',
      'computational geometry',
      'vector math',
      'matrices',
      'quaternions',
      'transforms',
      'CNC programming',
      'AlphaCam',
      'mechanical drafting',
    ],
  },
  {
    label: 'AI & LLM',
    items: [
      'MCP',
      'agentic tool orchestration',
      'multi-provider LLM architecture',
      'Claude API',
      'OpenAI API',
      'Gemini API',
      'Ollama',
      'RAG',
      'Semantic Kernel',
      'Azure AI Foundry',
      'Azure Document Intelligence',
    ],
  },
  {
    label: 'Platform & infrastructure',
    items: [
      'Azure',
      'Docker',
      'CI/CD',
      'SignalR',
      'RabbitMQ',
      'Auth0',
      'Roslyn',
      'Nginx',
      'Cloudflare Tunnel',
      'Proxmox',
      'WASM / Wasmtime',
    ],
  },
];

export const TECH_NOTE =
  'Grouped by where the depth is, not where the hours are. The spatial and .NET work runs years deep; the newer AI and self-hosting pieces are where evenings go.';

export const CONTACT_LEDE =
  'If you’re building software where the output is a physical object — manufacturing, CAD, geometry, anything that ends up as a real part — I’d like to hear about it.';

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
