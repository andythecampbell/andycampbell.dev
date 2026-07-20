import { Component } from '@angular/core';
import { SECTIONS, SITE } from '../../data/site';
import { ThemeToggle } from '../theme-toggle/theme-toggle';

@Component({
  selector: 'app-site-nav',
  imports: [ThemeToggle],
  templateUrl: './site-nav.html',
})
export class SiteNav {
  protected readonly sections = SECTIONS;
  protected readonly site = SITE;
}
