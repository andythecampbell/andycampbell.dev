import { Component, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Light/dark toggle.
 *
 * Template is inline because it's a single element — a separate file would mean
 * two files to open to understand ten lines.
 *
 * The initial theme is applied by the pre-paint script in index.html, not here.
 * This component reads that result back so there is exactly one source of truth
 * and no chance of the two disagreeing on first paint.
 */
@Component({
  selector: 'app-theme-toggle',
  template: `
    <button
      type="button"
      (click)="toggle()"
      class="rounded-sm border border-rule px-3 py-1.5 font-mono text-xs text-ink-muted transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      [attr.aria-label]="isDark() ? 'Switch to light theme' : 'Switch to dark theme'"
      [attr.aria-pressed]="isDark()"
    >
      {{ isDark() ? 'Light' : 'Dark' }}
    </button>
  `,
})
export class ThemeToggle {
  /* Prerendered at build time, so this also runs in Node where `document` and
     `localStorage` don't exist. Every DOM touch needs guarding. */
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  protected readonly isDark = signal(false);

  constructor() {
    if (this.isBrowser) {
      this.isDark.set(document.documentElement.classList.contains('dark'));
    }
  }

  protected toggle(): void {
    if (!this.isBrowser) return;

    const next = !this.isDark();
    this.isDark.set(next);
    document.documentElement.classList.toggle('dark', next);

    try {
      localStorage.setItem('theme', next ? 'dark' : 'light');
    } catch {
      /* Preference won't persist across reloads; the toggle still works. */
    }
  }
}
