import { Component } from '@angular/core';
import { NOW, SITE } from './data/site';
import { SiteNav } from './shared/site-nav/site-nav';
import { SiteFooter } from './shared/site-footer/site-footer';
import { SectionHeading } from './shared/section-heading/section-heading';

@Component({
  selector: 'app-root',
  imports: [SiteNav, SiteFooter, SectionHeading],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly site = SITE;
  protected readonly now = NOW;
}
