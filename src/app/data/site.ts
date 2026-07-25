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
      'Customers upload a 3D model and expect a price in seconds, but not every part will print correctly. Thin walls can deform when printing, and while we can detect the wall thickness, it’s not always obvious if the placement will cause issues.',
      'We offer a range of technologies and materials, each with different tolerances for wall thicknesses. The UX needs to feel snappy and responsive when the user configures the part. A round trip to the API to calculate thickness is too expensive. We may want to add other DFM checks in the future.',
      'A C# pipeline takes the uploaded STL, runs a wall thickness analysis using the Polygonica C API, and writes a glTF with wall thickness baked into the mesh as per-vertex data. The custom three.js shader renders the heatmap straight from that. Green is in tolerance, red and orange are too thin, and the customer can accept the risk or send the part for review.',
    ],
    stack: ['C#', 'ASP.NET Core', 'Polygonica', 'three.js', 'glTF', 'Angular'],
  },
  {
    id: 'side-quest-quant',
    name: 'Side Quest Quant',
    tagline: 'Platform for building algorithmic trading bots through natural language.',
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
      'Create a platform where LLM code is generated on the fly and hot loaded to run safely in a loop indefinitely. I provide the structure and extensibility; users pair with their favorite LLMs to provide the strategies and rules.',
      'The code is untrusted, so it can be broken or hostile. It has to compile and run at runtime. It needs to behave the same way whether it’s testing against billions of historical records or a live market data firehose. Several LLM providers are in the mix, and I own the deployment end to end.',
      'The platform provides the interface contracts and the structure to run them. LLM generated code is compiled at runtime with Roslyn, then run inside a constrained sandbox. Agents across several providers help draft and revise them, and a custom MCP server exposes the same tools to Claude Desktop and Cursor. The whole loop runs from idea to code to backtest to live.',
    ],
    stack: ['ASP.NET Core', 'Angular', 'SQL', 'Roslyn', 'Auth0', 'Docker', 'MCP'],
    link: {
      href: 'https://sidequestquant.com',
      label: 'sidequestquant.com',
      access: 'Side project, live at sidequestquant.com',
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

/* "Working with me" / TEAMMATE section removed 2026-07-24 — Andy wants to rethink
   it before it goes back in. The reasoning it carried (describe behaviour, never
   claim the virtue) lives in SPEC.md §6.6 if it returns. */

/**
 * Technologies (SPEC.md §6.6). Rebuilt 2026-07-25 from Andy's own outline
 * (Technologies.txt) into two tiers:
 *
 *   TECH_CORE    — the flat, always-visible daily drivers.
 *   TECH_DOMAINS — expandable groups that carry the breadth. Collapsed by
 *                  default (native <details>) so the section isn't a wall, but
 *                  everything prerenders and is there for search / screen readers.
 *
 * The list is exactly what Andy has actually worked with. He deliberately left
 * off things he's only interested in or exploring (they were in the source doc
 * and must NOT be added back here). No em dashes, no logo grid.
 *
 * Product-name spellings normalised from the outline; see the commit / message
 * for the exact list, in case any were wrong to "correct".
 */
export interface TechNode {
  readonly name: string;
  /** Sub-items, e.g. ERP → Sage / Epicor / SAP. One level deep, by design. */
  readonly children?: readonly string[];
}

export interface TechDomain {
  readonly label: string;
  readonly nodes: readonly TechNode[];
}

export const TECH_CORE: readonly string[] = [
  'C#',
  'Angular',
  'Entity Framework Core',
  'ASP.NET Core',
  'three.js',
  'WebGL',
  'NgRx',
  'SQL',
  'RabbitMQ',
  'Docker',
  'SignalR',
  'SSE',
];

/* Ordered to lead with the physical/digital differentiators (CAD, CNC, spatial
   math), then AI, then the broader integration and platform range. */
export const TECH_DOMAINS: readonly TechDomain[] = [
  {
    label: 'CAD automation',
    nodes: [
      { name: 'Autodesk Inventor (COM API + iLogic)' },
      { name: 'SolidWorks' },
      { name: 'AutoCAD' },
      { name: 'Fusion 360' },
      { name: 'Autodesk Platform Services (incl. Forge)' },
    ],
  },
  {
    label: 'CNC programming & automation',
    nodes: [
      { name: 'Alphacam' },
      { name: 'RouterCIM' },
      { name: 'Mastercam' },
      { name: 'WoodWOP' },
    ],
  },
  {
    label: '3D spatial math',
    nodes: [
      { name: 'Matrices', children: ['translation', 'shear'] },
      { name: 'Vectors' },
      { name: 'Quaternions' },
    ],
  },
  {
    label: 'AI integrations',
    nodes: [
      { name: 'MCP' },
      { name: 'Multi-provider APIs', children: ['OpenAI', 'Anthropic', 'Gemini'] },
      { name: 'Agentic tool orchestration' },
      { name: 'Multi-agent' },
    ],
  },
  {
    label: 'Custom software & integrations',
    nodes: [
      { name: 'ERP', children: ['Sage', 'Epicor', 'SAP'] },
      { name: 'MES (homegrown)' },
      { name: 'PLM', children: ['Autodesk Vault', 'homegrown'] },
      { name: 'CPQ (homegrown)' },
      { name: 'CRM', children: ['Salesforce', 'homegrown'] },
    ],
  },
  {
    label: 'Infrastructure',
    nodes: [
      { name: 'Azure', children: ['Web Services', 'Azure DB', 'Blob Storage'] },
      { name: 'IIS' },
    ],
  },
  {
    label: 'DevOps',
    nodes: [
      { name: 'Git' },
      { name: 'SVN' },
      {
        name: 'CI/CD',
        children: ['Azure DevOps', 'Azure Pipelines', 'TeamCity', 'Octopus Deploy', 'Bamboo'],
      },
      { name: 'Jira' },
      { name: 'Linear' },
      { name: 'ServiceNow' },
    ],
  },
  {
    label: 'AI development tools',
    nodes: [{ name: 'Cursor' }, { name: 'Claude Code' }, { name: 'Codex' }],
  },
];

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
