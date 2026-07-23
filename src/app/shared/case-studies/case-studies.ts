import {
  Component,
  DestroyRef,
  ElementRef,
  PLATFORM_ID,
  afterNextRender,
  computed,
  inject,
  signal,
  viewChild,
  viewChildren,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CASE_STUDIES, CASE_STUDY_SECTIONS } from '../../data/site';
import { ArtifactFigure } from '../artifact-figure/artifact-figure';

/** Auto-advance interval. Long on purpose: this is reading material, not a banner. */
const AUTOPLAY_MS = 22_000;

/**
 * "Selected work" — a horizontal, scroll-snap carousel of case studies.
 * EXPERIMENT (see SPEC.md §6.3).
 *
 * Design choices worth knowing:
 *
 * - **Native scroll-snap, not a transform track.** All slides are in the DOM and
 *   the browser's own horizontal scroll drives the motion. That means it works
 *   with no JS (the section is just scrollable), it's keyboard- and touch-native,
 *   a screen reader reads every slide, and it prerenders cleanly for SSG. The
 *   buttons and dots are progressive enhancement on top.
 *
 * - **Infinite.** Next past the last slide wraps to the first and vice versa. A
 *   wrap that spans more than one slide jumps instantly instead of smooth-
 *   scrolling the whole way back, so it reads as a reset, not a rewind.
 *
 * - **Auto-advance, done responsibly (WCAG 2.2.2).** It pauses on hover, pauses
 *   while focus is inside the carousel, has an explicit pause/play control, and
 *   does not run at all under prefers-reduced-motion. Manual navigation resets
 *   the timer so it never yanks the slide out from under a reader.
 *
 * Prerendered at build time, so anything touching the DOM runs in afterNextRender
 * / behind an isBrowser guard.
 */
@Component({
  selector: 'app-case-studies',
  imports: [ArtifactFigure],
  templateUrl: './case-studies.html',
})
export class CaseStudies {
  protected readonly studies = CASE_STUDIES;
  protected readonly sectionLabels = CASE_STUDY_SECTIONS;

  protected readonly activeIndex = signal(0);

  /** User pressed pause. Sticky until they press play again. */
  protected readonly paused = signal(false);
  /** Pointer is over the carousel, or focus is inside it. Auto-advance holds. */
  protected readonly interacting = signal(false);

  /** Zero-padded "01 / 02" counter. */
  protected readonly counter = computed(() => {
    const pad = (n: number) => String(n).padStart(2, '0');
    return `${pad(this.activeIndex() + 1)} / ${pad(this.studies.length)}`;
  });

  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly destroyRef = inject(DestroyRef);
  private readonly track = viewChild.required<ElementRef<HTMLElement>>('track');
  private readonly slides = viewChildren<ElementRef<HTMLElement>>('slide');

  private reduceMotion = false;
  private timer?: ReturnType<typeof setInterval>;

  constructor() {
    afterNextRender(() => {
      const root = this.track().nativeElement;
      const slideEls = this.slides().map((s) => s.nativeElement);

      // The most-visible slide within the track is the active one. threshold 0.6
      // means a slide claims "active" once it's mostly in view, which lines up
      // with where scroll-snap settles.
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              const index = slideEls.indexOf(entry.target as HTMLElement);
              if (index >= 0) this.activeIndex.set(index);
            }
          }
        },
        { root, threshold: 0.6 },
      );
      for (const el of slideEls) observer.observe(el);

      this.reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      this.startAutoplay();

      this.destroyRef.onDestroy(() => {
        observer.disconnect();
        this.stopAutoplay();
      });
    });
  }

  protected togglePaused(): void {
    this.paused.update((p) => !p);
  }

  protected go(index: number, userInitiated = false): void {
    if (!this.isBrowser) return;

    const total = this.studies.length;
    // Wrap in both directions: -1 -> last, total -> 0.
    const target = ((index % total) + total) % total;
    const track = this.track().nativeElement;
    const slide = this.slides()[target]?.nativeElement;
    if (!slide) return;

    // Adjacent moves scroll smoothly; a multi-slide wrap (e.g. last -> first)
    // jumps instantly so it reads as a reset rather than a long rewind.
    const adjacent = Math.abs(target - this.activeIndex()) <= 1;
    const behavior: ScrollBehavior = !this.reduceMotion && adjacent ? 'smooth' : 'auto';

    const left = slide.getBoundingClientRect().left - track.getBoundingClientRect().left + track.scrollLeft;
    track.scrollTo({ left, behavior });
    this.activeIndex.set(target);

    // A manual move gives a fresh full interval before the next auto-advance.
    if (userInitiated) this.startAutoplay();
  }

  protected prev(): void {
    this.go(this.activeIndex() - 1, true);
  }

  protected next(): void {
    this.go(this.activeIndex() + 1, true);
  }

  private startAutoplay(): void {
    this.stopAutoplay();
    if (!this.isBrowser || this.reduceMotion || this.studies.length < 2) return;

    this.timer = setInterval(() => {
      // Hold while the user is reading (hover/focus) or has explicitly paused.
      if (this.paused() || this.interacting()) return;
      this.go(this.activeIndex() + 1);
    }, AUTOPLAY_MS);
  }

  private stopAutoplay(): void {
    if (this.timer !== undefined) {
      clearInterval(this.timer);
      this.timer = undefined;
    }
  }
}
