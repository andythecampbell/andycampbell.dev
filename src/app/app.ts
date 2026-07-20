import { Component } from '@angular/core';
import { SITE } from './data/site';
import { SiteNav } from './shared/site-nav/site-nav';
import { SiteFooter } from './shared/site-footer/site-footer';

@Component({
  selector: 'app-root',
  imports: [SiteNav, SiteFooter],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly site = SITE;
}
