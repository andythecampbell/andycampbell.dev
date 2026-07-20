import { Component } from '@angular/core';
import { CONTACT_LINKS, SITE } from '../../data/site';

@Component({
  selector: 'app-site-footer',
  templateUrl: './site-footer.html',
})
export class SiteFooter {
  protected readonly links = CONTACT_LINKS;
  protected readonly site = SITE;
  protected readonly year = new Date().getFullYear();
}
