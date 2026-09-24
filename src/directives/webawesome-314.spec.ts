import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WaComboboxComponent } from './combobox/combobox.directive';
import { WaDialogDirective } from './dialog/dialog.directive';
import { WaDividerDirective } from './divider/divider.directive';
import { WaDrawerDirective } from './drawer/drawer.directive';
import { WaZoomableFrameDirective } from './zoomable-frame/zoomable-frame.directive';

@Component({
  standalone: true,
  imports: [WaComboboxComponent, WaDialogDirective, WaDividerDirective, WaDrawerDirective, WaZoomableFrameDirective],
  template: `
    <wa-combobox [dataSource]="dataSource" [server]="server" [loading]="loading"
      [filterDebounce]="debounce" (waOptionsRequest)="requested = $event"></wa-combobox>
    <wa-divider [withLabel]="withLabel" [labelPlacement]="placement" [labelSpacing]="'1rem'">OR</wa-divider>
    <wa-dialog [withLabel]="withLabel" label="Preferences"></wa-dialog>
    <wa-drawer [withLabel]="withLabel" label="Menu"></wa-drawer>
    <wa-zoomable-frame [allow]="allow" [name]="frameName" [label]="frameLabel"></wa-zoomable-frame>
  `
})
class Host {
  dataSource: ((request: { query: string; signal: AbortSignal }) => unknown) | null = () => [];
  server = true;
  loading = true;
  debounce = 400;
  withLabel = true;
  placement: 'start' | 'center' | 'end' = 'start';
  allow = 'clipboard-write';
  frameName = 'preview';
  frameLabel = 'Document preview';
  requested?: CustomEvent;
}

describe('Web Awesome 3.14 additions', () => {
  let fixture: ComponentFixture<Host>;
  let host: Host;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [Host] }).compileComponents();
    fixture = TestBed.createComponent(Host);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('binds combobox server options and forwards option requests', () => {
    const el: HTMLElement & { dataSource?: unknown } = fixture.nativeElement.querySelector('wa-combobox');
    expect(el.dataSource).toBe(host.dataSource);
    expect(el.hasAttribute('server')).toBeTrue();
    expect(el.hasAttribute('loading')).toBeTrue();
    expect(el.getAttribute('filter-debounce')).toBe('400');
    const event = new CustomEvent('wa-options-request', { detail: { query: 'a', signal: new AbortController().signal } });
    el.dispatchEvent(event);
    expect(host.requested).toBe(event);
    host.server = false;
    host.loading = false;
    host.dataSource = null;
    fixture.detectChanges();
    expect(el.hasAttribute('server')).toBeFalse();
    expect(el.hasAttribute('loading')).toBeFalse();
    expect(el.dataSource).toBeNull();
  });

  it('binds server-rendered labels and divider layout', () => {
    const divider: HTMLElement = fixture.nativeElement.querySelector('wa-divider');
    const dialog: HTMLElement = fixture.nativeElement.querySelector('wa-dialog');
    const drawer: HTMLElement = fixture.nativeElement.querySelector('wa-drawer');
    expect(divider.textContent).toContain('OR');
    expect(divider.getAttribute('label-placement')).toBe('start');
    expect(divider.style.getPropertyValue('--label-spacing')).toBe('1rem');
    expect([divider, dialog, drawer].every(el => el.hasAttribute('with-label'))).toBeTrue();
    host.withLabel = false;
    fixture.detectChanges();
    expect([divider, dialog, drawer].every(el => !el.hasAttribute('with-label'))).toBeTrue();
  });

  it('binds the new zoomable frame attributes', () => {
    const frame: HTMLElement = fixture.nativeElement.querySelector('wa-zoomable-frame');
    expect(frame.getAttribute('allow')).toBe('clipboard-write');
    expect(frame.getAttribute('name')).toBe('preview');
    expect(frame.getAttribute('label')).toBe('Document preview');
    host.allow = 'fullscreen';
    fixture.detectChanges();
    expect(frame.getAttribute('allow')).toBe('fullscreen');
  });
});
