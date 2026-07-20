import { Component } from '@angular/core';
import { SITE } from '../../data/site';

@Component({
  selector: 'app-site-footer',
  templateUrl: './site-footer.html',
})
export class SiteFooter {
  protected readonly site = SITE;
  protected readonly year = new Date().getFullYear();
}
