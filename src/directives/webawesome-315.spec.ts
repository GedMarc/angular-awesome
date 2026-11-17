import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import {
  WaButtonGroupDirective, WaCodeHighlighterDirective, WaCounterDirective, WaDialogDirective,
  WaDrawerDirective, WaLightboxDirective, WaLightboxItemDirective, WaNumberTickerDirective,
  WaPageComponent, WaPopoverDirective, WaPopoverVirtualAnchor, WaRichTextEditorDirective,
  WaTextareaComponent
} from '../public-api';

@Component({
  imports: [
    FormsModule, ReactiveFormsModule, WaCodeHighlighterDirective, WaCounterDirective,
    WaLightboxDirective, WaLightboxItemDirective, WaNumberTickerDirective, WaRichTextEditorDirective,
    WaPopoverDirective, WaDialogDirective, WaDrawerDirective, WaPageComponent, WaButtonGroupDirective,
    WaTextareaComponent
  ],
  template: `
    <wa-code-highlighter [code]="code" language="html" label="Example" [withoutCopy]="enabled"
      without-dedent [wrap]="enabled" [keywordColor]="color"
      (waLoad)="events.push($event)" (wa-error)="events.push($event)">
      &lt;h1&gt;Slot fallback&lt;/h1&gt;
    </wa-code-highlighter>
    <wa-counter [date]="date" [duration]="duration" direction="down" largest-unit="hours"
      [smallestUnit]="smallestUnit" [paused]="enabled" withoutLabels [valueFormatter]="formatter"
      (wa-finish)="events.push($event)">
      <span slot="finished">Done</span>
    </wa-counter>
    <wa-lightbox [index]="index" label="Gallery" [open]="enabled" loop with-thumbnails
      withoutNavigation withoutCounter withoutZoom [backdropColor]="color" [thumbnailSize]="'4rem'"
      (waShow)="prevent($event)" (waAfterShow)="events.push($event)" (waHide)="prevent($event)"
      (wa-after-hide)="events.push($event)" (wa-item-change)="events.push($event)">
      <wa-lightbox-item type="video" [src]="src" srcset="/media.jpg 1x" sizes="100vw" alt="Demo"
        caption="Sample" thumbnail="/thumb.jpg" [width]="640" height="480">
        <span>Thumbnail</span>
      </wa-lightbox-item>
      <button slot="actions">Download</button>
    </wa-lightbox>
    <wa-number-ticker [value]="index" start-value="5" [duration]="duration" [delay]="0" easing="linear" eager
      type="currency" withoutGrouping currency="EUR" currencyDisplay="code" [minimumIntegerDigits]="2"
      [minimumFractionDigits]="0" [maximumFractionDigits]="4" [minimumSignificantDigits]="1"
      [maximumSignificantDigits]="3" [valueFormatter]="formatter" (waFinish)="events.push($event)">
    </wa-number-ticker>
    <wa-rich-text-editor [formControl]="editor" [defaultValue]="defaultEditorValue" [textColors]="swatches"
      [highlightColors]="highlights" [imageProvider]="imageProvider" [embedProvider]="embedProvider"
      [suggestions]="suggestions" [toolbar]="toolbar" [withCount]="enabled" with-label withHint
      format="markdown" iconLibrary="system" [autocorrect]="enabled" [spellcheck]="enabled"
      [contentMinHeight]="'10em'" [minLength]="2" [maxLength]="3" (waInput)="events.push($event)" (waChange)="events.push($event)"
      (selectionChange)="events.push($event)" (wa-suggestions-error)="events.push($event)"
      (wa-invalid)="events.push($event)">
      <span slot="label">Message</span>
      <button slot="actions">Insert</button>
    </wa-rich-text-editor>
    <wa-rich-text-editor [(ngModel)]="templateValue"></wa-rich-text-editor>
    <wa-rich-text-editor [(value)]="directValue"></wa-rich-text-editor>
    <wa-popover [anchor]="anchor" [htmlFor]="trigger">Content</wa-popover>
    <button id="trigger">Open</button>
    <wa-dialog [backdropColor]="color"></wa-dialog>
    <wa-drawer [backdropColor]="color"></wa-drawer>
    <wa-page [disableSticky]="disableSticky"></wa-page>
    <wa-page id="static-page" disable-sticky="subheader"></wa-page>
    <div waButtonGroup [label]="groupLabel"></div>
    <wa-textarea></wa-textarea>
  `
})
class ReleaseHost {
  code: string | null = '<wa-button>Run</wa-button>';
  enabled = true;
  color?: string = 'red';
  date: Date | string | null = new Date('2027-01-01T00:00:00Z');
  duration: number | null = 0;
  smallestUnit: 'seconds' | 'minutes' = 'minutes';
  formatter?: (value: number) => string = value => String(value).padStart(2, '0');
  index = 0;
  src?: string = '/demo.mp4';
  editor = new FormControl('**Initial**', { nonNullable: true });
  defaultEditorValue = 'Reset content';
  templateValue = 'Template content';
  directValue = 'Direct content';
  swatches = [{ color: 'red', label: 'Red' }];
  highlights = '';
  imageProvider = async () => ({ src: '/image.png' });
  embedProvider = async (src: string) => ({ src });
  suggestions = [{ trigger: '@', dataSource: () => [{ label: '@Alex' }] }];
  toolbar = 'bold | actions';
  anchor: WaPopoverVirtualAnchor | string | Element | null = null;
  trigger?: string = 'trigger';
  disableSticky: string | null = 'header banner';
  groupLabel?: string = 'Alignment';
  events: Event[] = [];

  prevent(event: Event): void {
    event.preventDefault();
    this.events.push(event);
  }
}

describe('Web Awesome 3.15 wrappers', () => {
  let fixture: ComponentFixture<ReleaseHost>;
  let host: ReleaseHost;

  beforeEach(() => {
    fixture = TestBed.createComponent(ReleaseHost);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  const element = <T extends HTMLElement = HTMLElement>(tag: string): T => fixture.nativeElement.querySelector(tag);

  it('binds literal highlighter code and restores slotted content when cleared', () => {
    const highlighter = element<HTMLElement & { code: string }>('wa-code-highlighter');
    expect(highlighter.code).toBe('<wa-button>Run</wa-button>');
    expect(highlighter.querySelector('wa-button')).toBeNull();
    expect(highlighter.getAttribute('language')).toBe('html');
    expect(highlighter.getAttribute('label')).toBe('Example');
    expect(highlighter.hasAttribute('without-copy')).toBeTrue();
    expect(highlighter.hasAttribute('without-dedent')).toBeTrue();
    expect(highlighter.hasAttribute('wrap')).toBeTrue();
    expect(highlighter.style.getPropertyValue('--keyword-color')).toBe('red');

    host.code = null;
    host.enabled = false;
    host.color = undefined;
    fixture.detectChanges();
    expect(highlighter.code).toBe('');
    expect(highlighter.textContent).toContain('<h1>Slot fallback</h1>');
    expect(highlighter.hasAttribute('without-dedent')).toBeTrue();
    expect(highlighter.hasAttribute('without-copy')).toBeFalse();
    expect(highlighter.hasAttribute('wrap')).toBeFalse();
    expect(highlighter.style.getPropertyValue('--keyword-color')).toBe('');
  });

  it('forwards highlighter events through both output spellings', () => {
    const highlighter = element('wa-code-highlighter');
    const load = new Event('wa-load', { bubbles: true });
    const error = new Event('wa-error', { bubbles: true });
    highlighter.dispatchEvent(load);
    highlighter.dispatchEvent(error);
    expect(host.events).toEqual([load, error]);
  });

  it('sets counter dates, range, duration, pause state and formatter', () => {
    const counter = element<HTMLElement & { valueFormatter?: (value: number) => string }>('wa-counter');
    expect(counter.getAttribute('date')).toBe('2027-01-01T00:00:00.000Z');
    expect(counter.getAttribute('duration')).toBe('0');
    expect(counter.getAttribute('largest-unit')).toBe('hours');
    expect(counter.getAttribute('smallest-unit')).toBe('minutes');
    expect(counter.hasAttribute('without-labels')).toBeTrue();
    expect(counter.hasAttribute('paused')).toBeTrue();
    expect(counter.valueFormatter).toBe(host.formatter);
    expect(counter.querySelector('[slot="finished"]')?.textContent).toBe('Done');

    host.date = '2027-01-02T00:00:00+02:00';
    host.enabled = false;
    host.smallestUnit = 'seconds';
    fixture.detectChanges();
    expect(counter.getAttribute('date')).toBe(host.date);
    expect(counter.getAttribute('smallest-unit')).toBe('seconds');
    expect(counter.hasAttribute('paused')).toBeFalse();

    host.date = new Date(NaN);
    host.duration = null;
    host.formatter = undefined;
    fixture.detectChanges();
    expect(counter.hasAttribute('date')).toBeFalse();
    expect(counter.hasAttribute('duration')).toBeFalse();
    expect(counter.valueFormatter).toBeUndefined();

    const finish = new Event('wa-finish');
    counter.dispatchEvent(finish);
    expect(host.events).toEqual([finish]);
  });

  it('reflects ticker options and forwards restart and finish', () => {
    const ticker = fixture.debugElement.query(By.directive(WaNumberTickerDirective))
      .injector.get(WaNumberTickerDirective);
    const native = ticker.nativeElement as typeof ticker.nativeElement & { valueFormatter?: typeof host.formatter };
    native.restart = jasmine.createSpy('restart');
    ticker.restart();
    expect(native.restart).toHaveBeenCalled();
    expect(native.valueFormatter).toBe(host.formatter);
    const expected = {
      value: '0', 'start-value': '5', duration: '0', delay: '0', easing: 'linear', eager: '',
      type: 'currency', 'without-grouping': '', currency: 'EUR', 'currency-display': 'code',
      'minimum-integer-digits': '2', 'minimum-fraction-digits': '0', 'maximum-fraction-digits': '4',
      'minimum-significant-digits': '1', 'maximum-significant-digits': '3'
    };
    for (const [attribute, value] of Object.entries(expected)) {
      expect(native.getAttribute(attribute)).withContext(attribute).toBe(value);
    }
    host.index = 22;
    fixture.detectChanges();
    expect(native.getAttribute('value')).toBe('22');

    const finish = new Event('wa-finish');
    native.dispatchEvent(finish);
    expect(host.events).toEqual([finish]);
  });

  it('exposes lightbox items and delegates navigation, zoom and item focus', () => {
    const lightbox = fixture.debugElement.query(By.directive(WaLightboxDirective))
      .injector.get(WaLightboxDirective);
    const item = fixture.debugElement.query(By.directive(WaLightboxItemDirective))
      .injector.get(WaLightboxItemDirective);
    const native = lightbox.nativeElement;
    Object.defineProperties(native, {
      items: { value: [item.nativeElement] }, currentItem: { value: item.nativeElement }
    });
    expect(lightbox.items).toEqual([item.nativeElement]);
    expect(lightbox.currentItem).toBe(item.nativeElement);
    for (const method of ['next', 'previous', 'zoomIn', 'zoomOut'] as const) {
      native[method] = jasmine.createSpy(method);
      lightbox[method]();
      expect(native[method]).toHaveBeenCalled();
    }
    const focus = spyOn(item.nativeElement, 'focus');
    item.focus({ preventScroll: true });
    expect(focus).toHaveBeenCalledWith({ preventScroll: true });

    for (const name of ['open', 'loop', 'with-thumbnails', 'without-navigation', 'without-counter', 'without-zoom']) {
      expect(native.hasAttribute(name)).withContext(name).toBeTrue();
    }
    expect(native.getAttribute('index')).toBe('0');
    expect(native.style.getPropertyValue('--backdrop-color')).toBe('red');
    expect(native.style.getPropertyValue('--thumbnail-size')).toBe('4rem');
    expect(native.querySelector('[slot="actions"]')?.textContent).toBe('Download');
    expect(item.nativeElement.getAttribute('type')).toBe('video');
    expect(item.nativeElement.getAttribute('src')).toBe('/demo.mp4');
    expect(item.nativeElement.getAttribute('srcset')).toBe('/media.jpg 1x');
    expect(item.nativeElement.getAttribute('alt')).toBe('Demo');
    expect(item.nativeElement.getAttribute('caption')).toBe('Sample');
    expect(item.nativeElement.getAttribute('thumbnail')).toBe('/thumb.jpg');
    expect(item.nativeElement.getAttribute('width')).toBe('640');
    expect(item.nativeElement.getAttribute('height')).toBe('480');

    host.src = undefined;
    host.enabled = false;
    host.index = 2;
    fixture.detectChanges();
    expect(item.nativeElement.hasAttribute('src')).toBeFalse();
    expect(native.hasAttribute('open')).toBeFalse();
    expect(native.getAttribute('index')).toBe('2');
  });

  it('preserves lightbox event details and cancellation and ignores descendant events', () => {
    const native = element('wa-lightbox');
    const item = element('wa-lightbox-item');
    const show = new Event('wa-show', { bubbles: true, cancelable: true });
    const hide = new CustomEvent('wa-hide', { cancelable: true, detail: { source: native } });
    const afterShow = new Event('wa-after-show');
    const afterHide = new Event('wa-after-hide');
    const change = new CustomEvent('wa-item-change', { detail: { index: 0, previousIndex: -1, item, previousItem: null } });
    item.dispatchEvent(new Event('wa-show', { bubbles: true }));
    expect(native.dispatchEvent(show)).toBeFalse();
    expect(native.dispatchEvent(hide)).toBeFalse();
    for (const event of [afterShow, afterHide, change]) native.dispatchEvent(event);
    expect(host.events).toEqual([show, hide, afterShow, afterHide, change]);
  });

  it('writes rich text forms values and renders typed options without serializing objects', () => {
    const editor = fixture.debugElement.query(By.directive(WaRichTextEditorDirective))
      .injector.get(WaRichTextEditorDirective);
    const native = editor.nativeElement as typeof editor.nativeElement & {
      textColors: unknown; highlightColors: unknown; imageProvider: unknown; embedProvider: unknown; suggestions: unknown;
    };
    expect(native.value).toBe('**Initial**');
    expect(host.editor.valid).toBeTrue();
    expect(native.getAttribute('minlength')).toBe('2');
    expect(native.getAttribute('maxlength')).toBe('3');
    expect(native.defaultValue).toBe('Reset content');
    expect(native.getAttribute('format')).toBe('markdown');
    expect(native.getAttribute('toolbar')).toBe('bold | actions');
    expect(native.getAttribute('icon-library')).toBe('system');
    expect(native.hasAttribute('with-label')).toBeTrue();
    expect(native.hasAttribute('with-hint')).toBeTrue();
    expect(native.hasAttribute('with-count')).toBeTrue();
    expect(native.style.getPropertyValue('--content-min-height')).toBe('10em');
    expect(native.textColors).toBe(host.swatches);
    expect(native.highlightColors).toBe('');
    expect(native.imageProvider).toBe(host.imageProvider);
    expect(native.embedProvider).toBe(host.embedProvider);
    expect(native.suggestions).toBe(host.suggestions);

    host.toolbar = '';
    host.enabled = false;
    host.editor.setValue('Updated');
    host.editor.disable();
    fixture.detectChanges();
    expect(native.value).toBe('Updated');
    expect(native.defaultValue).toBe('Reset content');
    expect(native.getAttribute('toolbar')).toBe('');
    expect(native.getAttribute('autocorrect')).toBe('off');
    expect(native.getAttribute('spellcheck')).toBe('false');
    expect(native.hasAttribute('with-count')).toBeFalse();
    expect(native.hasAttribute('disabled')).toBeTrue();
    expect(host.events).toEqual([]);

    host.editor.enable();
    expect(native.hasAttribute('disabled')).toBeFalse();
  });

  it('updates and touches the reactive control on editor input and blur', () => {
    const native = element<HTMLElement & { value: string }>('wa-rich-text-editor');
    native.value = 'User edit';
    const input = new Event('input', { bubbles: true });
    const change = new Event('change');
    const selection = new Event('selectionchange');
    const suggestionsError = new CustomEvent('wa-suggestions-error', {
      detail: { error: new Error('offline'), request: { trigger: '@', query: 'al' } }
    });
    const invalid = new Event('wa-invalid');
    for (const event of [input, change, selection, suggestionsError, invalid]) native.dispatchEvent(event);
    expect(host.editor.value).toBe('User edit');
    expect(host.editor.touched).toBeFalse();
    native.dispatchEvent(new FocusEvent('blur'));
    expect(host.editor.touched).toBeTrue();
    expect(host.events).toEqual([input, change, selection, suggestionsError, invalid]);
  });

  it('supports template-driven forms and direct two-way editor value binding', async () => {
    await fixture.whenStable();
    fixture.detectChanges();
    const [, templateEditor, directEditor] = Array.from(
      fixture.nativeElement.querySelectorAll('wa-rich-text-editor')
    ) as (HTMLElement & { value: string })[];
    expect(templateEditor.value).toBe('Template content');
    expect(directEditor.value).toBe('Direct content');

    templateEditor.value = 'Template edit';
    templateEditor.dispatchEvent(new Event('input'));
    directEditor.value = 'Direct edit';
    directEditor.dispatchEvent(new Event('input'));
    expect(host.templateValue).toBe('Template edit');
    expect(host.directValue).toBe('Direct edit');
  });

  it('delegates editor commands and reflects native validity after rendering', async () => {
    const editor = fixture.debugElement.query(By.directive(WaRichTextEditorDirective))
      .injector.get(WaRichTextEditorDirective);
    const native = editor.nativeElement;
    const runCommand = jasmine.createSpy().and.returnValue(true);
    const getSelection = jasmine.createSpy().and.returnValue({ from: 1, to: 2, empty: false });
    let validity = { valueMissing: false, valid: true };
    Object.defineProperties(native, {
      runCommand: { value: runCommand },
      getSelection: { value: getSelection },
      validity: { get: () => validity },
      validationMessage: { value: 'Text is too short' },
      updateComplete: {
        value: Promise.resolve().then(() => {
          validity = { valueMissing: true, valid: false };
          return true;
        })
      }
    });
    expect(editor.runCommand('heading', { level: 2 })).toBeTrue();
    expect(runCommand).toHaveBeenCalledWith('heading', { level: 2 });
    expect(editor.getSelection()).toEqual({ from: 1, to: 2, empty: false });
    host.editor.setValue('');
    await native.updateComplete;
    await fixture.whenStable();
    expect(host.editor.hasError('required')).toBeTrue();
    validity = { valueMissing: false, valid: false };
    host.editor.setValue('**x**');
    expect(host.editor.getError('waRichTextEditor')).toEqual({ message: 'Text is too short' });
  });

  it('passes element and virtual popover anchors as properties and restores a trigger ID', () => {
    const popover = element<HTMLElement & { anchor: Element | WaPopoverVirtualAnchor | null }>('wa-popover');
    const trigger = element('#trigger');
    const virtual = { getBoundingClientRect: () => new DOMRect(10, 20, 0, 0), contextElement: trigger };
    expect(popover.getAttribute('for')).toBe('trigger');

    host.anchor = virtual;
    fixture.detectChanges();
    expect(popover.anchor).toBe(virtual);
    expect(popover.hasAttribute('anchor')).toBeFalse();
    expect(popover.hasAttribute('for')).toBeFalse();

    host.anchor = trigger;
    fixture.detectChanges();
    expect(popover.anchor).toBe(trigger);

    host.anchor = null;
    fixture.detectChanges();
    expect(popover.getAttribute('for')).toBe('trigger');

    host.trigger = undefined;
    fixture.detectChanges();
    expect(popover.hasAttribute('for')).toBeFalse();
    expect(popover.anchor).toBeNull();
  });

  it('delegates popover visibility and repositioning to the native component', async () => {
    const popover = fixture.debugElement.query(By.directive(WaPopoverDirective)).injector.get(WaPopoverDirective);
    const show = jasmine.createSpy('show').and.resolveTo();
    const hide = jasmine.createSpy('hide').and.resolveTo();
    const reposition = jasmine.createSpy('reposition');
    Object.assign(popover.nativeElement, { show, hide, popup: { reposition } });

    await popover.show();
    await popover.hide();
    popover.reposition();
    expect(show).toHaveBeenCalledTimes(1);
    expect(hide).toHaveBeenCalledTimes(1);
    expect(reposition).toHaveBeenCalledTimes(1);
  });

  it('clears existing component styling and layout bindings on update', () => {
    const dialog = element('wa-dialog');
    const drawer = element('wa-drawer');
    const page = element('wa-page');
    const staticPage = element('#static-page');
    const group = element('[waButtonGroup]');
    expect(dialog.style.getPropertyValue('--backdrop-color')).toBe('red');
    expect(drawer.style.getPropertyValue('--backdrop-color')).toBe('red');
    expect(page.getAttribute('disable-sticky')).toBe('header banner');
    expect(staticPage.getAttribute('disable-sticky')).toBe('subheader');
    expect(group.getAttribute('aria-label')).toBe('Alignment');

    host.color = undefined;
    host.disableSticky = null;
    host.groupLabel = undefined;
    fixture.detectChanges();
    expect(dialog.style.getPropertyValue('--backdrop-color')).toBe('');
    expect(drawer.style.getPropertyValue('--backdrop-color')).toBe('');
    expect(page.hasAttribute('disable-sticky')).toBeFalse();
    expect(staticPage.getAttribute('disable-sticky')).toBe('subheader');
    expect(group.hasAttribute('aria-label')).toBeFalse();
  });

  it('delegates both vertical and horizontal textarea scroll offsets', () => {
    const textarea = fixture.debugElement.query(By.directive(WaTextareaComponent));
    const scrollPosition = jasmine.createSpy().and.returnValue({ top: 10, left: 20 });
    textarea.nativeElement.scrollPosition = scrollPosition;
    const directive = textarea.injector.get(WaTextareaComponent);
    expect(directive.scrollPosition()).toEqual({ top: 10, left: 20 });
    directive.scrollPosition({ left: 50 });
    expect(scrollPosition.calls.mostRecent().args).toEqual([{ left: 50 }]);
  });
});
