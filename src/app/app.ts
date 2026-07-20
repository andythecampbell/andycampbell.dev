import { Component, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  /* The site is prerendered to static HTML at build time, so this component
     also executes in Node where `document` and `localStorage` don't exist.
     Every DOM touch has to be guarded. */
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  protected readonly isDark = signal(false);

  constructor() {
    if (this.isBrowser) {
      /* The inline script in index.html has already applied the correct class
         before paint. Read back from the DOM rather than re-deriving it, so
         there's exactly one source of truth for the initial theme. */
      this.isDark.set(document.documentElement.classList.contains('dark'));
    }
  }

  protected toggleTheme(): void {
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
