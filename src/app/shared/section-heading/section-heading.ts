import { Component, input } from '@angular/core';

/**
 * The eyebrow heading that opens every section below the hero.
 *
 * Thin on purpose — it exists so six sections can't drift apart, and so the
 * heading treatment is changed in one place rather than six. Also the natural
 * home for an anchor-link-on-hover affordance if that gets added later.
 */
@Component({
  selector: 'app-section-heading',
  template: `
    <h2 class="font-mono text-xs tracking-widest text-accent uppercase">
      {{ label() }}
    </h2>
  `,
})
export class SectionHeading {
  readonly label = input.required<string>();
}
