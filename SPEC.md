# andycampbell.dev — Build Spec

> Status: **Draft v1** — awaiting content inputs (see §9 Open Items)
> Source material: `andy-campbell-profile.md`

---

## 1. Purpose

A personal site for Andy Campbell that does one job well: make a hiring manager,
founder, or fellow engineer understand — in under sixty seconds — that this is an
engineer who came up through the trades and now builds real manufacturing software.

The career arc is the differentiator. The site exists to tell it plainly and back it
with visible proof.

### Primary audiences, in priority order

1. **Hiring managers / founders** in manufacturing software, CAD/CAM, 3D printing,
   and the emerging "AI for the physical economy" space.
2. **Forward-deployed / solutions engineering** hiring, where breadth + customer-facing
   depth is the profile being screened for.
3. **Fellow engineers** — peers who arrive from a GitHub profile or a conference
   conversation.

### Success criteria

- The trades→software arc is legible from the hero alone, without scrolling.
- The wall-thickness heatmap is seen at a size where it actually reads.
- Every claim is attached to a specific artifact, number, or system — no adjectives
  doing load-bearing work.
- Loads fast enough that it never feels like a "developer portfolio."

---

## 2. Non-goals

Naming these to keep scope honest:

- **No blog or CMS.** No content pipeline to maintain. If writing happens later, it
  gets its own decision.
- **No contact form.** Email link and social links only — "low friction, no form
  gymnastics" per the brief.
- **No analytics** in v1. Can be added later if there's a real question to answer.
- **No animation showcase.** Motion is used only where it clarifies. Nothing that
  announces itself.
- **No dark-pattern engagement mechanics** — no newsletter modal, no scroll-jacking.
- **Not a resume replacement.** The resume is a linked PDF. The site is the story.

---

## 3. Decisions locked

| Area | Decision | Rationale |
|---|---|---|
| Framework | Angular (latest stable) | Existing fluency; matches the .NET/Angular professional stack |
| Rendering | **Prerendered static (SSG)** | No server runtime, real SEO, cheapest to keep alive for years |
| Styling | **Tailwind CSS** | No imposed visual identity; enforced design-token scale. Also a deliberate learning goal for this build |
| Aesthetic | **Warm / crafted** | Warm paper-and-wood neutrals; ties the trades origin into the visual language |
| Theme | **Light always on first visit + dark toggle** | See §7 — deliberately ignores `prefers-color-scheme` |
| Domain | **andycampbell.dev** (registered) | — |
| Hosting | Leaning **Cloudflare Tunnel → Proxmox container** (home server) | Cheapest, already-owned infrastructure. Not final — static output deploys anywhere, so this stays reversible |
| Email | **andy@andycampbell.dev** (Cloudflare forwarder) | Keeps the personal Gmail off a public page |

**Version note:** exact Angular and Tailwind major versions will be confirmed against
the registry at scaffold time rather than assumed here. Tailwind's config format in
particular changed significantly at v4 (CSS-first `@theme` instead of
`tailwind.config.js`), so this spec's token examples will be reconciled with whatever
is actually current.

---

## 4. Design system

### 4.1 Aesthetic direction

Warm minimal. Paper and wood neutrals rather than the default cool grays. The
restraint is real — the warmth is what keeps it from feeling clinical, and it earns
its place by connecting to the shop-floor origin without resorting to literal imagery.

**Explicitly avoid:** wood-grain textures, sawblade icons, hammer-and-keyboard
metaphors, "I build things" hero copy. The warmth lives in the palette and spacing,
not in decoration. Trades reference should be felt, not illustrated.

### 4.2 Color tokens

Starting values — to be tuned against real content and verified for WCAG AA contrast
with an actual checker before ship. These are a considered starting point, not
validated ratios.

**Light**

| Token | Value | Use |
|---|---|---|
| `bg` | `#FAF8F5` | Page background — warm off-white, not paper-white |
| `surface` | `#F2EEE8` | Raised cards, code blocks |
| `ink` | `#1C1917` | Primary text — warm near-black, never `#000` |
| `ink-muted` | `#57534E` | Secondary text, labels |
| `rule` | `#E0D9D0` | Hairlines, dividers |
| `accent` | `#5F4330` | Deep walnut — links, active states |

**Dark**

| Token | Value | Use |
|---|---|---|
| `bg` | `#1A1715` | Warm charcoal — deliberately not blue-black |
| `surface` | `#252019` | Raised surfaces |
| `ink` | `#EDE8E1` | Primary text |
| `ink-muted` | `#A8A09A` | Secondary text |
| `rule` | `#3A342E` | Hairlines |
| `accent` | `#C9A47E` | Warm tan — lightened walnut for dark-mode contrast |

**Accent changed from terracotta → walnut after seeing the real artifact.** The
thickness heatmap is saturated green with red and orange hotspots. A terracotta accent
would have collided with those hotspots — and worse, red-orange chrome next to a
red-orange *warning* state reads as alarm. Walnut is still unmistakably warm and
crafted, but it recedes and lets the artifact carry the color.

*Alternative if walnut reads muddy in situ:* drop the chromatic accent entirely —
underline-only links in `ink`, with warmth carried purely by the background and
surface tones. More restrained, and worth comparing side by side.

**Accent discipline:** one accent, used sparingly — links, one hero detail, active
nav. The screenshots carry loud color of their own; site chrome must not compete.
When in doubt, use `ink-muted` instead of `accent`.

### 4.3 Typography

- **Headings:** a humanist serif or a warm grotesque. Candidates to compare in
  context — not decided in the abstract.
- **Body:** highly readable sans, generous line-height (`1.6`+ for prose).
- **Labels / metadata:** monospace, small, letterspaced — used for section eyebrows,
  tech tags, and project metadata. This is where a little engineering texture belongs.
- **Self-hosted fonts**, subset, `font-display: swap`. No external font CDN — it's a
  render-blocking third-party dependency and a privacy leak for zero benefit on a
  static site.
- Type scale drawn from Tailwind's default ramp, extended only if a real need appears.

### 4.4 Layout

- Single-column, generous measure. Prose capped around **65–70ch** for readability.
- Content column ~`720px`; **visual work breaks out wider** — up to ~`1100px` or full
  bleed. The heatmap must not be constrained by the prose measure.
- Spacing from Tailwind's scale, no arbitrary values without a reason.
- Section rhythm: large vertical gaps, hairline rules between major sections. The
  whitespace does the structuring work, not boxes and borders.

### 4.5 Motion

- Subtle fade/rise on section entry. Short durations (~200–300ms), real easing.
- **`prefers-reduced-motion` fully respected** — not a nice-to-have.
- No parallax, no scroll-jacking, no counters ticking up, no typewriter effect.

---

## 5. Information architecture

Single page with anchored navigation. The content volume doesn't justify routing, and
one continuous scroll suits a narrative arc better than fragmenting it.

Structure follows the brief's own recommendation, which is sound:

| # | Section | Purpose |
|---|---|---|
| 1 | **Hero** | The arc in one sentence. Nothing competes with it. |
| 2 | **What I build now** | Current role, manufacturing-software focus. Short. |
| 3 | **Visual work** | Heatmap + geometry artifacts, shown large. Placed early — it earns attention fastest and requires no self-promotion to land. |
| 4 | **Projects** | Side Quest Quant, with the generalizability framing. |
| 5 | **The arc** | Shop floor → CNC → CAD automation → software. Short; a story, not a CV. |
| 6 | **Technologies** | Grouped, scannable. Never a tag cloud. |
| 7 | **Contact** | Email, GitHub, LinkedIn, resume PDF. |

**Nav:** minimal, sticky, collapses on mobile. Name on the left, section anchors and
theme toggle on the right. No hamburger unless the anchor list genuinely doesn't fit.

**Future-proofing:** if a project later deserves a deep-dive page, the prerender
config accommodates additional routes without restructuring. Not built in v1.

---

## 6. Section detail

### 6.1 Hero

One sentence, plus a minimal identity line. Draft candidates for comparison in situ:

> **A.** "I came up through the shop floor — CNC, drafting, CAD automation — and now
> build production software for manufacturing."

> **B.** "Senior full-stack developer. I ran the machines before I wrote the software
> that runs them."

> **C.** "Trim carpentry → CNC programming → CAD automation → production software.
> I build tools for people who make physical things."

Direction: A is the safest and most honest. B has the sharpest hook but flirts with
being a little pat. C makes the arc literal and scannable. **Recommend building with
A, with B and C easy to swap** — this is a decision better made looking at real type
than in a document.

No hero image. No headshot above the fold. The sentence is the hook.

### 6.2 What I build now

Two to three sentences. Senior Full-Stack Developer at Stratasys since Oct 2022.

The concrete work, now confirmed against the resume: **led the redesign of
RapidQuotes**, Stratasys Direct Manufacturing's e-commerce quoting portal for
industrial 3D printing.

Verified metrics available for use:

| Metric | Figure |
|---|---|
| Revenue growth | **52%** ($2.56M → $3.89M) |
| Order volume | +18% |
| Checkout time | **60% faster** (15s → 6s) |
| Part upload time | 52% faster |
| Page loads | 40% faster |

**Use two, not five.** Revenue growth and checkout time are the strongest pair — one
business outcome, one engineering outcome. A wall of percentages reads as padding and
undercuts the "let the specifics carry it" voice. The rest live on the resume.

### 6.3 Visual work

**The highest-leverage content on the site.** Design accordingly.

**Asset in hand:** `heatmap screenshot.png` — the RapidQuotes DFM validation view. A 3D
part shaded green with red/orange thin-wall hotspots, alongside the automated check
panel (Part Size, Model Integrity, Feature Size, General) flagging walls below the
process minimum.

This is a better artifact than "a heatmap." It shows a **complete DFM validation
system** — geometry analysis feeding an automated manufacturability decision that a
customer acts on. Built with the **Polygonica C API and three.js**, per the resume.
Name those; they're specific and they signal real computational-geometry work rather
than a visualization library call.

**Presentation notes for this specific image:**

- **Crop the bottom pricing strip in CSS** (`$91.00`, Buy More Save More, Quantity).
  Two reasons: the quantity box is cut mid-element and looks accidental, and the
  e-commerce pricing shifts the read from *engineering capability* to *shopping cart*.
  CSS cropping keeps the original file untouched and is trivially reversible.
- **Consider two crops from the one file:** a tight one on the 3D part alone (the
  striking artifact), and the wider one showing the check panel (the story). The part
  alone is what stops a scroll; the panel is what explains it.
- **Frame it, don't full-bleed it.** This is a light-UI screenshot — in dark mode a
  full-bleed version becomes a glowing white rectangle punched through the page. A
  subtle bordered container with padding reads as "a screenshot of an application" and
  solves the awkward ultra-wide aspect ratio at the same time.
- Andy has flagged the rendering layout as not ideal and may supply a replacement.
  Build the gallery so swapping the file is a data edit.

- Additional geometry artifacts, displayed large — full-bleed or near it.
- Short screen recordings where motion adds information. Muted, loop, `playsinline`,
  no autoplay with sound. Poster frames so nothing pops in.
- One line of caption per artifact: what it is and what it demonstrates. No paragraphs.
- Gallery structure that accepts more artifacts over time without redesign — the brief
  notes this is an ongoing collection.
- Images: modern formats with fallbacks, explicit dimensions to prevent layout shift,
  lazy-loaded below the fold.

### 6.4 Projects — Side Quest Quant

**Lead with the problem, not the domain and not the disclaimer.**

The problem: *letting people author their own logic and run it inside a hosted
application — safely, at scale, in a real-time loop.* Trading is the venue where that
problem got solved. It is not the subject of the section.

- Open on the problem and the loop it closes: idea → code → backtest → live.
- The architecture is why the project got finished — the hard part was making
  untrusted user-authored code safe to execute, not picking indicators. Present that
  as **problem-solving**, not as a trophy cabinet.
- Technical facts: ASP.NET Core + Angular + SQL Server, 600M+ historical records,
  Roslyn dynamic compilation, multi-provider LLM orchestration (Anthropic, OpenAI,
  Gemini, Ollama), agentic tool-use with SSE streaming, custom MCP server, Auth0,
  Docker, self-hosted via Proxmox/Nginx/Cloudflare Tunnel.
- **Live at `sidequestquant.com`.** Publicly reachable; the app presents a sign-up
  screen and offers a request-access path to anyone not whitelisted. **The product
  handles the gate itself, so a direct link is fine** — no custom request flow needed
  on this site. Just label the link so expectations are set before the click
  (e.g. "Live — request access") rather than letting a login wall read as a dead link.

**The "I'm not a finance person" angle — handle with restraint.**

The brief leans on this heavily. Andy's own read is that it's overemphasized, and he's
right. The disclaimer is self-defeating: every sentence insisting the project isn't
about trading is still a sentence about trading. Repeat it three times and finance
becomes the subject of the section — which is the exact association it was meant to
avoid. Protesting also reads as slightly defensive, and defensiveness is the one tone
this site can't afford.

**But don't delete the idea — it's genuinely good.** "Someone who isn't a finance
person built a serious finance app" is an interesting, disarming fact. It just needs to
land as *an aside that earns a second look*, not as a thesis.

**Rule: state it once, lightly, and move on.** One clause. Never a paragraph, never
repeated, never apologetic. Something in the register of "I don't trade; I wanted to
know whether untrusted code could be executed safely in a live loop" — the disclaimer
and the actual motivation in a single breath, with the weight on the second half.

**Explicitly avoid:** returns, P&L framing, alpha, edge, any language that codes as
trading culture. The equity curves in the screenshot are evidence the system runs, not
evidence of performance — caption them accordingly, and never present a number as a
result worth admiring.

**On the backend pride.** Andy is justifiably proud of the backend, and his own
instinct is that "solved a problem" matters more than "built impressive infrastructure."
Follow that instinct. Lead every technical claim with what it made possible; the
implementation detail is the second half of the sentence, not the first. Roslyn is *how*
users get to run their own strategies safely — that's the order to say it in.

**Resume framing, for reconciliation.** The resume leads with multi-tenant SaaS and
natural-language agent conversation. That's true and belongs in the section — as
supporting detail, not the opener. "AI agents you can talk to" is a crowded claim right
now; safely executing untrusted user code is not.
- **State the generalization explicitly:** the contract-first pattern for safely
  executing untrusted user logic inside a host application maps directly to enterprise
  CPQ, manufacturing business logic, and CAM toolpath validation. This is what makes
  the project legible to manufacturing readers who don't care about trading.

**Asset in hand:** `SQQ Screenshot.png` — the Backtests view. Left panel is the agent
conversation ("Ludo") with an explicit **Provider / Model selector set to Claude
(Anthropic)**, showing a dispatched job with ID, GUID, and running status. Right panel
is a stack of completed backtest cards with equity curves and run durations.

It's a good artifact: it shows a real system doing real work, not a landing page. The
provider/model dropdowns are direct visual proof of the multi-provider orchestration
claim — that detail is doing more work than a paragraph would.

**Tension worth resolving.** §6.4 recommends leading with the architecture framing
(safe execution of untrusted user-authored code). This screenshot doesn't show that —
it shows the conversational and results surface. Prose claiming a Roslyn sandbox next
to an image of a chat panel is a small credibility gap.

Two ways to close it, in order of preference:

1. **Add a second screenshot of the strategy code editor** — wherever user-authored C#
   is written and compiled. That's the visual proof of the hardest claim on the site,
   and right now it's the one thing missing. Worth capturing.
2. **Bridge it in the caption.** Keep this image, and caption it so it connects the
   surface to the architecture — e.g. what happens between the message and the equity
   curve. Weaker, but works if no code-editor capture is available.

**No sensitive content:** the visible job GUID and backtest IDs are Andy's own records
on his own project. Nothing to scrub.

**Cross-cutting presentation constraint.** The two screenshots are chromatically
opposite — the DFM capture is light gray with saturated green, this one is dark navy
with gold. Shown adjacent without a shared treatment they'll read as clip art from two
different sites. **Every screenshot gets the same frame**: identical border, radius,
padding, and shadow, on a neutral `surface` background. The frame is what makes them a
set. Do not tint, filter, or recolor the captures themselves to force harmony — that
misrepresents the product and looks worse than the mismatch.

Repo link if public — see §9.

### 6.5 The arc

Short. Six sentences at the outside. Non-chronological telling is fine.

The load-bearing idea, per the brief: most engineers who talk about manufacturing are
working from a romanticized version of it. Andy has run the machines, cut the parts,
and eaten the cost of a bad setup — and that shows up in which abstractions he trusts.

Worth including: the first paid programming work was VBA automation for CNC wood door
machining in AlphaCam. Automating his own job — a pattern that repeated.

Told plainly. Not spun as a triumph narrative.

**Real timeline, from the resume** (for accuracy — the section itself stays short and
non-chronological):

| Years | Role |
|---|---|
| 2006–2011 | Production Manager & IT Manager (Rocky Mountain MagBoard); Department Lead (Genesis Innovations) — shop floor, CNC programming, QC (Intertek certified) |
| 2011–2014 | **High Country Millwork** — Engineer / Software Developer. .NET add-ins for Inventor and AutoCAD used daily by a 15+ person engineering department |
| 2014–2016 | **Xybix Systems** — Manufacturing Engineer. Product engineering, R&D prototyping, Epicor ERP configurators |
| 2016–2022 | **D3 Automation** — Solutions Consultant. ETO configurators; one client reported **85% reduction** in design-to-shop-drawing time |
| 2022– | **Stratasys** — Senior Full-Stack Software Developer |

**Two corrections to the brief's version of the arc:**

1. **The software transition happened around 2011, not later.** High Country Millwork
   was already an Engineer/Software Developer role writing .NET CAD add-ins. The brief
   reads as though CAD automation came after a longer trades period.

2. **The arc is not linear, and shouldn't be flattened into one.** He went from
   software developer (High Country, 2011–14) *back* to Manufacturing Engineer (Xybix,
   2014–16) before consulting. The brief's clean
   `trades → CNC → CAD → consulting → software` sequence smooths that out.

The non-linear version is *better material*, not worse. A straight-line story is the
one every portfolio tells. "I went back to the manufacturing floor after writing
software, and that's why I know which abstractions hold up" is more interesting and
more credible — and it's what the brief is actually claiming when it says he knows
which abstractions survive contact with a real shop. **Recommend telling it honestly
rather than tidying it.**

**Education** — Associate's, Computer Information Systems, Front Range Community
College. Include it. The non-traditional route is explicitly something to be proud of,
and quietly omitting the credential would undercut that.

### 6.6 Technologies

Grouped exactly as the brief groups them — the breadth is the point, but an
undifferentiated wall reads as noise:

- **Core stack** — C#, .NET/ASP.NET Core, Angular, TypeScript, NgRx, JavaScript, SQL Server, Entity Framework, REST APIs
- **CAD / manufacturing / geometry** — Autodesk Inventor API, AutoCAD API, **Polygonica**, **three.js / WebGL**, iLogic, CAD automation, ETO configurators, parametric modeling, KCL (Zoo/KittyCAD), CNC programming, AlphaCam, VBA, mechanical drafting, ERP/MRP/MES, 3D printing workflows
- **Applied math** — vector math, matrices, quaternions, transforms, 3D geometry
- **AI / ML tooling** — MCP (Model Context Protocol), agentic tool orchestration, multi-provider LLM architecture, Claude API, OpenAI API, Gemini API, Ollama, Azure AI Foundry, Document Intelligence, Semantic Kernel, RAG
- **Platform / infrastructure** — Azure (App Services, SQL, DevOps Pipelines), Docker, CI/CD, Git, Proxmox, Nginx, Cloudflare Tunnel, Auth0, Roslyn, WASM/Wasmtime/WASI 0.2/Component Model (WIT), self-hosted deployment

**Note:** the resume lists a tighter set than the brief. Items appearing only in the
brief (KCL, Azure AI Foundry, Semantic Kernel, WASM/Wasmtime, Proxmox) are real but
weighted toward personal projects and exploration rather than shipped production work.
That's fine to list — just worth a light structural distinction, or at minimum not
presenting a home-lab tool with the same weight as six years of Inventor API work.
Over-claiming is the one thing that would undercut this whole site.

**`three.js`, `WebGL`, and `Polygonica` are newly surfaced from the resume and are
among the most important entries here** — they're the substance behind the hero visual.

Text labels with monospace styling. **No logo grid** — vendor logos are visual noise
and age badly as brands rebrand.

The "Applied math" group is worth a one-line note that this is genuine enjoyment, not
just capability. It's differentiating and it's true.

### 6.7 Contact

Email, GitHub, LinkedIn, resume PDF. Plain links, no icons-only. Email as a real
`mailto:` — obfuscation costs usability and barely helps.

- **Email:** `andy@andycampbell.dev` (Cloudflare forwarder)
- **GitHub:** https://github.com/andythecampbell
- **LinkedIn:** https://www.linkedin.com/in/andy-campbell-25982179/
- **Location:** San Diego, CA — worth stating; "remote" reads better with a real place attached
- **Resume:** ship the PDF as-is, phone number included. Reviewed and accepted — it's a
  document that gets handed out anyway.
- **Still keep the phone and personal Gmail off the HTML itself.** A deliberate PDF
  download is a different exposure profile than plain text on an indexed page, which is
  what address-scrapers actually harvest. The `@andycampbell.dev` forwarder is the
  published address.

---

## 7. Technical architecture

```
src/
├── app/
│   ├── sections/          # hero, now, visual-work, projects, arc, tech, contact
│   ├── shared/            # nav, footer, theme-toggle, section-heading
│   └── data/              # content as typed constants
├── styles/
│   └── theme.css          # design tokens
└── public/
    ├── media/             # heatmap images, screen recordings
    └── andy-campbell-resume.pdf
```

**Content as typed data.** Projects, tech groups, and visual artifacts live in typed
TS constants rather than being hardcoded in templates. Adding a heatmap or a project
becomes a data edit, not a markup edit — which matters given the brief calls the
visual gallery an ongoing collection.

**Standalone components, signals, new control flow** (`@if`/`@for`). Modern Angular
idiom throughout; no NgModules.

**Theme toggle:** class-based dark mode, persisted to `localStorage`. Inline script in
`<head>` applies the class before first paint — without it, a returning dark-mode
visitor gets a white flash while the bundle hydrates.

**First visit is always light, deliberately ignoring `prefers-color-scheme`.**

The original decision was "light default, honors OS preference." Those two things
quietly conflict, and the conflict resolves badly for this particular site: most of the
audience — engineers, technical hiring managers — runs dark system-wide. Honoring the
OS would mean the warm light palette, which is the art-directed one and the whole point
of the "warm/crafted" direction, is seen by almost nobody.

A portfolio is closer to a printed piece than an app. Controlling the first impression
is worth more here than deferring to a system setting. **An explicit choice is still
respected** — one click on the toggle persists across visits, so nobody is fought with
twice.

This is a defensible-either-way call, not a settled best practice. For an app or
anything used repeatedly, honoring the OS is correct and this would be the wrong
choice. Reversal is two lines; the restore snippet is in `src/index.html`.

**Accessibility targets:** semantic landmarks, logical heading hierarchy, visible focus
states, keyboard-navigable throughout, alt text on every artifact, WCAG AA contrast
verified with a checker. `prefers-reduced-motion` honored.

**Performance targets:** Lighthouse 95+ across the board. Self-hosted subset fonts,
modern image formats, no runtime dependency that isn't earning its bundle size.

**SEO / sharing:** meaningful `<title>` and meta description, Open Graph and Twitter
card tags with a purpose-built share image, `Person` structured data, sitemap.

---

## 8. Build phases

| Phase | Deliverable |
|---|---|
| **0** | Scaffold Angular + Tailwind, confirm current versions, prerender working, deploy a hello-world to validate the pipeline end to end |
| **1** | Design tokens, theme toggle (incl. no-flash script), typography, nav/footer shell |
| **2** | Hero + What I build now — *built slowly, with Tailwind narrated* |
| **3** | Visual work section + gallery structure (placeholder media if needed) |
| **4** | Projects, The arc, Technologies |
| **5** | Contact, SEO/meta, share image, resume PDF |
| **6** | Accessibility pass, Lighthouse pass, real-device check, deploy |

Phase 0 deploys early on purpose. Discovering a prerender or hosting problem in phase
6 is a bad afternoon; discovering it in phase 0 costs nothing.

**Tailwind teaching runs through phases 1–2**, then tapers as you signal you've got it.

---

## 9. Open items

Blocking or near-blocking. Marked `TODO` in code where placeholders are used.

**Resolved**

- [x] Thickness heatmap image — `heatmap screenshot.png` (RapidQuotes DFM view)
- [x] Resume PDF — `Andy Resume.pdf`
- [x] Stratasys metrics — 52% revenue growth ($2.56M → $3.89M), 60% faster checkout
- [x] D3 metric — 85% reduction in design-to-shop-drawing time
- [x] Title and dates confirmed — Senior Full-Stack Software Developer, Oct 2022–present
- [x] Domain — andycampbell.dev
- [x] Email — andy@andycampbell.dev
- [x] Side Quest Quant — sidequestquant.com, public but whitelisted; use a
      "Request access" affordance
- [x] Side Quest Quant screenshot — `SQQ Screenshot.png` (Backtests + agent view)

**Still needed**

- [x] GitHub — https://github.com/andythecampbell
- [x] LinkedIn — https://www.linkedin.com/in/andy-campbell-25982179/
- [x] Request access — handled by the app itself; link `sidequestquant.com` directly
- [x] Resume PDF ships as-is, phone included (reviewed and accepted)

- [ ] **Strategy code-editor screenshot (SQQ)** — the one asset that would visually
      back the untrusted-code-execution claim, which is the site's strongest technical
      differentiator. Currently claimed in prose but not shown. See §6.4.
      **This is now the only outstanding content item.**
- [ ] Additional geometry / CAD-automation visuals — ongoing collection
- [ ] Replacement heatmap screenshot, if Andy re-captures it (mock up with the current one)

**Needs a decision**

- [x] **Screenshot clearance — decided, proceed.** RapidQuotes is a public-facing
      customer portal; the capture shows no customer data. Andy has assessed the risk
      knowingly: not a disciplinary-level concern, small chance someone asks for it to
      come down, not expected. Proceeding without prior sign-off.

      **Mitigation (a design constraint, not a note):** the visual gallery is driven by
      typed data, so removing or swapping the image is a one-line edit and a redeploy.
      Keep that property. Do not hardcode this screenshot into a template, and do not
      build a layout that visibly breaks if it's pulled — the section must degrade
      gracefully to whatever artifacts remain.
- [ ] Whether to structurally distinguish production vs. side-project tech (see §6.6)

**Deferred to build time**

- [ ] Hosting: Cloudflare Tunnel/Proxmox vs Cloudflare Pages — static output fits both
- [ ] Hero copy: A / B / C (decide against real type)
- [ ] Heading typeface (compare candidates in context)
- [ ] Accent: walnut vs. no chromatic accent (compare in situ)

---

## 10. Voice reference

From the brief, restated because it governs every line of copy written here:

- Direct and concrete. Low on adjectives. **Let the specifics carry it.**
- No hustle-speak. No "passionate about leveraging synergies." No growth-hack energy.
- Dry humor fine. Earnestness about the craft fine. Self-aggrandizement not.
- Comfortable being an engineer who came up through the trades — **told plainly, not spun.**

Practical test for any sentence on this site: *could it appear on a hundred other
developer portfolios?* If yes, it's wrong. Replace it with something only Andy could
write.
