import { Component } from '@angular/core';
import {
  ARC,
  CONTACT_LEDE,
  CONTACT_LINKS,
  HERO,
  NOW,
  PROJECTS,
  SITE,
  TEAMMATE,
  TECH_GROUPS,
  TECH_NOTE,
  VISUAL_WORK,
} from './data/site';
import { SiteNav } from './shared/site-nav/site-nav';
import { SiteFooter } from './shared/site-footer/site-footer';
import { SectionHeading } from './shared/section-heading/section-heading';
import { ArtifactFigure } from './shared/artifact-figure/artifact-figure';

@Component({
  selector: 'app-root',
  imports: [SiteNav, SiteFooter, SectionHeading, ArtifactFigure],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly site = SITE;
  protected readonly hero = HERO;
  protected readonly now = NOW;
  protected readonly visualWork = VISUAL_WORK;
  protected readonly projects = PROJECTS;
  protected readonly arc = ARC;
  protected readonly teammate = TEAMMATE;
  protected readonly techGroups = TECH_GROUPS;
  protected readonly techNote = TECH_NOTE;
  protected readonly contactLede = CONTACT_LEDE;
  protected readonly contactLinks = CONTACT_LINKS;
}
