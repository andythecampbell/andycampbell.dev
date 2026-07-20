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
 */
@Component({
  selector: 'app-artifact-figure',
  template: `
    <figure>
      <!-- Note: no backticks in this comment. The template is a TS template
           literal, so a backtick here closes the string early and the rest of
           the markup gets parsed as TypeScript.

           The negative margin cancels the page gutter so the frame bleeds to
           the screen edge on phones, where 24px each side is real image width.
           The sm: variant puts it back once there's room to spare. -->
      <div
        class="-mx-6 overflow-hidden border-y border-rule bg-surface sm:mx-0 sm:rounded-sm sm:border"
      >
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

      <figcaption class="mt-5 max-w-[68ch] font-body text-sm leading-relaxed text-ink-muted">
        {{ artifact().caption }}
      </figcaption>
    </figure>
  `,
})
export class ArtifactFigure {
  readonly artifact = input.required<Artifact>();

  /* Derived from the displayed ratio, not the source file. These attributes
     exist to reserve layout space before the image loads — using the file's own
     dimensions would reserve the wrong box for a cropped image and reintroduce
     the shift they're meant to prevent. */
  protected readonly width = computed(() => Number(this.artifact().ratio.split('/')[0]));
  protected readonly height = computed(() => Number(this.artifact().ratio.split('/')[1]));
}
