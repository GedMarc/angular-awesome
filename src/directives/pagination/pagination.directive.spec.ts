import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { WaPaginationDirective } from './pagination.directive';

@Component({
  template: `
    <wa-pagination
      [total]="total"
      [pageSize]="pageSize"
      [page]="page"
      [siblingCount]="siblingCount"
      [boundaryCount]="boundaryCount"
      [withoutNav]="withoutNav"
      [withEdges]="withEdges"
      [withSummary]="withSummary"
      [format]="format"
      [hrefTemplate]="hrefTemplate"
      [hideSinglePage]="hideSinglePage"
      [label]="label"
      [appearance]="appearance"
      [disabled]="disabled"
      (waPageChange)="onPageChange($event)"
      (waBeforePageChange)="onBeforePageChange($event)"
    ></wa-pagination>
  `,
  standalone: true,
  imports: [WaPaginationDirective]
})
class TestHostComponent {
  total?: number | string;
  pageSize?: number | string;
  page?: number | string;
  siblingCount?: number | string;
  boundaryCount?: number | string;
  withoutNav?: boolean | string;
  withEdges?: boolean | string;
  withSummary?: boolean | string;
  format?: string;
  hrefTemplate?: string | ((page: number) => string);
  hideSinglePage?: boolean | string;
  label?: string;
  appearance?: string;
  disabled?: boolean | string;

  lastPageChange?: CustomEvent;
  lastBeforePageChange?: CustomEvent;
  onPageChange(event: CustomEvent) { this.lastPageChange = event; }
  onBeforePageChange(event: CustomEvent) { this.lastBeforePageChange = event; }
}

describe('WaPaginationDirective', () => {
  let hostComponent: TestHostComponent;
  let hostFixture: ComponentFixture<TestHostComponent>;
  let paginationElement: HTMLElement;
  let directive: WaPaginationDirective;

  beforeEach(async () => {
    if (!window.customElements) {
      (window as any).customElements = {
        whenDefined: () => Promise.resolve(),
        define: () => {}
      };
    }

    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    }).compileComponents();

    hostFixture = TestBed.createComponent(TestHostComponent);
    hostComponent = hostFixture.componentInstance;
    hostFixture.detectChanges();

    paginationElement = hostFixture.nativeElement.querySelector('wa-pagination');
    directive = hostFixture.debugElement
      .query(sel => sel.nativeElement === paginationElement)
      .injector.get(WaPaginationDirective);
  });

  it('should create the directive', () => {
    expect(hostComponent).toBeTruthy();
    expect(paginationElement).toBeTruthy();
    expect(directive).toBeTruthy();
  });

  it('should set numeric attributes', () => {
    hostComponent.total = 237;
    hostComponent.pageSize = 25;
    hostComponent.page = 3;
    hostComponent.siblingCount = 1;
    hostComponent.boundaryCount = 2;
    hostFixture.detectChanges();

    expect(paginationElement.getAttribute('total')).toBe('237');
    expect(paginationElement.getAttribute('page-size')).toBe('25');
    expect(paginationElement.getAttribute('page')).toBe('3');
    expect(paginationElement.getAttribute('sibling-count')).toBe('1');
    expect(paginationElement.getAttribute('boundary-count')).toBe('2');
  });

  it('should set boolean attributes', () => {
    hostComponent.withoutNav = true;
    hostComponent.withEdges = true;
    hostComponent.withSummary = true;
    hostComponent.hideSinglePage = true;
    hostComponent.disabled = true;
    hostFixture.detectChanges();

    expect(paginationElement.hasAttribute('without-nav')).toBeTrue();
    expect(paginationElement.hasAttribute('with-edges')).toBeTrue();
    expect(paginationElement.hasAttribute('with-summary')).toBeTrue();
    expect(paginationElement.hasAttribute('hide-single-page')).toBeTrue();
    expect(paginationElement.hasAttribute('disabled')).toBeTrue();

    hostComponent.withEdges = false;
    hostFixture.detectChanges();
    expect(paginationElement.hasAttribute('with-edges')).toBeFalse();
  });

  it('should set the format and appearance attributes', () => {
    hostComponent.format = 'compact';
    hostComponent.appearance = 'filled';
    hostComponent.label = 'Product pages';
    hostFixture.detectChanges();

    expect(paginationElement.getAttribute('format')).toBe('compact');
    expect(paginationElement.getAttribute('appearance')).toBe('filled');
    expect(paginationElement.getAttribute('label')).toBe('Product pages');
  });

  it('should reflect a string hrefTemplate as an attribute', () => {
    hostComponent.hrefTemplate = '/products?page={page}';
    hostFixture.detectChanges();
    expect(paginationElement.getAttribute('href-template')).toBe('/products?page={page}');
  });

  it('should set a function hrefTemplate as a property', () => {
    const fn = (page: number) => `/products/${page}`;
    hostComponent.hrefTemplate = fn;
    hostFixture.detectChanges();
    expect((paginationElement as any).hrefTemplate).toBe(fn);
    expect(paginationElement.hasAttribute('href-template')).toBeFalse();
  });

  it('should expose totalPages from the native element', () => {
    (paginationElement as any).totalPages = 10;
    expect(directive.totalPages).toBe(10);
  });

  it('should expose the native element', () => {
    expect(directive.nativeElement).toBe(paginationElement);
  });

  it('should emit waPageChange when the native event fires', () => {
    const event = new CustomEvent('wa-page-change', { detail: { page: 4 } });
    paginationElement.dispatchEvent(event);
    expect(hostComponent.lastPageChange).toBe(event);
  });

  it('should emit waBeforePageChange when the native event fires', () => {
    const event = new CustomEvent('wa-before-page-change', { detail: { page: 4 }, cancelable: true });
    paginationElement.dispatchEvent(event);
    expect(hostComponent.lastBeforePageChange).toBe(event);
  });
});

