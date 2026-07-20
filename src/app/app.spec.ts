import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { CONTACT_LINKS, SECTIONS } from './data/site';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  async function render() {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    return fixture.nativeElement as HTMLElement;
  }

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the name as the single top-level heading', async () => {
    const compiled = await render();
    expect(compiled.querySelectorAll('h1').length).toBe(1);
    expect(compiled.querySelector('h1')?.textContent).toContain('Andy Campbell');
  });

  it('should expose a theme toggle', async () => {
    const compiled = await render();
    const toggle = compiled.querySelector('app-theme-toggle button');
    expect(toggle).toBeTruthy();
    expect(toggle?.getAttribute('aria-label')).toContain('theme');
  });

  /* Anchor links are only useful if the sections they point at exist. This
     catches the case where a nav entry is added to site.ts but the matching
     <section id> is never written — a dead link that looks fine in review. */
  it('should have a matching section for every nav anchor', async () => {
    const compiled = await render();
    for (const section of SECTIONS) {
      expect(compiled.querySelector(`section#${section.id}`)).toBeTruthy();
    }
  });

  it('should render every contact link', async () => {
    const compiled = await render();
    for (const link of CONTACT_LINKS) {
      expect(compiled.querySelector(`a[href="${link.href}"]`)).toBeTruthy();
    }
  });

  /* External links without rel="noopener" hand the opened page a reference back
     to this one via window.opener. Modern browsers imply it, older ones don't. */
  it('should set rel on external links', async () => {
    const compiled = await render();
    for (const link of CONTACT_LINKS.filter((l) => l.external)) {
      const el = compiled.querySelector(`a[href="${link.href}"]`);
      expect(el?.getAttribute('rel')).toContain('noopener');
    }
  });
});
