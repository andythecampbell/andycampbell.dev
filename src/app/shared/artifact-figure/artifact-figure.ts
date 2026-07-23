import { Component, computed, input } from '@angular/core';
import type { Artifact } from '../../data/site';

/**
 * A framed screen capture with its caption.
 *
 * Exists so every artifact on the site gets the *same* frame. The captures are
 * chromatically unrelated — one is a light grey CAD viewer with saturated green,
 * another is dark navy with gold — and the identical border, radius, and surface
 * background is what makes them read as one set rather than as clip art from
 * different sites. Never recolour or filter a capture to force harmony: it
 * misrepresents the product and looks worse than the mismatch (SPEC.md §6.4).
 *
 * `bleed` controls the edge treatment. On its own inside a page section it bleeds
 * to the screen edge on phones (the default). Inside something that already owns
 * the full width — a carousel slide — set `bleed=false` so the frame stays inset
 * and doesn't stack a second negative margin on top of the container's.
 */
@Component({
  selector: 'app-artifact-figure',
  template: `
    <figure>
      <!-- Frame classes come entirely from frameClass() so there's a single
           source of truth and no static-class / [class]-binding merge to reason
           about. No backticks in this comment: the template is a TS template
           literal and a stray backtick would close it early. -->
      <div [class]="frameClass()">
        <img
          [src]="artifact().src"
          [alt]="artifact().alt"
          [style.aspect-ratio]="artifact().ratio"
          [width]="width()"
          [height]="height()"
          class="w-full object-cover object-top"
          loading="lazy"
          decoding="async"
        />
      </div>

      @if (showCaption()) {
        <figcaption class="mt-5 max-w-[68ch] font-body text-sm leading-relaxed text-ink-muted">
          {{ artifact().caption }}
        </figcaption>
      }
    </figure>
  `,
})
export class ArtifactFigure {
  readonly artifact = input.required<Artifact>();

  /** Bleed to the screen edge on narrow viewports. Off when a parent already
      owns the full width (e.g. a carousel slide). */
  readonly bleed = input(true);

  /** Show the caption under the image. Off where surrounding copy already carries
      the description (the caption's `alt` text still serves screen readers). */
  readonly showCaption = input(true);

  protected readonly frameClass = computed(() => {
    const base = 'overflow-hidden border-rule bg-surface';
    return this.bleed()
      ? `${base} -mx-6 border-y sm:mx-0 sm:rounded-sm sm:border`
      : `${base} rounded-sm border`;
  });

  /* Derived from the displayed ratio, not the source file. These attributes
     exist to reserve layout space before the image loads — using the file's own
     dimensions would reserve the wrong box for a cropped image and reintroduce
     the shift they're meant to prevent. */
  protected readonly width = computed(() => Number(this.artifact().ratio.split('/')[0]));
  protected readonly height = computed(() => Number(this.artifact().ratio.split('/')[1]));
}
