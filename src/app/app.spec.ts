import { TestBed } from '@angular/core/testing';
import { App } from './app';
import {
  ARC,
  CASE_STUDIES,
  CASE_STUDY_SECTIONS,
  CONTACT_LINKS,
  HERO,
  NOW,
  SECTIONS,
  TECH_GROUPS,
} from './data/site';

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

  it('should render the hero thesis', async () => {
    const compiled = await render();
    /* First ~40 chars, to survive smart-quote / whitespace differences between
       the source string and the rendered DOM. */
    expect(compiled.textContent).toContain(HERO.lede.slice(0, 40));
  });

  /* Exactly one technology group is the featured center-of-gravity cluster. Two
     (or zero) would mean the "feature it" signal is broken. */
  it('should feature exactly one technology group', () => {
    expect(TECH_GROUPS.filter((g) => g.featured).length).toBe(1);
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

  /* The links used to appear in both the contact section and the footer, which
     showed the same three addresses twice inside one screen height. */
  it('should render each contact link exactly once', async () => {
    const compiled = await render();
    for (const link of CONTACT_LINKS) {
      expect(compiled.querySelectorAll(`a[href="${link.href}"]`).length).toBe(1);
    }
  });

  it('should render the arc and every technology group', async () => {
    const compiled = await render();

    const arcText = compiled.querySelector('section#arc')?.textContent ?? '';
    for (const paragraph of ARC) {
      expect(arcText).toContain(paragraph.slice(0, 40));
    }

    const stackText = compiled.querySelector('section#stack')?.textContent ?? '';
    for (const group of TECH_GROUPS) {
      expect(stackText).toContain(group.label);
      for (const item of group.items) {
        expect(stackText).toContain(item);
      }
    }
  });

  /* These are claims about a real employer's numbers. If a template change ever
     drops one silently, the section quietly becomes vaguer than intended. */
  it('should render both metrics with their before and after values', async () => {
    const compiled = await render();
    const text = compiled.querySelector('section#now')?.textContent ?? '';
    for (const m of NOW.metrics) {
      expect(text).toContain(m.from);
      expect(text).toContain(m.to);
      expect(text).toContain(m.change);
    }
  });

  /* Every case study follows the three-part template. The tuple type enforces
     this at compile time; this asserts it survives into the data too, so a
     stray edit can't leave a study with two sections or four. */
  it('should give every case study exactly three sections', () => {
    for (const study of CASE_STUDIES) {
      expect(study.sections.length).toBe(CASE_STUDY_SECTIONS.length);
    }
  });

  /* The carousel prerenders every slide (SSG / no-JS / screen readers all read
     the full set), each with its artifact and the three template labels. */
  it('should prerender every case study slide with its artifact and template', async () => {
    const compiled = await render();
    const slides = compiled.querySelectorAll('article[aria-roledescription="slide"]');
    expect(slides.length).toBe(CASE_STUDIES.length);

    for (const study of CASE_STUDIES) {
      const img = compiled.querySelector<HTMLImageElement>(`img[src="${study.artifact.src}"]`);
      expect(img).toBeTruthy();
      expect(img?.getAttribute('alt')?.length ?? 0).toBeGreaterThan(20);
    }

    const workText = compiled.querySelector('section#work')?.textContent ?? '';
    for (const label of CASE_STUDY_SECTIONS) {
      expect(workText).toContain(label);
    }
  });

  it('should link a case study with its access state announced', async () => {
    const compiled = await render();
    for (const study of CASE_STUDIES) {
      if (!study.link) continue;
      const link = compiled.querySelector(`a[href="${study.link.href}"]`);
      expect(link).toBeTruthy();
      expect(link?.textContent).toContain(study.link.access);
      expect(link?.getAttribute('rel')).toContain('noopener');
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
