import { Component } from '@angular/core';
import { TECH_CORE, TECH_DOMAINS, type TechDomain, type TechNode } from '../../data/site';

/**
 * The Technologies section: an always-visible core row plus expandable domain
 * groups (SPEC.md §6.6).
 *
 * Built on native <details>/<summary>, deliberately:
 *  - works with no JS (groups just open),
 *  - keyboard- and screen-reader-native,
 *  - every item prerenders, so the full range is in the HTML for search even
 *    while a group is visually collapsed.
 *
 * Within an expanded group, leaf technologies show as a chip row; a node that
 * has children (ERP → Sage / Epicor / SAP) shows as a small labelled sub-row, so
 * the grouping Andy captured survives rather than being flattened away.
 */
@Component({
  selector: 'app-tech-stack',
  templateUrl: './tech-stack.html',
})
export class TechStack {
  protected readonly core = TECH_CORE;
  protected readonly domains = TECH_DOMAINS;

  /** Every listed thing under a domain (nodes + their children) — the count that
      hints at the range before a group is opened. */
  protected count(domain: TechDomain): number {
    return domain.nodes.reduce((total, node) => total + 1 + (node.children?.length ?? 0), 0);
  }

  protected leaves(domain: TechDomain): readonly TechNode[] {
    return domain.nodes.filter((n) => !n.children?.length);
  }

  protected parents(domain: TechDomain): readonly TechNode[] {
    return domain.nodes.filter((n) => n.children?.length);
  }
}
