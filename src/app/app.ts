import { Component } from '@angular/core';
import { ARC, CONTACT_LEDE, CONTACT_LINKS, HERO, NOW, SITE } from './data/site';
import { SiteNav } from './shared/site-nav/site-nav';
import { SiteFooter } from './shared/site-footer/site-footer';
import { SectionHeading } from './shared/section-heading/section-heading';
import { CaseStudies } from './shared/case-studies/case-studies';
import { TechStack } from './shared/tech-stack/tech-stack';

@Component({
  selector: 'app-root',
  imports: [SiteNav, SiteFooter, SectionHeading, CaseStudies, TechStack],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly site = SITE;
  protected readonly hero = HERO;
  protected readonly now = NOW;
  protected readonly arc = ARC;
  protected readonly contactLede = CONTACT_LEDE;
  protected readonly contactLinks = CONTACT_LINKS;
}
