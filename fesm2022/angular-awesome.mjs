import * as i0 from '@angular/core';
import { inject, ElementRef, Renderer2, Input, Directive, EventEmitter, Output, forwardRef, Component, ViewEncapsulation, HostListener, ChangeDetectionStrategy, ContentChild, InjectionToken, Injectable, signal, computed, HostBinding } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import * as i1 from '@angular/common';
import { NgIf, NgTemplateOutlet, CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

// Shared tokens and typed unions for Angular wrappers, aligned with React/Web Components
/**
 * Normalize appearance value to Web Awesome 3.0.0 format.
 * - Maps legacy 'filled outlined' or 'outlined filled' to 'filled-outlined'
 * - Trims whitespace and collapses spaces
 */
function normalizeAppearance(value) {
    if (value == null)
        return undefined;
    const v = String(value).trim().replace(/\s+/g, ' ');
    if (!v)
        return undefined;
    const lower = v.toLowerCase();
    if (lower === 'filled outlined' || lower === 'outlined filled') {
        return 'filled-outlined';
    }
    return v;
}

class WaBadgeDirective {
    variant = 'inherit';
    // Allowed appearances derived from Java enum: lowercased, underscores replaced with spaces
    appearance = 'accent';
    pill;
    pulse;
    fontSize;
    backgroundColor;
    borderColor;
    textColor;
    pulseColor;
    el = inject(ElementRef);
    renderer = inject(Renderer2);
    ngOnInit() {
        this.applyInputs();
    }
    ngOnChanges(_changes) {
        this.applyInputs();
    }
    applyInputs() {
        const nativeEl = this.el.nativeElement;
        this.setAttr('variant', this.variant);
        this.setAttr('appearance', normalizeAppearance(this.appearance));
        this.setBoolAttr('pill', this.pill);
        this.setBoolAttr('pulse', this.pulse);
        // Styles
        this.setStyleValue('fontSize', this.fontSize);
        this.setCssVar('--background-color', this.backgroundColor);
        this.setCssVar('--border-color', this.borderColor);
        this.setCssVar('--text-color', this.textColor);
        this.setCssVar('--pulse-color', this.pulseColor);
    }
    setAttr(name, value) {
        const nativeEl = this.el.nativeElement;
        if (value != null) {
            this.renderer.setAttribute(nativeEl, name, String(value));
        }
        else {
            this.renderer.removeAttribute(nativeEl, name);
        }
    }
    setBoolAttr(name, value) {
        const nativeEl = this.el.nativeElement;
        if (value === true || value === 'true' || value === '') {
            this.renderer.setAttribute(nativeEl, name, '');
        }
        else {
            this.renderer.removeAttribute(nativeEl, name);
        }
    }
    setStyleValue(styleProp, value) {
        const nativeEl = this.el.nativeElement;
        if (value != null) {
            nativeEl.style[styleProp] = value;
        }
        else {
            nativeEl.style[styleProp] = '';
        }
    }
    setCssVar(varName, value) {
        const nativeEl = this.el.nativeElement;
        if (value != null) {
            nativeEl.style.setProperty(varName, value);
        }
        else {
            nativeEl.style.removeProperty(varName);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaBadgeDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.14", type: WaBadgeDirective, isStandalone: true, selector: "wa-badge", inputs: { variant: "variant", appearance: "appearance", pill: "pill", pulse: "pulse", fontSize: "fontSize", backgroundColor: "backgroundColor", borderColor: "borderColor", textColor: "textColor", pulseColor: "pulseColor" }, usesOnChanges: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaBadgeDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'wa-badge',
                    standalone: true
                }]
        }], propDecorators: { variant: [{
                type: Input
            }], appearance: [{
                type: Input
            }], pill: [{
                type: Input
            }], pulse: [{
                type: Input
            }], fontSize: [{
                type: Input
            }], backgroundColor: [{
                type: Input
            }], borderColor: [{
                type: Input
            }], textColor: [{
                type: Input
            }], pulseColor: [{
                type: Input
            }] } });

class WaAvatarDirective {
    image;
    label;
    initials;
    shape = 'circle';
    loading = 'eager';
    fontSize;
    size;
    backgroundColor;
    textColor;
    el = inject(ElementRef);
    renderer = inject(Renderer2);
    ngOnInit() {
        // Initialize all attributes and styles
        this.syncAll();
    }
    ngOnChanges(changes) {
        // Reflect only the changed inputs to the underlying element
        const el = this.el.nativeElement;
        if ('image' in changes)
            this.setOrRemoveAttr('image', this.image);
        if ('label' in changes)
            this.setOrRemoveAttr('label', this.label);
        if ('initials' in changes)
            this.setOrRemoveAttr('initials', this.initials);
        if ('shape' in changes)
            this.setOrRemoveAttr('shape', this.shape);
        if ('loading' in changes)
            this.setOrRemoveAttr('loading', this.loading);
        if ('fontSize' in changes)
            el.style.fontSize = this.fontSize ?? '';
        if ('size' in changes)
            this.setOrRemoveCssVar('--size', this.size);
        if ('backgroundColor' in changes)
            this.setOrRemoveCssVar('--background-color', this.backgroundColor);
        if ('textColor' in changes)
            this.setOrRemoveCssVar('--text-color', this.textColor);
    }
    syncAll() {
        const el = this.el.nativeElement;
        this.setOrRemoveAttr('image', this.image);
        this.setOrRemoveAttr('label', this.label);
        this.setOrRemoveAttr('initials', this.initials);
        this.setOrRemoveAttr('shape', this.shape);
        this.setOrRemoveAttr('loading', this.loading);
        el.style.fontSize = this.fontSize ?? '';
        this.setOrRemoveCssVar('--size', this.size);
        this.setOrRemoveCssVar('--background-color', this.backgroundColor);
        this.setOrRemoveCssVar('--text-color', this.textColor);
    }
    setOrRemoveAttr(name, value) {
        const el = this.el.nativeElement;
        if (value === undefined || value === null || value === '') {
            this.renderer.removeAttribute(el, name);
        }
        else {
            this.renderer.setAttribute(el, name, String(value));
        }
    }
    setOrRemoveCssVar(name, value) {
        const el = this.el.nativeElement;
        if (value === undefined || value === null || value === '') {
            el.style.removeProperty(name);
        }
        else {
            el.style.setProperty(name, String(value));
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaAvatarDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.14", type: WaAvatarDirective, isStandalone: true, selector: "wa-avatar", inputs: { image: "image", label: "label", initials: "initials", shape: "shape", loading: "loading", fontSize: "fontSize", size: "size", backgroundColor: "backgroundColor", textColor: "textColor" }, usesOnChanges: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaAvatarDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'wa-avatar',
                    standalone: true
                }]
        }], propDecorators: { image: [{
                type: Input
            }], label: [{
                type: Input
            }], initials: [{
                type: Input
            }], shape: [{
                type: Input
            }], loading: [{
                type: Input
            }], fontSize: [{
                type: Input
            }], size: [{
                type: Input
            }], backgroundColor: [{
                type: Input
            }], textColor: [{
                type: Input
            }] } });

class WaAnimatedImageDirective {
    src;
    alt;
    play;
    iconSize;
    controlBoxSize;
    // Event outputs
    load = new EventEmitter();
    error = new EventEmitter();
    el = inject(ElementRef);
    renderer = inject(Renderer2);
    ngOnInit() {
        const nativeEl = this.el.nativeElement;
        this.setAttr('src', this.src);
        this.setAttr('alt', this.alt);
        this.setBooleanAttr('play', this.play);
        this.setStyle('--icon-size', this.iconSize);
        this.setStyle('--control-box-size', this.controlBoxSize);
        // Set up event listeners
        this.renderer.listen(nativeEl, 'wa-load', (event) => this.load.emit(event));
        this.renderer.listen(nativeEl, 'wa-error', (event) => this.error.emit(event));
    }
    setAttr(name, value) {
        if (value != null) {
            this.renderer.setAttribute(this.el.nativeElement, name, value);
        }
    }
    setStyle(name, value) {
        if (value != null) {
            this.el.nativeElement.style.setProperty(name, value);
        }
    }
    setBooleanAttr(name, value) {
        if (value === true || value === 'true' || value === '') {
            this.renderer.setAttribute(this.el.nativeElement, name, '');
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaAnimatedImageDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.14", type: WaAnimatedImageDirective, isStandalone: true, selector: "wa-animated-image", inputs: { src: "src", alt: "alt", play: "play", iconSize: "iconSize", controlBoxSize: "controlBoxSize" }, outputs: { load: "wa-load", error: "wa-error" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaAnimatedImageDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'wa-animated-image',
                    standalone: true
                }]
        }], propDecorators: { src: [{
                type: Input
            }], alt: [{
                type: Input
            }], play: [{
                type: Input
            }], iconSize: [{
                type: Input
            }], controlBoxSize: [{
                type: Input
            }], load: [{
                type: Output,
                args: ['wa-load']
            }], error: [{
                type: Output,
                args: ['wa-error']
            }] } });

/**
 * WaAnimationDirective
 *
 * Angular wrapper for the <wa-animation> Web Component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds all supported animation attributes as @Input() properties
 * - Supports JavaScript-only properties like keyframes and currentTime
 * - Emits animation lifecycle events (start, finish, cancel)
 * - Enables Angular-style class and style bindings
 * - Allows projection of a single child element
 * - Supports custom styling via CSS variables
 */
class WaAnimationDirective {
    // Standard animation inputs
    name;
    play;
    delay;
    duration;
    easing;
    direction;
    iterations;
    iterationStart;
    endDelay;
    fill;
    playbackRate;
    // JavaScript-only properties
    keyframes;
    currentTime; // CSSNumberish type
    // Styling inputs
    controlBoxSize;
    iconSize;
    // Event outputs
    waStart = new EventEmitter();
    waStartHyphen = this.waStart;
    waFinish = new EventEmitter();
    waFinishHyphen = this.waFinish;
    waCancel = new EventEmitter();
    waCancelHyphen = this.waCancel;
    // Injected services
    el = inject(ElementRef);
    renderer = inject(Renderer2);
    ngOnInit() {
        const nativeEl = this.el.nativeElement;
        // Set standard attributes
        this.setAttr('name', this.name);
        this.setBooleanAttr('play', this.play);
        this.setAttr('delay', this.delay?.toString());
        this.setAttr('duration', this.duration?.toString());
        this.setAttr('easing', this.easing);
        this.setAttr('direction', this.direction);
        this.setAttr('iterations', this.iterations?.toString());
        this.setAttr('iteration-start', this.iterationStart?.toString());
        this.setAttr('end-delay', this.endDelay?.toString());
        this.setAttr('fill', this.fill);
        this.setAttr('playback-rate', this.playbackRate?.toString());
        // Set CSS custom properties
        this.setStyle('--control-box-size', this.controlBoxSize);
        this.setStyle('--icon-size', this.iconSize);
        // Set JavaScript-only properties
        if (this.keyframes) {
            nativeEl.keyframes = this.keyframes;
        }
        if (this.currentTime !== undefined) {
            nativeEl.currentTime = this.currentTime;
        }
        // Set up event listeners
        this.renderer.listen(nativeEl, 'wa-start', (event) => this.waStart.emit(event));
        this.renderer.listen(nativeEl, 'wa-finish', (event) => this.waFinish.emit(event));
        this.renderer.listen(nativeEl, 'wa-cancel', (event) => this.waCancel.emit(event));
    }
    /**
     * Exposes the native animation element for direct interaction
     */
    get nativeAnimation() {
        return this.el.nativeElement;
    }
    /**
     * Sets an attribute on the native element if the value is not null or undefined
     */
    setAttr(name, value) {
        if (value != null) {
            this.renderer.setAttribute(this.el.nativeElement, name, value);
        }
    }
    /**
     * Sets a boolean attribute on the native element if the value is truthy (true | 'true' | '')
     */
    setBooleanAttr(name, value) {
        if (value === true || value === 'true' || value === '') {
            this.renderer.setAttribute(this.el.nativeElement, name, '');
        }
    }
    /**
     * Sets a style property on the native element if the value is not null or undefined
     */
    setStyle(name, value) {
        if (value != null) {
            this.el.nativeElement.style.setProperty(name, value);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaAnimationDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.14", type: WaAnimationDirective, isStandalone: true, selector: "wa-animation", inputs: { name: "name", play: "play", delay: "delay", duration: "duration", easing: "easing", direction: "direction", iterations: "iterations", iterationStart: "iterationStart", endDelay: "endDelay", fill: "fill", playbackRate: "playbackRate", keyframes: "keyframes", currentTime: "currentTime", controlBoxSize: "controlBoxSize", iconSize: "iconSize" }, outputs: { waStart: "waStart", waStartHyphen: "wa-start", waFinish: "waFinish", waFinishHyphen: "wa-finish", waCancel: "waCancel", waCancelHyphen: "wa-cancel" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaAnimationDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'wa-animation',
                    standalone: true
                }]
        }], propDecorators: { name: [{
                type: Input
            }], play: [{
                type: Input
            }], delay: [{
                type: Input
            }], duration: [{
                type: Input
            }], easing: [{
                type: Input
            }], direction: [{
                type: Input
            }], iterations: [{
                type: Input
            }], iterationStart: [{
                type: Input
            }], endDelay: [{
                type: Input
            }], fill: [{
                type: Input
            }], playbackRate: [{
                type: Input
            }], keyframes: [{
                type: Input
            }], currentTime: [{
                type: Input
            }], controlBoxSize: [{
                type: Input
            }], iconSize: [{
                type: Input
            }], waStart: [{
                type: Output
            }], waStartHyphen: [{
                type: Output,
                args: ['wa-start']
            }], waFinish: [{
                type: Output
            }], waFinishHyphen: [{
                type: Output,
                args: ['wa-finish']
            }], waCancel: [{
                type: Output
            }], waCancelHyphen: [{
                type: Output,
                args: ['wa-cancel']
            }] } });

/**
 * WaBreadcrumbDirective
 *
 * Angular wrapper for the <wa-breadcrumb> Web Component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds label attribute for accessibility
 * - Enables Angular-style class and style bindings
 * - Allows slot projection for breadcrumb items and custom separators
 * - Supports custom styling via CSS variables
 */
class WaBreadcrumbDirective {
    label;
    el = inject(ElementRef);
    renderer = inject(Renderer2);
    ngOnInit() {
        this.setAttr('label', this.label);
    }
    /**
     * Sets an attribute on the native element if the value is not null or undefined
     */
    setAttr(name, value) {
        if (value != null) {
            this.renderer.setAttribute(this.el.nativeElement, name, value);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaBreadcrumbDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.14", type: WaBreadcrumbDirective, isStandalone: true, selector: "wa-breadcrumb", inputs: { label: "label" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaBreadcrumbDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'wa-breadcrumb',
                    standalone: true
                }]
        }], propDecorators: { label: [{
                type: Input
            }] } });

/**
 * WaBreadcrumbItemDirective
 *
 * Angular wrapper for the <wa-breadcrumb-item> Web Component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds attributes: href, target, rel
 * - Enables Angular-style class and style bindings
 * - Allows slot projection for content, start, end, and custom separators
 * - Supports custom styling via CSS variables and ::part() selectors
 */
class WaBreadcrumbItemDirective {
    href;
    target;
    rel = 'noreferrer noopener';
    // Dialog integration: support both kebab-case and camelCase bindings
    _dataDialog;
    set dataDialogAttr(val) { this._dataDialog = val ?? null; }
    set dialogAttr(val) { this._dataDialog = val ?? null; }
    set dataDialog(val) { this._dataDialog = val ?? null; }
    el = inject(ElementRef);
    renderer = inject(Renderer2);
    ngOnInit() {
        this.setAttr('href', this.href);
        this.setAttr('target', this.target);
        this.setAttr('rel', this.rel);
        // Dialog attribute
        this.setAttr('data-dialog', this._dataDialog);
    }
    /**
     * Sets an attribute on the native element if the value is not null or undefined
     */
    setAttr(name, value) {
        if (value != null) {
            this.renderer.setAttribute(this.el.nativeElement, name, value);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaBreadcrumbItemDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.14", type: WaBreadcrumbItemDirective, isStandalone: true, selector: "wa-breadcrumb-item", inputs: { href: "href", target: "target", rel: "rel", dataDialogAttr: ["data-dialog", "dataDialogAttr"], dialogAttr: ["dialog", "dialogAttr"], dataDialog: "dataDialog" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaBreadcrumbItemDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'wa-breadcrumb-item',
                    standalone: true
                }]
        }], propDecorators: { href: [{
                type: Input
            }], target: [{
                type: Input
            }], rel: [{
                type: Input
            }], dataDialogAttr: [{
                type: Input,
                args: ['data-dialog']
            }], dialogAttr: [{
                type: Input,
                args: ['dialog']
            }], dataDialog: [{
                type: Input
            }] } });

/**
 * WaButtonDirective
 *
 * Angular wrapper for the <wa-button> Web Component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds all supported button attributes as @Input() properties
 * - Supports boolean attributes like pill, caret, disabled, loading
 * - Emits button events (blurNative, focusNative, waInvalid)
 * - Enables Angular-style class and style bindings
 * - Allows slot projection for start, end, and default content
 * - Supports custom styling via CSS variables
 * - Supports direct styling through color, backgroundColor, and fontSize inputs
 */
class WaButtonDirective {
    // Appearance inputs
    variant;
    /**
     * Appearance can be a single token or a space-separated combination of tokens.
     * Strictly typed to known tokens only.
     */
    appearance;
    size;
    // Boolean inputs
    pill;
    withCaret;
    caret;
    disabled;
    loading;
    // Button type inputs
    type;
    name;
    value;
    // Link inputs (when button acts as an anchor)
    href;
    target;
    rel;
    download;
    // Form inputs
    form;
    formAction;
    formEnctype;
    formMethod;
    formNoValidate;
    formTarget;
    // Direct styling inputs
    color;
    backgroundColor;
    fontSize;
    // Dialog integration: support both kebab-case and camelCase bindings
    _dataDialog;
    set dataDialogAttr(val) { this._dataDialog = val ?? null; }
    set dialogAttr(val) { this._dataDialog = val ?? null; }
    set dataDialog(val) { this._dataDialog = val ?? null; }
    // Event outputs
    waBlur = new EventEmitter();
    waBlurHyphen = this.waBlur;
    waFocus = new EventEmitter();
    waFocusHyphen = this.waFocus;
    waInvalid = new EventEmitter();
    waInvalidHyphen = this.waInvalid;
    // Injected services
    el = inject(ElementRef);
    renderer = inject(Renderer2);
    ngOnInit() {
        const nativeEl = this.el.nativeElement;
        // Set standard attributes
        this.setAttr('variant', this.variant);
        this.setAttr('appearance', normalizeAppearance(this.appearance));
        this.setAttr('size', this.size);
        this.setAttr('type', this.type);
        this.setAttr('name', this.name);
        this.setAttr('value', this.value);
        // Set link attributes
        this.setAttr('href', this.href);
        this.setAttr('target', this.target);
        this.setAttr('rel', this.rel);
        this.setAttr('download', this.download);
        // Set form attributes
        this.setAttr('form', this.form);
        this.setAttr('formaction', this.formAction);
        this.setAttr('formenctype', this.formEnctype);
        this.setAttr('formmethod', this.formMethod);
        this.setAttr('formtarget', this.formTarget);
        // Set boolean attributes (only if true)
        this.setBooleanAttr('pill', this.pill);
        // Map both inputs `withCaret` and `caret` to the underlying `with-caret` attribute for the Web Component
        this.setBooleanAttr('with-caret', (this.withCaret === true || this.withCaret === 'true' || this.withCaret === '' || this.caret === true || this.caret === 'true' || this.caret === ''));
        // Do not set a standalone `caret` attribute on the element, as the Web Component uses `with-caret`
        this.setBooleanAttr('disabled', this.disabled);
        this.setBooleanAttr('loading', this.loading);
        this.setBooleanAttr('formnovalidate', this.formNoValidate);
        // Dialog attribute
        this.setAttr('data-dialog', this._dataDialog);
        // Set up event listeners
        this.renderer.listen(nativeEl, 'blur', (event) => this.waBlur.emit(event));
        this.renderer.listen(nativeEl, 'wa-blur', (event) => this.waBlur.emit(event));
        this.renderer.listen(nativeEl, 'focus', (event) => this.waFocus.emit(event));
        this.renderer.listen(nativeEl, 'wa-focus', (event) => this.waFocus.emit(event));
        this.renderer.listen(nativeEl, 'wa-invalid', (event) => this.waInvalid.emit(event));
        // Handle data-dialog at click time to avoid timing issues with Angular rendering
        this.renderer.listen(nativeEl, 'click', (event) => {
            // Determine the instruction from the cached input or live attribute
            const raw = (this._dataDialog ?? nativeEl.getAttribute('data-dialog') ?? '').trim();
            if (!raw)
                return;
            // Support forms: "open id", "close id", or just "id" (treated as open)
            let action = 'open';
            let target = raw;
            const parts = raw.split(/\s+/);
            if (parts.length > 1 && (parts[0] === 'open' || parts[0] === 'close')) {
                action = parts[0];
                target = parts.slice(1).join(' ');
            }
            // Normalize id (accept leading '#')
            const id = target.replace(/^#/, '').trim();
            if (!id)
                return;
            const dialogEl = document.getElementById(id);
            if (dialogEl && typeof dialogEl.show === 'function' && typeof dialogEl.hide === 'function') {
                try {
                    if (action === 'open') {
                        dialogEl.show();
                    }
                    else {
                        dialogEl.hide();
                    }
                    // Prevent default if we handled the action
                    event.preventDefault?.();
                    event.stopPropagation?.();
                }
                catch { /* no-op */ }
            }
        });
        // Apply direct styling inputs
        if (this.color)
            nativeEl.style.color = this.color;
        if (this.backgroundColor)
            nativeEl.style.backgroundColor = this.backgroundColor;
        if (this.fontSize)
            nativeEl.style.fontSize = this.fontSize;
    }
    /**
     * Exposes the native button element for direct interaction
     */
    get nativeButton() {
        return this.el.nativeElement;
    }
    /**
     * Programmatically triggers click on the button
     */
    click() {
        this.el.nativeElement.click();
    }
    /**
     * Sets focusNative on the button
     */
    focus() {
        this.el.nativeElement.focus();
    }
    /**
     * Removes focusNative from the button
     */
    blur() {
        this.el.nativeElement.blur();
    }
    /**
     * Sets an attribute on the native element if the value is not null or undefined
     */
    setAttr(name, value) {
        if (value != null) {
            this.renderer.setAttribute(this.el.nativeElement, name, value);
        }
    }
    /**
     * Sets a boolean attribute on the native element if the value is truthy
     * For boolean attributes, the presence of the attribute (with empty value) indicates true
     */
    setBooleanAttr(name, value) {
        if (value === true || value === 'true' || value === '') {
            this.renderer.setAttribute(this.el.nativeElement, name, '');
        }
    }
    ngOnChanges(changes) {
        // Update dynamic attributes when inputs change after initialization
        if ('variant' in changes) {
            this.setOrRemoveAttr('variant', this.variant);
        }
        if ('appearance' in changes) {
            const norm = normalizeAppearance(this.appearance);
            this.setOrRemoveAttr('appearance', norm);
            // Also set the property to support web components that react to property changes but not attribute mutations
            this.el.nativeElement.appearance = norm ?? null;
        }
        if ('size' in changes) {
            this.setOrRemoveAttr('size', this.size);
        }
        // Map caret inputs to underlying with-caret attribute
        if ('caret' in changes || 'withCaret' in changes) {
            const v = (this.withCaret === true || this.withCaret === 'true' || this.withCaret === '' || this.caret === true || this.caret === 'true' || this.caret === '');
            const el = this.el.nativeElement;
            if (v) {
                this.renderer.setAttribute(el, 'with-caret', '');
            }
            else {
                this.renderer.removeAttribute(el, 'with-caret');
            }
            // Ensure no stray `caret` attribute remains
            this.renderer.removeAttribute(el, 'caret');
        }
    }
    setOrRemoveAttr(name, value) {
        const el = this.el.nativeElement;
        if (value == null) {
            this.renderer.removeAttribute(el, name);
        }
        else {
            this.renderer.setAttribute(el, name, String(value));
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaButtonDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.14", type: WaButtonDirective, isStandalone: true, selector: "wa-button", inputs: { variant: "variant", appearance: "appearance", size: "size", pill: "pill", withCaret: "withCaret", caret: "caret", disabled: "disabled", loading: "loading", type: "type", name: "name", value: "value", href: "href", target: "target", rel: "rel", download: "download", form: "form", formAction: "formAction", formEnctype: "formEnctype", formMethod: "formMethod", formNoValidate: "formNoValidate", formTarget: "formTarget", color: "color", backgroundColor: "backgroundColor", fontSize: "fontSize", dataDialogAttr: ["data-dialog", "dataDialogAttr"], dialogAttr: ["dialog", "dialogAttr"], dataDialog: "dataDialog" }, outputs: { waBlur: "waBlur", waBlurHyphen: "wa-blur", waFocus: "waFocus", waFocusHyphen: "wa-focus", waInvalid: "waInvalid", waInvalidHyphen: "wa-invalid" }, usesOnChanges: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaButtonDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'wa-button',
                    standalone: true
                }]
        }], propDecorators: { variant: [{
                type: Input
            }], appearance: [{
                type: Input
            }], size: [{
                type: Input
            }], pill: [{
                type: Input
            }], withCaret: [{
                type: Input
            }], caret: [{
                type: Input
            }], disabled: [{
                type: Input
            }], loading: [{
                type: Input
            }], type: [{
                type: Input
            }], name: [{
                type: Input
            }], value: [{
                type: Input
            }], href: [{
                type: Input
            }], target: [{
                type: Input
            }], rel: [{
                type: Input
            }], download: [{
                type: Input
            }], form: [{
                type: Input
            }], formAction: [{
                type: Input
            }], formEnctype: [{
                type: Input
            }], formMethod: [{
                type: Input
            }], formNoValidate: [{
                type: Input
            }], formTarget: [{
                type: Input
            }], color: [{
                type: Input
            }], backgroundColor: [{
                type: Input
            }], fontSize: [{
                type: Input
            }], dataDialogAttr: [{
                type: Input,
                args: ['data-dialog']
            }], dialogAttr: [{
                type: Input,
                args: ['dialog']
            }], dataDialog: [{
                type: Input
            }], waBlur: [{
                type: Output
            }], waBlurHyphen: [{
                type: Output,
                args: ['wa-blur']
            }], waFocus: [{
                type: Output
            }], waFocusHyphen: [{
                type: Output,
                args: ['wa-focus']
            }], waInvalid: [{
                type: Output
            }], waInvalidHyphen: [{
                type: Output,
                args: ['wa-invalid']
            }] } });

/**
 * WaButtonGroupDirective
 *
 * Angular wrapper for the <wa-button-group> Web Component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Container component for grouping related <wa-button> elements
 * - Supports shared attributes (size, variant, orientation)
 * - Provides accessibility features via label attribute
 * - Allows slot projection for buttons and compatible components
 *
 * Usage:
 * ```html
 * <!-- As an element -->
 * <wa-button-group label="Alignment">
 *   <wa-button>Left</wa-button>
 *   <wa-button>Center</wa-button>
 *   <wa-button>Right</wa-button>
 * </wa-button-group>
 *
 * <!-- As an attribute -->
 * <div waButtonGroup label="Alignment">
 *   <button waButton>Left</button>
 *   <button waButton>Center</button>
 *   <button waButton>Right</button>
 * </div>
 * ```
 *
 * Slots:
 * - (default): Buttons and controls inside the group
 *
 * CSS Parts:
 * - base: The wrapper of the group
 */
class WaButtonGroupDirective {
    // Required input for accessibility
    label;
    // Appearance inputs that are inherited by contained buttons
    size;
    variant;
    orientation;
    // Injected services
    el = inject(ElementRef);
    renderer = inject(Renderer2);
    ngOnInit() {
        const nativeEl = this.el.nativeElement;
        // Set standard attributes
        this.setAttr('label', this.label);
        this.setAttr('size', this.size);
        this.setAttr('variant', this.variant);
        this.setAttr('orientation', this.orientation);
        // If label is provided, set aria-label for accessibility
        if (this.label) {
            this.setAttr('aria-label', this.label);
        }
    }
    /**
     * Exposes the native button group element for direct interaction
     */
    get nativeButtonGroup() {
        return this.el.nativeElement;
    }
    /**
     * Sets an attribute on the native element if the value is not null or undefined
     */
    setAttr(name, value) {
        if (value != null) {
            this.renderer.setAttribute(this.el.nativeElement, name, value);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaButtonGroupDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.14", type: WaButtonGroupDirective, isStandalone: true, selector: "wa-button-group, [waButtonGroup]", inputs: { label: "label", size: "size", variant: "variant", orientation: "orientation" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaButtonGroupDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'wa-button-group, [waButtonGroup]',
                    standalone: true
                }]
        }], propDecorators: { label: [{
                type: Input
            }], size: [{
                type: Input
            }], variant: [{
                type: Input
            }], orientation: [{
                type: Input
            }] } });

/**
 * WaCalloutDirective
 *
 * Angular wrapper for the <wa-callout> Web Component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds all supported callout attributes as @Input() properties
 * - Supports variant, appearance, and size customization
 * - Enables Angular-style class and style bindings
 * - Allows slot projection for icon and default content
 * - Supports custom styling via CSS variables
 */
class WaCalloutDirective {
    // Appearance inputs
    variant;
    appearance;
    size;
    // Injected services
    el = inject(ElementRef);
    renderer = inject(Renderer2);
    ngOnInit() {
        const nativeEl = this.el.nativeElement;
        // Set standard attributes
        this.setAttr('variant', this.variant);
        this.setAttr('appearance', normalizeAppearance(this.appearance));
        this.setAttr('size', this.size);
    }
    /**
     * Exposes the native callout element for direct interaction
     */
    get nativeElement() {
        return this.el.nativeElement;
    }
    /**
     * Sets an attribute on the native element if the value is not null or undefined
     */
    setAttr(name, value) {
        if (value != null) {
            this.renderer.setAttribute(this.el.nativeElement, name, value);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaCalloutDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.14", type: WaCalloutDirective, isStandalone: true, selector: "wa-callout", inputs: { variant: "variant", appearance: "appearance", size: "size" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaCalloutDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'wa-callout',
                    standalone: true
                }]
        }], propDecorators: { variant: [{
                type: Input
            }], appearance: [{
                type: Input
            }], size: [{
                type: Input
            }] } });

/**
 * WaCardDirective
 *
 * Angular wrapper for the <wa-card> Web Component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds all supported card attributes as @Input() properties
 * - Supports appearance and size customization
 * - Supports boolean attributes for header, image, and footer
 * - Enables Angular-style class and style bindings
 * - Allows slot projection for header, footer, image, and default content
 * - Supports custom styling via CSS variables
 * - Supports direct styling through color, backgroundColor, fontSize inputs
 */
class WaCardDirective {
    // Appearance inputs
    appearance;
    // Boolean inputs
    withHeader;
    withImage;
    withFooter;
    // Direct styling inputs
    color;
    backgroundColor;
    fontSize;
    // CSS custom property inputs
    borderRadius;
    borderColor;
    innerBorderColor;
    borderWidth;
    spacing;
    // Injected services
    el = inject(ElementRef);
    renderer = inject(Renderer2);
    ngOnInit() {
        const nativeEl = this.el.nativeElement;
        // Set standard attributes
        this.setAttr('appearance', normalizeAppearance(this.appearance));
        // Set boolean attributes (only if true)
        this.setBooleanAttr('with-header', this.withHeader);
        this.setBooleanAttr('with-image', this.withImage);
        this.setBooleanAttr('with-footer', this.withFooter);
        // Apply direct styling inputs
        if (this.color)
            nativeEl.style.color = this.color;
        if (this.backgroundColor)
            nativeEl.style.backgroundColor = this.backgroundColor;
        if (this.fontSize)
            nativeEl.style.fontSize = this.fontSize;
        // Set CSS custom properties
        if (this.borderRadius)
            nativeEl.style.setProperty('--border-radius', this.borderRadius);
        if (this.borderColor)
            nativeEl.style.setProperty('--border-color', this.borderColor);
        if (this.innerBorderColor)
            nativeEl.style.setProperty('--inner-border-color', this.innerBorderColor);
        if (this.borderWidth)
            nativeEl.style.setProperty('--border-width', this.borderWidth);
        if (this.spacing)
            nativeEl.style.setProperty('--spacing', this.spacing);
    }
    /**
     * Exposes the native card element for direct interaction
     */
    get nativeElement() {
        return this.el.nativeElement;
    }
    /**
     * Sets an attribute on the native element if the value is not null or undefined
     */
    setAttr(name, value) {
        if (value != null) {
            this.renderer.setAttribute(this.el.nativeElement, name, value);
        }
    }
    /**
     * Sets a boolean attribute on the native element if the value is truthy
     * For boolean attributes, the presence of the attribute (with empty value) indicates true
     */
    setBooleanAttr(name, value) {
        if (value === true || value === 'true' || value === '') {
            this.renderer.setAttribute(this.el.nativeElement, name, '');
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaCardDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.14", type: WaCardDirective, isStandalone: true, selector: "wa-card", inputs: { appearance: "appearance", withHeader: "withHeader", withImage: "withImage", withFooter: "withFooter", color: "color", backgroundColor: "backgroundColor", fontSize: "fontSize", borderRadius: "borderRadius", borderColor: "borderColor", innerBorderColor: "innerBorderColor", borderWidth: "borderWidth", spacing: "spacing" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaCardDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'wa-card',
                    standalone: true
                }]
        }], propDecorators: { appearance: [{
                type: Input
            }], withHeader: [{
                type: Input
            }], withImage: [{
                type: Input
            }], withFooter: [{
                type: Input
            }], color: [{
                type: Input
            }], backgroundColor: [{
                type: Input
            }], fontSize: [{
                type: Input
            }], borderRadius: [{
                type: Input
            }], borderColor: [{
                type: Input
            }], innerBorderColor: [{
                type: Input
            }], borderWidth: [{
                type: Input
            }], spacing: [{
                type: Input
            }] } });

/**
 * WaCarouselDirective
 *
 * Angular wrapper for the <wa-carousel> Web Component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds all supported carousel attributes as @Input() properties
 * - Supports boolean attributes like loop, navigation, pagination, autoplay, mouseDragging
 * - Supports numeric attributes like autoplayInterval, slidesPerPage, slidesPerMove
 * - Supports string attributes like orientation
 * - Emits slide change events
 * - Enables Angular-style class and style bindings
 * - Allows slot projection for carousel items and navigation icons
 * - Supports custom styling via CSS variables
 * - Provides methods for programmatic control (next, previous, goToSlide)
 */
class WaCarouselDirective {
    // Boolean inputs
    loop;
    navigation;
    pagination;
    autoplay;
    mouseDragging;
    // Numeric inputs
    autoplayInterval;
    slidesPerPage;
    slidesPerMove;
    // String inputs
    orientation;
    // Event outputs
    waSlideChange = new EventEmitter();
    waSlideChangeCamel = this.waSlideChange;
    // Injected services
    el = inject(ElementRef);
    renderer = inject(Renderer2);
    ngOnInit() {
        const nativeEl = this.el.nativeElement;
        this.applyInputs();
        // Set up event listeners
        this.renderer.listen(nativeEl, 'wa-slide-change', (event) => {
            this.waSlideChange.emit(event.detail);
        });
    }
    ngOnChanges(_) {
        this.applyInputs();
    }
    applyInputs() {
        // Set boolean attributes (only if true)
        this.setBooleanAttr('loop', this.loop);
        this.setBooleanAttr('navigation', this.navigation);
        this.setBooleanAttr('pagination', this.pagination);
        this.setBooleanAttr('autoplay', this.autoplay);
        this.setBooleanAttr('mouse-dragging', this.mouseDragging);
        // Set numeric attributes
        this.setNumericAttr('autoplay-interval', this.autoplayInterval);
        this.setNumericAttr('slides-per-page', this.slidesPerPage);
        this.setNumericAttr('slides-per-move', this.slidesPerMove);
        // Set string attributes
        this.setAttr('orientation', this.orientation);
    }
    /**
     * Exposes the native carousel element for direct interaction
     */
    get nativeElement() {
        return this.el.nativeElement;
    }
    /**
     * Scrolls to the next slide
     */
    next() {
        this.el.nativeElement.next();
    }
    /**
     * Scrolls to the previous slide
     */
    previous() {
        this.el.nativeElement.previous();
    }
    /**
     * Scrolls to the slide at the specified index
     */
    goToSlide(index) {
        this.el.nativeElement.goToSlide(index);
    }
    /**
     * Sets an attribute on the native element if the value is not null or undefined
     */
    setAttr(name, value) {
        if (value != null) {
            this.renderer.setAttribute(this.el.nativeElement, name, value);
        }
    }
    /**
     * Sets a numeric attribute on the native element if the value is not null or undefined
     */
    setNumericAttr(name, value) {
        if (value != null) {
            const numericValue = typeof value === 'string' ? parseFloat(value) : value;
            if (!isNaN(numericValue)) {
                this.renderer.setAttribute(this.el.nativeElement, name, numericValue.toString());
            }
        }
    }
    /**
     * Sets a boolean attribute on the native element if the value is truthy
     * For boolean attributes, the presence of the attribute (with empty value) indicates true
     */
    setBooleanAttr(name, value) {
        if (value === true || value === 'true' || value === '') {
            this.renderer.setAttribute(this.el.nativeElement, name, '');
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaCarouselDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.14", type: WaCarouselDirective, isStandalone: true, selector: "wa-carousel", inputs: { loop: "loop", navigation: "navigation", pagination: "pagination", autoplay: "autoplay", mouseDragging: "mouseDragging", autoplayInterval: "autoplayInterval", slidesPerPage: "slidesPerPage", slidesPerMove: "slidesPerMove", orientation: "orientation" }, outputs: { waSlideChange: "wa-slide-change", waSlideChangeCamel: "waSlideChange" }, usesOnChanges: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaCarouselDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'wa-carousel',
                    standalone: true
                }]
        }], propDecorators: { loop: [{
                type: Input
            }], navigation: [{
                type: Input
            }], pagination: [{
                type: Input
            }], autoplay: [{
                type: Input
            }], mouseDragging: [{
                type: Input
            }], autoplayInterval: [{
                type: Input
            }], slidesPerPage: [{
                type: Input
            }], slidesPerMove: [{
                type: Input
            }], orientation: [{
                type: Input
            }], waSlideChange: [{
                type: Output,
                args: ['wa-slide-change']
            }], waSlideChangeCamel: [{
                type: Output,
                args: ['waSlideChange']
            }] } });

/**
 * WaCarouselItemDirective
 *
 * Angular wrapper for the <wa-carousel-item> Web Component that allows declarative usage
 * and integration with Angular templates.
 *
 * Features:
 * - Enables Angular-style class and style bindings
 * - Allows content projection for slide content
 * - Supports custom styling via CSS variables
 * - Integrates with parent WaCarouselDirective
 */
class WaCarouselItemDirective {
    // Injected services
    el = inject(ElementRef);
    renderer = inject(Renderer2);
    ngOnInit() {
        // No specific attributes to set for carousel items
        // They inherit properties from the parent carousel
    }
    /**
     * Exposes the native carousel item element for direct interaction
     */
    get nativeElement() {
        return this.el.nativeElement;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaCarouselItemDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.14", type: WaCarouselItemDirective, isStandalone: true, selector: "wa-carousel-item", ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaCarouselItemDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'wa-carousel-item',
                    standalone: true
                }]
        }] });

/**
 * WaIconDirective
 *
 * Angular wrapper for the <wa-icon> Web Component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds all supported icon attributes as @Input() properties
 * - Supports name, family, variant, library, src, label, and withFixedWidth customization
 * - Enables Angular-style class and style bindings
 * - Supports custom styling via CSS variables
 * - Provides accessibility support through label attribute
 * - Supports direct styling through color, backgroundColor, and fontSize inputs
 */
class WaIconDirective {
    // Icon inputs
    name;
    family;
    variant;
    library;
    src;
    label;
    withFixedWidth;
    // Direct styling inputs
    color;
    backgroundColor;
    fontSize;
    // Dialog integration: support both kebab-case and camelCase bindings
    _dataDialog;
    set dataDialogAttr(val) { this._dataDialog = val ?? null; }
    set dialogAttr(val) { this._dataDialog = val ?? null; }
    set dataDialog(val) { this._dataDialog = val ?? null; }
    // Duotone icon inputs
    primaryColor;
    primaryOpacity;
    secondaryColor;
    secondaryOpacity;
    // Injected services
    el = inject(ElementRef);
    renderer = inject(Renderer2);
    ngOnInit() {
        const nativeEl = this.el.nativeElement;
        // Set standard attributes
        this.setAttr('name', this.name);
        this.setAttr('family', this.family);
        this.setAttr('variant', this.variant);
        this.setAttr('library', this.library);
        this.setAttr('src', this.src);
        this.setAttr('label', this.label);
        // Set boolean attributes (only if true)
        this.setBooleanAttr('with-fixed-width', this.withFixedWidth);
        // Apply styling inputs using CSS custom properties
        this.setCssStyle('text-color', this.color);
        this.setCssStyle('background-color', this.backgroundColor);
        this.setCssStyle('font-size', this.fontSize);
        // Set duotone icon CSS custom properties
        this.setCssVar('--primary-color', this.primaryColor);
        this.setCssVar('--primary-opacity', this.primaryOpacity);
        this.setCssVar('--secondary-color', this.secondaryColor);
        this.setCssVar('--secondary-opacity', this.secondaryOpacity);
        // Dialog attribute
        this.setAttr('data-dialog', this._dataDialog);
    }
    /**
     * Exposes the native icon element for direct interaction
     */
    get nativeElement() {
        return this.el.nativeElement;
    }
    /**
     * Sets an attribute on the native element if the value is not null or undefined
     */
    setAttr(name, value) {
        if (value != null) {
            this.renderer.setAttribute(this.el.nativeElement, name, value);
        }
    }
    /**
     * Sets a boolean attribute on the native element if the value is truthy
     * For boolean attributes, the presence of the attribute (with empty value) indicates true
     */
    setBooleanAttr(name, value) {
        if (value === true || value === 'true' || value === '') {
            this.renderer.setAttribute(this.el.nativeElement, name, '');
        }
    }
    /**
   * Sets a CSS custom property on the native element if the value is not null or undefined
   */
    setCssVar(name, value) {
        if (value != null) {
            this.renderer.setStyle(this.el.nativeElement, name, value);
        }
    }
    /**
     * Sets a CSS custom property on the native element if the value is not null or undefined
     */
    setCssStyle(name, value) {
        if (value) {
            this.renderer.setStyle(this.el.nativeElement, name, value);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaIconDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.14", type: WaIconDirective, isStandalone: true, selector: "wa-icon", inputs: { name: "name", family: "family", variant: "variant", library: "library", src: "src", label: "label", withFixedWidth: "withFixedWidth", color: "color", backgroundColor: "backgroundColor", fontSize: "fontSize", dataDialogAttr: ["data-dialog", "dataDialogAttr"], dialogAttr: ["dialog", "dialogAttr"], dataDialog: "dataDialog", primaryColor: "primaryColor", primaryOpacity: "primaryOpacity", secondaryColor: "secondaryColor", secondaryOpacity: "secondaryOpacity" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaIconDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'wa-icon',
                    standalone: true
                }]
        }], propDecorators: { name: [{
                type: Input
            }], family: [{
                type: Input
            }], variant: [{
                type: Input
            }], library: [{
                type: Input
            }], src: [{
                type: Input
            }], label: [{
                type: Input
            }], withFixedWidth: [{
                type: Input
            }], color: [{
                type: Input
            }], backgroundColor: [{
                type: Input
            }], fontSize: [{
                type: Input
            }], dataDialogAttr: [{
                type: Input,
                args: ['data-dialog']
            }], dialogAttr: [{
                type: Input,
                args: ['dialog']
            }], dataDialog: [{
                type: Input
            }], primaryColor: [{
                type: Input
            }], primaryOpacity: [{
                type: Input
            }], secondaryColor: [{
                type: Input
            }], secondaryOpacity: [{
                type: Input
            }] } });

/**
 * WaRatingDirective
 *
 * Angular wrapper for the <wa-rating> Web Component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds all supported rating attributes as @Input() properties
 * - Supports value, max, precision, readonly, disabled, and size customization
 * - Emits rating events (waChange, waHover)
 * - Enables Angular-style class and style bindings
 * - Supports custom styling via CSS variables
 * - Provides accessibility support through label attribute
 * - Allows custom symbols via getSymbol property
 * - Supports direct styling through color, backgroundColor, and fontSize inputs
 */
class WaRatingDirective {
    // Dialog integration: support both kebab-case and camelCase bindings
    _dataDialog;
    set dataDialogAttr(val) { this._dataDialog = val ?? null; }
    set dialogAttr(val) { this._dataDialog = val ?? null; }
    set dataDialog(val) { this._dataDialog = val ?? null; }
    // Rating inputs
    label;
    value;
    max;
    precision;
    readonly;
    disabled;
    size;
    // Direct styling inputs
    color;
    backgroundColor;
    fontSize;
    // Custom symbol function
    _getSymbol;
    // Event outputs
    waChange = new EventEmitter();
    waChangeHyphen = this.waChange;
    waHover = new EventEmitter();
    waHoverHyphen = this.waHover;
    waFocus = new EventEmitter();
    waFocusHyphen = this.waFocus;
    waBlur = new EventEmitter();
    waBlurHyphen = this.waBlur;
    valueChange = new EventEmitter();
    // Injected services
    el = inject(ElementRef);
    renderer = inject(Renderer2);
    ngOnInit() {
        const nativeEl = this.el.nativeElement;
        this.applyInputs();
        // Set up event listeners
        const handleChange = (event) => {
            const val = typeof event.detail === 'number' ? event.detail : event.target.value;
            this.waChange.emit(val);
            this.valueChange.emit(val);
        };
        this.renderer.listen(nativeEl, 'change', handleChange);
        this.renderer.listen(nativeEl, 'wa-change', handleChange);
        this.renderer.listen(nativeEl, 'hover', (event) => {
            this.waHover.emit(event.detail);
        });
        this.renderer.listen(nativeEl, 'wa-hover', (event) => {
            this.waHover.emit(event.detail);
        });
        this.renderer.listen(nativeEl, 'focus', (event) => {
            this.waFocus.emit(event);
        });
        this.renderer.listen(nativeEl, 'wa-focus', (event) => {
            this.waFocus.emit(event);
        });
        this.renderer.listen(nativeEl, 'blur', (event) => {
            this.waBlur.emit(event);
        });
        this.renderer.listen(nativeEl, 'wa-blur', (event) => {
            this.waBlur.emit(event);
        });
    }
    ngOnChanges(_) {
        this.applyInputs();
    }
    applyInputs() {
        const nativeEl = this.el.nativeElement;
        // Set standard attributes
        this.setAttr('label', this.label);
        // Set numeric attributes
        this.setNumericAttr('value', this.value);
        this.setNumericAttr('max', this.max);
        this.setNumericAttr('precision', this.precision);
        // Set string attributes
        this.setAttr('size', this.size);
        // Set boolean attributes (only if true)
        this.setBooleanAttr('readonly', this.readonly);
        this.setBooleanAttr('disabled', this.disabled);
        // Apply direct styling inputs
        if (this.color)
            nativeEl.style.color = this.color;
        if (this.backgroundColor)
            nativeEl.style.backgroundColor = this.backgroundColor;
        if (this.fontSize)
            nativeEl.style.fontSize = this.fontSize;
        // Dialog attribute
        this.setAttr('data-dialog', this._dataDialog);
    }
    ngAfterViewInit() {
        // Set custom symbol function if provided
        if (this._getSymbol) {
            this.el.nativeElement.getSymbol = this._getSymbol;
        }
    }
    /**
     * Sets a custom symbol function for the rating component
     */
    set getSymbol(fn) {
        this._getSymbol = fn;
        // If the element is already initialized, set the property directly
        if (this.el?.nativeElement) {
            this.el.nativeElement.getSymbol = fn;
        }
    }
    /**
     * Exposes the native rating element for direct interaction
     */
    get nativeElement() {
        return this.el.nativeElement;
    }
    /**
     * Sets focusNative on the rating component
     */
    focus() {
        this.el.nativeElement.focus();
    }
    /**
     * Removes focusNative from the rating component
     */
    blur() {
        this.el.nativeElement.blur();
    }
    /**
     * Sets an attribute on the native element if the value is not null or undefined
     */
    setAttr(name, value) {
        if (value != null) {
            this.renderer.setAttribute(this.el.nativeElement, name, value);
        }
    }
    /**
     * Sets a numeric attribute on the native element if the value is not null or undefined
     */
    setNumericAttr(name, value) {
        if (value != null) {
            const numericValue = typeof value === 'string' ? parseFloat(value) : value;
            if (!isNaN(numericValue)) {
                this.renderer.setAttribute(this.el.nativeElement, name, numericValue.toString());
            }
        }
    }
    /**
     * Sets a boolean attribute on the native element if the value is truthy
     * For boolean attributes, the presence of the attribute (with empty value) indicates true
     */
    setBooleanAttr(name, value) {
        if (value === true || value === 'true' || value === '') {
            this.renderer.setAttribute(this.el.nativeElement, name, '');
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaRatingDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.14", type: WaRatingDirective, isStandalone: true, selector: "wa-rating", inputs: { dataDialogAttr: ["data-dialog", "dataDialogAttr"], dialogAttr: ["dialog", "dialogAttr"], dataDialog: "dataDialog", label: "label", value: "value", max: "max", precision: "precision", readonly: "readonly", disabled: "disabled", size: "size", color: "color", backgroundColor: "backgroundColor", fontSize: "fontSize" }, outputs: { waChange: "waChange", waChangeHyphen: "wa-change", waHover: "waHover", waHoverHyphen: "wa-hover", waFocus: "waFocus", waFocusHyphen: "wa-focus", waBlur: "waBlur", waBlurHyphen: "wa-blur", valueChange: "valueChange" }, usesOnChanges: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaRatingDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'wa-rating',
                    standalone: true
                }]
        }], propDecorators: { dataDialogAttr: [{
                type: Input,
                args: ['data-dialog']
            }], dialogAttr: [{
                type: Input,
                args: ['dialog']
            }], dataDialog: [{
                type: Input
            }], label: [{
                type: Input
            }], value: [{
                type: Input
            }], max: [{
                type: Input
            }], precision: [{
                type: Input
            }], readonly: [{
                type: Input
            }], disabled: [{
                type: Input
            }], size: [{
                type: Input
            }], color: [{
                type: Input
            }], backgroundColor: [{
                type: Input
            }], fontSize: [{
                type: Input
            }], waChange: [{
                type: Output
            }], waChangeHyphen: [{
                type: Output,
                args: ['wa-change']
            }], waHover: [{
                type: Output
            }], waHoverHyphen: [{
                type: Output,
                args: ['wa-hover']
            }], waFocus: [{
                type: Output
            }], waFocusHyphen: [{
                type: Output,
                args: ['wa-focus']
            }], waBlur: [{
                type: Output
            }], waBlurHyphen: [{
                type: Output,
                args: ['wa-blur']
            }], valueChange: [{
                type: Output
            }] } });

/**
 * WaCheckboxDirective
 *
 * Angular wrapper for the <wa-checkbox> Web Component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds all supported checkbox attributes as @Input() properties
 * - Supports boolean attributes like checked, disabled, required, indeterminate
 * - Emits checkbox events (change, input, blurNative, focusNative, waInvalid); also re-emits checkedChange for compatibility
 * - Enables Angular-style class and style bindings
 * - Allows slot projection for label and hint content
 * - Supports custom styling via CSS variables
 * - Provides accessibility support through aria attributes
 * - Implements ControlValueAccessor for ngModel support
 */
class WaCheckboxDirective {
    // Dialog integration
    _dataDialog;
    set dataDialogAttr(val) { this._dataDialog = val ?? null; }
    set dialogAttr(val) { this._dataDialog = val ?? null; }
    set dataDialog(val) { this._dataDialog = val ?? null; }
    // Value inputs
    checked;
    value;
    name;
    form;
    hint;
    // State inputs
    disabled;
    required;
    indeterminate;
    // Appearance inputs
    size;
    // CSS custom property inputs
    backgroundColor;
    backgroundColorChecked;
    borderColor;
    borderColorChecked;
    borderRadius;
    borderStyle;
    borderWidth;
    boxShadow;
    checkedIconColor;
    checkedIconScale;
    toggleSize;
    // Event outputs
    checkedChange = new EventEmitter();
    waInput = new EventEmitter();
    waInputHyphen = this.waInput;
    waBlur = new EventEmitter();
    waBlurHyphen = this.waBlur;
    waFocus = new EventEmitter();
    waFocusHyphen = this.waFocus;
    waChange = new EventEmitter();
    waChangeHyphen = this.waChange;
    waInvalid = new EventEmitter();
    waInvalidHyphen = this.waInvalid;
    // Injected services
    el = inject(ElementRef);
    renderer = inject(Renderer2);
    // ControlValueAccessor implementation
    onChange = () => { };
    onTouched = () => { };
    /**
     * Internal flag to suppress model updates when we are writing programmatically
     * to the underlying element (prevents feedback loops with MutationObserver/events).
     */
    isWriting = false;
    attrObserver;
    validatorChange;
    /**
     * Safely determine the current checked state by preferring the property and
     * falling back to attributes some environments/components use.
     */
    getCurrentChecked() {
        const el = this.el.nativeElement;
        // Prefer native/WebComponent property
        if (typeof el.checked === 'boolean') {
            return !!el.checked;
        }
        // Fallbacks: boolean attribute, aria-checked, value="true"
        if (el.hasAttribute('checked')) {
            return true;
        }
        const ariaChecked = el.getAttribute('aria-checked');
        if (ariaChecked === 'true') {
            return true;
        }
        const valueAttr = el.getAttribute('value');
        if (valueAttr != null && valueAttr.toLowerCase() === 'true') {
            return true;
        }
        return false;
    }
    /**
     * Safely derive the checked value from a change/input CustomEvent if available.
     */
    getCheckedFromEvent(event) {
        // Direct boolean detail
        if (event && typeof event.detail === 'boolean') {
            return !!event.detail;
        }
        // Detail object with checked property
        if (event && event.detail && typeof event.detail.checked === 'boolean') {
            return !!event.detail.checked;
        }
        return undefined;
    }
    ngOnInit() {
        const nativeEl = this.el.nativeElement;
        this.applyInputs();
        // Set up event listeners
        this.renderer.listen(nativeEl, 'checkedChange', (event) => {
            this.checkedChange.emit(event.detail);
            this.onChange(event.detail);
        });
        // Standard DOM events
        this.renderer.listen(nativeEl, 'input', (event) => {
            this.waInput.emit(event);
            // Update model on input to reflect current checked state
            const currentChecked = this.getCurrentChecked();
            this.onChange(currentChecked);
            this.checkedChange.emit(currentChecked);
            this.validatorChange?.();
        });
        this.renderer.listen(nativeEl, 'change', (event) => {
            this.waChange.emit(event);
            // Update model on change to reflect current checked state
            const currentChecked = this.getCurrentChecked();
            this.onChange(currentChecked);
            this.checkedChange.emit(currentChecked);
            this.validatorChange?.();
        });
        // WebAwesome custom events (some environments emit wa-input/wa-change)
        this.renderer.listen(nativeEl, 'wa-input', (event) => {
            this.waInput.emit(event);
            const currentChecked = this.getCurrentChecked();
            this.onChange(currentChecked);
            this.checkedChange.emit(currentChecked);
            this.validatorChange?.();
        });
        this.renderer.listen(nativeEl, 'wa-change', (event) => {
            this.waChange.emit(event);
            const currentChecked = this.getCurrentChecked();
            this.onChange(currentChecked);
            this.checkedChange.emit(currentChecked);
            this.validatorChange?.();
        });
        this.renderer.listen(nativeEl, 'focus', (event) => {
            this.waFocus.emit(event);
        });
        this.renderer.listen(nativeEl, 'wa-focus', (event) => {
            this.waFocus.emit(event);
        });
        this.renderer.listen(nativeEl, 'blur', (event) => {
            this.waBlur.emit(event);
            this.onTouched();
        });
        this.renderer.listen(nativeEl, 'wa-blur', (event) => {
            this.waBlur.emit(event);
            this.onTouched();
        });
        this.renderer.listen(nativeEl, 'wa-invalid', (event) => {
            this.waInvalid.emit(event);
            this.validatorChange?.();
        });
        // Fallback: ensure model sync on click toggle
        this.renderer.listen(nativeEl, 'click', () => {
            const currentChecked = this.getCurrentChecked();
            this.onChange(currentChecked);
            this.checkedChange.emit(currentChecked);
            this.validatorChange?.();
        });
        // Observe 'checked' attribute changes to sync when WC toggles via attributes
        try {
            this.attrObserver = new MutationObserver((mutations) => {
                if (this.isWriting) {
                    return;
                }
                for (const m of mutations) {
                    if (m.type === 'attributes' && m.attributeName === 'checked') {
                        const currentChecked = this.el.nativeElement.checked === true || this.el.nativeElement.hasAttribute('checked');
                        this.onChange(!!currentChecked);
                        this.checkedChange.emit(!!currentChecked);
                        this.validatorChange?.();
                    }
                }
            });
            this.attrObserver.observe(nativeEl, { attributes: true, attributeFilter: ['checked'] });
        }
        catch { }
    }
    ngOnChanges(_) {
        this.applyInputs();
    }
    applyInputs() {
        // Set standard attributes
        this.setAttr('value', this.value);
        this.setAttr('name', this.name);
        this.setAttr('form', this.form);
        this.setAttr('hint', this.hint);
        this.setAttr('size', this.size);
        // Set boolean attributes (only if true)
        this.setBooleanAttr('checked', this.checked);
        this.setBooleanAttr('disabled', this.disabled);
        this.setBooleanAttr('required', this.required);
        this.setBooleanAttr('indeterminate', this.indeterminate);
        // Set CSS custom properties
        this.setCssVar('--background-color', this.backgroundColor);
        this.setCssVar('--background-color-checked', this.backgroundColorChecked);
        this.setCssVar('--border-color', this.borderColor);
        this.setCssVar('--border-color-checked', this.borderColorChecked);
        this.setCssVar('--border-radius', this.borderRadius);
        this.setCssVar('--border-style', this.borderStyle);
        this.setCssVar('--border-width', this.borderWidth);
        this.setCssVar('--box-shadow', this.boxShadow);
        this.setCssVar('--checked-icon-color', this.checkedIconColor);
        this.setCssVar('--checked-icon-scale', this.checkedIconScale);
        this.setCssVar('--toggle-size', this.toggleSize);
        // Dialog attribute
        this.setAttr('data-dialog', this._dataDialog);
    }
    ngOnDestroy() {
        try {
            this.attrObserver?.disconnect();
        }
        catch { }
    }
    // Validator implementation to participate in Angular forms validity (e.g., required)
    validate(control) {
        const host = this.el?.nativeElement;
        if (!host)
            return null;
        // Disabled controls are considered valid
        if (host.disabled || host.hasAttribute?.('disabled'))
            return null;
        const isRequired = this.required === true || this.required === '' || this.required === 'true';
        if (!isRequired)
            return null;
        // For a single checkbox, validity means it must be checked when required
        const value = control?.value;
        const isChecked = !!value;
        return isChecked ? null : { required: true };
    }
    registerOnValidatorChange(fn) {
        this.validatorChange = fn;
    }
    /**
     * Exposes the native checkbox element for direct interaction
     */
    get nativeElement() {
        return this.el.nativeElement;
    }
    /**
     * Programmatically clicks the checkbox
     */
    click() {
        this.el.nativeElement.click();
    }
    /**
     * Sets focusNative on the checkbox
     */
    focus() {
        this.el.nativeElement.focus();
    }
    /**
     * Removes focusNative from the checkbox
     */
    blur() {
        this.el.nativeElement.blur();
    }
    /**
     * Sets custom validity message for the checkbox
     */
    setCustomValidity(message) {
        if (typeof this.el.nativeElement.setCustomValidity === 'function') {
            this.el.nativeElement.setCustomValidity(message);
        }
    }
    /**
     * Sets an attribute on the native element if the value is not null or undefined
     */
    setAttr(name, value) {
        if (value != null) {
            this.renderer.setAttribute(this.el.nativeElement, name, value);
        }
    }
    /**
     * Sets a boolean attribute on the native element if the value is truthy
     * For boolean attributes, the presence of the attribute (with empty value) indicates true
     */
    setBooleanAttr(name, value) {
        if (value === true || value === 'true' || value === '') {
            this.renderer.setAttribute(this.el.nativeElement, name, '');
        }
    }
    /**
     * Toggles a boolean attribute based on a boolean value (adds when true, removes when false)
     */
    toggleBooleanAttr(name, isOn) {
        if (isOn) {
            this.renderer.setAttribute(this.el.nativeElement, name, '');
        }
        else {
            this.renderer.removeAttribute(this.el.nativeElement, name);
        }
    }
    /**
     * Sets a CSS custom property on the native element if the value is not null or undefined
     */
    setCssVar(name, value) {
        if (value != null) {
            this.renderer.setStyle(this.el.nativeElement, name, value);
        }
    }
    // ControlValueAccessor implementation
    writeValue(value) {
        if (value !== undefined) {
            const isChecked = !!value;
            this.isWriting = true;
            try {
                this.renderer.setProperty(this.el.nativeElement, 'checked', isChecked);
                // Ensure attribute reflects current state for Web Components relying on attributes
                this.toggleBooleanAttr('checked', isChecked);
            }
            finally {
                // Use a microtask to allow MutationObserver to settle without emitting back
                Promise.resolve().then(() => (this.isWriting = false));
            }
        }
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(isDisabled) {
        // Reflect disabled in both property and attribute space
        this.renderer.setProperty(this.el.nativeElement, 'disabled', !!isDisabled);
        this.toggleBooleanAttr('disabled', !!isDisabled);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaCheckboxDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.14", type: WaCheckboxDirective, isStandalone: true, selector: "wa-checkbox", inputs: { dataDialogAttr: ["data-dialog", "dataDialogAttr"], dialogAttr: ["dialog", "dialogAttr"], dataDialog: "dataDialog", checked: "checked", value: "value", name: "name", form: "form", hint: "hint", disabled: "disabled", required: "required", indeterminate: "indeterminate", size: "size", backgroundColor: "backgroundColor", backgroundColorChecked: "backgroundColorChecked", borderColor: "borderColor", borderColorChecked: "borderColorChecked", borderRadius: "borderRadius", borderStyle: "borderStyle", borderWidth: "borderWidth", boxShadow: "boxShadow", checkedIconColor: "checkedIconColor", checkedIconScale: "checkedIconScale", toggleSize: "toggleSize" }, outputs: { checkedChange: "checkedChange", waInput: "waInput", waInputHyphen: "wa-input", waBlur: "waBlur", waBlurHyphen: "wa-blur", waFocus: "waFocus", waFocusHyphen: "wa-focus", waChange: "waChange", waChangeHyphen: "wa-change", waInvalid: "waInvalid", waInvalidHyphen: "wa-invalid" }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => WaCheckboxDirective),
                multi: true
            },
            {
                provide: NG_VALIDATORS,
                useExisting: forwardRef(() => WaCheckboxDirective),
                multi: true
            }
        ], usesOnChanges: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaCheckboxDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'wa-checkbox',
                    standalone: true,
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => WaCheckboxDirective),
                            multi: true
                        },
                        {
                            provide: NG_VALIDATORS,
                            useExisting: forwardRef(() => WaCheckboxDirective),
                            multi: true
                        }
                    ]
                }]
        }], propDecorators: { dataDialogAttr: [{
                type: Input,
                args: ['data-dialog']
            }], dialogAttr: [{
                type: Input,
                args: ['dialog']
            }], dataDialog: [{
                type: Input
            }], checked: [{
                type: Input
            }], value: [{
                type: Input
            }], name: [{
                type: Input
            }], form: [{
                type: Input
            }], hint: [{
                type: Input
            }], disabled: [{
                type: Input
            }], required: [{
                type: Input
            }], indeterminate: [{
                type: Input
            }], size: [{
                type: Input
            }], backgroundColor: [{
                type: Input
            }], backgroundColorChecked: [{
                type: Input
            }], borderColor: [{
                type: Input
            }], borderColorChecked: [{
                type: Input
            }], borderRadius: [{
                type: Input
            }], borderStyle: [{
                type: Input
            }], borderWidth: [{
                type: Input
            }], boxShadow: [{
                type: Input
            }], checkedIconColor: [{
                type: Input
            }], checkedIconScale: [{
                type: Input
            }], toggleSize: [{
                type: Input
            }], checkedChange: [{
                type: Output
            }], waInput: [{
                type: Output
            }], waInputHyphen: [{
                type: Output,
                args: ['wa-input']
            }], waBlur: [{
                type: Output
            }], waBlurHyphen: [{
                type: Output,
                args: ['wa-blur']
            }], waFocus: [{
                type: Output
            }], waFocusHyphen: [{
                type: Output,
                args: ['wa-focus']
            }], waChange: [{
                type: Output
            }], waChangeHyphen: [{
                type: Output,
                args: ['wa-change']
            }], waInvalid: [{
                type: Output
            }], waInvalidHyphen: [{
                type: Output,
                args: ['wa-invalid']
            }] } });

/**
 * WaComparisonDirective
 *
 * Angular wrapper for the <wa-comparison> Web Component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds position attribute as @Input() property
 * - Emits change events when the divider position changes
 * - Enables Angular-style class and style bindings
 * - Allows slot projection for before, after, and handle content
 * - Supports custom styling via CSS variables
 */
class WaComparisonDirective {
    // Position input
    position;
    // CSS custom property inputs
    dividerColor;
    dividerWidth;
    handleColor;
    handleSize;
    // Event outputs
    change = new EventEmitter();
    // Injected services
    el = inject(ElementRef);
    renderer = inject(Renderer2);
    ngOnInit() {
        const nativeEl = this.el.nativeElement;
        this.applyInputs();
        // Set up event listeners
        this.renderer.listen(nativeEl, 'change', (event) => {
            this.change.emit(event.detail);
        });
        this.renderer.listen(nativeEl, 'wa-change', (event) => {
            this.change.emit(event.detail);
        });
    }
    ngOnChanges(_) {
        this.applyInputs();
    }
    applyInputs() {
        // Set position attribute
        this.setNumericAttr('position', this.position);
        // Set CSS custom properties
        this.setCssVar('--divider-color', this.dividerColor);
        this.setCssVar('--divider-width', this.dividerWidth);
        this.setCssVar('--handle-color', this.handleColor);
        this.setCssVar('--handle-size', this.handleSize);
    }
    /**
     * Exposes the native comparison element for direct interaction
     */
    get nativeElement() {
        return this.el.nativeElement;
    }
    /**
     * Sets a numeric attribute on the native element if the value is not null or undefined
     */
    setNumericAttr(name, value) {
        if (value != null) {
            const numericValue = typeof value === 'string' ? parseFloat(value) : value;
            if (!isNaN(numericValue)) {
                this.renderer.setAttribute(this.el.nativeElement, name, numericValue.toString());
            }
        }
    }
    /**
     * Sets a CSS custom property on the native element if the value is not null or undefined
     */
    setCssVar(name, value) {
        if (value != null) {
            this.renderer.setStyle(this.el.nativeElement, name, value);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaComparisonDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.14", type: WaComparisonDirective, isStandalone: true, selector: "wa-comparison", inputs: { position: "position", dividerColor: "dividerColor", dividerWidth: "dividerWidth", handleColor: "handleColor", handleSize: "handleSize" }, outputs: { change: "wa-change" }, usesOnChanges: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaComparisonDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'wa-comparison',
                    standalone: true
                }]
        }], propDecorators: { position: [{
                type: Input
            }], dividerColor: [{
                type: Input
            }], dividerWidth: [{
                type: Input
            }], handleColor: [{
                type: Input
            }], handleSize: [{
                type: Input
            }], change: [{
                type: Output,
                args: ['wa-change']
            }] } });

/**
 * WaCopyButtonDirective
 *
 * Angular wrapper for the <wa-copy-button> Web Component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds all supported copy-button attributes as @Input() properties
 * - Supports string inputs like value, from, copyLabel, successLabel, errorLabel
 * - Supports numeric inputs like feedbackDuration
 * - Supports tooltip placement options
 * - Supports boolean attributes like disabled
 * - Emits copy and error events
 * - Enables Angular-style class and style bindings
 * - Allows slot projection for copy-icon, success-icon, and error-icon
 * - Supports custom styling via CSS variables
 */
class WaCopyButtonDirective {
    // String inputs
    value;
    from;
    copyLabel;
    successLabel;
    errorLabel;
    // Numeric inputs
    feedbackDuration;
    // Placement input
    tooltipPlacement;
    // Boolean inputs
    disabled;
    // Dialog integration: support both kebab-case and camelCase bindings
    _dataDialog;
    set dataDialogAttr(val) { this._dataDialog = val ?? null; }
    set dialogAttr(val) { this._dataDialog = val ?? null; }
    set dataDialog(val) { this._dataDialog = val ?? null; }
    // Event outputs
    waCopy = new EventEmitter();
    waError = new EventEmitter();
    // Injected services
    el = inject(ElementRef);
    renderer = inject(Renderer2);
    ngOnInit() {
        const nativeEl = this.el.nativeElement;
        this.applyInputs();
        // Set up event listeners (use hyphenated custom events per WebAwesome)
        this.renderer.listen(nativeEl, 'wa-copy', () => this.waCopy.emit());
        this.renderer.listen(nativeEl, 'wa-error', (event) => this.waError.emit(event.detail));
        // Backwards compatibility with legacy camelCase events
        this.renderer.listen(nativeEl, 'waCopy', () => this.waCopy.emit());
        this.renderer.listen(nativeEl, 'waError', (event) => this.waError.emit(event.detail));
    }
    ngOnChanges(_) {
        this.applyInputs();
    }
    applyInputs() {
        // Set string attributes
        this.setAttr('value', this.value);
        this.setAttr('from', this.from);
        this.setAttr('copy-label', this.copyLabel);
        this.setAttr('success-label', this.successLabel);
        this.setAttr('error-label', this.errorLabel);
        this.setAttr('tooltip-placement', this.tooltipPlacement);
        // Set numeric attributes
        this.setNumericAttr('feedback-duration', this.feedbackDuration);
        // Set boolean attributes (only if true)
        this.setBooleanAttr('disabled', this.disabled);
        // Dialog attribute
        this.setAttr('data-dialog', this._dataDialog);
    }
    /**
     * Exposes the native copy-button element for direct interaction
     */
    get nativeElement() {
        return this.el.nativeElement;
    }
    /**
     * Programmatically triggers the copy action
     */
    copy() {
        if (typeof this.el.nativeElement.copy === 'function') {
            this.el.nativeElement.copy();
        }
    }
    /**
     * Sets an attribute on the native element if the value is not null or undefined
     */
    setAttr(name, value) {
        if (value != null) {
            this.renderer.setAttribute(this.el.nativeElement, name, value);
        }
    }
    /**
     * Sets a numeric attribute on the native element if the value is not null or undefined
     */
    setNumericAttr(name, value) {
        if (value != null) {
            const numericValue = typeof value === 'string' ? parseFloat(value) : value;
            if (!isNaN(numericValue)) {
                this.renderer.setAttribute(this.el.nativeElement, name, numericValue.toString());
            }
        }
    }
    /**
     * Sets a boolean attribute on the native element if the value is truthy
     * For boolean attributes, the presence of the attribute (with empty value) indicates true
     */
    setBooleanAttr(name, value) {
        if (value === true || value === 'true' || value === '') {
            this.renderer.setAttribute(this.el.nativeElement, name, '');
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaCopyButtonDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.14", type: WaCopyButtonDirective, isStandalone: true, selector: "wa-copy-button", inputs: { value: "value", from: "from", copyLabel: "copyLabel", successLabel: "successLabel", errorLabel: "errorLabel", feedbackDuration: "feedbackDuration", tooltipPlacement: "tooltipPlacement", disabled: "disabled", dataDialogAttr: ["data-dialog", "dataDialogAttr"], dialogAttr: ["dialog", "dialogAttr"], dataDialog: "dataDialog" }, outputs: { waCopy: "wa-copy", waError: "wa-error" }, usesOnChanges: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaCopyButtonDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'wa-copy-button',
                    standalone: true
                }]
        }], propDecorators: { value: [{
                type: Input
            }], from: [{
                type: Input
            }], copyLabel: [{
                type: Input
            }], successLabel: [{
                type: Input
            }], errorLabel: [{
                type: Input
            }], feedbackDuration: [{
                type: Input
            }], tooltipPlacement: [{
                type: Input
            }], disabled: [{
                type: Input
            }], dataDialogAttr: [{
                type: Input,
                args: ['data-dialog']
            }], dialogAttr: [{
                type: Input,
                args: ['dialog']
            }], dataDialog: [{
                type: Input
            }], waCopy: [{
                type: Output,
                args: ['wa-copy']
            }], waError: [{
                type: Output,
                args: ['wa-error']
            }] } });

/**
 * WaDetailsDirective
 *
 * Angular wrapper for the <wa-details> Web Component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds all supported details attributes as @Input() properties
 * - Supports summary, disabled, appearance, and open customization
 * - Emits details events (waShow, waAfterShow, waHide, waAfterHide)
 * - Enables Angular-style class and style bindings
 * - Allows slot projection for summary, expand-icon, collapse-icon, and default content
 * - Supports custom styling via CSS variables
 * - Provides programmatic control through show() and hide() methods
 * - Supports direct styling through color, backgroundColor, and fontSize inputs
 */
class WaDetailsDirective {
    // Details inputs
    summary;
    disabled;
    appearance;
    open;
    iconPosition;
    name;
    // CSS custom property inputs
    iconColor;
    spacing;
    showDuration;
    hideDuration;
    display;
    // Event outputs
    waShow = new EventEmitter();
    waShowHyphen = this.waShow;
    waAfterShow = new EventEmitter();
    waAfterShowHyphen = this.waAfterShow;
    waHide = new EventEmitter();
    waHideHyphen = this.waHide;
    waAfterHide = new EventEmitter();
    waAfterHideHyphen = this.waAfterHide;
    waFocus = new EventEmitter();
    waFocusHyphen = this.waFocus;
    waBlur = new EventEmitter();
    waBlurHyphen = this.waBlur;
    openChange = new EventEmitter();
    // Injected services
    el = inject(ElementRef);
    renderer = inject(Renderer2);
    ngOnInit() {
        const nativeEl = this.el.nativeElement;
        this.applyInputs();
        // Set up event listeners (use hyphenated custom events per WebAwesome)
        this.renderer.listen(nativeEl, 'wa-show', (event) => this.waShow.emit(event));
        this.renderer.listen(nativeEl, 'wa-after-show', (event) => {
            this.waAfterShow.emit(event);
            this.openChange.emit(true);
        });
        this.renderer.listen(nativeEl, 'wa-hide', (event) => this.waHide.emit(event));
        this.renderer.listen(nativeEl, 'wa-after-hide', (event) => {
            this.waAfterHide.emit(event);
            this.openChange.emit(false);
        });
        // Backwards compatibility with legacy non-hyphenated events
        this.renderer.listen(nativeEl, 'show', (event) => this.waShow.emit(event));
        this.renderer.listen(nativeEl, 'aftershow', (event) => {
            this.waAfterShow.emit(event);
            this.openChange.emit(true);
        });
        this.renderer.listen(nativeEl, 'hide', (event) => this.waHide.emit(event));
        this.renderer.listen(nativeEl, 'afterhide', (event) => {
            this.waAfterHide.emit(event);
            this.openChange.emit(false);
        });
        this.renderer.listen(nativeEl, 'focus', (event) => {
            this.waFocus.emit(event);
        });
        this.renderer.listen(nativeEl, 'wa-focus', (event) => {
            this.waFocus.emit(event);
        });
        this.renderer.listen(nativeEl, 'blur', (event) => {
            this.waBlur.emit(event);
        });
        this.renderer.listen(nativeEl, 'wa-blur', (event) => {
            this.waBlur.emit(event);
        });
    }
    ngOnChanges(_) {
        this.applyInputs();
    }
    applyInputs() {
        const nativeEl = this.el.nativeElement;
        // Set standard attributes
        this.setAttr('summary', this.summary);
        this.setAttr('appearance', normalizeAppearance(this.appearance));
        this.setAttr('icon-position', this.iconPosition);
        this.setAttr('name', this.name);
        // Set boolean attributes (only if true)
        this.setBooleanAttr('disabled', this.disabled);
        this.setBooleanAttr('open', this.open);
        // Set CSS custom properties
        if (this.iconColor)
            this.setCssVar('--icon-color', this.iconColor);
        if (this.spacing)
            this.setCssVar('--spacing', this.spacing);
        if (this.showDuration)
            this.setCssVar('--show-duration', this.showDuration);
        if (this.hideDuration)
            this.setCssVar('--hide-duration', this.hideDuration);
        if (this.display)
            this.setCssVar('--display', this.display);
    }
    /**
     * Exposes the native details element for direct interaction
     */
    get nativeElement() {
        return this.el.nativeElement;
    }
    /**
     * Opens the details programmatically
     */
    show() {
        if (this.el.nativeElement.show) {
            this.el.nativeElement.show();
        }
    }
    /**
     * Closes the details programmatically
     */
    hide() {
        if (this.el.nativeElement.hide) {
            this.el.nativeElement.hide();
        }
    }
    /**
     * Sets an attribute on the native element if the value is not null or undefined
     */
    setAttr(name, value) {
        if (value != null) {
            this.renderer.setAttribute(this.el.nativeElement, name, value);
        }
    }
    /**
     * Sets a boolean attribute on the native element if the value is truthy
     * For boolean attributes, the presence of the attribute (with empty value) indicates true
     */
    setBooleanAttr(name, value) {
        if (value === true || value === 'true' || value === '') {
            this.renderer.setAttribute(this.el.nativeElement, name, '');
        }
    }
    /**
   * Sets a CSS custom property on the native element if the value is not null or undefined
   */
    setCssVar(name, value) {
        if (value != null) {
            this.renderer.setStyle(this.el.nativeElement, name, value);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaDetailsDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.14", type: WaDetailsDirective, isStandalone: true, selector: "wa-details", inputs: { summary: "summary", disabled: "disabled", appearance: "appearance", open: "open", iconPosition: "iconPosition", name: "name", iconColor: "iconColor", spacing: "spacing", showDuration: "showDuration", hideDuration: "hideDuration", display: "display" }, outputs: { waShow: "waShow", waShowHyphen: "wa-show", waAfterShow: "waAfterShow", waAfterShowHyphen: "wa-after-show", waHide: "waHide", waHideHyphen: "wa-hide", waAfterHide: "waAfterHide", waAfterHideHyphen: "wa-after-hide", waFocus: "waFocus", waFocusHyphen: "wa-focus", waBlur: "waBlur", waBlurHyphen: "wa-blur", openChange: "openChange" }, usesOnChanges: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaDetailsDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'wa-details',
                    standalone: true
                }]
        }], propDecorators: { summary: [{
                type: Input
            }], disabled: [{
                type: Input
            }], appearance: [{
                type: Input
            }], open: [{
                type: Input
            }], iconPosition: [{
                type: Input
            }], name: [{
                type: Input
            }], iconColor: [{
                type: Input
            }], spacing: [{
                type: Input
            }], showDuration: [{
                type: Input
            }], hideDuration: [{
                type: Input
            }], display: [{
                type: Input
            }], waShow: [{
                type: Output
            }], waShowHyphen: [{
                type: Output,
                args: ['wa-show']
            }], waAfterShow: [{
                type: Output
            }], waAfterShowHyphen: [{
                type: Output,
                args: ['wa-after-show']
            }], waHide: [{
                type: Output
            }], waHideHyphen: [{
                type: Output,
                args: ['wa-hide']
            }], waAfterHide: [{
                type: Output
            }], waAfterHideHyphen: [{
                type: Output,
                args: ['wa-after-hide']
            }], waFocus: [{
                type: Output
            }], waFocusHyphen: [{
                type: Output,
                args: ['wa-focus']
            }], waBlur: [{
                type: Output
            }], waBlurHyphen: [{
                type: Output,
                args: ['wa-blur']
            }], openChange: [{
                type: Output
            }] } });

/**ple
 * WaColorPickerDirective
 *
 * Angular wrapper for the <wa-color-picker> Web Component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds all supported color-picker attributes as @Input() properties
 * - Supports label, hint, value, format, opacity, and other customization
 * - Emits color-picker events (change, input, focusNative, blurNative, waInvalid)
 * - Enables Angular-style class and style bindings
 * - Allows slot projection for label and hint content
 * - Supports custom styling via CSS variables
 * - Provides programmatic control through focusNative(), blurNative(), and other methods
 * - Supports direct styling through color, backgroundColor, and fontSize inputs
 */
class WaColorPickerDirective {
    // Color picker inputs
    label;
    hint;
    value;
    format;
    withoutFormatToggle;
    opacity;
    uppercase;
    size;
    disabled;
    required;
    // Angular validation-related attributes
    pattern;
    minlength;
    maxlength;
    name;
    form;
    swatches;
    // Direct styling inputs (apply to host element styles)
    color;
    backgroundColor;
    fontSize;
    // CSS custom property inputs
    swatchSize;
    swatchSpacing;
    borderRadius;
    dropdownWidth;
    dropdownHeight;
    // Event outputs
    // change and input map 1:1 to native events
    waChange = new EventEmitter();
    waChangeHyphen = this.waChange;
    waInput = new EventEmitter();
    waInputHyphen = this.waInput;
    // Backwards-compatible outputs plus aliases that match native event names
    waFocus = new EventEmitter();
    waFocusHyphen = this.waFocus;
    waBlur = new EventEmitter();
    waBlurHyphen = this.waBlur;
    // Web Awesome lifecycle/validation events: keep camelCase for BC and add hyphenated aliases
    waInvalid = new EventEmitter();
    waInvalidHyphen = this.waInvalid;
    waShow = new EventEmitter();
    waShowHyphen = this.waShow;
    waAfterShow = new EventEmitter();
    waAfterShowHyphen = this.waAfterShow;
    waHide = new EventEmitter();
    waHideHyphen = this.waHide;
    waAfterHide = new EventEmitter();
    waAfterHideHyphen = this.waAfterHide;
    valueChange = new EventEmitter();
    // Injected services
    el = inject(ElementRef);
    renderer = inject(Renderer2);
    // ControlValueAccessor callbacks
    onChange = () => { };
    onTouched = () => { };
    // Prevent feedback loops when writing programmatically to the element
    isWriting = false;
    attrObserver;
    validatorChange;
    /**
     * Extracts the most up-to-date value from an event or from the element.
     * Prefers CustomEvent.detail when available as many Web Components include
     * the new value there before attributes/properties reflect.
     */
    readCurrentValueFromEvent(evt) {
        // 1) If CustomEvent with detail, prefer it
        const asCustom = evt;
        if (asCustom && asCustom.detail !== undefined) {
            const d = asCustom.detail;
            if (d != null) {
                // Some components emit { value: string } while others emit the value directly
                if (typeof d === 'object' && 'value' in d) {
                    return d.value;
                }
                return d;
            }
        }
        // 2) Fallback to property first, then attribute
        const el = this.el.nativeElement;
        let current = el?.value;
        if (current == null || current === '') {
            current = el?.getAttribute?.('value') ?? null;
        }
        return current;
    }
    ngOnInit() {
        const nativeEl = this.el.nativeElement;
        // Apply all inputs on init
        this.applyInputs();
        // Set up event listeners
        this.renderer.listen(nativeEl, 'change', (event) => {
            this.waChange.emit(event);
            const current = this.readCurrentValueFromEvent(event);
            this.value = current;
            this.onChange(current);
            this.valueChange.emit(current);
        });
        // Also listen for custom web component events
        this.renderer.listen(nativeEl, 'wa-change', (event) => {
            this.waChange.emit(event);
            const current = this.readCurrentValueFromEvent(event);
            this.value = current;
            this.onChange(current);
            this.valueChange.emit(current);
        });
        this.renderer.listen(nativeEl, 'input', (event) => {
            this.waInput.emit(event);
            const current = this.readCurrentValueFromEvent(event);
            this.value = current;
            this.onChange(current);
            this.valueChange.emit(current);
        });
        this.renderer.listen(nativeEl, 'wa-input', (event) => {
            this.waInput.emit(event);
            const current = this.readCurrentValueFromEvent(event);
            this.value = current;
            this.onChange(current);
            this.valueChange.emit(current);
        });
        this.renderer.listen(nativeEl, 'focus', (event) => {
            this.waFocus.emit(event);
        });
        this.renderer.listen(nativeEl, 'wa-focus', (event) => {
            this.waFocus.emit(event);
        });
        this.renderer.listen(nativeEl, 'blur', (event) => {
            this.waBlur.emit(event);
            this.onTouched();
        });
        this.renderer.listen(nativeEl, 'wa-blur', (event) => {
            this.waBlur.emit(event);
            this.onTouched();
        });
        this.renderer.listen(nativeEl, 'waInvalid', (event) => {
            this.waInvalid.emit(event);
        });
        this.renderer.listen(nativeEl, 'wa-invalid', (event) => {
            this.waInvalid.emit(event);
        });
        this.renderer.listen(nativeEl, 'wa-show', (event) => {
            this.waShow.emit(event);
        });
        this.renderer.listen(nativeEl, 'wa-after-show', (event) => {
            this.waAfterShow.emit(event);
        });
        this.renderer.listen(nativeEl, 'wa-hide', (event) => {
            this.waHide.emit(event);
        });
        this.renderer.listen(nativeEl, 'wa-after-hide', (event) => {
            this.waAfterHide.emit(event);
        });
        // Observe 'value' attribute changes to keep model in sync when WC reflects updates via attributes
        try {
            this.attrObserver = new MutationObserver((mutations) => {
                if (this.isWriting) {
                    return;
                }
                for (const m of mutations) {
                    if (m.type === 'attributes' && m.attributeName === 'value') {
                        const el = this.el.nativeElement;
                        let current = el?.getAttribute?.('value');
                        if (current == null) {
                            current = el?.value ?? null;
                        }
                        this.value = current;
                        this.onChange(current);
                        this.valueChange.emit(current);
                    }
                }
            });
            this.attrObserver.observe(nativeEl, { attributes: true, attributeFilter: ['value'] });
        }
        catch { }
    }
    ngOnChanges(changes) {
        // Reflect changed inputs to the underlying element to keep it in sync with Angular bindings
        // This is important for [(ngModel)] + dynamic [format], etc.
        this.applyInputs(changes);
        // If any validator-related inputs changed, notify Angular forms
        if (changes['required'] || changes['pattern'] || changes['minlength'] || changes['maxlength'] || changes['disabled']) {
            this.validatorChange?.();
        }
    }
    ngAfterViewInit() {
        // Any post-initialization logic can go here
    }
    ngOnDestroy() {
        try {
            this.attrObserver?.disconnect();
        }
        catch { }
    }
    /**
     * Exposes the native color-picker element for direct interaction
     */
    get nativeElement() {
        return this.el.nativeElement;
    }
    /**
     * Sets focusNative on the color-picker
     */
    focusNative() {
        if (this.el.nativeElement.focus) {
            this.el.nativeElement.focus();
        }
    }
    /**
     * Removes focusNative from the color-picker
     */
    blurNative() {
        if (this.el.nativeElement.blur) {
            this.el.nativeElement.blur();
        }
    }
    /**
     * Returns the color value in the specified format
     */
    getFormattedValue(format) {
        if (this.el.nativeElement.getFormattedValue) {
            return this.el.nativeElement.getFormattedValue(format);
        }
        return '';
    }
    /**
     * Triggers form validation UI
     */
    reportValidity() {
        if (this.el.nativeElement.reportValidity) {
            return this.el.nativeElement.reportValidity();
        }
        return true;
    }
    /**
     * Converts HSV to hex string
     */
    getHexString(h, s, v, a) {
        if (this.el.nativeElement.getHexString) {
            return this.el.nativeElement.getHexString(h, s, v, a);
        }
        return '';
    }
    /**
     * Sets an attribute on the native element if the value is not null or undefined
     */
    setAttr(name, value) {
        if (value != null) {
            this.renderer.setAttribute(this.el.nativeElement, name, value);
        }
        else {
            // remove when null/undefined to reflect cleared state
            try {
                this.el.nativeElement.removeAttribute(name);
            }
            catch { }
        }
    }
    /**
     * Sets a boolean attribute on the native element if the value is truthy
     * For boolean attributes, the presence of the attribute (with empty value) indicates true
     */
    setBooleanAttr(name, value) {
        const truthy = value === true || value === 'true' || value === '';
        if (truthy) {
            this.renderer.setAttribute(this.el.nativeElement, name, '');
        }
        else {
            try {
                this.el.nativeElement.removeAttribute(name);
            }
            catch { }
        }
    }
    /**
   * Sets a CSS custom property on the native element if the value is not null or undefined
   */
    setCssVar(name, value) {
        if (value != null) {
            this.renderer.setStyle(this.el.nativeElement, name, value);
        }
    }
    // ControlValueAccessor implementation
    writeValue(value) {
        if (this.value === value) {
            return;
        }
        this.value = value;
        this.isWriting = true;
        try {
            const el = this.el.nativeElement;
            // Reflect to property first if available
            this.renderer.setProperty(el, 'value', value ?? '');
            if (value == null || value === '') {
                // remove attribute if null/empty to clear
                this.renderer.removeAttribute(el, 'value');
            }
            else {
                this.setAttr('value', String(value));
            }
        }
        finally {
            // Use a slightly longer delay or ensure it happens after microtasks to avoid immediate feedback
            setTimeout(() => (this.isWriting = false), 0);
        }
    }
    /**
     * Applies current @Input values to the underlying <wa-color-picker> element.
     * When changes are provided, only updates those that changed.
     */
    applyInputs(changes) {
        const el = this.el.nativeElement;
        const set = (name, val) => this.setAttr(name, val);
        const setBool = (name, val) => this.setBooleanAttr(name, val);
        const should = (prop) => !changes || !!changes[prop];
        // Standard attributes
        if (should('label'))
            set('label', this.label);
        if (should('hint'))
            set('hint', this.hint);
        // Note: value is primarily driven by CVA; only reflect if [value] is used explicitly
        if (should('value'))
            set('value', this.value);
        if (should('format'))
            set('format', this.format);
        if (should('name'))
            set('name', this.name);
        if (should('form'))
            set('form', this.form);
        if (should('size'))
            set('size', this.size);
        // Validation attributes
        if (should('pattern')) {
            let p = this.pattern;
            if (p instanceof RegExp) {
                p = p.source;
            }
            set('pattern', p);
        }
        if (should('minlength'))
            set('minlength', this.minlength);
        if (should('maxlength'))
            set('maxlength', this.maxlength);
        // Boolean attributes
        if (should('withoutFormatToggle'))
            setBool('without-format-toggle', this.withoutFormatToggle);
        if (should('opacity'))
            setBool('opacity', this.opacity);
        if (should('uppercase'))
            setBool('uppercase', this.uppercase);
        if (should('disabled'))
            setBool('disabled', this.disabled);
        if (should('required'))
            setBool('required', this.required);
        // Swatches
        if (should('swatches')) {
            if (this.swatches) {
                const v = Array.isArray(this.swatches) ? this.swatches.join(';') : this.swatches;
                set('swatches', v);
            }
            else {
                this.setAttr('swatches', null);
            }
        }
        // Direct styles
        if (should('color'))
            this.renderer.setStyle(el, 'color', this.color ?? null);
        if (should('backgroundColor'))
            this.renderer.setStyle(el, 'background-color', this.backgroundColor ?? null);
        if (should('fontSize'))
            this.renderer.setStyle(el, 'font-size', this.fontSize ?? null);
        // CSS vars
        if (should('swatchSize'))
            this.setCssVar('--swatch-size', this.swatchSize);
        if (should('swatchSpacing'))
            this.setCssVar('--swatch-spacing', this.swatchSpacing);
        if (should('borderRadius'))
            this.setCssVar('--border-radius', this.borderRadius);
        if (should('dropdownWidth'))
            this.setCssVar('--dropdown-width', this.dropdownWidth);
        if (should('dropdownHeight'))
            this.setCssVar('--dropdown-height', this.dropdownHeight);
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(isDisabled) {
        if (isDisabled) {
            this.setBooleanAttr('disabled', '');
        }
        else {
            this.el.nativeElement.removeAttribute('disabled');
        }
    }
    // Validator implementation
    validate(control) {
        // If control disabled, do not validate
        const disabled = this.disabled === true || this.disabled === 'true' || this.disabled === '';
        if (disabled)
            return null;
        const value = control?.value;
        // Required
        const isRequired = this.required === true || this.required === 'true' || this.required === '';
        if (isRequired && (value == null || value === '')) {
            return { required: true };
        }
        if (value == null)
            return null;
        const str = String(value);
        // minlength
        if (this.minlength != null && this.minlength !== '') {
            const req = Number(this.minlength);
            const actual = str.length;
            if (!isNaN(req) && actual < req) {
                return { minlength: { requiredLength: req, actualLength: actual } };
            }
        }
        // maxlength
        if (this.maxlength != null && this.maxlength !== '') {
            const req = Number(this.maxlength);
            const actual = str.length;
            if (!isNaN(req) && actual > req) {
                return { maxlength: { requiredLength: req, actualLength: actual } };
            }
        }
        // pattern
        if (this.pattern != null && this.pattern !== '') {
            let regex = null;
            if (this.pattern instanceof RegExp) {
                regex = this.pattern;
            }
            else {
                const pat = String(this.pattern);
                try {
                    regex = new RegExp('^' + pat + '$');
                }
                catch {
                    // invalid pattern: consider as no-op
                    regex = null;
                }
            }
            if (regex && !regex.test(str)) {
                return { pattern: { requiredPattern: regex.toString(), actualValue: str } };
            }
        }
        return null;
    }
    registerOnValidatorChange(fn) {
        this.validatorChange = fn;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaColorPickerDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.14", type: WaColorPickerDirective, isStandalone: true, selector: "wa-color-picker", inputs: { label: "label", hint: "hint", value: "value", format: "format", withoutFormatToggle: "withoutFormatToggle", opacity: "opacity", uppercase: "uppercase", size: "size", disabled: "disabled", required: "required", pattern: "pattern", minlength: "minlength", maxlength: "maxlength", name: "name", form: "form", swatches: "swatches", color: "color", backgroundColor: "backgroundColor", fontSize: "fontSize", swatchSize: "swatchSize", swatchSpacing: "swatchSpacing", borderRadius: "borderRadius", dropdownWidth: "dropdownWidth", dropdownHeight: "dropdownHeight" }, outputs: { waChange: "waChange", waChangeHyphen: "wa-change", waInput: "waInput", waInputHyphen: "wa-input", waFocus: "waFocus", waFocusHyphen: "wa-focus", waBlur: "waBlur", waBlurHyphen: "wa-blur", waInvalid: "waInvalid", waInvalidHyphen: "wa-invalid", waShow: "waShow", waShowHyphen: "wa-show", waAfterShow: "waAfterShow", waAfterShowHyphen: "wa-after-show", waHide: "waHide", waHideHyphen: "wa-hide", waAfterHide: "waAfterHide", waAfterHideHyphen: "wa-after-hide", valueChange: "valueChange" }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => WaColorPickerDirective),
                multi: true
            },
            {
                provide: NG_VALIDATORS,
                useExisting: forwardRef(() => WaColorPickerDirective),
                multi: true
            }
        ], usesOnChanges: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaColorPickerDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'wa-color-picker',
                    standalone: true,
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => WaColorPickerDirective),
                            multi: true
                        },
                        {
                            provide: NG_VALIDATORS,
                            useExisting: forwardRef(() => WaColorPickerDirective),
                            multi: true
                        }
                    ]
                }]
        }], propDecorators: { label: [{
                type: Input
            }], hint: [{
                type: Input
            }], value: [{
                type: Input
            }], format: [{
                type: Input
            }], withoutFormatToggle: [{
                type: Input
            }], opacity: [{
                type: Input
            }], uppercase: [{
                type: Input
            }], size: [{
                type: Input
            }], disabled: [{
                type: Input
            }], required: [{
                type: Input
            }], pattern: [{
                type: Input
            }], minlength: [{
                type: Input
            }], maxlength: [{
                type: Input
            }], name: [{
                type: Input
            }], form: [{
                type: Input
            }], swatches: [{
                type: Input
            }], color: [{
                type: Input
            }], backgroundColor: [{
                type: Input
            }], fontSize: [{
                type: Input
            }], swatchSize: [{
                type: Input
            }], swatchSpacing: [{
                type: Input
            }], borderRadius: [{
                type: Input
            }], dropdownWidth: [{
                type: Input
            }], dropdownHeight: [{
                type: Input
            }], waChange: [{
                type: Output
            }], waChangeHyphen: [{
                type: Output,
                args: ['wa-change']
            }], waInput: [{
                type: Output
            }], waInputHyphen: [{
                type: Output,
                args: ['wa-input']
            }], waFocus: [{
                type: Output
            }], waFocusHyphen: [{
                type: Output,
                args: ['wa-focus']
            }], waBlur: [{
                type: Output
            }], waBlurHyphen: [{
                type: Output,
                args: ['wa-blur']
            }], waInvalid: [{
                type: Output
            }], waInvalidHyphen: [{
                type: Output,
                args: ['wa-invalid']
            }], waShow: [{
                type: Output
            }], waShowHyphen: [{
                type: Output,
                args: ['wa-show']
            }], waAfterShow: [{
                type: Output
            }], waAfterShowHyphen: [{
                type: Output,
                args: ['wa-after-show']
            }], waHide: [{
                type: Output
            }], waHideHyphen: [{
                type: Output,
                args: ['wa-hide']
            }], waAfterHide: [{
                type: Output
            }], waAfterHideHyphen: [{
                type: Output,
                args: ['wa-after-hide']
            }], valueChange: [{
                type: Output
            }] } });

/**
 * WaDialogDirective
 *
 * Angular wrapper for the <wa-dialog> Web Awesome component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds all supported dialog attributes as @Input() properties
 * - Supports string inputs like label
 * - Supports boolean attributes like open, withoutHeader, lightDismiss
 * - Emits events for dialog lifecycle: waShow, waAfterShow, waHide, waAfterHide
 * - Enables Angular-style class and style bindings
 * - Allows slot projection for content, footer, and header-actions
 * - Supports custom styling via CSS variables
 * - Provides methods for programmatic control: show() and hide()
 */
class WaDialogDirective {
    /**
     * When dialog is closed, we move all child nodes into this fragment so that
     * the dialog has no content in the DOM. When it opens again, we re-attach
     * the nodes back to the host element.
     */
    contentFragment = null;
    // Boolean inputs
    open;
    withoutHeader;
    // Support both camelCase, kebab-case, and no-dash forms for lightDismiss
    _lightDismiss;
    set lightDismiss(val) { this._lightDismiss = val; }
    set lightDismissKebab(val) { this._lightDismiss = val; }
    set lightDismissNoDash(val) { this._lightDismiss = val; }
    // String inputs
    label;
    // Style inputs
    backgroundColor;
    borderRadius;
    boxShadow;
    spacing;
    width;
    showDuration;
    hideDuration;
    // Event outputs
    openChange = new EventEmitter();
    waShow = new EventEmitter();
    waShowHyphen = this.waShow;
    waAfterShow = new EventEmitter();
    waAfterShowHyphen = this.waAfterShow;
    waHide = new EventEmitter();
    waHideHyphen = this.waHide;
    waAfterHide = new EventEmitter();
    waAfterHideHyphen = this.waAfterHide;
    // Injected services
    el = inject(ElementRef);
    renderer = inject(Renderer2);
    /**
     * Internal flag to prevent feedback loops when we programmatically write to attributes/properties
     */
    isWriting = false;
    /** Observe attribute changes (e.g., 'open') to drive two-way binding */
    attrObserver;
    ngOnInit() {
        const nativeEl = this.el.nativeElement;
        this.applyInputs();
        // Ensure initial content visibility matches open state once, without reacting to mid-transition changes
        if (this.isDialogOpen()) {
            this.attachProjectedContentIfNeeded();
        }
        else {
            this.detachProjectedContentIfNeeded();
        }
        // Set up event listeners
        this.renderer.listen(nativeEl, 'wa-show', () => {
            // Restore content as soon as dialog starts to open so internal logic sees correct DOM
            this.attachProjectedContentIfNeeded();
            this.waShow.emit();
        });
        this.renderer.listen(nativeEl, 'wa-after-show', () => {
            // Content should already be present; just emit events and sync two-way binding
            this.waAfterShow.emit();
            this.openChange.emit(true);
        });
        this.renderer.listen(nativeEl, 'wa-hide', (event) => {
            this.waHide.emit(event.detail);
        });
        this.renderer.listen(nativeEl, 'wa-after-hide', () => {
            // Remove content only after it fully hides to avoid interfering with open/close sequence
            this.detachProjectedContentIfNeeded();
            this.waAfterHide.emit();
            this.openChange.emit(false);
        });
        // Observe 'open' attribute changes to support [(open)] two-way binding including light-dismiss close.
        try {
            this.attrObserver = new MutationObserver((mutations) => {
                if (this.isWriting) {
                    return;
                }
                for (const m of mutations) {
                    if (m.type === 'attributes' && m.attributeName === 'open') {
                        const isOpen = nativeEl.open === true || nativeEl.hasAttribute('open');
                        this.openChange.emit(!!isOpen);
                    }
                }
            });
            this.attrObserver.observe(nativeEl, { attributes: true, attributeFilter: ['open'] });
        }
        catch { }
        this.setupLabelSlotObserver();
    }
    ngOnChanges(_) {
        this.applyInputs();
        // Avoid touching content presence during generic input changes; lifecycle events handle it.
    }
    ngOnDestroy() {
        if (this.labelSlotObserver) {
            this.labelSlotObserver.disconnect();
        }
        if (this.attrObserver) {
            try {
                this.attrObserver.disconnect();
            }
            catch { }
        }
    }
    /**
     * Exposes the native dialog element for direct interaction
     */
    get nativeElement() {
        return this.el.nativeElement;
    }
    /**
     * Programmatically opens the dialog
     */
    show() {
        if (typeof this.el.nativeElement.show === 'function') {
            this.el.nativeElement.show();
        }
    }
    /**
     * Programmatically closes the dialog
     */
    hide() {
        if (typeof this.el.nativeElement.hide === 'function') {
            this.el.nativeElement.hide();
        }
    }
    // Observe slot changes for label content
    labelSlotObserver;
    applyInputs() {
        this.isWriting = true;
        try {
            // String attribute + property for label
            if (this.label != null) {
                this.setAttr('label', this.label);
                this.setPropertySafe('label', this.label);
            }
            // Boolean attributes (add/remove) and properties
            const openBool = this.parseBool(this.open);
            const withoutHeaderBool = this.parseBool(this.withoutHeader);
            const lightDismissBool = this.parseBool(this._lightDismiss);
            this.setBooleanAttr('open', openBool);
            this.setBooleanAttr('without-header', withoutHeaderBool);
            this.setBooleanAttr('light-dismiss', lightDismissBool);
            this.setPropertySafe('open', openBool);
            this.setPropertySafe('withoutHeader', withoutHeaderBool);
            this.setPropertySafe('lightDismiss', lightDismissBool);
            // Style CSS variables
            this.setCssVar('--background-color', this.backgroundColor);
            this.setCssVar('--border-radius', this.borderRadius);
            this.setCssVar('--box-shadow', this.boxShadow);
            this.setCssVar('--spacing', this.spacing);
            this.setCssVar('--width', this.width);
            this.setCssVar('--show-duration', this.showDuration);
            this.setCssVar('--hide-duration', this.hideDuration);
        }
        finally {
            // Allow MutationObserver to react to external changes again
            this.isWriting = false;
        }
    }
    setupLabelSlotObserver() {
        const host = this.el.nativeElement;
        const target = host.querySelector('[slot="label"]');
        if (!target)
            return;
        // Initialize label from current slot content
        this.updateLabelFromSlot(target);
        this.labelSlotObserver = new MutationObserver(() => {
            this.updateLabelFromSlot(target);
        });
        this.labelSlotObserver.observe(target, {
            characterData: true,
            childList: true,
            subtree: true
        });
    }
    updateLabelFromSlot(target) {
        const text = (target.textContent || '').trim();
        if (text) {
            this.setAttr('label', text);
            this.setPropertySafe('label', text);
        }
    }
    setPropertySafe(name, value) {
        try {
            this.renderer.setProperty(this.el.nativeElement, name, value);
        }
        catch {
            this.el.nativeElement[name] = value;
        }
    }
    parseBool(v) {
        return v === true || v === 'true' || v === '';
    }
    /**
     * Sets an attribute on the native element if the value is not null or undefined
     */
    setAttr(name, value) {
        if (value != null) {
            this.renderer.setAttribute(this.el.nativeElement, name, value);
        }
    }
    /**
     * Sets a CSS custom property on the native element if the value is not null or undefined
     */
    setCssVar(name, value) {
        if (value != null) {
            this.renderer.setStyle(this.el.nativeElement, name, value);
        }
    }
    /**
     * Sets a boolean attribute on the native element if the value is truthy
     * For boolean attributes, the presence of the attribute (with empty value) indicates true
     */
    setBooleanAttr(name, value) {
        const truthy = value === true || value === 'true' || value === '';
        if (truthy) {
            this.renderer.setAttribute(this.el.nativeElement, name, '');
        }
        else {
            this.renderer.removeAttribute(this.el.nativeElement, name);
        }
    }
    /** Determine whether the dialog is currently open */
    isDialogOpen() {
        const host = this.el.nativeElement;
        return host?.open === true || host.hasAttribute('open');
    }
    /**
     * Ensure that projected children exist only when dialog is open.
     * Moves children into a DocumentFragment when closed, and restores when opened.
     */
    updateProjectedContentVisibility() {
        const host = this.el.nativeElement;
        const shouldHaveContent = this.isDialogOpen();
        if (shouldHaveContent) {
            this.attachProjectedContentIfNeeded();
            return;
        }
        // Only detach in explicit calls (e.g., on wa-after-hide or initial setup), not on random input changes
        this.detachProjectedContentIfNeeded();
    }
    /** Explicitly attach content if it was previously detached */
    attachProjectedContentIfNeeded() {
        const host = this.el.nativeElement;
        if (this.contentFragment) {
            host.appendChild(this.contentFragment);
            this.contentFragment = null;
            // Reconnect label slot observer now that content is back
            this.setupLabelSlotObserver();
        }
    }
    /** Explicitly detach content if dialog is closed and content is present */
    detachProjectedContentIfNeeded() {
        const host = this.el.nativeElement;
        if (!this.contentFragment && !this.isDialogOpen()) {
            // Disconnect label observer since the slot content will be removed
            if (this.labelSlotObserver) {
                try {
                    this.labelSlotObserver.disconnect();
                }
                catch { }
                this.labelSlotObserver = undefined;
            }
            const frag = document.createDocumentFragment();
            const nodes = Array.from(host.childNodes);
            for (const node of nodes) {
                frag.appendChild(node);
            }
            this.contentFragment = frag;
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaDialogDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.14", type: WaDialogDirective, isStandalone: true, selector: "wa-dialog", inputs: { open: "open", withoutHeader: "withoutHeader", lightDismiss: "lightDismiss", lightDismissKebab: ["light-dismiss", "lightDismissKebab"], lightDismissNoDash: ["lightdismiss", "lightDismissNoDash"], label: "label", backgroundColor: "backgroundColor", borderRadius: "borderRadius", boxShadow: "boxShadow", spacing: "spacing", width: "width", showDuration: "showDuration", hideDuration: "hideDuration" }, outputs: { openChange: "openChange", waShow: "waShow", waShowHyphen: "wa-show", waAfterShow: "waAfterShow", waAfterShowHyphen: "wa-after-show", waHide: "waHide", waHideHyphen: "wa-hide", waAfterHide: "waAfterHide", waAfterHideHyphen: "wa-after-hide" }, usesOnChanges: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaDialogDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'wa-dialog',
                    standalone: true
                }]
        }], propDecorators: { open: [{
                type: Input
            }], withoutHeader: [{
                type: Input
            }], lightDismiss: [{
                type: Input
            }], lightDismissKebab: [{
                type: Input,
                args: ['light-dismiss']
            }], lightDismissNoDash: [{
                type: Input,
                args: ['lightdismiss']
            }], label: [{
                type: Input
            }], backgroundColor: [{
                type: Input
            }], borderRadius: [{
                type: Input
            }], boxShadow: [{
                type: Input
            }], spacing: [{
                type: Input
            }], width: [{
                type: Input
            }], showDuration: [{
                type: Input
            }], hideDuration: [{
                type: Input
            }], openChange: [{
                type: Output
            }], waShow: [{
                type: Output
            }], waShowHyphen: [{
                type: Output,
                args: ['wa-show']
            }], waAfterShow: [{
                type: Output
            }], waAfterShowHyphen: [{
                type: Output,
                args: ['wa-after-show']
            }], waHide: [{
                type: Output
            }], waHideHyphen: [{
                type: Output,
                args: ['wa-hide']
            }], waAfterHide: [{
                type: Output
            }], waAfterHideHyphen: [{
                type: Output,
                args: ['wa-after-hide']
            }] } });

/**
 * WaDividerDirective
 *
 * Angular wrapper for the <wa-divider> Web Awesome component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds the vertical boolean attribute
 * - Supports style inputs for color, width, and spacing
 * - Maps style inputs to CSS custom properties
 * - Enables Angular-style class and style bindings
 */
class WaDividerDirective {
    // Boolean inputs
    orientation;
    vertical; // @deprecated Use orientation="vertical" instead
    // Style inputs
    color;
    width;
    spacing;
    // Injected services
    el = inject(ElementRef);
    renderer = inject(Renderer2);
    ngOnInit() {
        const nativeEl = this.el.nativeElement;
        // Set boolean attributes (only if true)
        if (this.orientation === 'vertical') {
            this.renderer.setAttribute(this.el.nativeElement, 'orientation', 'vertical');
        }
        else {
            this.setBooleanAttr('vertical', this.vertical);
        }
        // Set style attributes
        this.setCssVar('--color', this.color);
        this.setCssVar('--width', this.width);
        this.setCssVar('--spacing', this.spacing);
    }
    /**
     * Exposes the native divider element for direct interaction
     */
    get nativeElement() {
        return this.el.nativeElement;
    }
    /**
     * Sets a CSS custom property on the native element if the value is not null or undefined
     */
    setCssVar(name, value) {
        if (value != null) {
            this.renderer.setStyle(this.el.nativeElement, name, value);
        }
    }
    /**
     * Sets a boolean attribute on the native element if the value is truthy
     * For boolean attributes, the presence of the attribute (with empty value) indicates true
     */
    setBooleanAttr(name, value) {
        if (value === true || value === 'true' || value === '') {
            this.renderer.setAttribute(this.el.nativeElement, name, '');
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaDividerDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.14", type: WaDividerDirective, isStandalone: true, selector: "wa-divider", inputs: { orientation: "orientation", vertical: "vertical", color: "color", width: "width", spacing: "spacing" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaDividerDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'wa-divider',
                    standalone: true
                }]
        }], propDecorators: { orientation: [{
                type: Input
            }], vertical: [{
                type: Input
            }], color: [{
                type: Input
            }], width: [{
                type: Input
            }], spacing: [{
                type: Input
            }] } });

/**
 * WaDrawerDirective
 *
 * Angular wrapper for the <wa-drawer> Web Awesome component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds all supported drawer attributes as @Input() properties
 * - Supports string inputs like label and placement
 * - Supports boolean attributes like open, withoutHeader, lightDismiss
 * - Emits events for drawer lifecycle: showEvent, afterShowEvent, hideEvent, afterHideEvent
 * - Emits native focusNative and blurNative events
 * - Enables Angular-style class and style bindings
 * - Allows slot projection for content, label, header-actions, and footer
 * - Supports custom styling via CSS variables
 * - Provides methods for programmatic control: show() and hide()
 */
class WaDrawerDirective {
    // Boolean inputs
    open;
    withoutHeader;
    lightDismiss;
    // String inputs
    label;
    placement;
    // Style inputs
    backgroundColor;
    boxShadow;
    spacing;
    size;
    showDuration;
    hideDuration;
    // Event outputs
    waShow = new EventEmitter();
    waShowHyphen = this.waShow;
    waAfterShow = new EventEmitter();
    waAfterShowHyphen = this.waAfterShow;
    waHide = new EventEmitter();
    waHideHyphen = this.waHide;
    waAfterHide = new EventEmitter();
    waAfterHideHyphen = this.waAfterHide;
    waFocus = new EventEmitter();
    waFocusHyphen = this.waFocus;
    waBlur = new EventEmitter();
    waBlurHyphen = this.waBlur;
    openChange = new EventEmitter();
    // Injected services
    el = inject(ElementRef);
    renderer = inject(Renderer2);
    ngOnInit() {
        const nativeEl = this.el.nativeElement;
        this.applyInputs();
        // Set up event listeners
        this.renderer.listen(nativeEl, 'wa-show', (event) => this.waShow.emit(event));
        this.renderer.listen(nativeEl, 'wa-after-show', (event) => {
            this.waAfterShow.emit(event);
            this.openChange.emit(true);
        });
        this.renderer.listen(nativeEl, 'wa-hide', (event) => this.waHide.emit(event));
        this.renderer.listen(nativeEl, 'wa-after-hide', (event) => {
            this.waAfterHide.emit(event);
            this.openChange.emit(false);
        });
        this.renderer.listen(nativeEl, 'focus', (event) => this.waFocus.emit(event));
        this.renderer.listen(nativeEl, 'wa-focus', (event) => this.waFocus.emit(event));
        this.renderer.listen(nativeEl, 'blur', (event) => this.waBlur.emit(event));
        this.renderer.listen(nativeEl, 'wa-blur', (event) => this.waBlur.emit(event));
    }
    ngOnChanges(_) {
        this.applyInputs();
    }
    applyInputs() {
        // Set string attributes
        this.setAttr('label', this.label);
        this.setAttr('placement', this.placement);
        // Set boolean attributes (only if true)
        this.setBooleanAttr('open', this.open);
        this.setBooleanAttr('without-header', this.withoutHeader);
        this.setBooleanAttr('light-dismiss', this.lightDismiss);
        // Set style attributes
        this.setCssVar('--background-color', this.backgroundColor);
        this.setCssVar('--box-shadow', this.boxShadow);
        this.setCssVar('--spacing', this.spacing);
        this.setCssVar('--size', this.size);
        this.setCssVar('--show-duration', this.showDuration);
        this.setCssVar('--hide-duration', this.hideDuration);
    }
    /**
     * Exposes the native drawer element for direct interaction
     */
    get nativeElement() {
        return this.el.nativeElement;
    }
    /**
     * Programmatically opens the drawer
     */
    show() {
        if (typeof this.el.nativeElement.show === 'function') {
            this.el.nativeElement.show();
        }
    }
    /**
     * Programmatically closes the drawer
     */
    hide() {
        if (typeof this.el.nativeElement.hide === 'function') {
            this.el.nativeElement.hide();
        }
    }
    /**
     * Sets an attribute on the native element if the value is not null or undefined
     */
    setAttr(name, value) {
        if (value != null) {
            this.renderer.setAttribute(this.el.nativeElement, name, value);
        }
    }
    /**
     * Sets a CSS custom property on the native element if the value is not null or undefined
     */
    setCssVar(name, value) {
        if (value != null) {
            this.renderer.setStyle(this.el.nativeElement, name, value);
        }
    }
    /**
     * Sets a boolean attribute on the native element if the value is truthy
     * For boolean attributes, the presence of the attribute (with empty value) indicates true
     */
    setBooleanAttr(name, value) {
        if (value === true || value === 'true' || value === '') {
            this.renderer.setAttribute(this.el.nativeElement, name, '');
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaDrawerDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.14", type: WaDrawerDirective, isStandalone: true, selector: "wa-drawer", inputs: { open: "open", withoutHeader: "withoutHeader", lightDismiss: "lightDismiss", label: "label", placement: "placement", backgroundColor: "backgroundColor", boxShadow: "boxShadow", spacing: "spacing", size: "size", showDuration: "showDuration", hideDuration: "hideDuration" }, outputs: { waShow: "waShow", waShowHyphen: "wa-show", waAfterShow: "waAfterShow", waAfterShowHyphen: "wa-after-show", waHide: "waHide", waHideHyphen: "wa-hide", waAfterHide: "waAfterHide", waAfterHideHyphen: "wa-after-hide", waFocus: "waFocus", waFocusHyphen: "wa-focus", waBlur: "waBlur", waBlurHyphen: "wa-blur", openChange: "openChange" }, usesOnChanges: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaDrawerDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'wa-drawer',
                    standalone: true
                }]
        }], propDecorators: { open: [{
                type: Input
            }], withoutHeader: [{
                type: Input
            }], lightDismiss: [{
                type: Input
            }], label: [{
                type: Input
            }], placement: [{
                type: Input
            }], backgroundColor: [{
                type: Input
            }], boxShadow: [{
                type: Input
            }], spacing: [{
                type: Input
            }], size: [{
                type: Input
            }], showDuration: [{
                type: Input
            }], hideDuration: [{
                type: Input
            }], waShow: [{
                type: Output
            }], waShowHyphen: [{
                type: Output,
                args: ['wa-show']
            }], waAfterShow: [{
                type: Output
            }], waAfterShowHyphen: [{
                type: Output,
                args: ['wa-after-show']
            }], waHide: [{
                type: Output
            }], waHideHyphen: [{
                type: Output,
                args: ['wa-hide']
            }], waAfterHide: [{
                type: Output
            }], waAfterHideHyphen: [{
                type: Output,
                args: ['wa-after-hide']
            }], waFocus: [{
                type: Output
            }], waFocusHyphen: [{
                type: Output,
                args: ['wa-focus']
            }], waBlur: [{
                type: Output
            }], waBlurHyphen: [{
                type: Output,
                args: ['wa-blur']
            }], openChange: [{
                type: Output
            }] } });

/**
 * WaDropdownDirective
 *
 * Angular wrapper for the <wa-dropdown> Web Awesome component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds all supported dropdown attributes as @Input() properties
 * - Supports string inputs like placement
 * - Supports boolean attributes like disabled and stayOpenOnSelect
 * - Supports numeric inputs like distance and skidding
 * - Emits events for dropdown lifecycle: showEvent, afterShowEvent, hideEvent, afterHideEvent, selectEvent
 * - Enables Angular-style class and style bindings
 * - Allows slot projection for trigger and content
 * - Supports custom styling via CSS variables
 * - Provides methods for programmatic control: show(), hide(), and reposition()
 * - Implements ControlValueAccessor for ngModel support
 */
class WaDropdownDirective {
    // Structural inputs
    placement;
    disabled;
    stayOpenOnSelect;
    containingElement;
    distance;
    skidding;
    sync;
    // Style inputs
    boxShadow;
    // Event outputs
    waShow = new EventEmitter();
    waShowHyphen = this.waShow;
    waAfterShow = new EventEmitter();
    waAfterShowHyphen = this.waAfterShow;
    waHide = new EventEmitter();
    waHideHyphen = this.waHide;
    waAfterHide = new EventEmitter();
    waAfterHideHyphen = this.waAfterHide;
    waSelect = new EventEmitter();
    waSelectHyphen = this.waSelect;
    valueChange = new EventEmitter();
    // Injected services
    el = inject(ElementRef);
    renderer = inject(Renderer2);
    // ControlValueAccessor implementation
    onChange = () => { };
    onTouched = () => { };
    value;
    ngOnInit() {
        const nativeEl = this.el.nativeElement;
        this.applyInputs();
        // Set up event listeners
        this.renderer.listen(nativeEl, 'wa-show', (event) => this.waShow.emit(event));
        this.renderer.listen(nativeEl, 'wa-after-show', (event) => this.waAfterShow.emit(event));
        this.renderer.listen(nativeEl, 'wa-hide', (event) => this.waHide.emit(event));
        this.renderer.listen(nativeEl, 'wa-after-hide', (event) => this.waAfterHide.emit(event));
        this.renderer.listen(nativeEl, 'wa-select', (event) => {
            this.waSelect.emit(event.detail);
            // Handle ngModel value update when a dropdown item is selected
            const selectedItem = event.detail.item;
            if (selectedItem && selectedItem.hasAttribute('value')) {
                const newValue = selectedItem.getAttribute('value');
                if (newValue !== this.value) {
                    this.value = newValue;
                    this.onChange(newValue);
                    this.valueChange.emit(newValue);
                    this.onTouched();
                }
            }
        });
    }
    ngOnChanges(_) {
        this.applyInputs();
    }
    applyInputs() {
        const nativeEl = this.el.nativeElement;
        // Set string attributes
        this.setAttr('placement', this.placement);
        this.setAttr('sync', this.sync);
        // Set boolean attributes (only if true)
        this.setBooleanAttr('disabled', this.disabled);
        this.setBooleanAttr('stay-open-on-select', this.stayOpenOnSelect);
        // Set numeric attributes
        this.setNumericAttr('distance', this.distance);
        this.setNumericAttr('skidding', this.skidding);
        // Set object attributes
        if (this.containingElement) {
            nativeEl.containingElement = this.containingElement;
        }
        // Set style attributes
        this.setCssVar('--box-shadow', this.boxShadow);
    }
    /**
     * Exposes the native dropdown element for direct interaction
     */
    get nativeElement() {
        return this.el.nativeElement;
    }
    /**
     * Programmatically opens the dropdown
     */
    show() {
        if (typeof this.el.nativeElement.show === 'function') {
            this.el.nativeElement.show();
        }
    }
    /**
     * Programmatically closes the dropdown
     */
    hide() {
        if (typeof this.el.nativeElement.hide === 'function') {
            this.el.nativeElement.hide();
        }
    }
    /**
     * Programmatically repositions the dropdown
     */
    reposition() {
        if (typeof this.el.nativeElement.reposition === 'function') {
            this.el.nativeElement.reposition();
        }
    }
    /**
     * Sets an attribute on the native element if the value is not null or undefined
     */
    setAttr(name, value) {
        if (value != null) {
            this.renderer.setAttribute(this.el.nativeElement, name, value);
        }
    }
    /**
     * Sets a numeric attribute on the native element if the value is not null or undefined
     */
    setNumericAttr(name, value) {
        if (value != null) {
            const numericValue = typeof value === 'string' ? parseFloat(value) : value;
            if (!isNaN(numericValue)) {
                this.renderer.setAttribute(this.el.nativeElement, name, numericValue.toString());
            }
        }
    }
    /**
     * Sets a CSS custom property on the native element if the value is not null or undefined
     */
    setCssVar(name, value) {
        if (value != null) {
            this.renderer.setStyle(this.el.nativeElement, name, value);
        }
    }
    /**
     * Sets a boolean attribute on the native element if the value is truthy
     * For boolean attributes, the presence of the attribute (with empty value) indicates true
     */
    setBooleanAttr(name, value) {
        if (value === true || value === 'true' || value === '') {
            this.renderer.setAttribute(this.el.nativeElement, name, '');
        }
    }
    // ControlValueAccessor implementation
    writeValue(value) {
        this.value = value;
        // Find and select the dropdown item with the matching value
        if (value != null) {
            setTimeout(() => {
                const dropdownItems = this.el.nativeElement.querySelectorAll('wa-dropdown-item[value]');
                for (let i = 0; i < dropdownItems.length; i++) {
                    const item = dropdownItems[i];
                    if (item.getAttribute('value') === value) {
                        item.selected = true;
                        break;
                    }
                }
            });
        }
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
        this.setBooleanAttr('disabled', isDisabled);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaDropdownDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.14", type: WaDropdownDirective, isStandalone: true, selector: "wa-dropdown", inputs: { placement: "placement", disabled: "disabled", stayOpenOnSelect: "stayOpenOnSelect", containingElement: "containingElement", distance: "distance", skidding: "skidding", sync: "sync", boxShadow: "boxShadow" }, outputs: { waShow: "waShow", waShowHyphen: "wa-show", waAfterShow: "waAfterShow", waAfterShowHyphen: "wa-after-show", waHide: "waHide", waHideHyphen: "wa-hide", waAfterHide: "waAfterHide", waAfterHideHyphen: "wa-after-hide", waSelect: "waSelect", waSelectHyphen: "wa-select", valueChange: "valueChange" }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => WaDropdownDirective),
                multi: true
            }
        ], usesOnChanges: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaDropdownDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'wa-dropdown',
                    standalone: true,
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => WaDropdownDirective),
                            multi: true
                        }
                    ]
                }]
        }], propDecorators: { placement: [{
                type: Input
            }], disabled: [{
                type: Input
            }], stayOpenOnSelect: [{
                type: Input
            }], containingElement: [{
                type: Input
            }], distance: [{
                type: Input
            }], skidding: [{
                type: Input
            }], sync: [{
                type: Input
            }], boxShadow: [{
                type: Input
            }], waShow: [{
                type: Output
            }], waShowHyphen: [{
                type: Output,
                args: ['wa-show']
            }], waAfterShow: [{
                type: Output
            }], waAfterShowHyphen: [{
                type: Output,
                args: ['wa-after-show']
            }], waHide: [{
                type: Output
            }], waHideHyphen: [{
                type: Output,
                args: ['wa-hide']
            }], waAfterHide: [{
                type: Output
            }], waAfterHideHyphen: [{
                type: Output,
                args: ['wa-after-hide']
            }], waSelect: [{
                type: Output
            }], waSelectHyphen: [{
                type: Output,
                args: ['wa-select']
            }], valueChange: [{
                type: Output
            }] } });

/**
 * WaDropdownItemDirective
 *
 * Angular wrapper for the <wa-dropdown-item> Web Component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds attributes: type, checked, value, loading, disabled, label, variant
 * - Emits events: blurNative, focusNative
 * - Enables Angular-style class and style bindings
 * - Allows slot projection for content, icon, details, submenu, etc.
 * - Supports custom styling via CSS variables
 * - Implements ControlValueAccessor for ngModel support on checkbox type
 *
 * Slots:
 * - default: The dropdown item's content
 * - icon: Icon to display at the start of the item (replaces start slot)
 * - details: Additional details like keyboard shortcuts
 * - submenu: Nested dropdown items for creating submenus
 */
class WaDropdownItemDirective {
    type;
    checked;
    value;
    loading;
    disabled;
    label;
    variant;
    // Style inputs
    backgroundColorHover;
    textColorHover;
    padding;
    margin;
    fontSize;
    // Dialog integration: support both kebab-case and camelCase bindings
    _dataDialog;
    set dataDialogAttr(val) { this._dataDialog = val ?? null; }
    set dialogAttr(val) { this._dataDialog = val ?? null; }
    set dataDialog(val) { this._dataDialog = val ?? null; }
    // Event outputs
    blurEvent = new EventEmitter();
    focusEvent = new EventEmitter();
    // Injected services
    el = inject(ElementRef);
    renderer = inject(Renderer2);
    // ControlValueAccessor implementation
    onChange = () => { };
    onTouched = () => { };
    ngOnInit() {
        const nativeEl = this.el.nativeElement;
        // Set string attributes
        this.setAttr('type', this.type);
        this.setAttr('value', this.value);
        this.setAttr('label', this.label);
        this.setAttr('variant', this.variant);
        // Set boolean attributes (only if true)
        this.setBooleanAttr('checked', this.checked);
        this.setBooleanAttr('loading', this.loading);
        this.setBooleanAttr('disabled', this.disabled);
        // Set style attributes
        this.setCssVar('--background-color-hover', this.backgroundColorHover);
        this.setCssVar('--text-color-hover', this.textColorHover);
        this.setCssVar('--padding', this.padding);
        this.setCssVar('--margin', this.margin);
        this.setCssVar('--font-size', this.fontSize);
        // Dialog attribute
        this.setAttr('data-dialog', this._dataDialog);
        // Set up event listeners
        this.renderer.listen(nativeEl, 'blurNative', (event) => {
            this.blurEvent.emit(event);
            this.onTouched();
        });
        this.renderer.listen(nativeEl, 'focusNative', (event) => {
            this.focusEvent.emit(event);
        });
        // For checkbox type, listen for checked changes
        if (this.type === 'checkbox') {
            this.renderer.listen(nativeEl, 'checkedChange', (event) => {
                this.onChange(event.detail);
            });
        }
    }
    /**
     * Sets an attribute on the native element if the value is not null or undefined
     */
    setAttr(name, value) {
        if (value != null) {
            this.renderer.setAttribute(this.el.nativeElement, name, value);
        }
    }
    /**
     * Sets a CSS custom property on the native element if the value is not null or undefined
     */
    setCssVar(name, value) {
        if (value != null) {
            this.renderer.setStyle(this.el.nativeElement, name, value);
        }
    }
    /**
     * Sets a boolean attribute on the native element if the value is truthy
     * For boolean attributes, the presence of the attribute (with empty value) indicates true
     */
    setBooleanAttr(name, value) {
        if (value === true || value === 'true' || value === '') {
            this.renderer.setAttribute(this.el.nativeElement, name, '');
        }
    }
    // ControlValueAccessor implementation
    writeValue(value) {
        if (value !== undefined) {
            this.checked = value;
            this.setBooleanAttr('checked', value);
        }
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(isDisabled) {
        this.setBooleanAttr('disabled', isDisabled);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaDropdownItemDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.14", type: WaDropdownItemDirective, isStandalone: true, selector: "wa-dropdown-item", inputs: { type: "type", checked: "checked", value: "value", loading: "loading", disabled: "disabled", label: "label", variant: "variant", backgroundColorHover: "backgroundColorHover", textColorHover: "textColorHover", padding: "padding", margin: "margin", fontSize: "fontSize", dataDialogAttr: ["data-dialog", "dataDialogAttr"], dialogAttr: ["dialog", "dialogAttr"], dataDialog: "dataDialog" }, outputs: { blurEvent: "blurEvent", focusEvent: "focusEvent" }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => WaDropdownItemDirective),
                multi: true
            }
        ], ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaDropdownItemDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'wa-dropdown-item',
                    standalone: true,
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => WaDropdownItemDirective),
                            multi: true
                        }
                    ]
                }]
        }], propDecorators: { type: [{
                type: Input
            }], checked: [{
                type: Input
            }], value: [{
                type: Input
            }], loading: [{
                type: Input
            }], disabled: [{
                type: Input
            }], label: [{
                type: Input
            }], variant: [{
                type: Input
            }], backgroundColorHover: [{
                type: Input
            }], textColorHover: [{
                type: Input
            }], padding: [{
                type: Input
            }], margin: [{
                type: Input
            }], fontSize: [{
                type: Input
            }], dataDialogAttr: [{
                type: Input,
                args: ['data-dialog']
            }], dialogAttr: [{
                type: Input,
                args: ['dialog']
            }], dataDialog: [{
                type: Input
            }], blurEvent: [{
                type: Output
            }], focusEvent: [{
                type: Output
            }] } });

/**
 * WaFormatBytesDirective
 *
 * Angular wrapper for the <wa-format-bytes> Web Awesome component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds all supported format-bytes attributes as @Input() properties
 * - Supports string inputs like unit, display, and lang
 * - Supports numeric input for value
 * - Implements ControlValueAccessor for ngModel support
 * - Enables Angular-style class and style bindings
 */
class WaFormatBytesDirective {
    // Inputs
    value;
    unit;
    display;
    lang;
    // Injected services
    el = inject(ElementRef);
    renderer = inject(Renderer2);
    // ControlValueAccessor implementation
    onChange = () => { };
    onTouched = () => { };
    ngOnInit() {
        const nativeEl = this.el.nativeElement;
        // Set numeric attributes
        this.setNumericAttr('value', this.value);
        // Set string attributes
        this.setAttr('unit', this.unit);
        this.setAttr('display', this.display);
        this.setAttr('lang', this.lang);
    }
    /**
     * Exposes the native format-bytes element for direct interaction
     */
    get nativeElement() {
        return this.el.nativeElement;
    }
    /**
     * Sets an attribute on the native element if the value is not null or undefined
     */
    setAttr(name, value) {
        if (value != null) {
            this.renderer.setAttribute(this.el.nativeElement, name, value);
        }
    }
    /**
     * Sets a numeric attribute on the native element if the value is not null or undefined
     */
    setNumericAttr(name, value) {
        if (value != null) {
            this.renderer.setAttribute(this.el.nativeElement, name, value.toString());
        }
    }
    // ControlValueAccessor implementation
    writeValue(value) {
        if (value !== undefined && value !== null) {
            this.value = value;
            this.setNumericAttr('value', value);
        }
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(isDisabled) {
        this.renderer.setAttribute(this.el.nativeElement, 'disabled', isDisabled ? 'true' : 'false');
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaFormatBytesDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.14", type: WaFormatBytesDirective, isStandalone: true, selector: "wa-format-bytes", inputs: { value: "value", unit: "unit", display: "display", lang: "lang" }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => WaFormatBytesDirective),
                multi: true
            }
        ], ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaFormatBytesDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'wa-format-bytes',
                    standalone: true,
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => WaFormatBytesDirective),
                            multi: true
                        }
                    ]
                }]
        }], propDecorators: { value: [{
                type: Input
            }], unit: [{
                type: Input
            }], display: [{
                type: Input
            }], lang: [{
                type: Input
            }] } });

/**
 * WaFormatDateDirective
 *
 * Angular wrapper for the <wa-format-date> Web Awesome component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds all supported format-date attributes as @Input() properties
 * - Supports string inputs for date formatting options
 * - Implements ControlValueAccessor for ngModel support
 * - Enables Angular-style class and style bindings
 * - Supports styling inputs via CSS custom properties
 */
class WaFormatDateDirective {
    // Date input
    date;
    // Format inputs
    weekday;
    era;
    year;
    month;
    day;
    hour;
    minute;
    second;
    timeZoneName;
    timeZone;
    hourFormat;
    lang;
    // Style inputs
    color;
    fontSize;
    fontWeight;
    backgroundColor;
    padding;
    margin;
    display;
    // Injected services
    el = inject(ElementRef);
    renderer = inject(Renderer2);
    // ControlValueAccessor implementation
    onChange = () => { };
    onTouched = () => { };
    ngOnInit() {
        const nativeEl = this.el.nativeElement;
        // Set date attribute
        this.setDateAttr('date', this.date);
        // Set format attributes
        this.setAttr('weekday', this.weekday);
        this.setAttr('era', this.era);
        this.setAttr('year', this.year);
        this.setAttr('month', this.month);
        this.setAttr('day', this.day);
        this.setAttr('hour', this.hour);
        this.setAttr('minute', this.minute);
        this.setAttr('second', this.second);
        this.setAttr('time-zone-name', this.timeZoneName);
        this.setAttr('time-zone', this.timeZone);
        this.setAttr('hour-format', this.hourFormat);
        this.setAttr('lang', this.lang);
        // Set style attributes
        this.setCssVar('--color', this.color);
        this.setCssVar('--font-size', this.fontSize);
        this.setCssVar('--font-weight', this.fontWeight);
        this.setCssVar('--background-color', this.backgroundColor);
        this.setCssVar('--padding', this.padding);
        this.setCssVar('--margin', this.margin);
        this.setCssVar('--display', this.display);
    }
    /**
     * Exposes the native format-date element for direct interaction
     */
    get nativeElement() {
        return this.el.nativeElement;
    }
    /**
     * Sets an attribute on the native element if the value is not null or undefined
     */
    setAttr(name, value) {
        if (value != null) {
            this.renderer.setAttribute(this.el.nativeElement, name, value);
        }
    }
    /**
     * Sets a date attribute on the native element if the value is not null or undefined
     */
    setDateAttr(name, value) {
        if (value != null) {
            const dateValue = value instanceof Date ? value.toISOString() : value;
            this.renderer.setAttribute(this.el.nativeElement, name, dateValue);
        }
    }
    /**
     * Sets a CSS custom property on the native element if the value is not null or undefined
     */
    setCssVar(name, value) {
        if (value != null) {
            this.renderer.setStyle(this.el.nativeElement, name, value);
        }
    }
    // ControlValueAccessor implementation
    writeValue(value) {
        if (value !== undefined && value !== null) {
            this.date = value;
            this.setDateAttr('date', value);
        }
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(isDisabled) {
        this.renderer.setAttribute(this.el.nativeElement, 'disabled', isDisabled ? 'true' : 'false');
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaFormatDateDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.14", type: WaFormatDateDirective, isStandalone: true, selector: "wa-format-date", inputs: { date: "date", weekday: "weekday", era: "era", year: "year", month: "month", day: "day", hour: "hour", minute: "minute", second: "second", timeZoneName: "timeZoneName", timeZone: "timeZone", hourFormat: "hourFormat", lang: "lang", color: "color", fontSize: "fontSize", fontWeight: "fontWeight", backgroundColor: "backgroundColor", padding: "padding", margin: "margin", display: "display" }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => WaFormatDateDirective),
                multi: true
            }
        ], ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaFormatDateDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'wa-format-date',
                    standalone: true,
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => WaFormatDateDirective),
                            multi: true
                        }
                    ]
                }]
        }], propDecorators: { date: [{
                type: Input
            }], weekday: [{
                type: Input
            }], era: [{
                type: Input
            }], year: [{
                type: Input
            }], month: [{
                type: Input
            }], day: [{
                type: Input
            }], hour: [{
                type: Input
            }], minute: [{
                type: Input
            }], second: [{
                type: Input
            }], timeZoneName: [{
                type: Input
            }], timeZone: [{
                type: Input
            }], hourFormat: [{
                type: Input
            }], lang: [{
                type: Input
            }], color: [{
                type: Input
            }], fontSize: [{
                type: Input
            }], fontWeight: [{
                type: Input
            }], backgroundColor: [{
                type: Input
            }], padding: [{
                type: Input
            }], margin: [{
                type: Input
            }], display: [{
                type: Input
            }] } });

/**
 * WaFormatNumberDirective
 *
 * Angular wrapper for the <wa-format-number> Web Awesome component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds all supported format-number attributes as @Input() properties
 * - Supports string inputs for number formatting options
 * - Implements ControlValueAccessor for ngModel support
 * - Enables Angular-style class and style bindings
 * - Supports styling inputs via CSS custom properties
 */
class WaFormatNumberDirective {
    // Value input
    value;
    // Format inputs
    type;
    currency;
    currencyDisplay;
    lang;
    withoutGrouping;
    minimumIntegerDigits;
    minimumFractionDigits;
    maximumFractionDigits;
    minimumSignificantDigits;
    maximumSignificantDigits;
    // Style inputs
    color;
    fontSize;
    fontWeight;
    display;
    textAlign;
    padding;
    // Injected services
    el = inject(ElementRef);
    renderer = inject(Renderer2);
    // ControlValueAccessor implementation
    onChange = () => { };
    onTouched = () => { };
    ngOnInit() {
        const nativeEl = this.el.nativeElement;
        // Set numeric attributes
        this.setNumericAttr('value', this.value);
        this.setNumericAttr('minimum-integer-digits', this.minimumIntegerDigits);
        this.setNumericAttr('minimum-fraction-digits', this.minimumFractionDigits);
        this.setNumericAttr('maximum-fraction-digits', this.maximumFractionDigits);
        this.setNumericAttr('minimum-significant-digits', this.minimumSignificantDigits);
        this.setNumericAttr('maximum-significant-digits', this.maximumSignificantDigits);
        // Set string attributes
        this.setAttr('type', this.type);
        this.setAttr('currency', this.currency);
        this.setAttr('currency-display', this.currencyDisplay);
        this.setAttr('lang', this.lang);
        // Set boolean attributes
        this.setBooleanAttr('without-grouping', this.withoutGrouping);
        // Set style attributes
        this.setCssVar('--color', this.color);
        this.setCssVar('--font-size', this.fontSize);
        this.setCssVar('--font-weight', this.fontWeight);
        this.setCssVar('--display', this.display);
        this.setCssVar('--text-align', this.textAlign);
        this.setCssVar('--padding', this.padding);
    }
    /**
     * Exposes the native format-number element for direct interaction
     */
    get nativeElement() {
        return this.el.nativeElement;
    }
    /**
     * Sets an attribute on the native element if the value is not null or undefined
     */
    setAttr(name, value) {
        if (value != null) {
            this.renderer.setAttribute(this.el.nativeElement, name, value);
        }
    }
    /**
     * Sets a numeric attribute on the native element if the value is not null or undefined
     */
    setNumericAttr(name, value) {
        if (value != null) {
            const numericValue = typeof value === 'string' ? parseFloat(value) : value;
            if (!isNaN(numericValue)) {
                this.renderer.setAttribute(this.el.nativeElement, name, numericValue.toString());
            }
        }
    }
    /**
     * Sets a CSS custom property on the native element if the value is not null or undefined
     */
    setCssVar(name, value) {
        if (value != null) {
            this.renderer.setStyle(this.el.nativeElement, name, value);
        }
    }
    /**
     * Sets a boolean attribute on the native element if the value is truthy
     * For boolean attributes, the presence of the attribute (with empty value) indicates true
     */
    setBooleanAttr(name, value) {
        if (value === true || value === 'true' || value === '') {
            this.renderer.setAttribute(this.el.nativeElement, name, '');
        }
    }
    // ControlValueAccessor implementation
    writeValue(value) {
        if (value !== undefined && value !== null) {
            this.value = value;
            this.setNumericAttr('value', value);
        }
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(isDisabled) {
        this.renderer.setAttribute(this.el.nativeElement, 'disabled', isDisabled ? 'true' : 'false');
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaFormatNumberDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.14", type: WaFormatNumberDirective, isStandalone: true, selector: "wa-format-number", inputs: { value: "value", type: "type", currency: "currency", currencyDisplay: "currencyDisplay", lang: "lang", withoutGrouping: "withoutGrouping", minimumIntegerDigits: "minimumIntegerDigits", minimumFractionDigits: "minimumFractionDigits", maximumFractionDigits: "maximumFractionDigits", minimumSignificantDigits: "minimumSignificantDigits", maximumSignificantDigits: "maximumSignificantDigits", color: "color", fontSize: "fontSize", fontWeight: "fontWeight", display: "display", textAlign: "textAlign", padding: "padding" }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => WaFormatNumberDirective),
                multi: true
            }
        ], ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaFormatNumberDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'wa-format-number',
                    standalone: true,
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => WaFormatNumberDirective),
                            multi: true
                        }
                    ]
                }]
        }], propDecorators: { value: [{
                type: Input
            }], type: [{
                type: Input
            }], currency: [{
                type: Input
            }], currencyDisplay: [{
                type: Input
            }], lang: [{
                type: Input
            }], withoutGrouping: [{
                type: Input
            }], minimumIntegerDigits: [{
                type: Input
            }], minimumFractionDigits: [{
                type: Input
            }], maximumFractionDigits: [{
                type: Input
            }], minimumSignificantDigits: [{
                type: Input
            }], maximumSignificantDigits: [{
                type: Input
            }], color: [{
                type: Input
            }], fontSize: [{
                type: Input
            }], fontWeight: [{
                type: Input
            }], display: [{
                type: Input
            }], textAlign: [{
                type: Input
            }], padding: [{
                type: Input
            }] } });

/**
 * WaIncludeDirective
 *
 * Angular wrapper for the <wa-include> Web Component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds all supported include attributes as @Input() properties
 * - Supports string inputs like src and mode
 * - Supports boolean attributes like allowScripts
 * - Emits load and error events
 * - Enables Angular-style class and style bindings
 */
class WaIncludeDirective {
    // String inputs
    src;
    mode;
    // Boolean inputs
    allowScripts;
    // Event outputs
    waLoad = new EventEmitter();
    waError = new EventEmitter();
    // Injected services
    el = inject(ElementRef);
    renderer = inject(Renderer2);
    ngOnInit() {
        const nativeEl = this.el.nativeElement;
        this.applyInputs();
        // Set up event listeners (use hyphenated custom events per WebAwesome)
        this.renderer.listen(nativeEl, 'wa-load', () => this.waLoad.emit());
        this.renderer.listen(nativeEl, 'wa-error', (event) => this.waError.emit(event.detail));
        // Backwards compatibility with legacy camelCase events
        this.renderer.listen(nativeEl, 'waLoad', () => this.waLoad.emit());
        this.renderer.listen(nativeEl, 'waError', (event) => this.waError.emit(event.detail));
    }
    ngOnChanges(_) {
        this.applyInputs();
    }
    applyInputs() {
        // Set string attributes
        this.setAttr('src', this.src);
        this.setAttr('mode', this.mode);
        // Set boolean attributes (only if true)
        this.setBooleanAttr('allow-scripts', this.allowScripts);
    }
    /**
     * Exposes the native include element for direct interaction
     */
    get nativeElement() {
        return this.el.nativeElement;
    }
    /**
     * Sets an attribute on the native element if the value is not null or undefined
     */
    setAttr(name, value) {
        if (value != null) {
            this.renderer.setAttribute(this.el.nativeElement, name, value);
        }
    }
    /**
     * Sets a boolean attribute on the native element if the value is truthy
     * For boolean attributes, the presence of the attribute (with empty value) indicates true
     */
    setBooleanAttr(name, value) {
        if (value === true || value === 'true' || value === '') {
            this.renderer.setAttribute(this.el.nativeElement, name, '');
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaIncludeDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.14", type: WaIncludeDirective, isStandalone: true, selector: "wa-include", inputs: { src: "src", mode: "mode", allowScripts: "allowScripts" }, outputs: { waLoad: "wa-load", waError: "wa-error" }, usesOnChanges: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaIncludeDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'wa-include',
                    standalone: true
                }]
        }], propDecorators: { src: [{
                type: Input
            }], mode: [{
                type: Input
            }], allowScripts: [{
                type: Input
            }], waLoad: [{
                type: Output,
                args: ['wa-load']
            }], waError: [{
                type: Output,
                args: ['wa-error']
            }] } });

/**
 * WaInputDirective
 *
 * Angular wrapper for the <wa-input> Web Awesome component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds all supported input attributes as @Input() properties
 * - Supports string inputs like type, label, placeholder, etc.
 * - Supports numeric inputs like minlength, maxlength, min, max, etc.
 * - Supports boolean attributes like required, readonly, clearable, etc.
 * - Emits events for input, change, focusNative, blurNative, etc.
 * - Enables Angular-style class and style bindings
 * - Allows slot projection for label, hint, start, end, etc.
 * - Supports custom styling via CSS variables
 * - Provides methods for programmatic control: focusNative(), blurNative(), select(), etc.
 * - Implements ControlValueAccessor for ngModel support
 */
class WaInputDirective {
    // Core input attributes
    type;
    value;
    size;
    appearance;
    pill;
    label;
    hint;
    withClear;
    placeholder;
    readonly;
    passwordToggle;
    passwordVisible;
    withoutSpinButtons;
    form;
    required;
    pattern;
    minlength;
    maxlength;
    min;
    max;
    step;
    autocapitalize;
    autocorrect;
    autocomplete;
    autofocus;
    enterkeyhint;
    spellcheck;
    inputmode;
    withLabel;
    withHint;
    // Style inputs
    backgroundColor;
    borderColor;
    borderWidth;
    boxShadow;
    // Event outputs
    waInput = new EventEmitter();
    waInputHyphen = this.waInput;
    waChange = new EventEmitter();
    waChangeHyphen = this.waChange;
    waFocus = new EventEmitter();
    waFocusHyphen = this.waFocus;
    waBlur = new EventEmitter();
    waBlurHyphen = this.waBlur;
    waClear = new EventEmitter();
    waClearHyphen = this.waClear;
    waInvalid = new EventEmitter();
    waInvalidHyphen = this.waInvalid;
    valueChange = new EventEmitter();
    // Injected services
    el = inject(ElementRef);
    renderer = inject(Renderer2);
    // ControlValueAccessor implementation
    onChange = () => { };
    onTouched = () => { };
    validatorChange;
    ngOnInit() {
        const nativeEl = this.el.nativeElement;
        this.applyInputs();
        // Set up event listeners
        const forwardInput = (event) => {
            this.waInput.emit(event);
            const val = event.target.value;
            this.onChange(val);
            this.valueChange.emit(val);
        };
        const forwardChange = (event) => {
            this.waChange.emit(event);
            const val = event.target.value;
            this.onChange(val);
            this.valueChange.emit(val);
        };
        this.renderer.listen(nativeEl, 'input', forwardInput);
        this.renderer.listen(nativeEl, 'wa-input', forwardInput);
        this.renderer.listen(nativeEl, 'change', forwardChange);
        this.renderer.listen(nativeEl, 'wa-change', forwardChange);
        this.renderer.listen(nativeEl, 'focus', (event) => {
            this.waFocus.emit(event);
        });
        this.renderer.listen(nativeEl, 'wa-focus', (event) => {
            this.waFocus.emit(event);
        });
        this.renderer.listen(nativeEl, 'blur', (event) => {
            this.waBlur.emit(event);
            this.onTouched();
        });
        this.renderer.listen(nativeEl, 'wa-blur', (event) => {
            this.waBlur.emit(event);
            this.onTouched();
        });
        this.renderer.listen(nativeEl, 'wa-clear', (event) => {
            this.waClear.emit(event);
            this.onChange('');
            this.valueChange.emit('');
        });
        this.renderer.listen(nativeEl, 'wa-invalid', (event) => {
            this.waInvalid.emit(event);
            this.validatorChange?.();
        });
    }
    ngOnChanges(_) {
        this.applyInputs();
    }
    applyInputs() {
        // Set string attributes
        this.setAttr('type', this.type);
        this.setAttr('value', this.value?.toString());
        this.setAttr('size', this.size);
        this.setAttr('appearance', normalizeAppearance(this.appearance));
        this.setAttr('label', this.label);
        this.setAttr('hint', this.hint);
        this.setAttr('placeholder', this.placeholder);
        this.setAttr('form', this.form);
        this.setAttr('pattern', this.pattern);
        this.setAttr('autocapitalize', this.autocapitalize);
        this.setAttr('autocorrect', this.autocorrect);
        this.setAttr('autocomplete', this.autocomplete);
        this.setAttr('enterkeyhint', this.enterkeyhint);
        this.setAttr('inputmode', this.inputmode);
        // Set numeric attributes
        this.setNumericAttr('minlength', this.minlength);
        this.setNumericAttr('maxlength', this.maxlength);
        this.setNumericAttr('min', this.min);
        this.setNumericAttr('max', this.max);
        if (this.step !== 'any') {
            this.setNumericAttr('step', this.step);
        }
        else if (this.step === 'any') {
            this.setAttr('step', 'any');
        }
        // Set boolean attributes (only if true)
        this.setBooleanAttr('pill', this.pill);
        this.setBooleanAttr('with-clear', this.withClear);
        this.setBooleanAttr('readonly', this.readonly);
        this.setBooleanAttr('password-toggle', this.passwordToggle);
        this.setBooleanAttr('password-visible', this.passwordVisible);
        this.setBooleanAttr('without-spin-buttons', this.withoutSpinButtons);
        this.setBooleanAttr('required', this.required);
        this.setBooleanAttr('autofocus', this.autofocus);
        this.setBooleanAttr('spellcheck', this.spellcheck);
        this.setBooleanAttr('with-label', this.withLabel);
        this.setBooleanAttr('with-hint', this.withHint);
        // Set style attributes
        this.setCssVar('--background-color', this.backgroundColor);
        this.setCssVar('--border-color', this.borderColor);
        this.setCssVar('--border-width', this.borderWidth);
        this.setCssVar('--box-shadow', this.boxShadow);
    }
    /**
     * Exposes the native input element for direct interaction
     */
    get nativeElement() {
        return this.el.nativeElement;
    }
    /**
     * Programmatically focuses the input
     */
    focus(options) {
        if (typeof this.el.nativeElement.focus === 'function') {
            this.el.nativeElement.focus(options);
        }
    }
    /**
     * Programmatically blurs the input
     */
    blur() {
        if (typeof this.el.nativeElement.blur === 'function') {
            this.el.nativeElement.blur();
        }
    }
    /**
     * Programmatically selects all text in the input
     */
    select() {
        if (typeof this.el.nativeElement.select === 'function') {
            this.el.nativeElement.select();
        }
    }
    /**
     * Programmatically sets the selection range
     */
    setSelectionRange(start, end, direction) {
        if (typeof this.el.nativeElement.setSelectionRange === 'function') {
            this.el.nativeElement.setSelectionRange(start, end, direction);
        }
    }
    /**
     * Programmatically sets the range text
     */
    setRangeText(replacement, start, end, selectMode) {
        if (typeof this.el.nativeElement.setRangeText === 'function') {
            this.el.nativeElement.setRangeText(replacement, start, end, selectMode);
        }
    }
    /**
     * Programmatically shows the picker (for date, color, etc. inputs)
     */
    showPicker() {
        if (typeof this.el.nativeElement.showPicker === 'function') {
            this.el.nativeElement.showPicker();
        }
    }
    /**
     * Programmatically steps up the value (for number inputs)
     */
    stepUp() {
        if (typeof this.el.nativeElement.stepUp === 'function') {
            this.el.nativeElement.stepUp();
        }
    }
    /**
     * Programmatically steps down the value (for number inputs)
     */
    stepDown() {
        if (typeof this.el.nativeElement.stepDown === 'function') {
            this.el.nativeElement.stepDown();
        }
    }
    /**
     * Sets an attribute on the native element if the value is not null or undefined
     */
    setAttr(name, value) {
        if (value != null) {
            this.renderer.setAttribute(this.el.nativeElement, name, value);
        }
    }
    /**
     * Sets a numeric attribute on the native element if the value is not null or undefined
     */
    setNumericAttr(name, value) {
        if (value != null) {
            const numericValue = typeof value === 'string' ? parseFloat(value) : value;
            if (!isNaN(numericValue)) {
                this.renderer.setAttribute(this.el.nativeElement, name, numericValue.toString());
            }
        }
    }
    /**
     * Sets a CSS custom property on the native element if the value is not null or undefined
     */
    setCssVar(name, value) {
        if (value != null) {
            this.renderer.setStyle(this.el.nativeElement, name, value);
        }
    }
    /**
     * Sets a boolean attribute on the native element if the value is truthy
     * For boolean attributes, the presence of the attribute (with empty value) indicates true
     */
    setBooleanAttr(name, value) {
        if (value === true || value === 'true' || value === '') {
            this.renderer.setAttribute(this.el.nativeElement, name, '');
        }
    }
    // ControlValueAccessor implementation
    writeValue(value) {
        if (value !== undefined) {
            this.value = value;
            this.setAttr('value', value?.toString());
        }
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(isDisabled) {
        this.setBooleanAttr('disabled', isDisabled);
    }
    // Validator implementation: expose required error to Angular forms
    validate(control) {
        // If the underlying element is disabled, treat as valid
        const el = this.el?.nativeElement;
        if (!el || el.disabled)
            return null;
        const isRequired = this.required === true || this.required === '' || this.required === 'true';
        if (!isRequired)
            return null;
        const val = control?.value;
        const isEmpty = val === null || val === undefined || val === '';
        return isEmpty ? { required: true } : null;
    }
    registerOnValidatorChange(fn) {
        this.validatorChange = fn;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaInputDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.14", type: WaInputDirective, isStandalone: true, selector: "wa-input", inputs: { type: "type", value: "value", size: "size", appearance: "appearance", pill: "pill", label: "label", hint: "hint", withClear: "withClear", placeholder: "placeholder", readonly: "readonly", passwordToggle: "passwordToggle", passwordVisible: "passwordVisible", withoutSpinButtons: "withoutSpinButtons", form: "form", required: "required", pattern: "pattern", minlength: "minlength", maxlength: "maxlength", min: "min", max: "max", step: "step", autocapitalize: "autocapitalize", autocorrect: "autocorrect", autocomplete: "autocomplete", autofocus: "autofocus", enterkeyhint: "enterkeyhint", spellcheck: "spellcheck", inputmode: "inputmode", withLabel: "withLabel", withHint: "withHint", backgroundColor: "backgroundColor", borderColor: "borderColor", borderWidth: "borderWidth", boxShadow: "boxShadow" }, outputs: { waInput: "waInput", waInputHyphen: "wa-input", waChange: "waChange", waChangeHyphen: "wa-change", waFocus: "waFocus", waFocusHyphen: "wa-focus", waBlur: "waBlur", waBlurHyphen: "wa-blur", waClear: "waClear", waClearHyphen: "wa-clear", waInvalid: "waInvalid", waInvalidHyphen: "wa-invalid", valueChange: "valueChange" }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => WaInputDirective),
                multi: true
            },
            {
                provide: NG_VALIDATORS,
                useExisting: forwardRef(() => WaInputDirective),
                multi: true
            }
        ], usesOnChanges: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaInputDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'wa-input',
                    standalone: true,
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => WaInputDirective),
                            multi: true
                        },
                        {
                            provide: NG_VALIDATORS,
                            useExisting: forwardRef(() => WaInputDirective),
                            multi: true
                        }
                    ]
                }]
        }], propDecorators: { type: [{
                type: Input
            }], value: [{
                type: Input
            }], size: [{
                type: Input
            }], appearance: [{
                type: Input
            }], pill: [{
                type: Input
            }], label: [{
                type: Input
            }], hint: [{
                type: Input
            }], withClear: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], readonly: [{
                type: Input
            }], passwordToggle: [{
                type: Input
            }], passwordVisible: [{
                type: Input
            }], withoutSpinButtons: [{
                type: Input
            }], form: [{
                type: Input
            }], required: [{
                type: Input
            }], pattern: [{
                type: Input
            }], minlength: [{
                type: Input
            }], maxlength: [{
                type: Input
            }], min: [{
                type: Input
            }], max: [{
                type: Input
            }], step: [{
                type: Input
            }], autocapitalize: [{
                type: Input
            }], autocorrect: [{
                type: Input
            }], autocomplete: [{
                type: Input
            }], autofocus: [{
                type: Input
            }], enterkeyhint: [{
                type: Input
            }], spellcheck: [{
                type: Input
            }], inputmode: [{
                type: Input
            }], withLabel: [{
                type: Input
            }], withHint: [{
                type: Input
            }], backgroundColor: [{
                type: Input
            }], borderColor: [{
                type: Input
            }], borderWidth: [{
                type: Input
            }], boxShadow: [{
                type: Input
            }], waInput: [{
                type: Output
            }], waInputHyphen: [{
                type: Output,
                args: ['wa-input']
            }], waChange: [{
                type: Output
            }], waChangeHyphen: [{
                type: Output,
                args: ['wa-change']
            }], waFocus: [{
                type: Output
            }], waFocusHyphen: [{
                type: Output,
                args: ['wa-focus']
            }], waBlur: [{
                type: Output
            }], waBlurHyphen: [{
                type: Output,
                args: ['wa-blur']
            }], waClear: [{
                type: Output
            }], waClearHyphen: [{
                type: Output,
                args: ['wa-clear']
            }], waInvalid: [{
                type: Output
            }], waInvalidHyphen: [{
                type: Output,
                args: ['wa-invalid']
            }], valueChange: [{
                type: Output
            }] } });

/**
 * WaProgressBarDirective
 *
 * Angular wrapper for the <wa-progress-bar> Web Component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds value, indeterminate, and label attributes
 * - Emits focusNative and blurNative events
 * - Enables Angular-style class and style bindings
 * - Allows slot projection for content and prefix
 * - Supports custom styling via CSS variables
 * - Implements ControlValueAccessor for ngModel support
 */
class WaProgressBarDirective {
    // Core input attributes
    value;
    indeterminate;
    label;
    /**
     * Internal: track last applied percent to CSS var to avoid redundant writes
     */
    _lastPercentApplied = null;
    // Dialog integration: support both kebab-case and camelCase bindings
    _dataDialog;
    set dataDialogAttr(val) { this._dataDialog = val ?? null; }
    set dialogAttr(val) { this._dataDialog = val ?? null; }
    set dataDialog(val) { this._dataDialog = val ?? null; }
    // Style inputs
    indicatorColor;
    display;
    trackHeight;
    // Event outputs
    waFocus = new EventEmitter();
    waFocusHyphen = this.waFocus;
    waBlur = new EventEmitter();
    waBlurHyphen = this.waBlur;
    // Injected services
    el = inject(ElementRef);
    renderer = inject(Renderer2);
    // ControlValueAccessor implementation
    onChange = () => { };
    onTouched = () => { };
    ngOnInit() {
        const nativeEl = this.el.nativeElement;
        // Apply all inputs (attributes and styles)
        this.applyInputs();
        // Set up event listeners
        this.renderer.listen(nativeEl, 'focus', (event) => {
            this.waFocus.emit(event);
        });
        this.renderer.listen(nativeEl, 'wa-focus', (event) => {
            this.waFocus.emit(event);
        });
        this.renderer.listen(nativeEl, 'blur', (event) => {
            this.waBlur.emit(event);
            this.onTouched();
        });
        this.renderer.listen(nativeEl, 'wa-blur', (event) => {
            this.waBlur.emit(event);
            this.onTouched();
        });
        this.renderer.listen(nativeEl, 'input', (event) => {
            const target = event.target;
            const newValue = parseFloat(target.value);
            if (!isNaN(newValue)) {
                this.onChange(newValue);
            }
        });
    }
    ngOnChanges(_) {
        this.applyInputs();
    }
    applyInputs() {
        // Attributes
        this.setNumericAttr('value', this.value);
        this.setAttr('label', this.label);
        this.setBooleanAttr('indeterminate', this.indeterminate);
        // Style attributes
        this.setCssVar('--indicator-color', this.indicatorColor);
        this.setCssVar('--display', this.display);
        this.setCssVar('--track-height', this.trackHeight);
        // Update percentage CSS variable for the underlying component styling
        this.applyPercentageVar();
        // Dialog attribute
        this.setAttr('data-dialog', this._dataDialog);
    }
    clampPercent(val) {
        if (isNaN(val))
            return 0;
        return Math.max(0, Math.min(100, val));
    }
    applyPercentageVar() {
        // Do not set percentage when indeterminate
        if (this.indeterminate === true || this.indeterminate === 'true' || this.indeterminate === '') {
            this._lastPercentApplied = null;
            this.renderer.removeStyle(this.el.nativeElement, '--percentage');
            return;
        }
        const raw = typeof this.value === 'string' ? parseFloat(this.value) : this.value ?? 0;
        const clamped = this.clampPercent(raw);
        if (this._lastPercentApplied === clamped) {
            return;
        }
        this._lastPercentApplied = clamped;
        this.renderer.setStyle(this.el.nativeElement, '--percentage', `${clamped}%`);
    }
    /**
     * Exposes the native element for direct interaction
     */
    get nativeElement() {
        return this.el.nativeElement;
    }
    /**
     * Sets an attribute on the native element if the value is not null or undefined
     */
    setAttr(name, value) {
        if (value != null) {
            this.renderer.setAttribute(this.el.nativeElement, name, value);
        }
    }
    /**
     * Sets a numeric attribute on the native element if the value is not null or undefined
     */
    setNumericAttr(name, value) {
        if (value != null) {
            const numericValue = typeof value === 'string' ? parseFloat(value) : value;
            if (!isNaN(numericValue)) {
                this.renderer.setAttribute(this.el.nativeElement, name, numericValue.toString());
            }
        }
    }
    /**
     * Sets a CSS custom property on the native element if the value is not null or undefined
     */
    setCssVar(name, value) {
        if (value != null) {
            this.renderer.setStyle(this.el.nativeElement, name, value);
        }
    }
    /**
     * Sets a boolean attribute on the native element if the value is truthy
     * For boolean attributes, the presence of the attribute (with empty value) indicates true
     */
    setBooleanAttr(name, value) {
        if (value === true || value === 'true' || value === '') {
            this.renderer.setAttribute(this.el.nativeElement, name, '');
        }
    }
    // ControlValueAccessor implementation
    writeValue(value) {
        if (value !== undefined) {
            this.value = value;
            this.setNumericAttr('value', value);
            this.applyPercentageVar();
        }
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(isDisabled) {
        if (isDisabled) {
            this.renderer.setAttribute(this.el.nativeElement, 'disabled', '');
        }
        else {
            this.renderer.removeAttribute(this.el.nativeElement, 'disabled');
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaProgressBarDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.14", type: WaProgressBarDirective, isStandalone: true, selector: "wa-progress-bar", inputs: { value: "value", indeterminate: "indeterminate", label: "label", dataDialogAttr: ["data-dialog", "dataDialogAttr"], dialogAttr: ["dialog", "dialogAttr"], dataDialog: "dataDialog", indicatorColor: "indicatorColor", display: "display", trackHeight: "trackHeight" }, outputs: { waFocus: "waFocus", waFocusHyphen: "wa-focus", waBlur: "waBlur", waBlurHyphen: "wa-blur" }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => WaProgressBarDirective),
                multi: true
            }
        ], usesOnChanges: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaProgressBarDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'wa-progress-bar',
                    standalone: true,
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => WaProgressBarDirective),
                            multi: true
                        }
                    ]
                }]
        }], propDecorators: { value: [{
                type: Input
            }], indeterminate: [{
                type: Input
            }], label: [{
                type: Input
            }], dataDialogAttr: [{
                type: Input,
                args: ['data-dialog']
            }], dialogAttr: [{
                type: Input,
                args: ['dialog']
            }], dataDialog: [{
                type: Input
            }], indicatorColor: [{
                type: Input
            }], display: [{
                type: Input
            }], trackHeight: [{
                type: Input
            }], waFocus: [{
                type: Output
            }], waFocusHyphen: [{
                type: Output,
                args: ['wa-focus']
            }], waBlur: [{
                type: Output
            }], waBlurHyphen: [{
                type: Output,
                args: ['wa-blur']
            }] } });

/**
 * WaProgressRingDirective
 *
 * Angular wrapper for the <wa-progress-ring> Web Component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds value and label attributes
 * - Emits focusNative and blurNative events
 * - Enables Angular-style class and style bindings
 * - Allows slot projection for content and prefix
 * - Supports custom styling via CSS variables
 * - Implements ControlValueAccessor for ngModel support
 */
class WaProgressRingDirective {
    // Core input attributes
    value;
    label;
    // Dialog integration: support both kebab-case and camelCase bindings
    _dataDialog;
    set dataDialogAttr(val) { this._dataDialog = val ?? null; }
    set dialogAttr(val) { this._dataDialog = val ?? null; }
    set dataDialog(val) { this._dataDialog = val ?? null; }
    // Style inputs
    size;
    trackWidth;
    trackColor;
    indicatorWidth;
    indicatorColor;
    indicatorTransitionDuration;
    // Event outputs
    waFocus = new EventEmitter();
    waFocusHyphen = this.waFocus;
    waBlur = new EventEmitter();
    waBlurHyphen = this.waBlur;
    // Injected services
    el = inject(ElementRef);
    renderer = inject(Renderer2);
    // ControlValueAccessor implementation
    onChange = () => { };
    onTouched = () => { };
    // Internal: track last applied percent to avoid redundant style writes
    _lastPercentApplied = null;
    ngOnInit() {
        const nativeEl = this.el.nativeElement;
        this.applyInputs();
        // Set up event listeners
        this.renderer.listen(nativeEl, 'focus', (event) => {
            this.waFocus.emit(event);
        });
        this.renderer.listen(nativeEl, 'wa-focus', (event) => {
            this.waFocus.emit(event);
        });
        this.renderer.listen(nativeEl, 'blur', (event) => {
            this.waBlur.emit(event);
            this.onTouched();
        });
        this.renderer.listen(nativeEl, 'wa-blur', (event) => {
            this.waBlur.emit(event);
            this.onTouched();
        });
        this.renderer.listen(nativeEl, 'input', (event) => {
            const target = event.target;
            const val = (target?.value ?? '').toString();
            const newValue = parseFloat(val);
            if (!isNaN(newValue)) {
                this.onChange(newValue);
            }
        });
    }
    ngOnChanges(_) {
        this.applyInputs();
    }
    applyInputs() {
        // Attributes
        this.setNumericAttr('value', this.value);
        this.setAttr('label', this.label);
        // Style CSS variables
        this.setCssVar('--size', this.size);
        this.setCssVar('--track-width', this.trackWidth);
        this.setCssVar('--track-color', this.trackColor);
        this.setCssVar('--indicator-width', this.indicatorWidth);
        this.setCssVar('--indicator-color', this.indicatorColor);
        this.setCssVar('--indicator-transition-duration', this.indicatorTransitionDuration);
        // Update percentage CSS variable used by the underlying component
        this.applyPercentageVar();
        // Dialog attribute
        this.setAttr('data-dialog', this._dataDialog);
    }
    clampPercent(val) {
        if (isNaN(val))
            return 0;
        return Math.max(0, Math.min(100, val));
    }
    applyPercentageVar() {
        const raw = typeof this.value === 'string' ? parseFloat(this.value) : this.value ?? 0;
        const clamped = this.clampPercent(raw);
        if (this._lastPercentApplied === clamped) {
            return;
        }
        this._lastPercentApplied = clamped;
        this.renderer.setStyle(this.el.nativeElement, '--percentage', `${clamped}%`);
    }
    /**
     * Exposes the native element for direct interaction
     */
    get nativeElement() {
        return this.el.nativeElement;
    }
    /**
     * Sets an attribute on the native element if the value is not null or undefined
     */
    setAttr(name, value) {
        if (value != null) {
            this.renderer.setAttribute(this.el.nativeElement, name, value);
        }
    }
    /**
     * Sets a numeric attribute on the native element if the value is not null or undefined
     */
    setNumericAttr(name, value) {
        if (value != null) {
            const numericValue = typeof value === 'string' ? parseFloat(value) : value;
            if (!isNaN(numericValue)) {
                // Set attribute for SSR/initial hydration and general compatibility
                this.renderer.setAttribute(this.el.nativeElement, name, numericValue.toString());
                // Also set the property so the Web Component reacts to changes after initialization
                try {
                    this.renderer.setProperty(this.el.nativeElement, name, numericValue);
                }
                catch {
                    // no-op: some renderers/environments may not support setProperty
                    this.el.nativeElement[name] = numericValue;
                }
            }
        }
    }
    /**
     * Sets a CSS custom property on the native element if the value is not null or undefined
     */
    setCssVar(name, value) {
        if (value != null) {
            this.renderer.setStyle(this.el.nativeElement, name, value);
        }
    }
    // ControlValueAccessor implementation
    writeValue(value) {
        if (value !== undefined) {
            this.value = value;
            this.setNumericAttr('value', value);
            // Ensure property is set explicitly for robustness
            try {
                this.renderer.setProperty(this.el.nativeElement, 'value', typeof value === 'string' ? parseFloat(value) : value);
            }
            catch {
                this.el.nativeElement['value'] = typeof value === 'string' ? parseFloat(value) : value;
            }
            this.applyPercentageVar();
        }
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(isDisabled) {
        if (isDisabled) {
            this.renderer.setAttribute(this.el.nativeElement, 'disabled', '');
        }
        else {
            this.renderer.removeAttribute(this.el.nativeElement, 'disabled');
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaProgressRingDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.14", type: WaProgressRingDirective, isStandalone: true, selector: "wa-progress-ring", inputs: { value: "value", label: "label", dataDialogAttr: ["data-dialog", "dataDialogAttr"], dialogAttr: ["dialog", "dialogAttr"], dataDialog: "dataDialog", size: "size", trackWidth: "trackWidth", trackColor: "trackColor", indicatorWidth: "indicatorWidth", indicatorColor: "indicatorColor", indicatorTransitionDuration: "indicatorTransitionDuration" }, outputs: { waFocus: "waFocus", waFocusHyphen: "wa-focus", waBlur: "waBlur", waBlurHyphen: "wa-blur" }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => WaProgressRingDirective),
                multi: true
            }
        ], usesOnChanges: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaProgressRingDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'wa-progress-ring',
                    standalone: true,
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => WaProgressRingDirective),
                            multi: true
                        }
                    ]
                }]
        }], propDecorators: { value: [{
                type: Input
            }], label: [{
                type: Input
            }], dataDialogAttr: [{
                type: Input,
                args: ['data-dialog']
            }], dialogAttr: [{
                type: Input,
                args: ['dialog']
            }], dataDialog: [{
                type: Input
            }], size: [{
                type: Input
            }], trackWidth: [{
                type: Input
            }], trackColor: [{
                type: Input
            }], indicatorWidth: [{
                type: Input
            }], indicatorColor: [{
                type: Input
            }], indicatorTransitionDuration: [{
                type: Input
            }], waFocus: [{
                type: Output
            }], waFocusHyphen: [{
                type: Output,
                args: ['wa-focus']
            }], waBlur: [{
                type: Output
            }], waBlurHyphen: [{
                type: Output,
                args: ['wa-blur']
            }] } });

/**
 * WaQrCodeDirective
 *
 * Angular wrapper for the <wa-qr-code> Web Component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds value, label, size, fill, background, radius, and errorCorrection attributes
 * - Emits focusNative and blurNative events
 * - Enables Angular-style class and style bindings
 * - Allows slot projection for content and prefix
 * - Supports custom styling via CSS variables
 * - Implements ControlValueAccessor for ngModel support
 */
class WaQrCodeDirective {
    // Core input attributes
    value;
    label;
    size;
    fill;
    background;
    radius;
    errorCorrection;
    // Style inputs
    styleSize;
    styleFill;
    styleBackground;
    styleRadius;
    styleColor;
    styleDisplay;
    // Event outputs
    waFocus = new EventEmitter();
    waFocusHyphen = this.waFocus;
    waBlur = new EventEmitter();
    waBlurHyphen = this.waBlur;
    // Injected services
    el = inject(ElementRef);
    renderer = inject(Renderer2);
    // ControlValueAccessor implementation
    onChange = () => { };
    onTouched = () => { };
    ngOnInit() {
        const nativeEl = this.el.nativeElement;
        // Set attributes
        this.setAttr('value', this.value);
        this.setAttr('label', this.label);
        this.setNumericAttr('size', this.size);
        this.setAttr('fill', this.fill);
        this.setAttr('background', this.background);
        this.setNumericAttr('radius', this.radius);
        this.setAttr('error-correction', this.errorCorrection);
        // Set style attributes
        this.setCssVar('--size', this.styleSize);
        this.setCssVar('--fill', this.styleFill);
        this.setCssVar('--background', this.styleBackground);
        this.setCssVar('--radius', this.styleRadius);
        this.setCssVar('--color', this.styleColor);
        this.setCssVar('--display', this.styleDisplay);
        // Set up event listeners
        this.renderer.listen(nativeEl, 'focus', (event) => {
            this.waFocus.emit(event);
        });
        this.renderer.listen(nativeEl, 'wa-focus', (event) => {
            this.waFocus.emit(event);
        });
        this.renderer.listen(nativeEl, 'blur', (event) => {
            this.waBlur.emit(event);
            this.onTouched();
        });
        this.renderer.listen(nativeEl, 'wa-blur', (event) => {
            this.waBlur.emit(event);
            this.onTouched();
        });
        this.renderer.listen(nativeEl, 'input', (event) => {
            const target = event.target;
            this.onChange(target.value);
        });
    }
    /**
     * Exposes the native element for direct interaction
     */
    get nativeElement() {
        return this.el.nativeElement;
    }
    /**
     * Sets an attribute on the native element if the value is not null or undefined
     */
    setAttr(name, value) {
        if (value != null) {
            this.renderer.setAttribute(this.el.nativeElement, name, value);
        }
    }
    /**
     * Sets a numeric attribute on the native element if the value is not null or undefined
     */
    setNumericAttr(name, value) {
        if (value != null) {
            const numericValue = typeof value === 'string' ? parseFloat(value) : value;
            if (!isNaN(numericValue)) {
                this.renderer.setAttribute(this.el.nativeElement, name, numericValue.toString());
            }
        }
    }
    /**
     * Sets a CSS custom property on the native element if the value is not null or undefined
     */
    setCssVar(name, value) {
        if (value != null) {
            this.renderer.setStyle(this.el.nativeElement, name, value);
        }
    }
    // ControlValueAccessor implementation
    writeValue(value) {
        if (value !== undefined) {
            this.value = value;
            this.setAttr('value', value);
        }
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(isDisabled) {
        if (isDisabled) {
            this.renderer.setAttribute(this.el.nativeElement, 'disabled', '');
        }
        else {
            this.renderer.removeAttribute(this.el.nativeElement, 'disabled');
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaQrCodeDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.14", type: WaQrCodeDirective, isStandalone: true, selector: "wa-qr-code", inputs: { value: "value", label: "label", size: "size", fill: "fill", background: "background", radius: "radius", errorCorrection: "errorCorrection", styleSize: "styleSize", styleFill: "styleFill", styleBackground: "styleBackground", styleRadius: "styleRadius", styleColor: "styleColor", styleDisplay: "styleDisplay" }, outputs: { waFocus: "waFocus", waFocusHyphen: "wa-focus", waBlur: "waBlur", waBlurHyphen: "wa-blur" }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => WaQrCodeDirective),
                multi: true
            }
        ], ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaQrCodeDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'wa-qr-code',
                    standalone: true,
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => WaQrCodeDirective),
                            multi: true
                        }
                    ]
                }]
        }], propDecorators: { value: [{
                type: Input
            }], label: [{
                type: Input
            }], size: [{
                type: Input
            }], fill: [{
                type: Input
            }], background: [{
                type: Input
            }], radius: [{
                type: Input
            }], errorCorrection: [{
                type: Input
            }], styleSize: [{
                type: Input
            }], styleFill: [{
                type: Input
            }], styleBackground: [{
                type: Input
            }], styleRadius: [{
                type: Input
            }], styleColor: [{
                type: Input
            }], styleDisplay: [{
                type: Input
            }], waFocus: [{
                type: Output
            }], waFocusHyphen: [{
                type: Output,
                args: ['wa-focus']
            }], waBlur: [{
                type: Output
            }], waBlurHyphen: [{
                type: Output,
                args: ['wa-blur']
            }] } });

/**
 * WaRadioGroupDirective
 *
 * Angular wrapper for the <wa-radio-group> Web Component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds all supported radio group attributes as @Input() properties
 * - Emits events for input, change, focusNative, blurNative, etc.
 * - Enables Angular-style class and style bindings
 * - Allows slot projection for radio buttons
 * - Supports custom styling via CSS variables
 * - Implements ControlValueAccessor for ngModel support
 */
class WaRadioGroupDirective {
    // Core input attributes
    value;
    label;
    hint;
    name;
    orientation;
    size;
    required;
    disabled;
    withLabel;
    withHint;
    // Style inputs
    styleRadiosGap;
    // Event outputs
    waInput = new EventEmitter();
    waInputHyphen = this.waInput;
    waChange = new EventEmitter();
    waChangeHyphen = this.waChange;
    waFocus = new EventEmitter();
    waFocusHyphen = this.waFocus;
    waBlur = new EventEmitter();
    waBlurHyphen = this.waBlur;
    waInvalid = new EventEmitter();
    waInvalidHyphen = this.waInvalid;
    valueChange = new EventEmitter();
    // Injected services
    el = inject(ElementRef);
    renderer = inject(Renderer2);
    // ControlValueAccessor implementation
    onChange = () => { };
    onTouched = () => { };
    validatorChange;
    ngOnInit() {
        const nativeEl = this.el.nativeElement;
        this.applyInputs();
        // Set up event listeners
        const forwardInput = (event) => {
            this.waInput.emit(event);
            // For custom elements, prefer the host element's value property
            const hostValue = this.el.nativeElement?.value;
            const target = event.target;
            const nextValue = hostValue ?? target?.value ?? null;
            // Keep internal value and attribute in sync for two-way binding
            this.value = nextValue;
            if (nextValue == null) {
                this.renderer.removeAttribute(this.el.nativeElement, 'value');
                this.renderer.setProperty(this.el.nativeElement, 'value', null);
            }
            else {
                this.renderer.setProperty(this.el.nativeElement, 'value', nextValue);
                this.renderer.setAttribute(this.el.nativeElement, 'value', String(nextValue));
            }
            this.onChange(nextValue);
            this.valueChange.emit(nextValue);
            this.validatorChange?.();
        };
        this.renderer.listen(nativeEl, 'input', forwardInput);
        this.renderer.listen(nativeEl, 'wa-input', forwardInput);
        this.renderer.listen(nativeEl, 'change', (event) => {
            this.waChange.emit(event);
            const nextValue = this.el.nativeElement?.value ?? event.target?.value;
            this.valueChange.emit(nextValue);
            this.validatorChange?.();
        });
        this.renderer.listen(nativeEl, 'wa-change', (event) => {
            this.waChange.emit(event);
            const nextValue = this.el.nativeElement?.value ?? event.target?.value;
            this.valueChange.emit(nextValue);
            this.validatorChange?.();
        });
        this.renderer.listen(nativeEl, 'focus', (event) => {
            this.waFocus.emit(event);
        });
        this.renderer.listen(nativeEl, 'wa-focus', (event) => {
            this.waFocus.emit(event);
        });
        this.renderer.listen(nativeEl, 'blur', (event) => {
            this.waBlur.emit(event);
            this.onTouched();
        });
        this.renderer.listen(nativeEl, 'wa-blur', (event) => {
            this.waBlur.emit(event);
            this.onTouched();
        });
        this.renderer.listen(nativeEl, 'wa-invalid', (event) => {
            this.waInvalid.emit(event);
            this.validatorChange?.();
        });
    }
    ngOnChanges(_) {
        this.applyInputs();
    }
    applyInputs() {
        // Set string attributes
        this.setAttr('value', this.value);
        this.setAttr('label', this.label);
        this.setAttr('hint', this.hint);
        this.setAttr('name', this.name);
        this.setAttr('orientation', this.orientation);
        this.setAttr('size', this.size);
        // Set boolean attributes (only if true)
        this.setBooleanAttr('required', this.required);
        this.setBooleanAttr('disabled', this.disabled);
        this.setBooleanAttr('with-label', this.withLabel);
        this.setBooleanAttr('with-hint', this.withHint);
        // Set style attributes
        this.setCssVar('--gap', this.styleRadiosGap);
    }
    /**
     * Exposes the native element for direct interaction
     */
    get nativeElement() {
        return this.el.nativeElement;
    }
    /**
     * Sets an attribute on the native element if the value is not null or undefined
     */
    setAttr(name, value) {
        if (value != null) {
            this.renderer.setAttribute(this.el.nativeElement, name, value);
        }
    }
    /**
     * Sets a CSS custom property on the native element if the value is not null or undefined
     */
    setCssVar(name, value) {
        if (value != null) {
            this.renderer.setStyle(this.el.nativeElement, name, value);
        }
    }
    /**
     * Sets a boolean attribute on the native element if the value is truthy
     * For boolean attributes, the presence of the attribute (with empty value) indicates true
     */
    setBooleanAttr(name, value) {
        if (value === true || value === 'true' || value === '') {
            this.renderer.setAttribute(this.el.nativeElement, name, '');
        }
    }
    // ControlValueAccessor implementation
    writeValue(value) {
        // Sync value from model into the host element
        if (value === undefined) {
            return; // Angular may call with undefined initially; ignore
        }
        this.value = value ?? null;
        if (value == null) {
            // Clear selection
            this.renderer.setProperty(this.el.nativeElement, 'value', null);
            this.renderer.removeAttribute(this.el.nativeElement, 'value');
        }
        else {
            // Set both the property and the attribute for robust syncing
            this.renderer.setProperty(this.el.nativeElement, 'value', value);
            this.renderer.setAttribute(this.el.nativeElement, 'value', String(value));
        }
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(isDisabled) {
        // Reflect to property as well for custom element parity
        this.renderer.setProperty(this.el.nativeElement, 'disabled', !!isDisabled);
        // Add or remove the disabled attribute to match the state
        if (isDisabled) {
            this.renderer.setAttribute(this.el.nativeElement, 'disabled', '');
        }
        else {
            this.renderer.removeAttribute(this.el.nativeElement, 'disabled');
        }
    }
    // Validator implementation: when required, ensure a selection exists
    validate(control) {
        const host = this.el?.nativeElement;
        if (!host)
            return null;
        // Treat disabled as valid
        if (host.disabled || host.hasAttribute?.('disabled'))
            return null;
        const requiredInput = this.required;
        const isRequired = requiredInput === true || requiredInput === '' || requiredInput === 'true' || (host.hasAttribute && host.hasAttribute('required'));
        if (!isRequired)
            return null;
        const val = control?.value;
        const isEmpty = val == null || val === '';
        return isEmpty ? { required: true } : null;
    }
    registerOnValidatorChange(fn) {
        this.validatorChange = fn;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaRadioGroupDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.14", type: WaRadioGroupDirective, isStandalone: true, selector: "wa-radio-group", inputs: { value: "value", label: "label", hint: "hint", name: "name", orientation: "orientation", size: "size", required: "required", disabled: "disabled", withLabel: "withLabel", withHint: "withHint", styleRadiosGap: "styleRadiosGap" }, outputs: { waInput: "waInput", waInputHyphen: "wa-input", waChange: "waChange", waChangeHyphen: "wa-change", waFocus: "waFocus", waFocusHyphen: "wa-focus", waBlur: "waBlur", waBlurHyphen: "wa-blur", waInvalid: "waInvalid", waInvalidHyphen: "wa-invalid", valueChange: "valueChange" }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => WaRadioGroupDirective),
                multi: true
            },
            {
                provide: NG_VALIDATORS,
                useExisting: forwardRef(() => WaRadioGroupDirective),
                multi: true
            }
        ], usesOnChanges: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaRadioGroupDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'wa-radio-group',
                    standalone: true,
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => WaRadioGroupDirective),
                            multi: true
                        },
                        {
                            provide: NG_VALIDATORS,
                            useExisting: forwardRef(() => WaRadioGroupDirective),
                            multi: true
                        }
                    ]
                }]
        }], propDecorators: { value: [{
                type: Input
            }], label: [{
                type: Input
            }], hint: [{
                type: Input
            }], name: [{
                type: Input
            }], orientation: [{
                type: Input
            }], size: [{
                type: Input
            }], required: [{
                type: Input
            }], disabled: [{
                type: Input
            }], withLabel: [{
                type: Input
            }], withHint: [{
                type: Input
            }], styleRadiosGap: [{
                type: Input
            }], waInput: [{
                type: Output
            }], waInputHyphen: [{
                type: Output,
                args: ['wa-input']
            }], waChange: [{
                type: Output
            }], waChangeHyphen: [{
                type: Output,
                args: ['wa-change']
            }], waFocus: [{
                type: Output
            }], waFocusHyphen: [{
                type: Output,
                args: ['wa-focus']
            }], waBlur: [{
                type: Output
            }], waBlurHyphen: [{
                type: Output,
                args: ['wa-blur']
            }], waInvalid: [{
                type: Output
            }], waInvalidHyphen: [{
                type: Output,
                args: ['wa-invalid']
            }], valueChange: [{
                type: Output
            }] } });
/**
 * WaRadioDirective
 *
 * Angular wrapper for the <wa-radio> Web Component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds all supported radio attributes as @Input() properties
 * - Enables Angular-style class and style bindings
 * - Allows slot projection for content
 * - Supports custom styling via CSS variables
 * - Supports button appearance (replaces wa-radio-button)
 */
class WaRadioDirective {
    // Core input attributes
    value;
    form;
    checked;
    disabled;
    appearance;
    withPrefix;
    withSuffix;
    // Event outputs
    blur = new EventEmitter();
    focus = new EventEmitter();
    // Style inputs
    styleBackgroundColor;
    styleBackgroundColorChecked;
    styleBorderColor;
    styleBorderColorChecked;
    styleBorderStyle;
    styleBorderWidth;
    styleBoxShadow;
    styleCheckedIconColor;
    styleCheckedIconScale;
    styleToggleSize;
    styleIndicatorColor;
    styleIndicatorWidth;
    styleDisplay;
    // Injected services
    el = inject(ElementRef);
    renderer = inject(Renderer2);
    ngOnInit() {
        const nativeEl = this.el.nativeElement;
        this.applyInputs();
        // Set up event listeners
        this.renderer.listen(nativeEl, 'blur', (event) => {
            this.blur.emit(event);
        });
        this.renderer.listen(nativeEl, 'focus', (event) => {
            this.focus.emit(event);
        });
    }
    ngOnChanges(_) {
        this.applyInputs();
    }
    applyInputs() {
        // Set string attributes
        this.setAttr('value', this.value);
        this.setAttr('form', this.form);
        this.setAttr('appearance', this.appearance);
        // Set boolean attributes (only if true)
        this.setBooleanAttr('checked', this.checked);
        this.setBooleanAttr('disabled', this.disabled);
        this.setBooleanAttr('with-prefix', this.withPrefix);
        this.setBooleanAttr('with-suffix', this.withSuffix);
        // Set style attributes
        this.setCssVar('--background-color', this.styleBackgroundColor);
        this.setCssVar('--background-color-checked', this.styleBackgroundColorChecked);
        this.setCssVar('--border-color', this.styleBorderColor);
        this.setCssVar('--border-color-checked', this.styleBorderColorChecked);
        this.setCssVar('--border-style', this.styleBorderStyle);
        this.setCssVar('--border-width', this.styleBorderWidth);
        this.setCssVar('--box-shadow', this.styleBoxShadow);
        this.setCssVar('--checked-icon-color', this.styleCheckedIconColor);
        this.setCssVar('--checked-icon-scale', this.styleCheckedIconScale);
        this.setCssVar('--toggle-size', this.styleToggleSize);
        // Button appearance style attributes
        this.setCssVar('--indicator-color', this.styleIndicatorColor);
        this.setCssVar('--indicator-width', this.styleIndicatorWidth);
        this.setCssVar('--display', this.styleDisplay);
    }
    /**
     * Sets an attribute on the native element if the value is not null or undefined
     */
    setAttr(name, value) {
        if (value != null) {
            this.renderer.setAttribute(this.el.nativeElement, name, value);
        }
    }
    /**
     * Sets a CSS custom property on the native element if the value is not null or undefined
     */
    setCssVar(name, value) {
        if (value != null) {
            this.renderer.setStyle(this.el.nativeElement, name, value);
        }
    }
    /**
     * Sets a boolean attribute on the native element if the value is truthy
     * For boolean attributes, the presence of the attribute (with empty value) indicates true
     */
    setBooleanAttr(name, value) {
        if (value === true || value === 'true' || value === '') {
            this.renderer.setAttribute(this.el.nativeElement, name, '');
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaRadioDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.14", type: WaRadioDirective, isStandalone: true, selector: "wa-radio", inputs: { value: "value", form: "form", checked: "checked", disabled: "disabled", appearance: "appearance", withPrefix: "withPrefix", withSuffix: "withSuffix", styleBackgroundColor: "styleBackgroundColor", styleBackgroundColorChecked: "styleBackgroundColorChecked", styleBorderColor: "styleBorderColor", styleBorderColorChecked: "styleBorderColorChecked", styleBorderStyle: "styleBorderStyle", styleBorderWidth: "styleBorderWidth", styleBoxShadow: "styleBoxShadow", styleCheckedIconColor: "styleCheckedIconColor", styleCheckedIconScale: "styleCheckedIconScale", styleToggleSize: "styleToggleSize", styleIndicatorColor: "styleIndicatorColor", styleIndicatorWidth: "styleIndicatorWidth", styleDisplay: "styleDisplay" }, outputs: { blur: "blur", focus: "focus" }, usesOnChanges: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaRadioDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'wa-radio',
                    standalone: true
                }]
        }], propDecorators: { value: [{
                type: Input
            }], form: [{
                type: Input
            }], checked: [{
                type: Input
            }], disabled: [{
                type: Input
            }], appearance: [{
                type: Input
            }], withPrefix: [{
                type: Input
            }], withSuffix: [{
                type: Input
            }], blur: [{
                type: Output
            }], focus: [{
                type: Output
            }], styleBackgroundColor: [{
                type: Input
            }], styleBackgroundColorChecked: [{
                type: Input
            }], styleBorderColor: [{
                type: Input
            }], styleBorderColorChecked: [{
                type: Input
            }], styleBorderStyle: [{
                type: Input
            }], styleBorderWidth: [{
                type: Input
            }], styleBoxShadow: [{
                type: Input
            }], styleCheckedIconColor: [{
                type: Input
            }], styleCheckedIconScale: [{
                type: Input
            }], styleToggleSize: [{
                type: Input
            }], styleIndicatorColor: [{
                type: Input
            }], styleIndicatorWidth: [{
                type: Input
            }], styleDisplay: [{
                type: Input
            }] } });
/**
 * @deprecated Use WaRadioDirective with appearance="button" instead
 *
 * This directive is kept for backward compatibility but will be removed in a future version.
 * Please migrate to <wa-radio appearance="button"> as per the changelog.
 */
class WaRadioButtonDirective {
    // Core input attributes
    value;
    checked;
    disabled;
    withPrefix;
    withSuffix;
    // Style inputs
    styleIndicatorColor;
    styleIndicatorWidth;
    styleDisplay;
    // Injected services
    el = inject(ElementRef);
    renderer = inject(Renderer2);
    ngOnInit() {
        console.warn('DEPRECATED: <wa-radio-button> is deprecated. Please use <wa-radio appearance="button"> instead.');
        // Create a wa-radio element with appearance="button"
        const radioEl = document.createElement('wa-radio');
        radioEl.setAttribute('appearance', 'button');
        // Copy attributes
        if (this.value)
            radioEl.setAttribute('value', this.value);
        if (this.checked === true || this.checked === 'true')
            radioEl.setAttribute('checked', '');
        if (this.disabled === true || this.disabled === 'true')
            radioEl.setAttribute('disabled', '');
        if (this.withPrefix === true || this.withPrefix === 'true')
            radioEl.setAttribute('with-prefix', '');
        if (this.withSuffix === true || this.withSuffix === 'true')
            radioEl.setAttribute('with-suffix', '');
        // Copy styles
        if (this.styleIndicatorColor)
            radioEl.style.setProperty('--indicator-color', this.styleIndicatorColor);
        if (this.styleIndicatorWidth)
            radioEl.style.setProperty('--indicator-width', this.styleIndicatorWidth);
        if (this.styleDisplay)
            radioEl.style.setProperty('--display', this.styleDisplay);
        // Copy children
        while (this.el.nativeElement.firstChild) {
            radioEl.appendChild(this.el.nativeElement.firstChild);
        }
        // Replace the element
        this.el.nativeElement.parentNode.replaceChild(radioEl, this.el.nativeElement);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaRadioButtonDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.14", type: WaRadioButtonDirective, isStandalone: true, selector: "wa-radio-button", inputs: { value: "value", checked: "checked", disabled: "disabled", withPrefix: "withPrefix", withSuffix: "withSuffix", styleIndicatorColor: "styleIndicatorColor", styleIndicatorWidth: "styleIndicatorWidth", styleDisplay: "styleDisplay" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaRadioButtonDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'wa-radio-button',
                    standalone: true
                }]
        }], propDecorators: { value: [{
                type: Input
            }], checked: [{
                type: Input
            }], disabled: [{
                type: Input
            }], withPrefix: [{
                type: Input
            }], withSuffix: [{
                type: Input
            }], styleIndicatorColor: [{
                type: Input
            }], styleIndicatorWidth: [{
                type: Input
            }], styleDisplay: [{
                type: Input
            }] } });

/**
 * WaRelativeTimeDirective
 *
 * Angular wrapper for the <wa-relative-time> Web Component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds date attribute via ngModel (ISO 8601 string or Date)
 * - Supports format, numeric, lang, and sync inputs
 * - Emits focusNative and blurNative events
 * - Enables Angular-style class and style bindings
 * - Supports custom styling via CSS variables
 * - Implements ControlValueAccessor for ngModel support
 */
class WaRelativeTimeDirective {
    // Core input attributes
    format;
    numeric;
    lang;
    sync;
    // Style inputs
    display;
    // Event outputs
    focusEvent = new EventEmitter();
    blurEvent = new EventEmitter();
    // Injected services
    el = inject(ElementRef);
    renderer = inject(Renderer2);
    // ControlValueAccessor implementation
    onChange = () => { };
    onTouched = () => { };
    ngOnInit() {
        const nativeEl = this.el.nativeElement;
        // Set string attributes
        this.setAttr('format', this.format);
        this.setAttr('numeric', this.numeric);
        this.setAttr('lang', this.lang);
        // Set boolean attributes (only if true)
        this.setBooleanAttr('sync', this.sync);
        // Set style attributes
        this.setCssVar('--display', this.display);
        // Set up event listeners
        this.renderer.listen(nativeEl, 'focusNative', (event) => {
            this.focusEvent.emit(event);
        });
        this.renderer.listen(nativeEl, 'blurNative', (event) => {
            this.blurEvent.emit(event);
            this.onTouched();
        });
        this.renderer.listen(nativeEl, 'input', (event) => {
            const target = event.target;
            this.onChange(target.value);
        });
    }
    /**
     * Exposes the native element for direct interaction
     */
    get nativeElement() {
        return this.el.nativeElement;
    }
    /**
     * Sets an attribute on the native element if the value is not null or undefined
     */
    setAttr(name, value) {
        if (value != null) {
            this.renderer.setAttribute(this.el.nativeElement, name, value);
        }
    }
    /**
     * Sets a CSS custom property on the native element if the value is not null or undefined
     */
    setCssVar(name, value) {
        if (value != null) {
            this.renderer.setStyle(this.el.nativeElement, name, value);
        }
    }
    /**
     * Sets a boolean attribute on the native element if the value is truthy
     * For boolean attributes, the presence of the attribute (with empty value) indicates true
     */
    setBooleanAttr(name, value) {
        if (value === true || value === 'true' || value === '') {
            this.renderer.setAttribute(this.el.nativeElement, name, '');
        }
    }
    // ControlValueAccessor implementation
    writeValue(value) {
        if (value !== undefined) {
            // Convert Date objects to ISO string
            const dateValue = value instanceof Date ? value.toISOString() : value;
            this.setAttr('date', dateValue);
        }
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(isDisabled) {
        this.setBooleanAttr('disabled', isDisabled);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaRelativeTimeDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.14", type: WaRelativeTimeDirective, isStandalone: true, selector: "wa-relative-time[ngModel]", inputs: { format: "format", numeric: "numeric", lang: "lang", sync: "sync", display: "display" }, outputs: { focusEvent: "focusEvent", blurEvent: "blurEvent" }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => WaRelativeTimeDirective),
                multi: true
            }
        ], ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaRelativeTimeDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'wa-relative-time[ngModel]',
                    standalone: true,
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => WaRelativeTimeDirective),
                            multi: true
                        }
                    ]
                }]
        }], propDecorators: { format: [{
                type: Input
            }], numeric: [{
                type: Input
            }], lang: [{
                type: Input
            }], sync: [{
                type: Input
            }], display: [{
                type: Input
            }], focusEvent: [{
                type: Output
            }], blurEvent: [{
                type: Output
            }] } });

/**
 * WaScrollerDirective
 *
 * Angular directive that attaches directly to the <wa-scroller> Web Component,
 * aligning with how other components are wrapped in this library.
 *
 * Features:
 * - Binds orientation, withoutScrollbar, and withoutShadow attributes
 * - Enables Angular-style class and style bindings
 * - Supports custom styling via CSS variables
 */
class WaScrollerDirective {
    // Core input attributes
    orientation;
    withoutScrollbar;
    withoutShadow;
    // Style inputs
    shadowColor;
    shadowSize;
    // Injected services
    el = inject(ElementRef);
    renderer = inject(Renderer2);
    ngOnInit() {
        this.applyInputs();
    }
    ngOnChanges(_changes) {
        this.applyInputs();
    }
    applyInputs() {
        // Set string attributes
        this.setAttr('orientation', this.orientation);
        // Set boolean attributes (toggle on/off)
        this.setBooleanAttr('without-scrollbar', this.withoutScrollbar);
        this.setBooleanAttr('without-shadow', this.withoutShadow);
        // Set style attributes
        this.setCssVar('--shadow-color', this.shadowColor);
        this.setCssVar('--shadow-size', this.shadowSize);
    }
    /**
     * Exposes the native element for direct interaction
     */
    get nativeElement() {
        return this.el.nativeElement;
    }
    /**
     * Sets an attribute on the native element if the value is not null or undefined
     */
    setAttr(name, value) {
        if (value != null) {
            this.renderer.setAttribute(this.el.nativeElement, name, value);
        }
        else {
            this.renderer.removeAttribute(this.el.nativeElement, name);
        }
    }
    /**
     * Sets a CSS custom property on the native element if the value is not null or undefined
     */
    setCssVar(name, value) {
        if (value != null) {
            this.renderer.setStyle(this.el.nativeElement, name, value);
        }
        else {
            this.renderer.removeStyle(this.el.nativeElement, name);
        }
    }
    /**
     * Sets a boolean attribute on the native element if the value is truthy
     * For boolean attributes, the presence of the attribute (with empty value) indicates true
     */
    setBooleanAttr(name, value) {
        const truthy = value === '' || value === true || value === 'true';
        if (truthy) {
            this.renderer.setAttribute(this.el.nativeElement, name, '');
        }
        else {
            this.renderer.removeAttribute(this.el.nativeElement, name);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaScrollerDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.14", type: WaScrollerDirective, isStandalone: true, selector: "wa-scroller", inputs: { orientation: "orientation", withoutScrollbar: "withoutScrollbar", withoutShadow: "withoutShadow", shadowColor: "shadowColor", shadowSize: "shadowSize" }, usesOnChanges: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaScrollerDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'wa-scroller',
                    standalone: true
                }]
        }], propDecorators: { orientation: [{
                type: Input
            }], withoutScrollbar: [{
                type: Input
            }], withoutShadow: [{
                type: Input
            }], shadowColor: [{
                type: Input
            }], shadowSize: [{
                type: Input
            }] } });

/**
 * WaSelectWrapperComponent
 *
 * Angular wrapper for the <wa-select> Web Component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds all supported select attributes as @Input() properties
 * - Emits events for input, change, focusNative, blurNative, etc.
 * - Enables Angular-style class and style bindings
 * - Allows slot projection for wa-option elements
 * - Supports custom styling via CSS variables
 * - Implements ControlValueAccessor for ngModel support
 */
class WaSelectWrapperComponent {
    // Core input attributes
    value;
    label;
    hint;
    placeholder;
    appearance;
    pill;
    withClear;
    disabled;
    multiple;
    size;
    placement;
    required;
    maxOptionsVisible;
    // Maximum number of selections allowed when multiple is enabled
    maxSelected;
    form;
    // Custom tag renderer for multiselect tags
    getTag;
    // Style inputs
    backgroundColor;
    borderColor;
    borderWidth;
    boxShadow;
    backgroundColorCurrent;
    backgroundColorHover;
    textColorCurrent;
    textColorHover;
    // Event outputs
    waInput = new EventEmitter();
    waInputHyphen = this.waInput;
    waChange = new EventEmitter();
    waChangeHyphen = this.waChange;
    waFocus = new EventEmitter();
    waFocusHyphen = this.waFocus;
    waBlur = new EventEmitter();
    waBlurHyphen = this.waBlur;
    waClear = new EventEmitter();
    waClearHyphen = this.waClear;
    waShow = new EventEmitter();
    waShowHyphen = this.waShow;
    waAfterShow = new EventEmitter();
    waAfterShowHyphen = this.waAfterShow;
    waHide = new EventEmitter();
    waHideHyphen = this.waHide;
    waAfterHide = new EventEmitter();
    waAfterHideHyphen = this.waAfterHide;
    waInvalid = new EventEmitter();
    waInvalidHyphen = this.waInvalid;
    valueChange = new EventEmitter();
    // Injected services
    el = inject(ElementRef);
    renderer = inject(Renderer2);
    // Object binding support
    valueField; // property name to use as key when value is an object
    trackBy; // custom key generator
    keyToObject = new Map();
    objectToKey = new WeakMap();
    uidCounter = 0;
    getKeyFor(val) {
        // primitives and null/undefined -> stringify directly
        if (val == null) {
            return '';
        }
        const t = typeof val;
        if (t !== 'object') {
            return String(val);
        }
        // objects
        if (this.objectToKey.has(val)) {
            return this.objectToKey.get(val);
        }
        let key;
        try {
            if (this.trackBy) {
                key = this.trackBy(val);
            }
            else if (this.valueField && val[this.valueField] != null) {
                key = String(val[this.valueField]);
            }
        }
        catch { }
        if (!key) {
            key = `obj:${++this.uidCounter}`;
        }
        this.objectToKey.set(val, key);
        if (!this.keyToObject.has(key)) {
            this.keyToObject.set(key, val);
        }
        return key;
    }
    /** Register an option's value and return the key to set on DOM */
    registerOptionValue(val) {
        const key = this.getKeyFor(val);
        // ensure reverse map exists for primitives too, to translate back
        if (!this.keyToObject.has(key)) {
            this.keyToObject.set(key, val);
        }
        return key;
    }
    /** Translate raw value(s) from WC back to Angular model values */
    mapFromKeys(raw) {
        const mapOne = (k) => this.keyToObject.has(k) ? this.keyToObject.get(k) : k;
        if (Array.isArray(raw)) {
            return raw.map(mapOne);
        }
        return mapOne(raw);
    }
    // ControlValueAccessor implementation
    onChange = () => { };
    onTouched = () => { };
    /**
     * Internal flag to suppress model updates when we are writing programmatically
     * to the underlying element (prevents feedback loops with MutationObserver/events).
     */
    isWriting = false;
    attrObserver;
    validatorChange;
    parseMaxSelected() {
        const v = this.maxSelected;
        if (v == null)
            return undefined;
        const num = typeof v === 'string' ? parseInt(v, 10) : v;
        return isNaN(num) ? undefined : num;
    }
    getKeysFromValue(val) {
        if (val == null)
            return [];
        const toKey = (v) => this.getKeyFor(v);
        return Array.isArray(val) ? val.map(toKey) : [toKey(val)];
    }
    ngOnInit() {
        const nativeEl = this.el.nativeElement;
        this.applyInputs();
        // Set up event listeners
        const handleValueRead = () => {
            const el = this.el.nativeElement;
            // Prefer attribute first; fallback to property
            let raw = el?.getAttribute?.('value');
            if (raw == null) {
                raw = el?.value ?? '';
            }
            let newValue = raw;
            if (this.multiple === true || this.multiple === 'true' || this.multiple === '') {
                if (!Array.isArray(newValue)) {
                    newValue = String(newValue).split(' ').filter(v => v !== '');
                }
                // Enforce max selection if configured
                const max = this.parseMaxSelected();
                if (max != null && newValue.length > max) {
                    const limited = newValue.slice(0, max);
                    // Write back limited selection to DOM to prevent UI from exceeding the limit
                    this.isWriting = true;
                    try {
                        this.renderer.setProperty(el, 'value', limited);
                        if (limited.length === 0) {
                            this.renderer.removeAttribute(el, 'value');
                        }
                        else {
                            this.renderer.setAttribute(el, 'value', limited.join(' '));
                        }
                    }
                    finally {
                        Promise.resolve().then(() => (this.isWriting = false));
                    }
                    newValue = limited;
                }
            }
            const mapped = this.mapFromKeys(newValue);
            this.onChange(mapped);
            this.valueChange.emit(mapped);
        };
        // Listen to both standard and WebAwesome custom events
        this.renderer.listen(nativeEl, 'input', (event) => {
            this.waInput.emit(event);
            handleValueRead();
        });
        this.renderer.listen(nativeEl, 'change', (event) => {
            this.waChange.emit(event);
            handleValueRead();
        });
        this.renderer.listen(nativeEl, 'wa-input', (event) => {
            this.waInput.emit(event);
            handleValueRead();
        });
        this.renderer.listen(nativeEl, 'wa-change', (event) => {
            this.waChange.emit(event);
            handleValueRead();
        });
        this.renderer.listen(nativeEl, 'focus', (event) => {
            this.waFocus.emit(event);
        });
        this.renderer.listen(nativeEl, 'wa-focus', (event) => {
            this.waFocus.emit(event);
        });
        this.renderer.listen(nativeEl, 'blur', (event) => {
            this.waBlur.emit(event);
            this.onTouched();
        });
        this.renderer.listen(nativeEl, 'wa-blur', (event) => {
            this.waBlur.emit(event);
            this.onTouched();
        });
        this.renderer.listen(nativeEl, 'wa-clear', (event) => {
            this.waClear.emit(event);
            handleValueRead();
        });
        this.renderer.listen(nativeEl, 'wa-show', (event) => {
            this.waShow.emit(event);
        });
        this.renderer.listen(nativeEl, 'wa-after-show', (event) => {
            this.waAfterShow.emit(event);
        });
        this.renderer.listen(nativeEl, 'wa-hide', (event) => {
            this.waHide.emit(event);
        });
        this.renderer.listen(nativeEl, 'wa-after-hide', (event) => {
            this.waAfterHide.emit(event);
        });
        this.renderer.listen(nativeEl, 'wa-invalid', (event) => {
            this.waInvalid.emit(event);
            // Notify Angular that validation might have changed
            this.validatorChange?.();
        });
        // Observe 'value' attribute changes to sync model when WC updates attribute
        try {
            this.attrObserver = new MutationObserver((mutations) => {
                if (this.isWriting) {
                    return;
                }
                for (const m of mutations) {
                    if (m.type === 'attributes' && m.attributeName === 'value') {
                        const el = this.el.nativeElement;
                        const current = el?.value ?? el?.getAttribute?.('value') ?? '';
                        let newValue = current;
                        if (this.multiple === true || this.multiple === 'true' || this.multiple === '') {
                            if (!Array.isArray(newValue)) {
                                newValue = String(current).split(' ').filter(v => v !== '');
                            }
                            const max = this.parseMaxSelected();
                            if (max != null && newValue.length > max) {
                                const limited = newValue.slice(0, max);
                                this.isWriting = true;
                                try {
                                    this.renderer.setProperty(el, 'value', limited);
                                    if (limited.length === 0) {
                                        this.renderer.removeAttribute(el, 'value');
                                    }
                                    else {
                                        this.renderer.setAttribute(el, 'value', limited.join(' '));
                                    }
                                }
                                finally {
                                    Promise.resolve().then(() => (this.isWriting = false));
                                }
                                newValue = limited;
                            }
                        }
                        const mapped = this.mapFromKeys(newValue);
                        this.onChange(mapped);
                        this.valueChange.emit(mapped);
                    }
                }
            });
            this.attrObserver.observe(nativeEl, { attributes: true, attributeFilter: ['value'] });
        }
        catch { }
    }
    ngOnChanges(_) {
        this.applyInputs();
    }
    applyInputs() {
        // Set string attributes
        this.setAttr('label', this.label);
        this.setAttr('hint', this.hint);
        this.setAttr('placeholder', this.placeholder);
        this.setAttr('appearance', normalizeAppearance(this.appearance));
        this.setAttr('size', this.size);
        this.setAttr('placement', this.placement);
        this.setAttr('form', this.form);
        this.setNumericAttr('max-options-visible', this.maxOptionsVisible);
        // Set boolean attributes (only if true)
        // First clear booleans then reapply to allow toggling off
        const host = this.el.nativeElement;
        ['pill', 'with-clear', 'disabled', 'multiple', 'required'].forEach(a => host.removeAttribute(a));
        this.setBooleanAttr('pill', this.pill);
        this.setBooleanAttr('with-clear', this.withClear);
        this.setBooleanAttr('disabled', this.disabled);
        this.setBooleanAttr('multiple', this.multiple);
        this.setBooleanAttr('required', this.required);
        // Styles
        this.setCssVar('--background-color', this.backgroundColor);
        this.setCssVar('--border-color', this.borderColor);
        this.setCssVar('--border-width', this.borderWidth);
        this.setCssVar('--box-shadow', this.boxShadow);
        this.setCssVar('--background-color-current', this.backgroundColorCurrent);
        this.setCssVar('--background-color-hover', this.backgroundColorHover);
        this.setCssVar('--text-color-current', this.textColorCurrent);
        this.setCssVar('--text-color-hover', this.textColorHover);
        // Properties
        if (this.getTag) {
            this.el.nativeElement.getTag = this.getTag;
        }
        // Enforce maxSelected immediately when inputs change
        if (this.multiple === true || this.multiple === 'true' || this.multiple === '') {
            const max = this.parseMaxSelected();
            if (max != null) {
                const el = this.el.nativeElement;
                let raw = el?.getAttribute?.('value');
                if (raw == null) {
                    raw = el?.value ?? '';
                }
                let currentKeys = Array.isArray(raw)
                    ? raw
                    : String(raw).split(' ').filter(v => v !== '');
                if (currentKeys.length > max) {
                    const limited = currentKeys.slice(0, max);
                    this.isWriting = true;
                    try {
                        this.renderer.setProperty(el, 'value', limited);
                        if (limited.length === 0) {
                            this.renderer.removeAttribute(el, 'value');
                        }
                        else {
                            this.renderer.setAttribute(el, 'value', limited.join(' '));
                        }
                    }
                    finally {
                        Promise.resolve().then(() => (this.isWriting = false));
                    }
                }
            }
        }
    }
    /**
     * Exposes the native element for direct interaction
     */
    get nativeElement() {
        return this.el.nativeElement;
    }
    /**
     * Sets an attribute on the native element if the value is not null or undefined
     */
    setAttr(name, value) {
        if (value != null) {
            this.renderer.setAttribute(this.el.nativeElement, name, value);
        }
    }
    /**
     * Sets a numeric attribute on the native element if the value is not null or undefined
     */
    setNumericAttr(name, value) {
        if (value != null) {
            const numericValue = typeof value === 'string' ? parseFloat(value) : value;
            if (!isNaN(numericValue)) {
                this.renderer.setAttribute(this.el.nativeElement, name, numericValue.toString());
            }
        }
    }
    /**
     * Sets a CSS custom property on the native element if the value is truthy
     */
    setCssVar(name, value) {
        if (value != null) {
            this.renderer.setStyle(this.el.nativeElement, name, value);
        }
    }
    /**
     * Sets a boolean attribute on the native element if the value is truthy
     * For boolean attributes, the presence of the attribute (with empty value) indicates true
     */
    setBooleanAttr(name, value) {
        if (value === true || value === 'true' || value === '') {
            this.renderer.setAttribute(this.el.nativeElement, name, '');
        }
    }
    // ControlValueAccessor implementation
    writeValue(value) {
        if (value !== undefined) {
            this.value = value;
            this.isWriting = true;
            try {
                const el = this.el.nativeElement;
                // Reflect to property first
                if (this.multiple === true || this.multiple === 'true' || this.multiple === '') {
                    if (Array.isArray(value)) {
                        const max = this.parseMaxSelected();
                        const limitedVals = max != null ? value.slice(0, max) : value;
                        const keys = limitedVals.map(v => this.getKeyFor(v));
                        this.renderer.setProperty(el, 'value', keys);
                        if (keys.length === 0) {
                            this.renderer.removeAttribute(el, 'value');
                        }
                        else {
                            this.setAttr('value', keys.join(' '));
                        }
                    }
                    else if (value == null || value === '') {
                        this.renderer.setProperty(el, 'value', []);
                        this.renderer.removeAttribute(el, 'value');
                    }
                    else {
                        const key = this.getKeyFor(value);
                        this.renderer.setProperty(el, 'value', [key]);
                        this.setAttr('value', key);
                    }
                }
                else {
                    if (value == null || value === '') {
                        this.renderer.setProperty(el, 'value', '');
                        this.renderer.removeAttribute(el, 'value');
                    }
                    else {
                        const key = this.getKeyFor(value);
                        this.renderer.setProperty(el, 'value', key);
                        this.setAttr('value', key);
                    }
                }
            }
            finally {
                Promise.resolve().then(() => (this.isWriting = false));
            }
        }
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(isDisabled) {
        // Reflect disabled in both property and attribute space
        this.renderer.setProperty(this.el.nativeElement, 'disabled', !!isDisabled);
        if (isDisabled) {
            this.renderer.setAttribute(this.el.nativeElement, 'disabled', '');
        }
        else {
            this.el.nativeElement.removeAttribute('disabled');
        }
    }
    // Validator implementation so Angular forms can reflect validity state (e.g., required)
    validate(control) {
        // If disabled, treat as valid
        const el = this.el?.nativeElement;
        if (!el || el.disabled)
            return null;
        const isRequired = this.required === true || this.required === '' || this.required === 'true';
        if (!isRequired)
            return null;
        // Determine emptiness based on multiple vs single
        const val = control?.value;
        const isEmpty = Array.isArray(val) ? val.length === 0 : (val === null || val === undefined || val === '');
        return isEmpty ? { required: true } : null;
    }
    registerOnValidatorChange(fn) {
        this.validatorChange = fn;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaSelectWrapperComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.14", type: WaSelectWrapperComponent, isStandalone: true, selector: "wa-select", inputs: { value: "value", label: "label", hint: "hint", placeholder: "placeholder", appearance: "appearance", pill: "pill", withClear: "withClear", disabled: "disabled", multiple: "multiple", size: "size", placement: "placement", required: "required", maxOptionsVisible: "maxOptionsVisible", maxSelected: "maxSelected", form: "form", getTag: "getTag", backgroundColor: "backgroundColor", borderColor: "borderColor", borderWidth: "borderWidth", boxShadow: "boxShadow", backgroundColorCurrent: "backgroundColorCurrent", backgroundColorHover: "backgroundColorHover", textColorCurrent: "textColorCurrent", textColorHover: "textColorHover", valueField: "valueField", trackBy: "trackBy" }, outputs: { waInput: "waInput", waInputHyphen: "wa-input", waChange: "waChange", waChangeHyphen: "wa-change", waFocus: "waFocus", waFocusHyphen: "wa-focus", waBlur: "waBlur", waBlurHyphen: "wa-blur", waClear: "waClear", waClearHyphen: "wa-clear", waShow: "waShow", waShowHyphen: "wa-show", waAfterShow: "waAfterShow", waAfterShowHyphen: "wa-after-show", waHide: "waHide", waHideHyphen: "wa-hide", waAfterHide: "waAfterHide", waAfterHideHyphen: "wa-after-hide", waInvalid: "waInvalid", waInvalidHyphen: "wa-invalid", valueChange: "valueChange" }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => WaSelectWrapperComponent),
                multi: true
            },
            {
                provide: NG_VALIDATORS,
                useExisting: forwardRef(() => WaSelectWrapperComponent),
                multi: true
            }
        ], usesOnChanges: true, ngImport: i0, template: '<ng-content></ng-content>', isInline: true });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaSelectWrapperComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'wa-select',
                    standalone: true,
                    template: '<ng-content></ng-content>',
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => WaSelectWrapperComponent),
                            multi: true
                        },
                        {
                            provide: NG_VALIDATORS,
                            useExisting: forwardRef(() => WaSelectWrapperComponent),
                            multi: true
                        }
                    ]
                }]
        }], propDecorators: { value: [{
                type: Input
            }], label: [{
                type: Input
            }], hint: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], appearance: [{
                type: Input
            }], pill: [{
                type: Input
            }], withClear: [{
                type: Input
            }], disabled: [{
                type: Input
            }], multiple: [{
                type: Input
            }], size: [{
                type: Input
            }], placement: [{
                type: Input
            }], required: [{
                type: Input
            }], maxOptionsVisible: [{
                type: Input
            }], maxSelected: [{
                type: Input
            }], form: [{
                type: Input
            }], getTag: [{
                type: Input
            }], backgroundColor: [{
                type: Input
            }], borderColor: [{
                type: Input
            }], borderWidth: [{
                type: Input
            }], boxShadow: [{
                type: Input
            }], backgroundColorCurrent: [{
                type: Input
            }], backgroundColorHover: [{
                type: Input
            }], textColorCurrent: [{
                type: Input
            }], textColorHover: [{
                type: Input
            }], waInput: [{
                type: Output
            }], waInputHyphen: [{
                type: Output,
                args: ['wa-input']
            }], waChange: [{
                type: Output
            }], waChangeHyphen: [{
                type: Output,
                args: ['wa-change']
            }], waFocus: [{
                type: Output
            }], waFocusHyphen: [{
                type: Output,
                args: ['wa-focus']
            }], waBlur: [{
                type: Output
            }], waBlurHyphen: [{
                type: Output,
                args: ['wa-blur']
            }], waClear: [{
                type: Output
            }], waClearHyphen: [{
                type: Output,
                args: ['wa-clear']
            }], waShow: [{
                type: Output
            }], waShowHyphen: [{
                type: Output,
                args: ['wa-show']
            }], waAfterShow: [{
                type: Output
            }], waAfterShowHyphen: [{
                type: Output,
                args: ['wa-after-show']
            }], waHide: [{
                type: Output
            }], waHideHyphen: [{
                type: Output,
                args: ['wa-hide']
            }], waAfterHide: [{
                type: Output
            }], waAfterHideHyphen: [{
                type: Output,
                args: ['wa-after-hide']
            }], waInvalid: [{
                type: Output
            }], waInvalidHyphen: [{
                type: Output,
                args: ['wa-invalid']
            }], valueChange: [{
                type: Output
            }], valueField: [{
                type: Input
            }], trackBy: [{
                type: Input
            }] } });
/**
 * WaOptionDirective
 *
 * Angular wrapper for the <wa-option> Web Component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds value, label, and disabled attributes
 * - Enables Angular-style class and style bindings
 * - Allows slot projection for content
 * - Supports custom styling via CSS variables
 */
class WaOptionComponent {
    value;
    label;
    disabled;
    // Style inputs
    backgroundColorCurrent;
    backgroundColorHover;
    textColorCurrent;
    textColorHover;
    // Injected services
    el = inject(ElementRef);
    renderer = inject(Renderer2);
    parent = inject(WaSelectWrapperComponent, { optional: true });
    ngOnInit() {
        this.applyInputs();
    }
    ngOnChanges(_) {
        this.applyInputs();
    }
    applyInputs() {
        // Compute and set the actual DOM value (string key)
        let domValue;
        if (this.value != null) {
            try {
                domValue = this.parent ? this.parent.registerOptionValue(this.value) : String(this.value);
            }
            catch {
                domValue = String(this.value);
            }
        }
        // Set attributes
        this.setAttr('value', domValue);
        this.setAttr('label', this.label);
        // Set boolean attributes (only if true)
        // Clear boolean attrs first
        this.el.nativeElement.removeAttribute('disabled');
        this.setBooleanAttr('disabled', this.disabled);
        // Set style attributes
        this.setCssVar('--background-color-current', this.backgroundColorCurrent);
        this.setCssVar('--background-color-hover', this.backgroundColorHover);
        this.setCssVar('--text-color-current', this.textColorCurrent);
        this.setCssVar('--text-color-hover', this.textColorHover);
    }
    /**
     * Sets an attribute on the native element if the value is not null or undefined
     */
    setAttr(name, value) {
        if (value != null) {
            this.renderer.setAttribute(this.el.nativeElement, name, value);
        }
    }
    /**
     * Sets a CSS custom property on the native element if the value is truthy
     */
    setCssVar(name, value) {
        if (value != null) {
            this.renderer.setStyle(this.el.nativeElement, name, value);
        }
    }
    /**
     * Sets a boolean attribute on the native element if the value is truthy
     * For boolean attributes, the presence of the attribute (with empty value) indicates true
     */
    setBooleanAttr(name, value) {
        if (value === true || value === 'true' || value === '') {
            this.renderer.setAttribute(this.el.nativeElement, name, '');
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaOptionComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.14", type: WaOptionComponent, isStandalone: true, selector: "wa-option", inputs: { value: "value", label: "label", disabled: "disabled", backgroundColorCurrent: "backgroundColorCurrent", backgroundColorHover: "backgroundColorHover", textColorCurrent: "textColorCurrent", textColorHover: "textColorHover" }, usesOnChanges: true, ngImport: i0, template: '<ng-content></ng-content>', isInline: true });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaOptionComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'wa-option',
                    standalone: true,
                    template: '<ng-content></ng-content>'
                }]
        }], propDecorators: { value: [{
                type: Input
            }], label: [{
                type: Input
            }], disabled: [{
                type: Input
            }], backgroundColorCurrent: [{
                type: Input
            }], backgroundColorHover: [{
                type: Input
            }], textColorCurrent: [{
                type: Input
            }], textColorHover: [{
                type: Input
            }] } });

/**
 * WaComboboxComponent
 *
 * Angular wrapper for the <wa-combobox> Web Awesome component that exposes
 * declarative bindings, ControlValueAccessor integration, and slot projection.
 */
class WaComboboxComponent {
    // Core inputs
    value;
    name;
    label;
    hint;
    placeholder;
    appearance;
    pill;
    withClear;
    disabled;
    multiple;
    size;
    placement;
    required;
    maxOptionsVisible;
    withLabel;
    withHint;
    allowCustomValue;
    autocomplete;
    validationTarget;
    // Rich behavior inputs
    filter;
    getTag;
    // Object binding helpers
    valueField;
    trackBy;
    // Style inputs
    backgroundColor;
    borderColor;
    borderWidth;
    boxShadow;
    backgroundColorCurrent;
    backgroundColorHover;
    textColorCurrent;
    textColorHover;
    // Event outputs
    waInput = new EventEmitter();
    waInputHyphen = this.waInput;
    waChange = new EventEmitter();
    waChangeHyphen = this.waChange;
    waFocus = new EventEmitter();
    waFocusHyphen = this.waFocus;
    waBlur = new EventEmitter();
    waBlurHyphen = this.waBlur;
    waClear = new EventEmitter();
    waClearHyphen = this.waClear;
    waShow = new EventEmitter();
    waShowHyphen = this.waShow;
    waAfterShow = new EventEmitter();
    waAfterShowHyphen = this.waAfterShow;
    waHide = new EventEmitter();
    waHideHyphen = this.waHide;
    waAfterHide = new EventEmitter();
    waAfterHideHyphen = this.waAfterHide;
    waInvalid = new EventEmitter();
    waInvalidHyphen = this.waInvalid;
    valueChange = new EventEmitter();
    el = inject((ElementRef));
    renderer = inject(Renderer2);
    onChange = () => { };
    onTouched = () => { };
    validatorChange;
    attrObserver;
    isWriting = false;
    keyToObject = new Map();
    objectToKey = new WeakMap();
    uidCounter = 0;
    getKeyFor(val) {
        if (val == null) {
            return '';
        }
        const type = typeof val;
        if (type !== 'object') {
            return String(val);
        }
        if (this.objectToKey.has(val)) {
            return this.objectToKey.get(val);
        }
        let key;
        try {
            if (this.trackBy) {
                key = this.trackBy(val);
            }
            else if (this.valueField && val[this.valueField] != null) {
                key = String(val[this.valueField]);
            }
        }
        catch {
            key = undefined;
        }
        if (!key) {
            key = `obj:${++this.uidCounter}`;
        }
        this.objectToKey.set(val, key);
        if (!this.keyToObject.has(key)) {
            this.keyToObject.set(key, val);
        }
        return key;
    }
    /** Register an option's value and return the corresponding DOM key */
    registerOptionValue(val) {
        const key = this.getKeyFor(val);
        if (!this.keyToObject.has(key)) {
            this.keyToObject.set(key, val);
        }
        return key;
    }
    mapFromKeys(raw) {
        const mapOne = (key) => (this.keyToObject.has(key) ? this.keyToObject.get(key) : key);
        if (Array.isArray(raw)) {
            return raw.map(mapOne);
        }
        return mapOne(raw);
    }
    ngOnInit() {
        const nativeEl = this.el.nativeElement;
        this.applyInputs();
        const handleValueRead = () => {
            const el = this.el.nativeElement;
            let rawValue = el?.value ?? el?.getAttribute?.('value') ?? '';
            if (this.isMultiple() && !Array.isArray(rawValue)) {
                rawValue = String(rawValue)
                    .split(' ')
                    .filter(v => v !== '');
            }
            const mapped = this.mapFromKeys(rawValue);
            this.onChange(mapped);
            this.valueChange.emit(mapped);
        };
        const forwardInput = (event) => {
            this.waInput.emit(event);
            handleValueRead();
        };
        const forwardChange = (event) => {
            this.waChange.emit(event);
            handleValueRead();
        };
        this.renderer.listen(nativeEl, 'input', forwardInput);
        this.renderer.listen(nativeEl, 'wa-input', forwardInput);
        this.renderer.listen(nativeEl, 'change', forwardChange);
        this.renderer.listen(nativeEl, 'wa-change', forwardChange);
        this.renderer.listen(nativeEl, 'focus', (event) => {
            this.waFocus.emit(event);
        });
        this.renderer.listen(nativeEl, 'wa-focus', (event) => {
            this.waFocus.emit(event);
        });
        this.renderer.listen(nativeEl, 'blur', (event) => {
            this.waBlur.emit(event);
            this.onTouched();
        });
        this.renderer.listen(nativeEl, 'wa-blur', (event) => {
            this.waBlur.emit(event);
            this.onTouched();
        });
        this.renderer.listen(nativeEl, 'wa-clear', (event) => {
            this.waClear.emit(event);
            const val = this.isMultiple() ? [] : '';
            this.onChange(val);
            this.valueChange.emit(val);
        });
        this.renderer.listen(nativeEl, 'wa-show', (event) => this.waShow.emit(event));
        this.renderer.listen(nativeEl, 'wa-after-show', (event) => this.waAfterShow.emit(event));
        this.renderer.listen(nativeEl, 'wa-hide', (event) => this.waHide.emit(event));
        this.renderer.listen(nativeEl, 'wa-after-hide', (event) => this.waAfterHide.emit(event));
        this.renderer.listen(nativeEl, 'wa-invalid', (event) => {
            this.waInvalid.emit(event);
            this.validatorChange?.();
        });
        try {
            this.attrObserver = new MutationObserver(mutations => {
                if (this.isWriting) {
                    return;
                }
                for (const mutation of mutations) {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'value') {
                        const el = this.el.nativeElement;
                        let current = el?.value ?? el?.getAttribute?.('value') ?? '';
                        if (this.isMultiple() && !Array.isArray(current)) {
                            current = String(current)
                                .split(' ')
                                .filter(v => v !== '');
                        }
                        const mapped = this.mapFromKeys(current);
                        this.onChange(mapped);
                        this.valueChange.emit(mapped);
                    }
                }
            });
            this.attrObserver.observe(nativeEl, { attributes: true, attributeFilter: ['value'] });
        }
        catch { }
    }
    ngOnChanges(_) {
        this.applyInputs();
    }
    ngOnDestroy() {
        this.attrObserver?.disconnect();
    }
    applyInputs() {
        this.setAttr('name', this.name);
        this.setAttr('label', this.label);
        this.setAttr('hint', this.hint);
        this.setAttr('placeholder', this.placeholder);
        this.setAttr('appearance', normalizeAppearance(this.appearance));
        this.setAttr('size', this.size);
        this.setAttr('placement', this.placement);
        this.setAttr('autocomplete', this.autocomplete);
        this.setAttr('validation-target', this.validationTarget);
        this.setAttr('form', this.el.nativeElement.form ?? undefined);
        this.setNumericAttr('max-options-visible', this.maxOptionsVisible);
        const host = this.el.nativeElement;
        ['pill', 'with-clear', 'disabled', 'multiple', 'required', 'allow-custom-value', 'with-label', 'with-hint'].forEach(attr => host.removeAttribute(attr));
        this.setBooleanAttr('pill', this.pill);
        this.setBooleanAttr('with-clear', this.withClear);
        this.setBooleanAttr('disabled', this.disabled);
        this.setBooleanAttr('multiple', this.multiple);
        this.setBooleanAttr('required', this.required);
        this.setBooleanAttr('allow-custom-value', this.allowCustomValue);
        this.setBooleanAttr('with-label', this.withLabel);
        this.setBooleanAttr('with-hint', this.withHint);
        this.setCssVar('--background-color', this.backgroundColor);
        this.setCssVar('--border-color', this.borderColor);
        this.setCssVar('--border-width', this.borderWidth);
        this.setCssVar('--box-shadow', this.boxShadow);
        this.setCssVar('--background-color-current', this.backgroundColorCurrent);
        this.setCssVar('--background-color-hover', this.backgroundColorHover);
        this.setCssVar('--text-color-current', this.textColorCurrent);
        this.setCssVar('--text-color-hover', this.textColorHover);
        if (this.filter) {
            this.el.nativeElement.filter = this.filter;
        }
        if (this.getTag) {
            this.el.nativeElement.getTag = this.getTag;
        }
    }
    isMultiple() {
        return this.multiple === true || this.multiple === '' || this.multiple === 'true';
    }
    get nativeElement() {
        return this.el.nativeElement;
    }
    setAttr(name, value) {
        if (value != null) {
            this.renderer.setAttribute(this.el.nativeElement, name, value);
        }
        else {
            this.el.nativeElement.removeAttribute(name);
        }
    }
    setNumericAttr(name, value) {
        if (value != null) {
            const numeric = typeof value === 'string' ? parseFloat(value) : value;
            if (!isNaN(numeric)) {
                this.renderer.setAttribute(this.el.nativeElement, name, numeric.toString());
            }
        }
        else {
            this.el.nativeElement.removeAttribute(name);
        }
    }
    setCssVar(name, value) {
        if (value != null) {
            this.renderer.setStyle(this.el.nativeElement, name, value);
        }
        else {
            this.el.nativeElement.style.removeProperty(name);
        }
    }
    setBooleanAttr(name, value) {
        if (value === true || value === '' || value === 'true') {
            this.renderer.setAttribute(this.el.nativeElement, name, '');
        }
        else {
            this.el.nativeElement.removeAttribute(name);
        }
    }
    // ControlValueAccessor
    writeValue(value) {
        if (value === undefined) {
            return;
        }
        this.value = value;
        this.isWriting = true;
        try {
            const el = this.el.nativeElement;
            if (this.isMultiple()) {
                const arrayValue = Array.isArray(value) ? value : value == null ? [] : [value];
                const keys = arrayValue.map(v => this.getKeyFor(v));
                this.renderer.setProperty(el, 'value', keys);
                if (keys.length === 0) {
                    this.el.nativeElement.removeAttribute('value');
                }
                else {
                    this.setAttr('value', keys.join(' '));
                }
            }
            else {
                if (value == null || value === '') {
                    this.renderer.setProperty(el, 'value', '');
                    this.el.nativeElement.removeAttribute('value');
                }
                else {
                    const key = this.getKeyFor(value);
                    this.renderer.setProperty(el, 'value', key);
                    this.setAttr('value', key);
                }
            }
        }
        finally {
            Promise.resolve().then(() => (this.isWriting = false));
        }
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(isDisabled) {
        this.renderer.setProperty(this.el.nativeElement, 'disabled', !!isDisabled);
        if (isDisabled) {
            this.renderer.setAttribute(this.el.nativeElement, 'disabled', '');
        }
        else {
            this.el.nativeElement.removeAttribute('disabled');
        }
    }
    // Validator
    validate(control) {
        const el = this.el?.nativeElement;
        if (!el || el.disabled) {
            return null;
        }
        const isRequired = this.required === true || this.required === '' || this.required === 'true';
        if (!isRequired) {
            return null;
        }
        const val = control?.value;
        const empty = Array.isArray(val) ? val.length === 0 : val == null || val === '';
        return empty ? { required: true } : null;
    }
    registerOnValidatorChange(fn) {
        this.validatorChange = fn;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaComboboxComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.14", type: WaComboboxComponent, isStandalone: true, selector: "wa-combobox", inputs: { value: "value", name: "name", label: "label", hint: "hint", placeholder: "placeholder", appearance: "appearance", pill: "pill", withClear: "withClear", disabled: "disabled", multiple: "multiple", size: "size", placement: "placement", required: "required", maxOptionsVisible: "maxOptionsVisible", withLabel: "withLabel", withHint: "withHint", allowCustomValue: "allowCustomValue", autocomplete: "autocomplete", validationTarget: "validationTarget", filter: "filter", getTag: "getTag", valueField: "valueField", trackBy: "trackBy", backgroundColor: "backgroundColor", borderColor: "borderColor", borderWidth: "borderWidth", boxShadow: "boxShadow", backgroundColorCurrent: "backgroundColorCurrent", backgroundColorHover: "backgroundColorHover", textColorCurrent: "textColorCurrent", textColorHover: "textColorHover" }, outputs: { waInput: "waInput", waInputHyphen: "wa-input", waChange: "waChange", waChangeHyphen: "wa-change", waFocus: "waFocus", waFocusHyphen: "wa-focus", waBlur: "waBlur", waBlurHyphen: "wa-blur", waClear: "waClear", waClearHyphen: "wa-clear", waShow: "waShow", waShowHyphen: "wa-show", waAfterShow: "waAfterShow", waAfterShowHyphen: "wa-after-show", waHide: "waHide", waHideHyphen: "wa-hide", waAfterHide: "waAfterHide", waAfterHideHyphen: "wa-after-hide", waInvalid: "waInvalid", waInvalidHyphen: "wa-invalid", valueChange: "valueChange" }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => WaComboboxComponent),
                multi: true
            },
            {
                provide: NG_VALIDATORS,
                useExisting: forwardRef(() => WaComboboxComponent),
                multi: true
            }
        ], usesOnChanges: true, ngImport: i0, template: '<ng-content></ng-content>', isInline: true });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaComboboxComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'wa-combobox',
                    standalone: true,
                    template: '<ng-content></ng-content>',
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => WaComboboxComponent),
                            multi: true
                        },
                        {
                            provide: NG_VALIDATORS,
                            useExisting: forwardRef(() => WaComboboxComponent),
                            multi: true
                        }
                    ]
                }]
        }], propDecorators: { value: [{
                type: Input
            }], name: [{
                type: Input
            }], label: [{
                type: Input
            }], hint: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], appearance: [{
                type: Input
            }], pill: [{
                type: Input
            }], withClear: [{
                type: Input
            }], disabled: [{
                type: Input
            }], multiple: [{
                type: Input
            }], size: [{
                type: Input
            }], placement: [{
                type: Input
            }], required: [{
                type: Input
            }], maxOptionsVisible: [{
                type: Input
            }], withLabel: [{
                type: Input
            }], withHint: [{
                type: Input
            }], allowCustomValue: [{
                type: Input
            }], autocomplete: [{
                type: Input
            }], validationTarget: [{
                type: Input
            }], filter: [{
                type: Input
            }], getTag: [{
                type: Input
            }], valueField: [{
                type: Input
            }], trackBy: [{
                type: Input
            }], backgroundColor: [{
                type: Input
            }], borderColor: [{
                type: Input
            }], borderWidth: [{
                type: Input
            }], boxShadow: [{
                type: Input
            }], backgroundColorCurrent: [{
                type: Input
            }], backgroundColorHover: [{
                type: Input
            }], textColorCurrent: [{
                type: Input
            }], textColorHover: [{
                type: Input
            }], waInput: [{
                type: Output
            }], waInputHyphen: [{
                type: Output,
                args: ['wa-input']
            }], waChange: [{
                type: Output
            }], waChangeHyphen: [{
                type: Output,
                args: ['wa-change']
            }], waFocus: [{
                type: Output
            }], waFocusHyphen: [{
                type: Output,
                args: ['wa-focus']
            }], waBlur: [{
                type: Output
            }], waBlurHyphen: [{
                type: Output,
                args: ['wa-blur']
            }], waClear: [{
                type: Output
            }], waClearHyphen: [{
                type: Output,
                args: ['wa-clear']
            }], waShow: [{
                type: Output
            }], waShowHyphen: [{
                type: Output,
                args: ['wa-show']
            }], waAfterShow: [{
                type: Output
            }], waAfterShowHyphen: [{
                type: Output,
                args: ['wa-after-show']
            }], waHide: [{
                type: Output
            }], waHideHyphen: [{
                type: Output,
                args: ['wa-hide']
            }], waAfterHide: [{
                type: Output
            }], waAfterHideHyphen: [{
                type: Output,
                args: ['wa-after-hide']
            }], waInvalid: [{
                type: Output
            }], waInvalidHyphen: [{
                type: Output,
                args: ['wa-invalid']
            }], valueChange: [{
                type: Output
            }] } });

/**
 * WaSkeletonDirective
 *
 * Angular wrapper for the <wa-skeleton> Web Component that allows declarative usage
 * and styling of skeleton loading placeholders.
 *
 * Features:
 * - Applied as an attribute to placeholder elements
 * - Supports animation effects: none, sheen, pulse
 * - Enables Angular-style class and style bindings
 * - Supports custom styling via CSS variables
 */
class WaSkeletonDirective {
    // Core input attributes
    effect;
    // Style inputs
    borderRadius;
    color;
    sheenColor;
    // Injected services
    el = inject(ElementRef);
    renderer = inject(Renderer2);
    ngOnInit() {
        const nativeEl = this.el.nativeElement;
        // If the element is not a wa-skeleton tag, ensure it has the role="presentation"
        if (nativeEl.tagName.toLowerCase() !== 'wa-skeleton') {
            this.renderer.setAttribute(nativeEl, 'role', 'presentation');
            this.renderer.setAttribute(nativeEl, 'aria-hidden', 'true');
        }
        // Set string attributes
        this.setAttr('effect', this.effect);
        // Set style attributes
        this.setCssVar('--border-radius', this.borderRadius);
        this.setCssVar('--color', this.color);
        this.setCssVar('--sheen-color', this.sheenColor);
    }
    /**
     * Sets an attribute on the native element if the value is not null or undefined
     */
    setAttr(name, value) {
        if (value != null) {
            this.renderer.setAttribute(this.el.nativeElement, name, value);
        }
    }
    /**
     * Sets a CSS custom property on the native element if the value is not null or undefined
     */
    setCssVar(name, value) {
        if (value != null) {
            this.renderer.setStyle(this.el.nativeElement, name, value);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaSkeletonDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.14", type: WaSkeletonDirective, isStandalone: true, selector: "[waSkeleton]", inputs: { effect: "effect", borderRadius: "borderRadius", color: "color", sheenColor: "sheenColor" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaSkeletonDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[waSkeleton]',
                    standalone: true
                }]
        }], propDecorators: { effect: [{
                type: Input
            }], borderRadius: [{
                type: Input
            }], color: [{
                type: Input
            }], sheenColor: [{
                type: Input
            }] } });

/**
 * WaSliderDirective
 *
 * Angular wrapper for the <wa-slider> Web Component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds all supported slider attributes as @Input() properties
 * - Supports range sliders with dual thumbs
 * - Supports vertical orientation
 * - Supports markers at each step
 * - Supports reference labels
 * - Supports tooltips for current values
 * - Emits events for input, change, focusNative, blurNative, etc.
 * - Enables Angular-style class and style bindings
 * - Supports ngModel for form integration
 * - Allows access to native methods via ViewChild
 */
class WaSliderDirective {
    // Core input attributes
    min;
    max;
    step;
    disabled;
    readonly;
    required;
    label;
    hint;
    name;
    form;
    withLabel;
    withHint;
    // New attributes from the updated specification
    range;
    minValue;
    maxValue;
    orientation;
    size;
    indicatorOffset;
    withMarkers;
    withTooltip;
    tooltipDistance;
    tooltipPlacement;
    autofocus;
    // Style inputs
    trackSize;
    markerWidth;
    markerHeight;
    thumbWidth;
    thumbHeight;
    // Event outputs
    waBlur = new EventEmitter();
    waBlurHyphen = this.waBlur;
    waFocus = new EventEmitter();
    waFocusHyphen = this.waFocus;
    waChange = new EventEmitter();
    waChangeHyphen = this.waChange;
    waInput = new EventEmitter();
    waInputHyphen = this.waInput;
    waInvalid = new EventEmitter();
    waInvalidHyphen = this.waInvalid;
    valueChange = new EventEmitter();
    // Injected services
    el = inject(ElementRef);
    renderer = inject(Renderer2);
    // ControlValueAccessor implementation
    onChange = () => { };
    onTouched = () => { };
    valueFormatter;
    ngOnInit() {
        const nativeEl = this.el.nativeElement;
        this.applyInputs();
        // Set up event listeners
        const forwardInput = (event) => {
            this.waInput.emit(event);
            const target = event.target;
            let val;
            // Handle range slider with dual thumbs
            if (this.range === true || this.range === 'true' || this.range === '') {
                const minValue = parseFloat(target.minValue);
                const maxValue = parseFloat(target.maxValue);
                val = { min: minValue, max: maxValue };
            }
            else {
                // Regular slider
                val = target.value !== '' ? parseFloat(target.value) : null;
            }
            this.onChange(val);
            this.valueChange.emit(val);
        };
        this.renderer.listen(nativeEl, 'input', forwardInput);
        this.renderer.listen(nativeEl, 'wa-input', forwardInput);
        const forwardChange = (event) => {
            this.waChange.emit(event);
            const target = event.target;
            let val;
            if (this.range === true || this.range === 'true' || this.range === '') {
                val = { min: parseFloat(target.minValue), max: parseFloat(target.maxValue) };
            }
            else {
                val = target.value !== '' ? parseFloat(target.value) : null;
            }
            this.valueChange.emit(val);
        };
        this.renderer.listen(nativeEl, 'change', forwardChange);
        this.renderer.listen(nativeEl, 'wa-change', forwardChange);
        this.renderer.listen(nativeEl, 'focus', (event) => {
            this.waFocus.emit(event);
        });
        this.renderer.listen(nativeEl, 'wa-focus', (event) => {
            this.waFocus.emit(event);
        });
        this.renderer.listen(nativeEl, 'blur', (event) => {
            this.waBlur.emit(event);
            this.onTouched();
        });
        this.renderer.listen(nativeEl, 'wa-blur', (event) => {
            this.waBlur.emit(event);
            this.onTouched();
        });
        this.renderer.listen(nativeEl, 'wa-invalid', (event) => {
            this.waInvalid.emit(event);
        });
    }
    ngOnChanges(_) {
        this.applyInputs();
    }
    applyInputs() {
        // Set numeric attributes
        this.setNumericAttr('min', this.min);
        this.setNumericAttr('max', this.max);
        this.setNumericAttr('step', this.step);
        this.setNumericAttr('min-value', this.minValue);
        this.setNumericAttr('max-value', this.maxValue);
        this.setNumericAttr('indicator-offset', this.indicatorOffset);
        this.setNumericAttr('tooltip-distance', this.tooltipDistance);
        // Set string attributes
        this.setAttr('label', this.label);
        this.setAttr('hint', this.hint);
        this.setAttr('name', this.name);
        this.setAttr('form', this.form);
        this.setAttr('orientation', this.orientation);
        this.setAttr('size', this.size);
        this.setAttr('tooltip-placement', this.tooltipPlacement);
        // Set boolean attributes (only if true)
        this.setBooleanAttr('disabled', this.disabled);
        this.setBooleanAttr('readonly', this.readonly);
        this.setBooleanAttr('required', this.required);
        this.setBooleanAttr('with-label', this.withLabel);
        this.setBooleanAttr('with-hint', this.withHint);
        this.setBooleanAttr('range', this.range);
        this.setBooleanAttr('with-markers', this.withMarkers);
        this.setBooleanAttr('with-tooltip', this.withTooltip);
        this.setBooleanAttr('autofocus', this.autofocus);
        // Set style attributes
        this.setCssVar('--track-size', this.trackSize);
        this.setCssVar('--marker-width', this.markerWidth);
        this.setCssVar('--marker-height', this.markerHeight);
        this.setCssVar('--thumb-width', this.thumbWidth);
        this.setCssVar('--thumb-height', this.thumbHeight);
    }
    /**
     * Sets the value formatter function
     * @param formatter A function that takes a number and returns a formatted string
     */
    setValueFormatter(formatter) {
        this.valueFormatter = formatter;
        this.el.nativeElement.valueFormatter = formatter;
    }
    /**
     * Exposes the native element for direct interaction
     */
    get nativeElement() {
        return this.el.nativeElement;
    }
    /**
     * Focuses the slider
     */
    focus() {
        if (typeof this.el.nativeElement.focus === 'function') {
            this.el.nativeElement.focus();
        }
    }
    /**
     * Removes focusNative from the slider
     */
    blur() {
        if (typeof this.el.nativeElement.blur === 'function') {
            this.el.nativeElement.blur();
        }
    }
    /**
     * Decreases the slider's value by step
     */
    stepDown() {
        if (typeof this.el.nativeElement.stepDown === 'function') {
            this.el.nativeElement.stepDown();
        }
    }
    /**
     * Increases the slider's value by step
     */
    stepUp() {
        if (typeof this.el.nativeElement.stepUp === 'function') {
            this.el.nativeElement.stepUp();
        }
    }
    /**
     * Sets an attribute on the native element if the value is not null or undefined
     */
    setAttr(name, value) {
        if (value != null) {
            this.renderer.setAttribute(this.el.nativeElement, name, value);
        }
    }
    /**
     * Sets a numeric attribute on the native element if the value is not null or undefined
     */
    setNumericAttr(name, value) {
        if (value != null) {
            const numericValue = typeof value === 'string' ? parseFloat(value) : value;
            if (!isNaN(numericValue)) {
                this.renderer.setAttribute(this.el.nativeElement, name, numericValue.toString());
            }
        }
    }
    /**
     * Sets a CSS custom property on the native element if the value is not null or undefined
     */
    setCssVar(name, value) {
        if (value != null) {
            this.renderer.setStyle(this.el.nativeElement, name, value);
        }
    }
    /**
     * Sets a boolean attribute on the native element if the value is truthy
     * For boolean attributes, the presence of the attribute (with empty value) indicates true
     */
    setBooleanAttr(name, value) {
        if (value === true || value === 'true' || value === '') {
            this.renderer.setAttribute(this.el.nativeElement, name, '');
        }
    }
    // ControlValueAccessor implementation
    writeValue(value) {
        if (value !== undefined) {
            if (this.range === true || this.range === 'true' || this.range === '') {
                // Handle range slider with dual thumbs
                if (typeof value === 'object' && value !== null) {
                    if ('min' in value) {
                        this.setNumericAttr('min-value', value.min);
                    }
                    if ('max' in value) {
                        this.setNumericAttr('max-value', value.max);
                    }
                }
            }
            else {
                // Regular slider
                this.setAttr('value', value?.toString());
            }
        }
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(isDisabled) {
        this.setBooleanAttr('disabled', isDisabled);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaSliderDirective, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.14", type: WaSliderDirective, isStandalone: true, selector: "wa-slider", inputs: { min: "min", max: "max", step: "step", disabled: "disabled", readonly: "readonly", required: "required", label: "label", hint: "hint", name: "name", form: "form", withLabel: "withLabel", withHint: "withHint", range: "range", minValue: "minValue", maxValue: "maxValue", orientation: "orientation", size: "size", indicatorOffset: "indicatorOffset", withMarkers: "withMarkers", withTooltip: "withTooltip", tooltipDistance: "tooltipDistance", tooltipPlacement: "tooltipPlacement", autofocus: "autofocus", trackSize: "trackSize", markerWidth: "markerWidth", markerHeight: "markerHeight", thumbWidth: "thumbWidth", thumbHeight: "thumbHeight" }, outputs: { waBlur: "waBlur", waBlurHyphen: "wa-blur", waFocus: "waFocus", waFocusHyphen: "wa-focus", waChange: "waChange", waChangeHyphen: "wa-change", waInput: "waInput", waInputHyphen: "wa-input", waInvalid: "waInvalid", waInvalidHyphen: "wa-invalid", valueChange: "valueChange" }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => WaSliderDirective),
                multi: true
            }
        ], usesOnChanges: true, ngImport: i0, template: '<ng-content></ng-content>', isInline: true });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaSliderDirective, decorators: [{
            type: Component,
            args: [{
                    selector: 'wa-slider',
                    standalone: true,
                    template: '<ng-content></ng-content>',
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => WaSliderDirective),
                            multi: true
                        }
                    ]
                }]
        }], propDecorators: { min: [{
                type: Input
            }], max: [{
                type: Input
            }], step: [{
                type: Input
            }], disabled: [{
                type: Input
            }], readonly: [{
                type: Input
            }], required: [{
                type: Input
            }], label: [{
                type: Input
            }], hint: [{
                type: Input
            }], name: [{
                type: Input
            }], form: [{
                type: Input
            }], withLabel: [{
                type: Input
            }], withHint: [{
                type: Input
            }], range: [{
                type: Input
            }], minValue: [{
                type: Input
            }], maxValue: [{
                type: Input
            }], orientation: [{
                type: Input
            }], size: [{
                type: Input
            }], indicatorOffset: [{
                type: Input
            }], withMarkers: [{
                type: Input
            }], withTooltip: [{
                type: Input
            }], tooltipDistance: [{
                type: Input
            }], tooltipPlacement: [{
                type: Input
            }], autofocus: [{
                type: Input
            }], trackSize: [{
                type: Input
            }], markerWidth: [{
                type: Input
            }], markerHeight: [{
                type: Input
            }], thumbWidth: [{
                type: Input
            }], thumbHeight: [{
                type: Input
            }], waBlur: [{
                type: Output
            }], waBlurHyphen: [{
                type: Output,
                args: ['wa-blur']
            }], waFocus: [{
                type: Output
            }], waFocusHyphen: [{
                type: Output,
                args: ['wa-focus']
            }], waChange: [{
                type: Output
            }], waChangeHyphen: [{
                type: Output,
                args: ['wa-change']
            }], waInput: [{
                type: Output
            }], waInputHyphen: [{
                type: Output,
                args: ['wa-input']
            }], waInvalid: [{
                type: Output
            }], waInvalidHyphen: [{
                type: Output,
                args: ['wa-invalid']
            }], valueChange: [{
                type: Output
            }] } });

/**
 * WaSpinnerDirective
 *
 * Angular wrapper for the <wa-spinner> Web Component that allows declarative usage
 * and input binding for styling.
 *
 * Features:
 * - Binds all supported spinner attributes as @Input() properties
 * - Enables Angular-style class and style bindings
 * - Supports custom styling via CSS variables
 */
class WaSpinnerDirective {
    // Style inputs
    fontSize;
    trackWidth;
    trackColor;
    indicatorColor;
    speed;
    // Injected services
    el = inject(ElementRef);
    renderer = inject(Renderer2);
    ngOnInit() {
        // Set style attributes directly on the host element
        this.setStyle('font-size', this.fontSize);
        // Set CSS custom properties
        this.setCssVar('--track-width', this.trackWidth);
        this.setCssVar('--track-color', this.trackColor);
        this.setCssVar('--indicator-color', this.indicatorColor);
        this.setCssVar('--speed', this.speed);
    }
    /**
     * Exposes the native element for direct interaction
     */
    get nativeElement() {
        return this.el.nativeElement;
    }
    /**
     * Sets a style property on the native element if the value is not null or undefined
     */
    setStyle(name, value) {
        if (value != null) {
            this.renderer.setStyle(this.el.nativeElement, name, value);
        }
    }
    /**
     * Sets a CSS custom property on the native element if the value is not null or undefined
     */
    setCssVar(name, value) {
        if (value != null) {
            this.renderer.setStyle(this.el.nativeElement, name, value);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaSpinnerDirective, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.14", type: WaSpinnerDirective, isStandalone: true, selector: "wa-spinner", inputs: { fontSize: "fontSize", trackWidth: "trackWidth", trackColor: "trackColor", indicatorColor: "indicatorColor", speed: "speed" }, ngImport: i0, template: '<ng-content></ng-content>', isInline: true });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaSpinnerDirective, decorators: [{
            type: Component,
            args: [{
                    selector: 'wa-spinner',
                    standalone: true,
                    template: '<ng-content></ng-content>'
                }]
        }], propDecorators: { fontSize: [{
                type: Input
            }], trackWidth: [{
                type: Input
            }], trackColor: [{
                type: Input
            }], indicatorColor: [{
                type: Input
            }], speed: [{
                type: Input
            }] } });

/**
 * WaSplitPanelDirective
 *
 * Angular wrapper for the <wa-split-panel> Web Component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds all supported split panel attributes as @Input() properties
 * - Emits events for repositioning
 * - Enables Angular-style class and style bindings
 * - Supports slot projection for start, end, and divider content
 */
class WaSplitPanelDirective {
    // Core input attributes
    position;
    positionInPixels;
    orientation;
    vertical; // @deprecated Use orientation="vertical" instead
    disabled;
    primary;
    snap;
    snapThreshold;
    // Style inputs
    dividerColor;
    dividerWidth;
    dividerHitArea;
    min;
    max;
    // Event outputs
    repositionEvent = new EventEmitter();
    // Injected services
    el = inject(ElementRef);
    renderer = inject(Renderer2);
    ngOnInit() {
        const nativeEl = this.el.nativeElement;
        this.applyInputs();
        // Set up event listeners
        this.renderer.listen(nativeEl, 'wa-reposition', (event) => {
            this.repositionEvent.emit(event);
        });
    }
    ngOnChanges(_) {
        this.applyInputs();
    }
    applyInputs() {
        // Numeric attributes
        this.setNumericAttr('position', this.position);
        this.setNumericAttr('position-in-pixels', this.positionInPixels);
        this.setNumericAttr('snap-threshold', this.snapThreshold);
        // String attributes
        this.setAttr('primary', this.primary);
        this.setAttr('snap', this.snap);
        // Orientation/booleans
        const host = this.el.nativeElement;
        // Clear previous orientation attribute if needed
        host.removeAttribute('orientation');
        if (this.orientation === 'vertical') {
            this.renderer.setAttribute(host, 'orientation', 'vertical');
        }
        // Clear boolean attrs before re-applying
        ['vertical', 'disabled'].forEach(a => host.removeAttribute(a));
        this.setBooleanAttr('vertical', this.vertical);
        this.setBooleanAttr('disabled', this.disabled);
        // CSS custom properties
        this.setCssVar('--divider-color', this.dividerColor);
        this.setCssVar('--divider-width', this.dividerWidth);
        this.setCssVar('--divider-hit-area', this.dividerHitArea);
        this.setCssVar('--min', this.min);
        this.setCssVar('--max', this.max);
    }
    /**
     * Exposes the native element for direct interaction
     */
    get nativeElement() {
        return this.el.nativeElement;
    }
    /**
     * Sets an attribute on the native element if the value is not null or undefined
     */
    setAttr(name, value) {
        if (value != null) {
            this.renderer.setAttribute(this.el.nativeElement, name, value);
        }
    }
    /**
     * Sets a numeric attribute on the native element if the value is not null or undefined
     */
    setNumericAttr(name, value) {
        if (value != null) {
            const numericValue = typeof value === 'string' ? parseFloat(value) : value;
            if (!isNaN(numericValue)) {
                this.renderer.setAttribute(this.el.nativeElement, name, numericValue.toString());
            }
        }
    }
    /**
     * Sets a CSS custom property on the native element if the value is not null or undefined
     */
    setCssVar(name, value) {
        if (value != null) {
            this.renderer.setStyle(this.el.nativeElement, name, value);
        }
    }
    /**
     * Sets a boolean attribute on the native element if the value is truthy
     * For boolean attributes, the presence of the attribute (with empty value) indicates true
     */
    setBooleanAttr(name, value) {
        if (value === true || value === 'true' || value === '') {
            this.renderer.setAttribute(this.el.nativeElement, name, '');
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaSplitPanelDirective, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.14", type: WaSplitPanelDirective, isStandalone: true, selector: "wa-split-panel", inputs: { position: "position", positionInPixels: "positionInPixels", orientation: "orientation", vertical: "vertical", disabled: "disabled", primary: "primary", snap: "snap", snapThreshold: "snapThreshold", dividerColor: "dividerColor", dividerWidth: "dividerWidth", dividerHitArea: "dividerHitArea", min: "min", max: "max" }, outputs: { repositionEvent: "wa-reposition" }, usesOnChanges: true, ngImport: i0, template: `
    <ng-content select="[slot=start]"></ng-content>
    <ng-content select="[slot=end]"></ng-content>
    <ng-content select="[slot=divider]"></ng-content>
  `, isInline: true });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaSplitPanelDirective, decorators: [{
            type: Component,
            args: [{
                    selector: 'wa-split-panel',
                    standalone: true,
                    template: `
    <ng-content select="[slot=start]"></ng-content>
    <ng-content select="[slot=end]"></ng-content>
    <ng-content select="[slot=divider]"></ng-content>
  `
                }]
        }], propDecorators: { position: [{
                type: Input
            }], positionInPixels: [{
                type: Input
            }], orientation: [{
                type: Input
            }], vertical: [{
                type: Input
            }], disabled: [{
                type: Input
            }], primary: [{
                type: Input
            }], snap: [{
                type: Input
            }], snapThreshold: [{
                type: Input
            }], dividerColor: [{
                type: Input
            }], dividerWidth: [{
                type: Input
            }], dividerHitArea: [{
                type: Input
            }], min: [{
                type: Input
            }], max: [{
                type: Input
            }], repositionEvent: [{
                type: Output,
                args: ['wa-reposition']
            }] } });

/**
 * WaSwitchDirective
 *
 * Angular wrapper for the <wa-switch> Web Component that allows declarative usage,
 * input binding, and integration with Angular forms.
 *
 * Features:
 * - Binds all supported switch attributes as @Input() properties
 * - Emits events for input, change, focusNative, blurNative
 * - Enables Angular-style class and style bindings
 * - Supports ngModel for form integration
 */
class WaSwitchDirective {
    // Dialog integration: support both kebab-case and camelCase bindings
    _dataDialog;
    set dataDialogAttr(val) { this._dataDialog = val ?? null; }
    set dialogAttr(val) { this._dataDialog = val ?? null; }
    set dataDialog(val) { this._dataDialog = val ?? null; }
    // Core input attributes
    disabled;
    required;
    hint;
    size;
    // Style inputs
    backgroundColor;
    backgroundColorChecked;
    borderColor;
    borderColorChecked;
    borderStyle;
    borderWidth;
    boxShadow;
    height;
    thumbColor;
    thumbColorChecked;
    thumbShadow;
    thumbSize;
    width;
    // Event outputs
    changeEvent = new EventEmitter();
    inputEvent = new EventEmitter();
    focusEvent = new EventEmitter();
    blurEvent = new EventEmitter();
    checkedChange = new EventEmitter();
    // Injected services
    el = inject(ElementRef);
    renderer = inject(Renderer2);
    // ControlValueAccessor implementation
    onChange = () => { };
    onTouched = () => { };
    validatorChange;
    ngOnInit() {
        const nativeEl = this.el.nativeElement;
        // Set string attributes
        this.setAttr('hint', this.hint);
        this.setAttr('size', this.size);
        // Set boolean attributes (only if true)
        this.setBooleanAttr('disabled', this.disabled);
        this.setBooleanAttr('required', this.required);
        // Set style attributes
        this.setCssVar('--background-color', this.backgroundColor);
        this.setCssVar('--background-color-checked', this.backgroundColorChecked);
        this.setCssVar('--border-color', this.borderColor);
        this.setCssVar('--border-color-checked', this.borderColorChecked);
        this.setCssVar('--border-style', this.borderStyle);
        this.setCssVar('--border-width', this.borderWidth);
        this.setCssVar('--box-shadow', this.boxShadow);
        this.setCssVar('--height', this.height);
        this.setCssVar('--thumb-color', this.thumbColor);
        this.setCssVar('--thumb-color-checked', this.thumbColorChecked);
        this.setCssVar('--thumb-shadow', this.thumbShadow);
        this.setCssVar('--thumb-size', this.thumbSize);
        this.setCssVar('--width', this.width);
        // Dialog attribute
        this.setAttr('data-dialog', this._dataDialog);
        // Set up event listeners
        const forwardInput = (event) => {
            this.inputEvent.emit(event);
            const target = event.target;
            this.onChange(target.checked);
            this.checkedChange.emit(target.checked);
            this.validatorChange?.();
        };
        this.renderer.listen(nativeEl, 'input', forwardInput);
        this.renderer.listen(nativeEl, 'wa-input', forwardInput);
        const forwardChange = (event) => {
            this.changeEvent.emit(event);
            const target = event.target;
            this.onChange(!!target.checked);
            this.checkedChange.emit(!!target.checked);
            this.validatorChange?.();
        };
        this.renderer.listen(nativeEl, 'change', forwardChange);
        this.renderer.listen(nativeEl, 'wa-change', forwardChange);
        this.renderer.listen(nativeEl, 'focus', (event) => {
            this.focusEvent.emit(event);
        });
        this.renderer.listen(nativeEl, 'wa-focus', (event) => {
            this.focusEvent.emit(event);
        });
        this.renderer.listen(nativeEl, 'blur', (event) => {
            this.blurEvent.emit(event);
            this.onTouched();
        });
        this.renderer.listen(nativeEl, 'wa-blur', (event) => {
            this.blurEvent.emit(event);
            this.onTouched();
        });
    }
    /**
     * Exposes the native element for direct interaction
     */
    get nativeElement() {
        return this.el.nativeElement;
    }
    /**
     * Sets an attribute on the native element if the value is not null or undefined
     */
    setAttr(name, value) {
        if (value != null) {
            this.renderer.setAttribute(this.el.nativeElement, name, value);
        }
    }
    /**
     * Sets a CSS custom property on the native element if the value is not null or undefined
     */
    setCssVar(name, value) {
        if (value != null) {
            this.renderer.setStyle(this.el.nativeElement, name, value);
        }
    }
    /**
     * Sets a boolean attribute on the native element if the value is truthy
     * For boolean attributes, the presence of the attribute (with empty value) indicates true
     */
    setBooleanAttr(name, value) {
        if (value === true || value === 'true' || value === '') {
            this.renderer.setAttribute(this.el.nativeElement, name, '');
        }
    }
    // ControlValueAccessor implementation
    writeValue(value) {
        if (value !== undefined) {
            this.renderer.setProperty(this.el.nativeElement, 'checked', !!value);
        }
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(isDisabled) {
        this.setBooleanAttr('disabled', isDisabled);
    }
    // Validator implementation: expose required error to Angular forms
    validate(control) {
        const host = this.el?.nativeElement;
        if (!host)
            return null;
        if (host.disabled || host.hasAttribute?.('disabled'))
            return null;
        // We mirror the Checkbox semantics: if marked required, value must be truthy
        const isRequired = this.required === true || this.required === '' || this.required === 'true' || (host.hasAttribute && host.hasAttribute('required'));
        if (!isRequired)
            return null;
        const val = control?.value;
        return !!val ? null : { required: true };
    }
    registerOnValidatorChange(fn) {
        this.validatorChange = fn;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaSwitchDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.14", type: WaSwitchDirective, isStandalone: true, selector: "wa-switch[waSwitch]", inputs: { dataDialogAttr: ["data-dialog", "dataDialogAttr"], dialogAttr: ["dialog", "dialogAttr"], dataDialog: "dataDialog", disabled: "disabled", required: "required", hint: "hint", size: "size", backgroundColor: "backgroundColor", backgroundColorChecked: "backgroundColorChecked", borderColor: "borderColor", borderColorChecked: "borderColorChecked", borderStyle: "borderStyle", borderWidth: "borderWidth", boxShadow: "boxShadow", height: "height", thumbColor: "thumbColor", thumbColorChecked: "thumbColorChecked", thumbShadow: "thumbShadow", thumbSize: "thumbSize", width: "width" }, outputs: { changeEvent: "wa-change", inputEvent: "wa-input", focusEvent: "wa-focus", blurEvent: "wa-blur", checkedChange: "checkedChange" }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => WaSwitchDirective),
                multi: true
            },
            {
                provide: NG_VALIDATORS,
                useExisting: forwardRef(() => WaSwitchDirective),
                multi: true
            }
        ], ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaSwitchDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'wa-switch[waSwitch]',
                    standalone: true,
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => WaSwitchDirective),
                            multi: true
                        },
                        {
                            provide: NG_VALIDATORS,
                            useExisting: forwardRef(() => WaSwitchDirective),
                            multi: true
                        }
                    ]
                }]
        }], propDecorators: { dataDialogAttr: [{
                type: Input,
                args: ['data-dialog']
            }], dialogAttr: [{
                type: Input,
                args: ['dialog']
            }], dataDialog: [{
                type: Input
            }], disabled: [{
                type: Input
            }], required: [{
                type: Input
            }], hint: [{
                type: Input
            }], size: [{
                type: Input
            }], backgroundColor: [{
                type: Input
            }], backgroundColorChecked: [{
                type: Input
            }], borderColor: [{
                type: Input
            }], borderColorChecked: [{
                type: Input
            }], borderStyle: [{
                type: Input
            }], borderWidth: [{
                type: Input
            }], boxShadow: [{
                type: Input
            }], height: [{
                type: Input
            }], thumbColor: [{
                type: Input
            }], thumbColorChecked: [{
                type: Input
            }], thumbShadow: [{
                type: Input
            }], thumbSize: [{
                type: Input
            }], width: [{
                type: Input
            }], changeEvent: [{
                type: Output,
                args: ['wa-change']
            }], inputEvent: [{
                type: Output,
                args: ['wa-input']
            }], focusEvent: [{
                type: Output,
                args: ['wa-focus']
            }], blurEvent: [{
                type: Output,
                args: ['wa-blur']
            }], checkedChange: [{
                type: Output
            }] } });

class WaTooltipDirective {
    host;
    renderer;
    for;
    placement = 'top';
    disabled;
    distance = 8;
    skidding = 0;
    open;
    showDelay = 150;
    hideDelay = 0;
    trigger = 'hover focusNative';
    withoutArrow;
    // Styling Inputs (mapped to CSS custom properties)
    set backgroundColor(value) {
        this.setStyle('--background-color', value);
    }
    set borderRadius(value) {
        this.setStyle('--border-radius', value);
    }
    set maxWidth(value) {
        this.setStyle('--max-width', value);
    }
    set padding(value) {
        this.setStyle('--padding', value);
    }
    set arrowSize(value) {
        this.setStyle('--wa-tooltip-arrow-size', value);
    }
    waShow = new EventEmitter();
    waShowHyphen = this.waShow;
    waAfterShow = new EventEmitter();
    waAfterShowHyphen = this.waAfterShow;
    waHide = new EventEmitter();
    waHideHyphen = this.waHide;
    waAfterHide = new EventEmitter();
    waAfterHideHyphen = this.waAfterHide;
    listeners = [];
    constructor(host, renderer) {
        this.host = host;
        this.renderer = renderer;
        this.el = this.host.nativeElement;
    }
    el;
    ngAfterViewInit() {
        this.setProperties();
        this.attachEvents();
    }
    ngOnChanges() {
        this.setProperties();
    }
    ngOnDestroy() {
        this.listeners.forEach(unlisten => unlisten());
    }
    setProperties() {
        this.setAttr('for', this.for);
        this.setAttr('placement', this.placement);
        this.setBooleanAttr('disabled', this.disabled);
        this.setNumericAttr('distance', this.distance);
        this.setNumericAttr('skidding', this.skidding);
        this.setBooleanAttr('open', this.open);
        this.setNumericAttr('show-delay', this.showDelay);
        this.setNumericAttr('hide-delay', this.hideDelay);
        this.setAttr('trigger', this.trigger);
        this.setBooleanAttr('without-arrow', this.withoutArrow);
    }
    setAttr(name, value) {
        if (value !== undefined && value !== null) {
            this.renderer.setAttribute(this.el, name, String(value));
        }
    }
    setBooleanAttr(name, value) {
        if (value === true || value === 'true' || value === '') {
            this.renderer.setAttribute(this.el, name, '');
        }
        else {
            this.renderer.removeAttribute(this.el, name);
        }
    }
    setNumericAttr(name, value) {
        if (value !== undefined && value !== null) {
            const n = typeof value === 'string' ? parseFloat(value) : value;
            if (!isNaN(n)) {
                this.renderer.setAttribute(this.el, name, String(n));
            }
        }
    }
    setStyle(prop, value) {
        if (value) {
            this.renderer.setStyle(this.el, prop, value);
        }
    }
    attachEvents() {
        this.listeners.push(this.renderer.listen(this.el, 'wa-show', (e) => this.waShow.emit(e)), this.renderer.listen(this.el, 'wa-after-show', (e) => this.waAfterShow.emit(e)), this.renderer.listen(this.el, 'wa-hide', (e) => this.waHide.emit(e)), this.renderer.listen(this.el, 'wa-after-hide', (e) => this.waAfterHide.emit(e)));
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaTooltipDirective, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.14", type: WaTooltipDirective, isStandalone: true, selector: "wa-tooltip", inputs: { for: "for", placement: "placement", disabled: "disabled", distance: "distance", skidding: "skidding", open: "open", showDelay: "showDelay", hideDelay: "hideDelay", trigger: "trigger", withoutArrow: "withoutArrow", backgroundColor: "backgroundColor", borderRadius: "borderRadius", maxWidth: "maxWidth", padding: "padding", arrowSize: "arrowSize" }, outputs: { waShow: "waShow", waShowHyphen: "wa-show", waAfterShow: "waAfterShow", waAfterShowHyphen: "wa-after-show", waHide: "waHide", waHideHyphen: "wa-hide", waAfterHide: "waAfterHide", waAfterHideHyphen: "wa-after-hide" }, usesOnChanges: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaTooltipDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'wa-tooltip',
                    standalone: true,
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i0.Renderer2 }], propDecorators: { for: [{
                type: Input
            }], placement: [{
                type: Input
            }], disabled: [{
                type: Input
            }], distance: [{
                type: Input
            }], skidding: [{
                type: Input
            }], open: [{
                type: Input
            }], showDelay: [{
                type: Input
            }], hideDelay: [{
                type: Input
            }], trigger: [{
                type: Input
            }], withoutArrow: [{
                type: Input
            }], backgroundColor: [{
                type: Input
            }], borderRadius: [{
                type: Input
            }], maxWidth: [{
                type: Input
            }], padding: [{
                type: Input
            }], arrowSize: [{
                type: Input
            }], waShow: [{
                type: Output
            }], waShowHyphen: [{
                type: Output,
                args: ['wa-show']
            }], waAfterShow: [{
                type: Output
            }], waAfterShowHyphen: [{
                type: Output,
                args: ['wa-after-show']
            }], waHide: [{
                type: Output
            }], waHideHyphen: [{
                type: Output,
                args: ['wa-hide']
            }], waAfterHide: [{
                type: Output
            }], waAfterHideHyphen: [{
                type: Output,
                args: ['wa-after-hide']
            }] } });

class WaTextareaComponent {
    host;
    get normalizedAppearance() {
        return normalizeAppearance(this.appearance);
    }
    label;
    hint;
    placeholder;
    rows;
    resize;
    size;
    appearance;
    name;
    required;
    minlength;
    maxlength;
    autocapitalize;
    autocorrect;
    autocomplete;
    autofocus;
    enterkeyhint;
    spellcheck;
    inputmode;
    readonly;
    disabled;
    withLabel;
    withHint;
    // CSS custom properties
    backgroundColor;
    borderColor;
    borderWidth;
    boxShadow;
    waFocus = new EventEmitter();
    waFocusHyphen = this.waFocus;
    waBlur = new EventEmitter();
    waBlurHyphen = this.waBlur;
    waInput = new EventEmitter();
    waInputHyphen = this.waInput;
    waChange = new EventEmitter();
    waChangeHyphen = this.waChange;
    waInvalid = new EventEmitter();
    waInvalidHyphen = this.waInvalid;
    valueChange = new EventEmitter();
    _value = '';
    onChange = (_) => { };
    onTouched = () => { };
    constructor(host) {
        this.host = host;
    }
    writeValue(val) {
        this._value = val ?? '';
        this.host.nativeElement.setAttribute('value', this._value);
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
        this.host.nativeElement.toggleAttribute('disabled', isDisabled);
    }
    handleInput(event) {
        const target = event.target;
        this._value = target.value;
        this.onChange(this._value);
        this.valueChange.emit(this._value);
        this.waInput.emit(event);
    }
    handleChange(event) {
        const target = event.target;
        this._value = target.value;
        this.onChange(this._value);
        this.valueChange.emit(this._value);
        this.waChange.emit(event);
    }
    onFocus(event) {
        this.waFocus.emit(event);
    }
    onBlur(event) {
        this.onTouched();
        this.waBlur.emit(event);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaTextareaComponent, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.14", type: WaTextareaComponent, isStandalone: true, selector: "wa-textarea", inputs: { label: "label", hint: "hint", placeholder: "placeholder", rows: "rows", resize: "resize", size: "size", appearance: "appearance", name: "name", required: "required", minlength: "minlength", maxlength: "maxlength", autocapitalize: "autocapitalize", autocorrect: "autocorrect", autocomplete: "autocomplete", autofocus: "autofocus", enterkeyhint: "enterkeyhint", spellcheck: "spellcheck", inputmode: "inputmode", readonly: "readonly", disabled: "disabled", withLabel: "withLabel", withHint: "withHint", backgroundColor: "backgroundColor", borderColor: "borderColor", borderWidth: "borderWidth", boxShadow: "boxShadow" }, outputs: { waFocus: "waFocus", waFocusHyphen: "wa-focus", waBlur: "waBlur", waBlurHyphen: "wa-blur", waInput: "waInput", waInputHyphen: "wa-input", waChange: "waChange", waChangeHyphen: "wa-change", waInvalid: "waInvalid", waInvalidHyphen: "wa-invalid", valueChange: "valueChange" }, host: { listeners: { "focus": "onFocus($event)", "wa-focus": "onFocus($event)", "blur": "onBlur($event)", "wa-blur": "onBlur($event)", "input": "handleInput($event)", "wa-input": "handleInput($event)", "change": "handleChange($event)", "wa-change": "handleChange($event)", "wa-invalid": "waInvalid.emit($event)" }, properties: { "attr.label": "label", "attr.hint": "hint", "attr.placeholder": "placeholder", "attr.rows": "rows", "attr.resize": "resize", "attr.size": "size", "attr.appearance": "normalizedAppearance", "attr.name": "name", "attr.required": "required || null", "attr.minlength": "minlength", "attr.maxlength": "maxlength", "attr.autocapitalize": "autocapitalize", "attr.autocorrect": "autocorrect", "attr.autocomplete": "autocomplete", "attr.autofocus": "autofocus || null", "attr.enterkeyhint": "enterkeyhint", "attr.spellcheck": "spellcheck", "attr.inputmode": "inputmode", "attr.with-label": "withLabel ? true : null", "attr.with-hint": "withHint ? true : null", "attr.readonly": "readonly || null", "attr.disabled": "disabled || null", "style.--background-color": "backgroundColor", "style.--border-color": "borderColor", "style.--border-width": "borderWidth", "style.--box-shadow": "boxShadow" } }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => WaTextareaComponent),
                multi: true
            }
        ], ngImport: i0, template: '', isInline: true, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaTextareaComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'wa-textarea',
                    standalone: true,
                    encapsulation: ViewEncapsulation.None,
                    template: '',
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => WaTextareaComponent),
                            multi: true
                        }
                    ],
                    host: {
                        '[attr.label]': 'label',
                        '[attr.hint]': 'hint',
                        '[attr.placeholder]': 'placeholder',
                        '[attr.rows]': 'rows',
                        '[attr.resize]': 'resize',
                        '[attr.size]': 'size',
                        '[attr.appearance]': 'normalizedAppearance',
                        '[attr.name]': 'name',
                        '[attr.required]': 'required || null',
                        '[attr.minlength]': 'minlength',
                        '[attr.maxlength]': 'maxlength',
                        '[attr.autocapitalize]': 'autocapitalize',
                        '[attr.autocorrect]': 'autocorrect',
                        '[attr.autocomplete]': 'autocomplete',
                        '[attr.autofocus]': 'autofocus || null',
                        '[attr.enterkeyhint]': 'enterkeyhint',
                        '[attr.spellcheck]': 'spellcheck',
                        '[attr.inputmode]': 'inputmode',
                        '[attr.with-label]': 'withLabel ? true : null',
                        '[attr.with-hint]': 'withHint ? true : null',
                        '[attr.readonly]': 'readonly || null',
                        '[attr.disabled]': 'disabled || null',
                        '[style.--background-color]': 'backgroundColor',
                        '[style.--border-color]': 'borderColor',
                        '[style.--border-width]': 'borderWidth',
                        '[style.--box-shadow]': 'boxShadow',
                        '(focus)': 'onFocus($event)',
                        '(wa-focus)': 'onFocus($event)',
                        '(blur)': 'onBlur($event)',
                        '(wa-blur)': 'onBlur($event)',
                        '(input)': 'handleInput($event)',
                        '(wa-input)': 'handleInput($event)',
                        '(change)': 'handleChange($event)',
                        '(wa-change)': 'handleChange($event)',
                        '(wa-invalid)': 'waInvalid.emit($event)'
                    }
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }], propDecorators: { label: [{
                type: Input
            }], hint: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], rows: [{
                type: Input
            }], resize: [{
                type: Input
            }], size: [{
                type: Input
            }], appearance: [{
                type: Input
            }], name: [{
                type: Input
            }], required: [{
                type: Input
            }], minlength: [{
                type: Input
            }], maxlength: [{
                type: Input
            }], autocapitalize: [{
                type: Input
            }], autocorrect: [{
                type: Input
            }], autocomplete: [{
                type: Input
            }], autofocus: [{
                type: Input
            }], enterkeyhint: [{
                type: Input
            }], spellcheck: [{
                type: Input
            }], inputmode: [{
                type: Input
            }], readonly: [{
                type: Input
            }], disabled: [{
                type: Input
            }], withLabel: [{
                type: Input
            }], withHint: [{
                type: Input
            }], backgroundColor: [{
                type: Input
            }], borderColor: [{
                type: Input
            }], borderWidth: [{
                type: Input
            }], boxShadow: [{
                type: Input
            }], waFocus: [{
                type: Output
            }], waFocusHyphen: [{
                type: Output,
                args: ['wa-focus']
            }], waBlur: [{
                type: Output
            }], waBlurHyphen: [{
                type: Output,
                args: ['wa-blur']
            }], waInput: [{
                type: Output
            }], waInputHyphen: [{
                type: Output,
                args: ['wa-input']
            }], waChange: [{
                type: Output
            }], waChangeHyphen: [{
                type: Output,
                args: ['wa-change']
            }], waInvalid: [{
                type: Output
            }], waInvalidHyphen: [{
                type: Output,
                args: ['wa-invalid']
            }], valueChange: [{
                type: Output
            }] } });

class WaTagDirective {
    el;
    constructor(el) {
        this.el = el;
    }
    // Inputs
    variant = 'inherit';
    appearance = 'filled-outlined';
    size = 'inherit';
    pill = false;
    withRemove = false;
    // Outputs
    waRemove = new EventEmitter();
    waRemoveHyphen = this.waRemove;
    onRemove(event) {
        this.waRemove.emit(event);
    }
    ngOnChanges() {
        const tag = this.el.nativeElement;
        tag.setAttribute('variant', this.variant);
        tag.setAttribute('appearance', normalizeAppearance(this.appearance));
        tag.setAttribute('size', this.size);
        this.setBooleanAttribute(tag, 'pill', this.pill);
        this.setBooleanAttribute(tag, 'with-remove', this.withRemove);
    }
    setBooleanAttribute(tag, name, value) {
        if (value === true || value === 'true' || value === '') {
            tag.setAttribute(name, '');
        }
        else {
            tag.removeAttribute(name);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaTagDirective, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.14", type: WaTagDirective, isStandalone: true, selector: "wa-tag", inputs: { variant: "variant", appearance: "appearance", size: "size", pill: "pill", withRemove: "withRemove" }, outputs: { waRemove: "waRemove", waRemoveHyphen: "wa-remove" }, host: { listeners: { "wa-remove": "onRemove($event)" } }, exportAs: ["waTag"], usesOnChanges: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaTagDirective, decorators: [{
            type: Directive,
            args: [{
                    // Allow using <wa-tag> directly without requiring ngModel
                    selector: 'wa-tag',
                    exportAs: 'waTag',
                    standalone: true
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }], propDecorators: { variant: [{
                type: Input
            }], appearance: [{
                type: Input
            }], size: [{
                type: Input
            }], pill: [{
                type: Input
            }], withRemove: [{
                type: Input
            }], waRemove: [{
                type: Output
            }], waRemoveHyphen: [{
                type: Output,
                args: ['wa-remove']
            }], onRemove: [{
                type: HostListener,
                args: ['wa-remove', ['$event']]
            }] } });

class WaTreeDirective {
    // Inputs
    selection = null;
    /** Name of the tree, used for querySelector targeting */
    name;
    // Outputs
    waSelectionChange = new EventEmitter();
    waSelectionChangeHyphen = this.waSelectionChange;
    // Styling inputs
    indentSize;
    indentGuideColor;
    indentGuideOffset;
    indentGuideStyle;
    indentGuideWidth;
    // Injected services
    el = inject(ElementRef);
    renderer = inject(Renderer2);
    // CVA internals
    onChange = () => { };
    onTouched = () => { };
    isDisabled = false;
    modelValue = [];
    ngOnChanges() {
        const tree = this.el.nativeElement;
        // Set tree name attribute for external querySelector targeting
        if (this.name != null && this.name !== '') {
            this.renderer.setAttribute(tree, 'name', String(this.name));
        }
        else {
            this.renderer.removeAttribute(tree, 'name');
        }
        // Set selection mode attribute
        if (this.selection) {
            this.renderer.setAttribute(tree, 'selection', this.selection);
        }
        else {
            this.renderer.removeAttribute(tree, 'selection');
        }
        // Apply custom CSS properties for styling
        this.setCssVar('--indent-size', this.indentSize);
        this.setCssVar('--indent-guide-color', this.indentGuideColor);
        this.setCssVar('--indent-guide-offset', this.indentGuideOffset);
        this.setCssVar('--indent-guide-style', this.indentGuideStyle);
        this.setCssVar('--indent-guide-width', this.indentGuideWidth);
    }
    // Re-emit native selection change for Angular consumers and update ngModel
    onSelectionChanged(event) {
        this.waSelectionChange.emit(event);
        const isLeaf = (item) => {
            // A leaf has no wa-tree-item children
            return !item.querySelector('wa-tree-item');
        };
        const hasDataOrValue = (item) => {
            return item.__waValue !== undefined || item.__waData !== undefined || item.getAttribute?.('value') != null;
        };
        const pickIdentity = (item) => {
            const pref = (item.__waValue !== undefined ? item.__waValue
                : item.__waData !== undefined ? item.__waData
                    : item.getAttribute?.('value') ?? undefined);
            if (pref !== undefined && pref !== null)
                return pref;
            // fallback to label, but only if we didn't require data/value; requirement says "data tags"
            return (item.textContent || '').trim();
        };
        const computeValues = () => {
            const selectedItems = this.el.nativeElement.querySelectorAll('wa-tree-item[selected]');
            const out = [];
            const seen = new Set();
            selectedItems.forEach((item) => {
                if (!isLeaf(item))
                    return; // include only leaves
                // Only include items that have bound data — result must be data objects
                const data = item.__waData;
                const id = item.__waValue ?? item.getAttribute?.('value');
                if (data === undefined)
                    return;
                const key = id !== undefined && id !== null ? id : data; // prefer value id for dedupe
                if (!seen.has(key)) {
                    seen.add(key);
                    out.push(data);
                }
            });
            return out;
        };
        const mapDetail = (detailArr) => {
            const out = [];
            const seen = new Set();
            detailArr.forEach((item) => {
                if (!item)
                    return;
                if (!isLeaf(item))
                    return;
                const data = item.__waData;
                const id = item.__waValue ?? item.getAttribute?.('value');
                if (data === undefined)
                    return;
                const key = id !== undefined && id !== null ? id : data;
                if (!seen.has(key)) {
                    seen.add(key);
                    out.push(data);
                }
            });
            return out;
        };
        // Prefer event.detail if provided by the web component
        let values = null;
        const detail = event?.detail;
        // Delta handling: if detail is a single item and selected flag, update model incrementally
        const tryDelta = () => {
            if (!detail)
                return false;
            // Common shapes: { item, selected } or { target, selected } or direct element
            const changedEl = detail.item ?? detail.target ?? (detail instanceof Element ? detail : null);
            const selectedFlag = typeof detail.selected === 'boolean' ? detail.selected : undefined;
            if (!changedEl || typeof selectedFlag !== 'boolean')
                return false;
            if (!isLeaf(changedEl))
                return false;
            const data = changedEl.__waData;
            const id = changedEl.__waValue ?? changedEl.getAttribute?.('value');
            if (data === undefined)
                return false;
            // Start from current or empty
            const current = Array.isArray(this.modelValue) ? [...this.modelValue] : (this.modelValue ? [this.modelValue] : []);
            const keyOf = (x) => (x && typeof x === 'object' && ('value' in x || 'id' in x)) ? (x.value ?? x.id) : x;
            const key = id ?? keyOf(data);
            const idx = current.findIndex(v => keyOf(v) === key);
            if (selectedFlag) {
                if (idx === -1)
                    current.push(data);
            }
            else {
                if (idx !== -1)
                    current.splice(idx, 1);
            }
            values = current;
            return true;
        };
        if (Array.isArray(detail)) {
            values = mapDetail(detail);
        }
        else if (!tryDelta()) {
            values = computeValues();
        }
        const finalize = (vals) => {
            const finalValue = this.selection === 'single' ? (vals[0] ?? null) : vals;
            if (this.selection === 'multiple' && Array.isArray(finalValue) && finalValue.length === 0) {
                this.modelValue = [];
                this.onChange([]);
            }
            else if (this.selection === 'single' && (finalValue === undefined || finalValue === null)) {
                this.modelValue = null;
                this.onChange(null);
            }
            else {
                this.modelValue = finalValue;
                this.onChange(finalValue);
            }
            this.onTouched();
        };
        finalize(values ?? []);
        // Schedule a microtask recompute since parent toggles may update children after event fires
        Promise.resolve().then(() => {
            const settled = computeValues();
            // If different, emit update
            const eqByKey = (a, b) => {
                if (!Array.isArray(a) || !Array.isArray(b) || a.length !== b.length)
                    return false;
                const toKey = (x) => (x && typeof x === 'object' && ('value' in x || 'id' in x)) ? (x.value ?? x.id) : x;
                const ak = a.map(toKey);
                const bk = b.map(toKey);
                return ak.every((v, i) => v === bk[i]);
            };
            const isEqual = eqByKey(this.modelValue, settled);
            if (!isEqual) {
                finalize(settled);
            }
        });
    }
    // ControlValueAccessor implementation
    writeValue(obj) {
        this.modelValue = obj;
        // Reflect into DOM selection state if possible
        const treeEl = this.el.nativeElement;
        const items = Array.from(treeEl.querySelectorAll('wa-tree-item'));
        // If empty array/null/undefined provided, clear all selections explicitly
        if (obj == null || (Array.isArray(obj) && obj.length === 0)) {
            items.forEach((item) => this.renderer.removeAttribute(item, 'selected'));
            return;
        }
        const isMulti = this.selection === 'multiple' || Array.isArray(obj);
        const arr = isMulti ? (Array.isArray(obj) ? obj : []) : [obj];
        items.forEach((item) => {
            // Only reflect selection on leaf items with data/value bindings
            const isLeaf = !item.querySelector('wa-tree-item');
            const data = item.__waData;
            const id = item.__waValue ?? item.getAttribute('value');
            const identityMatches = (v) => {
                // Compare either by id when present or by strict object reference
                if (id !== undefined && id !== null) {
                    const vId = (v && typeof v === 'object' && 'value' in v) ? v.value : v;
                    return vId === id;
                }
                return v === data;
            };
            const match = isLeaf && (data !== undefined) && arr.some(identityMatches);
            if (match) {
                this.renderer.setAttribute(item, 'selected', '');
            }
            else {
                this.renderer.removeAttribute(item, 'selected');
            }
        });
    }
    registerOnChange(fn) { this.onChange = fn; }
    registerOnTouched(fn) { this.onTouched = fn; }
    setDisabledState(isDisabled) {
        this.isDisabled = isDisabled;
        const treeEl = this.el.nativeElement;
        if (isDisabled) {
            this.renderer.setAttribute(treeEl, 'inert', '');
        }
        else {
            this.renderer.removeAttribute(treeEl, 'inert');
        }
    }
    /**
     * Sets a CSS custom property on the native element if the value is not null or undefined
     */
    setCssVar(name, value) {
        if (value != null) {
            this.renderer.setStyle(this.el.nativeElement, name, value);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaTreeDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.14", type: WaTreeDirective, isStandalone: true, selector: "wa-tree", inputs: { selection: "selection", name: "name", indentSize: "indentSize", indentGuideColor: "indentGuideColor", indentGuideOffset: "indentGuideOffset", indentGuideStyle: "indentGuideStyle", indentGuideWidth: "indentGuideWidth" }, outputs: { waSelectionChange: "waSelectionChange", waSelectionChangeHyphen: "wa-selection-change" }, host: { listeners: { "wa-selection-change": "onSelectionChanged($event)" } }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => WaTreeDirective),
                multi: true
            }
        ], exportAs: ["waTree"], usesOnChanges: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaTreeDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'wa-tree',
                    exportAs: 'waTree',
                    standalone: true,
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => WaTreeDirective),
                            multi: true
                        }
                    ]
                }]
        }], propDecorators: { selection: [{
                type: Input
            }], name: [{
                type: Input
            }], waSelectionChange: [{
                type: Output
            }], waSelectionChangeHyphen: [{
                type: Output,
                args: ['wa-selection-change']
            }], indentSize: [{
                type: Input
            }], indentGuideColor: [{
                type: Input
            }], indentGuideOffset: [{
                type: Input
            }], indentGuideStyle: [{
                type: Input
            }], indentGuideWidth: [{
                type: Input
            }], onSelectionChanged: [{
                type: HostListener,
                args: ['wa-selection-change', ['$event']]
            }] } });

class WaTreeItemDirective {
    // Inputs (boolean-like inputs accept boolean or string for plain attribute support)
    expanded = false;
    selected = false;
    disabled = false;
    lazy = false;
    /** Optional data payload bound to this tree item. Used for two-way binding via ngModel */
    data;
    /** Optional value key; if provided, will be used as value identity */
    value;
    // Outputs
    waExpand = new EventEmitter();
    waExpandHyphen = this.waExpand;
    waAfterExpand = new EventEmitter();
    waAfterExpandHyphen = this.waAfterExpand;
    waCollapse = new EventEmitter();
    waCollapseHyphen = this.waCollapse;
    waAfterCollapse = new EventEmitter();
    waAfterCollapseHyphen = this.waAfterCollapse;
    lazyChange = new EventEmitter();
    waLazyLoad = new EventEmitter();
    waLazyLoadHyphen = this.waLazyLoad;
    // Styling inputs
    selectionBackgroundColor;
    selectionIndicatorColor;
    expandButtonColor;
    showDuration;
    hideDuration;
    // Injected services
    el = inject(ElementRef);
    renderer = inject(Renderer2);
    isTruthy(value) {
        return value === '' || value === true || value === 'true';
    }
    onExpand() {
        if (!this.isTruthy(this.disabled)) {
            this.waExpand.emit();
        }
    }
    onAfterExpand() {
        this.waAfterExpand.emit();
    }
    onCollapse() {
        if (!this.isTruthy(this.disabled)) {
            this.waCollapse.emit();
        }
    }
    onAfterCollapse() {
        this.waAfterCollapse.emit();
    }
    onLazyLoad() {
        if (this.isTruthy(this.lazy) && !this.isTruthy(this.disabled)) {
            this.waLazyLoad.emit();
        }
    }
    ngOnChanges() {
        const item = this.el.nativeElement;
        // Set boolean attributes
        this.setBooleanAttr('expanded', this.expanded);
        this.setBooleanAttr('selected', this.selected);
        this.setBooleanAttr('disabled', this.disabled);
        this.setBooleanAttr('lazy', this.lazy);
        // Store data/value on the DOM element for wa-tree to collect
        if (this.data !== undefined) {
            item.__waData = this.data;
        }
        if (this.value !== undefined) {
            item.__waValue = this.value;
            // Mirror as attribute when it's a primitive for potential CSS/selector usage
            if (typeof this.value === 'string' || typeof this.value === 'number' || typeof this.value === 'boolean') {
                try {
                    this.renderer.setAttribute(item, 'value', String(this.value));
                }
                catch { }
            }
        }
        // Apply custom CSS properties for styling
        this.setCssVar('--selection-background-color', this.selectionBackgroundColor);
        this.setCssVar('--selection-indicator-color', this.selectionIndicatorColor);
        this.setCssVar('--expand-button-color', this.expandButtonColor);
        this.setCssVar('--show-duration', this.showDuration);
        this.setCssVar('--hide-duration', this.hideDuration);
    }
    /**
     * Sets a CSS custom property on the native element if the value is not null or undefined
     */
    setCssVar(name, value) {
        if (value != null) {
            this.renderer.setStyle(this.el.nativeElement, name, value);
        }
    }
    /**
     * Sets a boolean attribute on the native element if the value is truthy
     * For boolean attributes, the presence of the attribute (with empty value) indicates true
     */
    setBooleanAttr(name, value) {
        const truthy = value === '' || value === true || value === 'true';
        if (truthy) {
            this.renderer.setAttribute(this.el.nativeElement, name, '');
        }
        else {
            this.renderer.removeAttribute(this.el.nativeElement, name);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaTreeItemDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.14", type: WaTreeItemDirective, isStandalone: true, selector: "wa-tree-item", inputs: { expanded: "expanded", selected: "selected", disabled: "disabled", lazy: "lazy", data: "data", value: "value", selectionBackgroundColor: "selectionBackgroundColor", selectionIndicatorColor: "selectionIndicatorColor", expandButtonColor: "expandButtonColor", showDuration: "showDuration", hideDuration: "hideDuration" }, outputs: { waExpand: "waExpand", waExpandHyphen: "wa-expand", waAfterExpand: "waAfterExpand", waAfterExpandHyphen: "wa-after-expand", waCollapse: "waCollapse", waCollapseHyphen: "wa-collapse", waAfterCollapse: "waAfterCollapse", waAfterCollapseHyphen: "wa-after-collapse", lazyChange: "lazyChange", waLazyLoad: "waLazyLoad", waLazyLoadHyphen: "wa-lazy-load" }, host: { listeners: { "wa-expand": "onExpand()", "wa-after-expand": "onAfterExpand()", "wa-collapse": "onCollapse()", "wa-after-collapse": "onAfterCollapse()", "wa-lazy-load": "onLazyLoad()" } }, exportAs: ["waTreeItem"], usesOnChanges: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaTreeItemDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'wa-tree-item',
                    exportAs: 'waTreeItem',
                    standalone: true
                }]
        }], propDecorators: { expanded: [{
                type: Input
            }], selected: [{
                type: Input
            }], disabled: [{
                type: Input
            }], lazy: [{
                type: Input
            }], data: [{
                type: Input
            }], value: [{
                type: Input
            }], waExpand: [{
                type: Output
            }], waExpandHyphen: [{
                type: Output,
                args: ['wa-expand']
            }], waAfterExpand: [{
                type: Output
            }], waAfterExpandHyphen: [{
                type: Output,
                args: ['wa-after-expand']
            }], waCollapse: [{
                type: Output
            }], waCollapseHyphen: [{
                type: Output,
                args: ['wa-collapse']
            }], waAfterCollapse: [{
                type: Output
            }], waAfterCollapseHyphen: [{
                type: Output,
                args: ['wa-after-collapse']
            }], lazyChange: [{
                type: Output
            }], waLazyLoad: [{
                type: Output
            }], waLazyLoadHyphen: [{
                type: Output,
                args: ['wa-lazy-load']
            }], selectionBackgroundColor: [{
                type: Input
            }], selectionIndicatorColor: [{
                type: Input
            }], expandButtonColor: [{
                type: Input
            }], showDuration: [{
                type: Input
            }], hideDuration: [{
                type: Input
            }], onExpand: [{
                type: HostListener,
                args: ['wa-expand']
            }], onAfterExpand: [{
                type: HostListener,
                args: ['wa-after-expand']
            }], onCollapse: [{
                type: HostListener,
                args: ['wa-collapse']
            }], onAfterCollapse: [{
                type: HostListener,
                args: ['wa-after-collapse']
            }], onLazyLoad: [{
                type: HostListener,
                args: ['wa-lazy-load']
            }] } });

class WaTabComponent {
    el;
    renderer;
    panel;
    disabled = false;
    constructor(el, renderer) {
        this.el = el;
        this.renderer = renderer;
    }
    set activeTabColor(value) {
        if (value) {
            this.renderer.setStyle(this.el.nativeElement, '--active-tab-color', value);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaTabComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.14", type: WaTabComponent, isStandalone: true, selector: "wa-tab", inputs: { panel: "panel", disabled: "disabled", activeTabColor: "activeTabColor" }, host: { properties: { "attr.panel": "panel", "attr.disabled": "disabled ? \"\" : null" } }, ngImport: i0, template: `<ng-content></ng-content>`, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaTabComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'wa-tab',
                    template: `<ng-content></ng-content>`,
                    standalone: true,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    host: {
                        '[attr.panel]': 'panel',
                        '[attr.disabled]': 'disabled ? "" : null'
                    }
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i0.Renderer2 }], propDecorators: { panel: [{
                type: Input
            }], disabled: [{
                type: Input
            }], activeTabColor: [{
                type: Input
            }] } });

class WaTabContent {
    templateRef;
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaTabContent, deps: [{ token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.14", type: WaTabContent, isStandalone: true, selector: "[waTabContent]", ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaTabContent, decorators: [{
            type: Directive,
            args: [{
                    selector: '[waTabContent]',
                    standalone: true
                }]
        }], ctorParameters: () => [{ type: i0.TemplateRef }] });

class WaTabPanelComponent {
    el;
    renderer;
    name;
    active = false;
    /**
     * When true (and no <ng-template waTabContent> is provided), the panel will lazily attach/detach
     * its projected DOM based on active state. Note this does NOT prevent Angular component
     * instantiation; for true deferred instantiation use <ng-template waTabContent>.
     */
    lazy = false;
    lazyContent;
    /**
     * When the panel is inactive and no lazy content is used, we keep all child nodes in this fragment
     * so that there is no DOM footprint. When it becomes active, we append the nodes back.
     * NOTE: For modern Angular use, the [waTabContent] directive is preferred.
     */
    contentFragment = null;
    unlistenShow;
    unlistenWaShow;
    mutationObserver;
    constructor(el, renderer) {
        this.el = el;
        this.renderer = renderer;
    }
    ngAfterContentInit() {
        // If we have lazy content, we don't need the manual DOM manipulation
    }
    ngAfterViewInit() {
        const host = this.el.nativeElement;
        // Only run manual DOM toggling when lazy is enabled and no dedicated lazy template is used
        if (!this.lazyContent && this.lazy) {
            // Always start by capturing any projected content; visibility handled below
            this.captureAllChildrenIntoFragment();
            // Ensure initial state reflects current active status
            this.updateProjectedContentVisibility();
        }
        // Listen for possible show events emitted by the web component (defensive)
        this.unlistenShow = this.renderer.listen(host, 'show', () => this.updateProjectedContentVisibility());
        this.unlistenWaShow = this.renderer.listen(host, 'wa-show', () => this.updateProjectedContentVisibility());
        // Observe the "active" attribute to toggle content presence on changes
        this.mutationObserver = new MutationObserver(mutations => {
            for (const m of mutations) {
                if (m.type === 'attributes' && m.attributeName === 'active') {
                    this.updateProjectedContentVisibility();
                }
            }
        });
        this.mutationObserver.observe(host, { attributes: true, attributeFilter: ['active'] });
    }
    ngOnDestroy() {
        if (this.unlistenShow)
            this.unlistenShow();
        if (this.unlistenWaShow)
            this.unlistenWaShow();
        if (this.mutationObserver)
            this.mutationObserver.disconnect();
        // Allow GC of detached nodes
        this.contentFragment = null;
    }
    set padding(value) {
        if (value) {
            this.renderer.setStyle(this.el.nativeElement, '--padding', value);
        }
    }
    isActive() {
        const host = this.el.nativeElement;
        return host.hasAttribute('active') || !!this.active;
    }
    // Move all current child nodes into a fragment (closed/inactive state)
    captureAllChildrenIntoFragment() {
        if (this.lazyContent || !this.lazy)
            return;
        const host = this.el.nativeElement;
        if (!this.contentFragment)
            this.contentFragment = document.createDocumentFragment();
        const nodes = Array.from(host.childNodes);
        if (nodes.length > 0) {
            nodes.forEach(n => this.contentFragment.appendChild(n));
        }
    }
    // Toggle children presence based on active state
    updateProjectedContentVisibility() {
        if (this.lazyContent) {
            // For lazy content, we rely on Angular's change detection and the template's *ngIf
            return;
        }
        if (!this.lazy) {
            // Not in lazy mode for projected content; leave DOM as-is
            return;
        }
        const host = this.el.nativeElement;
        const shouldHaveContent = this.isActive();
        if (shouldHaveContent) {
            if (this.contentFragment && this.contentFragment.childNodes.length > 0) {
                host.appendChild(this.contentFragment);
                // Keep fragment instance; it becomes empty after append and can be reused
            }
            return;
        }
        // Inactive: ensure children are removed into fragment
        this.captureAllChildrenIntoFragment();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaTabPanelComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.14", type: WaTabPanelComponent, isStandalone: true, selector: "wa-tab-panel", inputs: { name: "name", active: "active", lazy: "lazy", padding: "padding" }, host: { properties: { "attr.name": "name", "attr.active": "active ? \"\" : null" } }, queries: [{ propertyName: "lazyContent", first: true, predicate: WaTabContent, descendants: true }], ngImport: i0, template: `
    <ng-content *ngIf="!lazyContent"></ng-content>
    <ng-container *ngIf="isActive() && lazyContent">
      <ng-container [ngTemplateOutlet]="lazyContent.templateRef"></ng-container>
    </ng-container>
  `, isInline: true, dependencies: [{ kind: "directive", type: NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaTabPanelComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'wa-tab-panel',
                    template: `
    <ng-content *ngIf="!lazyContent"></ng-content>
    <ng-container *ngIf="isActive() && lazyContent">
      <ng-container [ngTemplateOutlet]="lazyContent.templateRef"></ng-container>
    </ng-container>
  `,
                    standalone: true,
                    imports: [NgIf, NgTemplateOutlet],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    host: {
                        '[attr.name]': 'name',
                        '[attr.active]': 'active ? "" : null'
                    }
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i0.Renderer2 }], propDecorators: { name: [{
                type: Input
            }], active: [{
                type: Input
            }], lazy: [{
                type: Input
            }], lazyContent: [{
                type: ContentChild,
                args: [WaTabContent]
            }], padding: [{
                type: Input
            }] } });

class WaTabGroupComponent {
    el;
    renderer;
    placement = 'top';
    activation = 'auto';
    // Updated naming to match spec: withoutScrollControls reflects to without-scroll-controls
    withoutScrollControls = false;
    waTabShow = new EventEmitter();
    waTabShowHyphen = this.waTabShow;
    waTabHide = new EventEmitter();
    waTabHideHyphen = this.waTabHide;
    valueChange = new EventEmitter();
    // Support binding via [active]
    set active(val) {
        this.value = val;
    }
    get active() {
        return this.value;
    }
    get value() {
        return this._value;
    }
    set value(val) {
        this._value = val;
        // Reflect to DOM attribute immediately so the underlying WC reacts
        if (val == null || val === '') {
            this.renderer.removeAttribute(this.el.nativeElement, 'active');
        }
        else {
            this.renderer.setAttribute(this.el.nativeElement, 'active', val);
        }
        this.onChange(val);
        this.valueChange.emit(val);
        this.onTouched();
    }
    _value = null;
    onChange = (value) => { };
    onTouched = () => { };
    onTabShow(event) {
        this.waTabShow.emit(event);
        // Detail often contains the name of the tab being shown
        const tabName = event.detail?.name;
        if (tabName && tabName !== this.value) {
            this.value = tabName;
        }
    }
    onTabHide(event) {
        this.waTabHide.emit(event);
    }
    constructor(el, renderer) {
        this.el = el;
        this.renderer = renderer;
    }
    writeValue(value) {
        this._value = value;
        this.renderer.setAttribute(this.el.nativeElement, 'active', value ?? '');
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    // Custom property setters
    set indicatorColor(value) {
        this.setStyle('--indicator-color', value);
    }
    set trackColor(value) {
        this.setStyle('--track-color', value);
    }
    set trackWidth(value) {
        this.setStyle('--track-width', value);
    }
    setStyle(prop, value) {
        if (value != null) {
            this.renderer.setStyle(this.el.nativeElement, prop, value);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaTabGroupComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.14", type: WaTabGroupComponent, isStandalone: true, selector: "wa-tab-group", inputs: { placement: "placement", activation: "activation", withoutScrollControls: "withoutScrollControls", active: "active", value: "value", indicatorColor: "indicatorColor", trackColor: "trackColor", trackWidth: "trackWidth" }, outputs: { waTabShow: "waTabShow", waTabShowHyphen: "wa-tab-show", waTabHide: "waTabHide", waTabHideHyphen: "wa-tab-hide", valueChange: "valueChange" }, host: { listeners: { "wa-tab-show": "onTabShow($event)", "wa-tab-hide": "onTabHide($event)" }, properties: { "attr.active": "value", "attr.placement": "placement", "attr.activation": "activation", "attr.without-scroll-controls": "withoutScrollControls ? \"\" : null" } }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => WaTabGroupComponent),
                multi: true
            }
        ], ngImport: i0, template: `<ng-content></ng-content>`, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaTabGroupComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'wa-tab-group',
                    template: `<ng-content></ng-content>`,
                    standalone: true,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => WaTabGroupComponent),
                            multi: true
                        }
                    ],
                    host: {
                        '[attr.active]': 'value',
                        '[attr.placement]': 'placement',
                        '[attr.activation]': 'activation',
                        '[attr.without-scroll-controls]': 'withoutScrollControls ? "" : null',
                        '(wa-tab-show)': 'onTabShow($event)',
                        '(wa-tab-hide)': 'onTabHide($event)'
                    }
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i0.Renderer2 }], propDecorators: { placement: [{
                type: Input
            }], activation: [{
                type: Input
            }], withoutScrollControls: [{
                type: Input
            }], waTabShow: [{
                type: Output
            }], waTabShowHyphen: [{
                type: Output,
                args: ['wa-tab-show']
            }], waTabHide: [{
                type: Output
            }], waTabHideHyphen: [{
                type: Output,
                args: ['wa-tab-hide']
            }], valueChange: [{
                type: Output
            }], active: [{
                type: Input,
                args: ['active']
            }], value: [{
                type: Input
            }], indicatorColor: [{
                type: Input
            }], trackColor: [{
                type: Input
            }], trackWidth: [{
                type: Input
            }] } });

class WaPageComponent {
    el;
    renderer;
    constructor(el, renderer) {
        this.el = el;
        this.renderer = renderer;
    }
    mobileBreakpoint;
    navOpen;
    disableSticky;
    navigationPlacement;
    menuWidth;
    mainWidth;
    asideWidth;
    bannerHeight;
    headerHeight;
    subheaderHeight;
    get view() {
        return this.el.nativeElement.getAttribute('view');
    }
    ngOnChanges() {
        const el = this.el.nativeElement;
        if (this.mobileBreakpoint !== undefined) {
            el.setAttribute('mobile-breakpoint', this.mobileBreakpoint.toString());
        }
        if (this.navOpen !== undefined) {
            if (this.navOpen) {
                el.setAttribute('nav-open', '');
            }
            else {
                el.removeAttribute('nav-open');
            }
        }
        if (this.disableSticky !== undefined) {
            el.setAttribute('disable-sticky', this.disableSticky);
        }
        if (this.navigationPlacement !== undefined) {
            el.setAttribute('navigation-placement', this.navigationPlacement);
        }
        this.setCssVar('--menu-width', this.menuWidth || '');
        this.setCssVar('--main-width', this.mainWidth || '');
        this.setCssVar('--aside-width', this.asideWidth || '');
        this.setCssVar('--banner-height', this.bannerHeight || '');
        this.setCssVar('--header-height', this.headerHeight || '');
        this.setCssVar('--subheader-height', this.subheaderHeight || '');
    }
    showNavigation() {
        this.el.nativeElement.showNavigation?.();
    }
    hideNavigation() {
        this.el.nativeElement.hideNavigation?.();
    }
    toggleNavigation() {
        this.el.nativeElement.toggleNavigation?.();
    }
    setCssVar(name, value) {
        if (value != null) {
            this.renderer.setStyle(this.el.nativeElement, name, value);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaPageComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.14", type: WaPageComponent, isStandalone: true, selector: "wa-page", inputs: { mobileBreakpoint: "mobileBreakpoint", navOpen: "navOpen", disableSticky: "disableSticky", navigationPlacement: "navigationPlacement", menuWidth: "menuWidth", mainWidth: "mainWidth", asideWidth: "asideWidth", bannerHeight: "bannerHeight", headerHeight: "headerHeight", subheaderHeight: "subheaderHeight" }, usesOnChanges: true, ngImport: i0, template: "<ng-content select=\"[waPageSkipToContent]\"></ng-content>\r\n<ng-content select=\"[waPageBanner]\"></ng-content>\r\n<ng-content select=\"[waPageHeader]\"></ng-content>\r\n<ng-content select=\"[waPageSubheader]\"></ng-content>\r\n<ng-content select=\"[waPageNavigationHeader]\"></ng-content>\r\n<ng-content select=\"[waPageNavigation]\"></ng-content>\r\n<ng-content select=\"[waPageNavigationFooter]\"></ng-content>\r\n<ng-content select=\"[waPageMenu]\"></ng-content>\r\n<ng-content select=\"[waPageMainHeader]\"></ng-content>\r\n<ng-content></ng-content>\r\n<ng-content select=\"[waPageMainFooter]\"></ng-content>\r\n<ng-content select=\"[waPageAside]\"></ng-content>\r\n<ng-content select=\"[waPageFooter]\"></ng-content>\r\n<ng-content select=\"[waPageDialogWrapper]\"></ng-content>\r\n", changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaPageComponent, decorators: [{
            type: Component,
            args: [{ selector: 'wa-page', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, standalone: true, template: "<ng-content select=\"[waPageSkipToContent]\"></ng-content>\r\n<ng-content select=\"[waPageBanner]\"></ng-content>\r\n<ng-content select=\"[waPageHeader]\"></ng-content>\r\n<ng-content select=\"[waPageSubheader]\"></ng-content>\r\n<ng-content select=\"[waPageNavigationHeader]\"></ng-content>\r\n<ng-content select=\"[waPageNavigation]\"></ng-content>\r\n<ng-content select=\"[waPageNavigationFooter]\"></ng-content>\r\n<ng-content select=\"[waPageMenu]\"></ng-content>\r\n<ng-content select=\"[waPageMainHeader]\"></ng-content>\r\n<ng-content></ng-content>\r\n<ng-content select=\"[waPageMainFooter]\"></ng-content>\r\n<ng-content select=\"[waPageAside]\"></ng-content>\r\n<ng-content select=\"[waPageFooter]\"></ng-content>\r\n<ng-content select=\"[waPageDialogWrapper]\"></ng-content>\r\n" }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i0.Renderer2 }], propDecorators: { mobileBreakpoint: [{
                type: Input
            }], navOpen: [{
                type: Input
            }], disableSticky: [{
                type: Input
            }], navigationPlacement: [{
                type: Input
            }], menuWidth: [{
                type: Input
            }], mainWidth: [{
                type: Input
            }], asideWidth: [{
                type: Input
            }], bannerHeight: [{
                type: Input
            }], headerHeight: [{
                type: Input
            }], subheaderHeight: [{
                type: Input
            }] } });

/**
 * WaPopupDirective
 *
 * Angular wrapper for the <wa-popup> Web Component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Popup is a utility that lets you declaratively anchor "popup" containers to another element.
 * It uses Floating UI under the hood to provide a well-tested, lightweight, and fully
 * declarative positioning utility for tooltips, dropdowns, and more.
 *
 * Features:
 * - Binds all supported popup attributes as @Input() properties
 * - Supports anchoring to elements via ID or slot
 * - Supports various placement options (top, bottom, left, right, etc.)
 * - Supports customization of distance, skidding, arrows, etc.
 * - Supports advanced positioning features like flip, shift, and auto-size
 * - Emits reposition events
 * - Enables Angular-style class and style bindings
 * - Allows slot projection for popup content and anchor
 * - Supports custom styling via CSS variables
 * - Provides methods for programmatic control (reposition)
 */
class WaPopupDirective {
    // String inputs
    anchor;
    placement;
    boundary;
    flipFallbackPlacements;
    flipFallbackStrategy;
    autoSize;
    sync;
    arrowPlacement;
    // Boolean inputs
    active;
    arrow;
    flip;
    shift;
    hoverBridge;
    // Numeric inputs
    distance;
    skidding;
    arrowPadding;
    flipPadding;
    shiftPadding;
    autoSizePadding;
    // Event outputs
    waReposition = new EventEmitter();
    waRepositionHyphen = this.waReposition;
    // Injected services
    el = inject(ElementRef);
    renderer = inject(Renderer2);
    ngOnInit() {
        const nativeEl = this.el.nativeElement;
        // Set string attributes
        this.setAttr('anchor', this.anchor);
        this.setAttr('placement', this.placement);
        this.setAttr('boundary', this.boundary);
        this.setAttr('flip-fallback-placements', this.flipFallbackPlacements);
        this.setAttr('flip-fallback-strategy', this.flipFallbackStrategy);
        this.setAttr('auto-size', this.autoSize);
        this.setAttr('sync', this.sync);
        this.setAttr('arrow-placement', this.arrowPlacement);
        // Set boolean attributes (only if true)
        this.setBooleanAttr('active', this.active);
        this.setBooleanAttr('arrow', this.arrow);
        this.setBooleanAttr('flip', this.flip);
        this.setBooleanAttr('shift', this.shift);
        this.setBooleanAttr('hover-bridge', this.hoverBridge);
        // Set numeric attributes
        this.setNumericAttr('distance', this.distance);
        this.setNumericAttr('skidding', this.skidding);
        this.setNumericAttr('arrow-padding', this.arrowPadding);
        this.setNumericAttr('flip-padding', this.flipPadding);
        this.setNumericAttr('shift-padding', this.shiftPadding);
        this.setNumericAttr('auto-size-padding', this.autoSizePadding);
        // Set up event listeners
        this.renderer.listen(nativeEl, 'reposition', (event) => {
            this.waReposition.emit(event);
        });
        this.renderer.listen(nativeEl, 'wa-reposition', (event) => {
            this.waReposition.emit(event);
        });
    }
    /**
     * Exposes the native popup element for direct interaction
     */
    get nativeElement() {
        return this.el.nativeElement;
    }
    /**
     * Forces the popup to recalculate and reposition itself
     */
    reposition() {
        this.el.nativeElement.reposition();
    }
    /**
     * Sets an attribute on the native element if the value is not null or undefined
     */
    setAttr(name, value) {
        if (value != null) {
            this.renderer.setAttribute(this.el.nativeElement, name, value);
        }
    }
    /**
     * Sets a numeric attribute on the native element if the value is not null or undefined
     */
    setNumericAttr(name, value) {
        if (value != null) {
            const numericValue = typeof value === 'string' ? parseFloat(value) : value;
            if (!isNaN(numericValue)) {
                this.renderer.setAttribute(this.el.nativeElement, name, numericValue.toString());
            }
        }
    }
    /**
     * Sets a boolean attribute on the native element if the value is truthy
     * For boolean attributes, the presence of the attribute (with empty value) indicates true
     */
    setBooleanAttr(name, value) {
        if (value === true || value === 'true' || value === '') {
            this.renderer.setAttribute(this.el.nativeElement, name, '');
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaPopupDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.14", type: WaPopupDirective, isStandalone: true, selector: "wa-popup", inputs: { anchor: "anchor", placement: "placement", boundary: "boundary", flipFallbackPlacements: "flipFallbackPlacements", flipFallbackStrategy: "flipFallbackStrategy", autoSize: "autoSize", sync: "sync", arrowPlacement: "arrowPlacement", active: "active", arrow: "arrow", flip: "flip", shift: "shift", hoverBridge: "hoverBridge", distance: "distance", skidding: "skidding", arrowPadding: "arrowPadding", flipPadding: "flipPadding", shiftPadding: "shiftPadding", autoSizePadding: "autoSizePadding" }, outputs: { waReposition: "waReposition", waRepositionHyphen: "wa-reposition" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaPopupDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'wa-popup',
                    standalone: true
                }]
        }], propDecorators: { anchor: [{
                type: Input
            }], placement: [{
                type: Input
            }], boundary: [{
                type: Input
            }], flipFallbackPlacements: [{
                type: Input
            }], flipFallbackStrategy: [{
                type: Input
            }], autoSize: [{
                type: Input
            }], sync: [{
                type: Input
            }], arrowPlacement: [{
                type: Input
            }], active: [{
                type: Input
            }], arrow: [{
                type: Input
            }], flip: [{
                type: Input
            }], shift: [{
                type: Input
            }], hoverBridge: [{
                type: Input
            }], distance: [{
                type: Input
            }], skidding: [{
                type: Input
            }], arrowPadding: [{
                type: Input
            }], flipPadding: [{
                type: Input
            }], shiftPadding: [{
                type: Input
            }], autoSizePadding: [{
                type: Input
            }], waReposition: [{
                type: Output
            }], waRepositionHyphen: [{
                type: Output,
                args: ['wa-reposition']
            }] } });

/**
 * WaPopoverDirective
 *
 * Angular wrapper for the <wa-popover> Web Component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Popover is a utility that lets you declaratively anchor "popover" containers to another element.
 * It uses Floating UI under the hood to provide a well-tested, lightweight, and fully
 * declarative positioning utility for tooltips, dropdowns, and more.
 *
 * Features:
 * - Binds all supported popover attributes as @Input() properties
 * - Supports anchoring to elements via ID or slot
 * - Supports various placement options (top, bottom, left, right, etc.)
 * - Supports customization of distance, skidding, arrows, etc.
 * - Supports advanced positioning features like flip, shift, and auto-size
 * - Emits reposition events
 * - Enables Angular-style class and style bindings
 * - Allows slot projection for popover content and anchor
 * - Supports custom styling via CSS variables
 * - Provides methods for programmatic control (reposition)
 */
class WaPopoverDirective {
    // String inputs
    anchor;
    // Allow using HTML's label-like API: for/htmlFor. We alias to properties that map to `anchor`.
    forAttr;
    htmlFor;
    placement;
    boundary;
    flipFallbackPlacements;
    flipFallbackStrategy;
    autoSize;
    sync;
    arrowPlacement;
    // Boolean inputs
    active;
    arrow;
    flip;
    shift;
    hoverBridge;
    // Numeric inputs
    distance;
    skidding;
    arrowPadding;
    flipPadding;
    shiftPadding;
    autoSizePadding;
    // Event outputs
    waReposition = new EventEmitter();
    waRepositionHyphen = this.waReposition;
    waShow = new EventEmitter();
    waShowHyphen = this.waShow;
    waAfterShow = new EventEmitter();
    waAfterShowHyphen = this.waAfterShow;
    waHide = new EventEmitter();
    waHideHyphen = this.waHide;
    waAfterHide = new EventEmitter();
    waAfterHideHyphen = this.waAfterHide;
    // Injected services
    el = inject(ElementRef);
    renderer = inject(Renderer2);
    // Lazy rendering state
    contentFragment = null;
    contentRendered = false;
    unlistenShow;
    unlistenHide;
    ngOnInit() {
        const nativeEl = this.el.nativeElement;
        // Prepare lazy content FIRST so we control when it appears
        // This avoids a race where the component opens before Angular-projected content exists
        this.captureContentIntoFragment();
        // Set string attributes
        const resolvedAnchor = this.anchor ?? this.forAttr ?? this.htmlFor;
        this.setAttr('anchor', resolvedAnchor);
        this.setAttr('placement', this.placement);
        this.setAttr('boundary', this.boundary);
        this.setAttr('flip-fallback-placements', this.flipFallbackPlacements);
        this.setAttr('flip-fallback-strategy', this.flipFallbackStrategy);
        this.setAttr('auto-size', this.autoSize);
        this.setAttr('sync', this.sync);
        this.setAttr('arrow-placement', this.arrowPlacement);
        // Set boolean attributes (only if true) — DO NOT set `active` yet
        this.setBooleanAttr('arrow', this.arrow);
        this.setBooleanAttr('flip', this.flip);
        this.setBooleanAttr('shift', this.shift);
        this.setBooleanAttr('hover-bridge', this.hoverBridge);
        // Set numeric attributes
        this.setNumericAttr('distance', this.distance);
        this.setNumericAttr('skidding', this.skidding);
        this.setNumericAttr('arrow-padding', this.arrowPadding);
        this.setNumericAttr('flip-padding', this.flipPadding);
        this.setNumericAttr('shift-padding', this.shiftPadding);
        this.setNumericAttr('auto-size-padding', this.autoSizePadding);
        // Set up event listeners
        // Reposition events (support both legacy and hyphenated)
        this.renderer.listen(nativeEl, 'reposition', (event) => {
            this.waReposition.emit(event);
        });
        this.renderer.listen(nativeEl, 'wa-reposition', (event) => {
            this.waReposition.emit(event);
        });
        // Listen for show/hide from the web component to toggle content rendering
        // Support both generic and Web Awesome-prefixed events for compatibility
        this.unlistenShow = this.renderer.listen(nativeEl, 'show', (event) => {
            this.renderContentFromFragment();
            this.waShow.emit(event);
        });
        const unlistenShowWa = this.renderer.listen(nativeEl, 'wa-show', (event) => {
            this.renderContentFromFragment();
            this.waShow.emit(event);
        });
        this.unlistenHide = this.renderer.listen(nativeEl, 'hide', (event) => {
            this.captureContentIntoFragment();
            this.waHide.emit(event);
        });
        const unlistenHideWa = this.renderer.listen(nativeEl, 'wa-hide', (event) => {
            this.captureContentIntoFragment();
            this.waHide.emit(event);
        });
        // After show/hide
        this.renderer.listen(nativeEl, 'aftershow', (event) => this.waAfterShow.emit(event));
        this.renderer.listen(nativeEl, 'afterhide', (event) => this.waAfterHide.emit(event));
        this.renderer.listen(nativeEl, 'wa-after-show', (event) => this.waAfterShow.emit(event));
        this.renderer.listen(nativeEl, 'wa-after-hide', (event) => this.waAfterHide.emit(event));
        // If the popover starts active or `active` input is set, render content BEFORE enabling active
        const wantsActive = (this.active === true || this.active === 'true' || this.active === '');
        if (nativeEl.hasAttribute('active') || wantsActive) {
            this.renderContentFromFragment();
            // Now set active if requested via input so the component opens with content already present
            if (wantsActive && !nativeEl.hasAttribute('active')) {
                this.setBooleanAttr('active', true);
            }
        }
        // Store additional unlisten handlers on the element to clean up in ngOnDestroy
        this._unlistenShowWa = unlistenShowWa;
        this._unlistenHideWa = unlistenHideWa;
    }
    ngOnChanges(changes) {
        if (changes['anchor'] || changes['forAttr'] || changes['htmlFor']) {
            const resolvedAnchor = this.anchor ?? this.forAttr ?? this.htmlFor;
            this.setAttr('anchor', resolvedAnchor);
        }
    }
    ngOnDestroy() {
        if (this.unlistenShow)
            this.unlistenShow();
        if (this.unlistenHide)
            this.unlistenHide();
        if (this._unlistenShowWa)
            this._unlistenShowWa();
        if (this._unlistenHideWa)
            this._unlistenHideWa();
        // Ensure we don't leak detached nodes
        this.contentFragment = null;
    }
    /**
     * Exposes the native popover element for direct interaction
     */
    get nativeElement() {
        return this.el.nativeElement;
    }
    /**
     * Forces the popover to recalculate and reposition itself
     */
    reposition() {
        this.el.nativeElement.reposition();
    }
    /**
     * Sets an attribute on the native element if the value is not null or undefined
     */
    setAttr(name, value) {
        if (value != null) {
            this.renderer.setAttribute(this.el.nativeElement, name, value);
        }
    }
    /**
     * Sets a numeric attribute on the native element if the value is not null or undefined
     */
    setNumericAttr(name, value) {
        if (value != null) {
            const numericValue = typeof value === 'string' ? parseFloat(value) : value;
            if (!isNaN(numericValue)) {
                this.renderer.setAttribute(this.el.nativeElement, name, numericValue.toString());
            }
        }
    }
    /**
     * Sets a boolean attribute on the native element if the value is truthy
     * For boolean attributes, the presence of the attribute (with empty value) indicates true
     */
    setBooleanAttr(name, value) {
        if (value === true || value === 'true' || value === '') {
            this.renderer.setAttribute(this.el.nativeElement, name, '');
        }
    }
    // Move all non-anchor slotted child nodes into a fragment (to prevent initial render)
    captureContentIntoFragment() {
        const host = this.el.nativeElement;
        if (!this.contentFragment)
            this.contentFragment = document.createDocumentFragment();
        // If content already captured (not rendered), do nothing
        if (!this.contentRendered && this.contentFragment.childNodes.length > 0) {
            return;
        }
        // Detach all nodes except those with slot="anchor"
        const nodesToMove = [];
        host.childNodes.forEach(node => {
            if (node.nodeType === Node.ELEMENT_NODE) {
                const el = node;
                if (el.getAttribute('slot') === 'anchor') {
                    return; // keep anchor
                }
            }
            // Text, comments, and non-anchor elements are considered popover content
            nodesToMove.push(node);
        });
        if (nodesToMove.length > 0) {
            nodesToMove.forEach(n => this.contentFragment.appendChild(n));
            this.contentRendered = false;
        }
    }
    // Render captured content back into the host when showing
    renderContentFromFragment() {
        const host = this.el.nativeElement;
        if (this.contentFragment && this.contentFragment.childNodes.length > 0) {
            host.appendChild(this.contentFragment);
            // contentFragment becomes empty after append; recreate for future hides
            this.contentFragment = document.createDocumentFragment();
            this.contentRendered = true;
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaPopoverDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.14", type: WaPopoverDirective, isStandalone: true, selector: "wa-popover", inputs: { anchor: "anchor", forAttr: ["for", "forAttr"], htmlFor: "htmlFor", placement: "placement", boundary: "boundary", flipFallbackPlacements: "flipFallbackPlacements", flipFallbackStrategy: "flipFallbackStrategy", autoSize: "autoSize", sync: "sync", arrowPlacement: "arrowPlacement", active: "active", arrow: "arrow", flip: "flip", shift: "shift", hoverBridge: "hoverBridge", distance: "distance", skidding: "skidding", arrowPadding: "arrowPadding", flipPadding: "flipPadding", shiftPadding: "shiftPadding", autoSizePadding: "autoSizePadding" }, outputs: { waReposition: "waReposition", waRepositionHyphen: "wa-reposition", waShow: "waShow", waShowHyphen: "wa-show", waAfterShow: "waAfterShow", waAfterShowHyphen: "wa-after-show", waHide: "waHide", waHideHyphen: "wa-hide", waAfterHide: "waAfterHide", waAfterHideHyphen: "wa-after-hide" }, usesOnChanges: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaPopoverDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'wa-popover',
                    standalone: true
                }]
        }], propDecorators: { anchor: [{
                type: Input
            }], forAttr: [{
                type: Input,
                args: ['for']
            }], htmlFor: [{
                type: Input
            }], placement: [{
                type: Input
            }], boundary: [{
                type: Input
            }], flipFallbackPlacements: [{
                type: Input
            }], flipFallbackStrategy: [{
                type: Input
            }], autoSize: [{
                type: Input
            }], sync: [{
                type: Input
            }], arrowPlacement: [{
                type: Input
            }], active: [{
                type: Input
            }], arrow: [{
                type: Input
            }], flip: [{
                type: Input
            }], shift: [{
                type: Input
            }], hoverBridge: [{
                type: Input
            }], distance: [{
                type: Input
            }], skidding: [{
                type: Input
            }], arrowPadding: [{
                type: Input
            }], flipPadding: [{
                type: Input
            }], shiftPadding: [{
                type: Input
            }], autoSizePadding: [{
                type: Input
            }], waReposition: [{
                type: Output
            }], waRepositionHyphen: [{
                type: Output,
                args: ['wa-reposition']
            }], waShow: [{
                type: Output
            }], waShowHyphen: [{
                type: Output,
                args: ['wa-show']
            }], waAfterShow: [{
                type: Output
            }], waAfterShowHyphen: [{
                type: Output,
                args: ['wa-after-show']
            }], waHide: [{
                type: Output
            }], waHideHyphen: [{
                type: Output,
                args: ['wa-hide']
            }], waAfterHide: [{
                type: Output
            }], waAfterHideHyphen: [{
                type: Output,
                args: ['wa-after-hide']
            }] } });

/**
 * WaIntersectionObserverDirective
 *
 * Angular wrapper for the <wa-intersection-observer> WebAwesome component.
 *
 * Features:
 * - Binds threshold and rootMargin inputs
 * - Re-emits wa-change events
 * - Supports default slot projection (observed content)
 */
class WaIntersectionObserverDirective {
    // Inputs
    threshold;
    rootMargin;
    disabled;
    // Events
    waChange = new EventEmitter();
    // Services
    el = inject(ElementRef);
    renderer = inject(Renderer2);
    ngOnInit() {
        const nativeEl = this.el.nativeElement;
        this.applyInputs();
        // Events (hyphenated custom event)
        this.renderer.listen(nativeEl, 'wa-change', (event) => this.waChange.emit(event));
    }
    ngOnChanges(_) {
        this.applyInputs();
    }
    applyInputs() {
        // Map inputs
        if (Array.isArray(this.threshold)) {
            this.setAttr('threshold', this.threshold.join(','));
        }
        else {
            this.setAttr('threshold', this.threshold);
        }
        this.setAttr('root-margin', this.rootMargin);
        this.setBooleanAttr('disabled', this.disabled);
    }
    setAttr(name, value) {
        if (value != null && value !== '') {
            this.renderer.setAttribute(this.el.nativeElement, name, String(value));
        }
    }
    setBooleanAttr(name, value) {
        if (value === true || value === 'true' || value === '') {
            this.renderer.setAttribute(this.el.nativeElement, name, '');
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaIntersectionObserverDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.14", type: WaIntersectionObserverDirective, isStandalone: true, selector: "wa-intersection-observer", inputs: { threshold: "threshold", rootMargin: "rootMargin", disabled: "disabled" }, outputs: { waChange: "wa-change" }, usesOnChanges: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaIntersectionObserverDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'wa-intersection-observer',
                    standalone: true
                }]
        }], propDecorators: { threshold: [{
                type: Input
            }], rootMargin: [{
                type: Input
            }], disabled: [{
                type: Input
            }], waChange: [{
                type: Output,
                args: ['wa-change']
            }] } });

/**
 * WaMutationObserverDirective
 *
 * Angular wrapper for the <wa-mutation-observer> WebAwesome component.
 *
 * Features:
 * - Binds target and options inputs
 * - Re-emits wa-mutation events
 * - Supports default slot projection (observed content)
 */
class WaMutationObserverDirective {
    // Inputs
    /** Element id or HTMLElement to observe. If not provided, the default slot content is observed. */
    target;
    /** Options bag or JSON string (attributes, childList, subtree, characterData, attributeFilter). */
    options;
    disabled;
    // Events
    waMutation = new EventEmitter();
    // Services
    el = inject(ElementRef);
    renderer = inject(Renderer2);
    ngOnInit() {
        const nativeEl = this.el.nativeElement;
        this.applyInputs();
        // Events
        this.renderer.listen(nativeEl, 'wa-mutation', (event) => this.waMutation.emit(event));
    }
    ngOnChanges(_) {
        this.applyInputs();
    }
    applyInputs() {
        const nativeEl = this.el.nativeElement;
        // Map inputs
        if (typeof this.target === 'string') {
            this.setAttr('target', this.target);
        }
        else if (this.target instanceof HTMLElement) {
            nativeEl.target = this.target;
        }
        if (this.options != null) {
            // Pass complex options as property to avoid stringifying
            nativeEl.options = this.options;
        }
        this.setBooleanAttr('disabled', this.disabled);
    }
    setAttr(name, value) {
        if (value != null && value !== '') {
            this.renderer.setAttribute(this.el.nativeElement, name, String(value));
        }
    }
    setBooleanAttr(name, value) {
        if (value === true || value === 'true' || value === '') {
            this.renderer.setAttribute(this.el.nativeElement, name, '');
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaMutationObserverDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.14", type: WaMutationObserverDirective, isStandalone: true, selector: "wa-mutation-observer", inputs: { target: "target", options: "options", disabled: "disabled" }, outputs: { waMutation: "wa-mutation" }, usesOnChanges: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaMutationObserverDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'wa-mutation-observer',
                    standalone: true
                }]
        }], propDecorators: { target: [{
                type: Input
            }], options: [{
                type: Input
            }], disabled: [{
                type: Input
            }], waMutation: [{
                type: Output,
                args: ['wa-mutation']
            }] } });

/**
 * Attribute directive to apply Web Awesome gap utility classes to any container.
 * It also sets display:flex via the utility and can be overridden since the utility has low specificity.
 *
 * Usage:
 * <div [waGap]="'m'" class="wa-cluster">...</div>
 * <section [waGap]="'wa-gap-xl'" class="wa-grid">...</section>
 */
class WaLayoutGapDirective {
    el;
    renderer;
    previousClass;
    gap;
    constructor(el, renderer) {
        this.el = el;
        this.renderer = renderer;
    }
    ngOnChanges(changes) {
        if ('gap' in changes) {
            this.applyClass();
        }
    }
    applyClass() {
        const host = this.el.nativeElement;
        if (this.previousClass) {
            this.renderer.removeClass(host, this.previousClass);
            this.previousClass = undefined;
        }
        const cls = this.toClassName(this.gap);
        if (cls) {
            this.renderer.addClass(host, cls);
            this.previousClass = cls;
        }
    }
    toClassName(value) {
        if (!value)
            return undefined;
        switch (value) {
            case '0':
            case 'wa-gap-0':
                return 'wa-gap-0';
            case '3xs':
            case 'wa-gap-3xs':
                return 'wa-gap-3xs';
            case '2xs':
            case 'wa-gap-2xs':
                return 'wa-gap-2xs';
            case 'xs':
            case 'wa-gap-xs':
                return 'wa-gap-xs';
            case 's':
            case 'wa-gap-s':
                return 'wa-gap-s';
            case 'm':
            case 'wa-gap-m':
                return 'wa-gap-m';
            case 'l':
            case 'wa-gap-l':
                return 'wa-gap-l';
            case 'xl':
            case 'wa-gap-xl':
                return 'wa-gap-xl';
            case '2xl':
            case 'wa-gap-2xl':
                return 'wa-gap-2xl';
            case '3xl':
            case 'wa-gap-3xl':
                return 'wa-gap-3xl';
            default:
                return undefined;
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaLayoutGapDirective, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.14", type: WaLayoutGapDirective, isStandalone: true, selector: "[waGap]", inputs: { gap: ["waGap", "gap"] }, usesOnChanges: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaLayoutGapDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[waGap]'
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i0.Renderer2 }], propDecorators: { gap: [{
                type: Input,
                args: ['waGap']
            }] } });

/**
 * Attribute directive to conveniently apply Web Awesome align-items utility classes.
 *
 * Usage:
 * <div [waAlignItems]="'center'" class="wa-cluster">...</div>
 * <div [waAlignItems]="'wa-align-items-baseline'" class="wa-stack">...</div>
 */
class WaLayoutAlignItemsDirective {
    el;
    renderer;
    previousClass;
    alignItems;
    constructor(el, renderer) {
        this.el = el;
        this.renderer = renderer;
    }
    ngOnChanges(changes) {
        if ('alignItems' in changes) {
            this.applyClass();
        }
    }
    applyClass() {
        const host = this.el.nativeElement;
        // remove previous
        if (this.previousClass) {
            this.renderer.removeClass(host, this.previousClass);
            this.previousClass = undefined;
        }
        const cls = this.toClassName(this.alignItems);
        if (cls) {
            this.renderer.addClass(host, cls);
            this.previousClass = cls;
        }
    }
    toClassName(value) {
        if (!value)
            return undefined;
        // Accept both raw class name and shorthand tokens
        switch (value) {
            case 'start':
            case 'wa-align-items-start':
                return 'wa-align-items-start';
            case 'end':
            case 'wa-align-items-end':
                return 'wa-align-items-end';
            case 'center':
            case 'wa-align-items-center':
                return 'wa-align-items-center';
            case 'stretch':
            case 'wa-align-items-stretch':
                return 'wa-align-items-stretch';
            case 'baseline':
            case 'wa-align-items-baseline':
                return 'wa-align-items-baseline';
            default:
                return undefined;
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaLayoutAlignItemsDirective, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.14", type: WaLayoutAlignItemsDirective, isStandalone: true, selector: "[waAlignItems]", inputs: { alignItems: ["waAlignItems", "alignItems"] }, usesOnChanges: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaLayoutAlignItemsDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[waAlignItems]'
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i0.Renderer2 }], propDecorators: { alignItems: [{
                type: Input,
                args: ['waAlignItems']
            }] } });

/**
 * [waCluster] — Angular helper to apply the wa-cluster layout primitive with optional typed options.
 *
 * Minimal responsibility: toggle the `wa-cluster` class on the host.
 * Optional inputs map to utility classes when provided:
 *  - direction: row | column (maps to wa-cluster:row / wa-cluster:column)
 *  - wrap: boolean (true => wa-wrap, false => wa-nowrap)
 *  - justify: start|center|end|between|around|evenly (maps to wa-justify-*)
 *
 * Use together with [waGap] and [waAlignItems] for spacing and cross-axis alignment.
 */
class WaLayoutClusterDirective {
    el;
    renderer;
    enable = '';
    waClusterDirection;
    waClusterWrap; // truthy => wrap, falsy => nowrap
    waClusterJustify;
    applied = new Set();
    constructor(el, renderer) {
        this.el = el;
        this.renderer = renderer;
    }
    ngOnChanges(_) {
        this.sync();
    }
    sync() {
        const host = this.el.nativeElement;
        // First, remove all classes we may have added previously
        for (const cls of Array.from(this.applied)) {
            this.renderer.removeClass(host, cls);
            this.applied.delete(cls);
        }
        // Only apply when enabled (default enabled when attribute present without binding)
        if (!this.isTruthy(this.enable)) {
            return;
        }
        // Always add base class
        this.addClass('wa-cluster');
        // Direction mapping
        const dir = this.normalizeDirection(this.waClusterDirection);
        if (dir)
            this.addClass(dir);
        // Wrap mapping
        const wrap = this.normalizeWrap(this.waClusterWrap);
        if (wrap)
            this.addClass(wrap);
        // Justify mapping
        const just = this.normalizeJustify(this.waClusterJustify);
        if (just)
            this.addClass(just);
    }
    addClass(cls) {
        this.renderer.addClass(this.el.nativeElement, cls);
        this.applied.add(cls);
    }
    isTruthy(v) {
        return !(v === false || v === 'false' || v == null);
    }
    normalizeDirection(v) {
        if (!v)
            return undefined;
        switch (v) {
            case 'row':
            case 'wa-cluster:row':
                return 'wa-cluster:row';
            case 'column':
            case 'wa-cluster:column':
                return 'wa-cluster:column';
            default:
                return undefined;
        }
    }
    normalizeWrap(v) {
        if (v == null)
            return undefined;
        const truthy = this.isTruthy(v);
        return truthy ? 'wa-wrap' : 'wa-nowrap';
    }
    normalizeJustify(v) {
        if (!v)
            return undefined;
        switch (v) {
            case 'start':
            case 'wa-justify-start':
                return 'wa-justify-start';
            case 'center':
            case 'wa-justify-center':
                return 'wa-justify-center';
            case 'end':
            case 'wa-justify-end':
                return 'wa-justify-end';
            case 'between':
            case 'wa-justify-between':
                return 'wa-justify-between';
            case 'around':
            case 'wa-justify-around':
                return 'wa-justify-around';
            case 'evenly':
            case 'wa-justify-evenly':
                return 'wa-justify-evenly';
            default:
                return undefined;
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaLayoutClusterDirective, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.14", type: WaLayoutClusterDirective, isStandalone: true, selector: "[waCluster]", inputs: { enable: ["waCluster", "enable"], waClusterDirection: "waClusterDirection", waClusterWrap: "waClusterWrap", waClusterJustify: "waClusterJustify" }, usesOnChanges: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaLayoutClusterDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[waCluster]'
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i0.Renderer2 }], propDecorators: { enable: [{
                type: Input,
                args: ['waCluster']
            }], waClusterDirection: [{
                type: Input
            }], waClusterWrap: [{
                type: Input
            }], waClusterJustify: [{
                type: Input
            }] } });

/**
 * [waFlank] — Angular helper to apply the wa-flank layout primitive with optional typed options.
 *
 * Responsibilities:
 *  - Toggle the `wa-flank` class on the host
 *  - Optionally append `wa-flank:start` or `wa-flank:end` to control which item flanks
 *  - Optionally add `wa-nowrap` when `waFlankNowrap` is truthy
 *  - Optionally set CSS custom properties `--flank-size` and `--content-percentage`
 *
 * Use together with [waGap] for spacing and [waAlignItems] for cross-axis alignment.
 */
class WaLayoutFlankDirective {
    el;
    renderer;
    enable = '';
    waFlankPosition;
    waFlankNowrap;
    flankSize; // maps to --flank-size
    contentPercentage; // maps to --content-percentage (e.g., "70%")
    appliedClasses = new Set();
    constructor(el, renderer) {
        this.el = el;
        this.renderer = renderer;
    }
    ngOnChanges(_) {
        this.sync();
    }
    sync() {
        const host = this.el.nativeElement;
        // Remove prior classes we added
        for (const cls of Array.from(this.appliedClasses)) {
            this.renderer.removeClass(host, cls);
            this.appliedClasses.delete(cls);
        }
        // Clear CSS vars we manage before re-applying
        this.renderer.removeStyle(host, '--flank-size');
        this.renderer.removeStyle(host, '--content-percentage');
        if (!this.isTruthy(this.enable)) {
            return;
        }
        // Base class
        this.addClass('wa-flank');
        // Position
        const pos = this.normalizePosition(this.waFlankPosition);
        if (pos)
            this.addClass(pos);
        // No-wrap
        if (this.isTruthy(this.waFlankNowrap)) {
            this.addClass('wa-nowrap');
        }
        // CSS variables
        if (this.flankSize) {
            this.renderer.setStyle(host, '--flank-size', this.flankSize);
        }
        if (this.contentPercentage) {
            this.renderer.setStyle(host, '--content-percentage', this.contentPercentage);
        }
    }
    addClass(cls) {
        this.renderer.addClass(this.el.nativeElement, cls);
        this.appliedClasses.add(cls);
    }
    isTruthy(v) {
        return !(v === false || v === 'false' || v == null);
    }
    normalizePosition(v) {
        if (!v)
            return undefined;
        switch (v) {
            case 'start':
            case 'wa-flank:start':
                return 'wa-flank:start';
            case 'end':
            case 'wa-flank:end':
                return 'wa-flank:end';
            default:
                return undefined;
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaLayoutFlankDirective, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.14", type: WaLayoutFlankDirective, isStandalone: true, selector: "[waFlank]", inputs: { enable: ["waFlank", "enable"], waFlankPosition: "waFlankPosition", waFlankNowrap: "waFlankNowrap", flankSize: "flankSize", contentPercentage: "contentPercentage" }, usesOnChanges: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaLayoutFlankDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[waFlank]'
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i0.Renderer2 }], propDecorators: { enable: [{
                type: Input,
                args: ['waFlank']
            }], waFlankPosition: [{
                type: Input
            }], waFlankNowrap: [{
                type: Input
            }], flankSize: [{
                type: Input
            }], contentPercentage: [{
                type: Input
            }] } });

/**
 * [waFrame] — Angular helper to apply the wa-frame layout primitive with typed options.
 *
 * Responsibilities:
 *  - Toggle the `wa-frame` class on the host
 *  - Optional ratio token adds `wa-frame:square|landscape|portrait`
 *  - Optional custom aspectRatio string sets CSS `aspect-ratio` on host
 *  - Optional border radius token adds `wa-border-radius-*`
 *  - Optional custom borderRadius string sets style `border-radius` on host
 *  - Optional objectFit sets CSS custom property `--object-fit` (consumed by Web Awesome CSS)
 */
class WaLayoutFrameDirective {
    el;
    renderer;
    enable = '';
    waFrameRatio;
    aspectRatio; // e.g., "16 / 9", "4/3"
    waFrameRadius;
    borderRadius; // e.g., "12px", "50% 0%"
    objectFit;
    appliedClasses = new Set();
    constructor(el, renderer) {
        this.el = el;
        this.renderer = renderer;
    }
    ngOnChanges(_) {
        this.sync();
    }
    sync() {
        const host = this.el.nativeElement;
        // Remove classes we previously added
        for (const cls of Array.from(this.appliedClasses)) {
            this.renderer.removeClass(host, cls);
            this.appliedClasses.delete(cls);
        }
        // Clear managed styles
        this.renderer.removeStyle(host, 'aspect-ratio');
        this.renderer.removeStyle(host, 'border-radius');
        this.renderer.removeStyle(host, '--object-fit');
        if (!this.isTruthy(this.enable)) {
            return;
        }
        // Base class
        this.addClass('wa-frame');
        // Ratio token
        const ratioCls = this.normalizeRatio(this.waFrameRatio);
        if (ratioCls)
            this.addClass(ratioCls);
        // Custom aspect ratio
        if (this.aspectRatio) {
            this.renderer.setStyle(host, 'aspect-ratio', this.aspectRatio);
        }
        // Border radius token
        const radiusCls = this.normalizeRadius(this.waFrameRadius);
        if (radiusCls)
            this.addClass(radiusCls);
        // Custom border radius
        if (this.borderRadius) {
            this.renderer.setStyle(host, 'border-radius', this.borderRadius);
        }
        // Object fit via CSS custom property (consumed by WA styles)
        if (this.objectFit) {
            this.renderer.setStyle(host, '--object-fit', String(this.objectFit));
        }
    }
    addClass(cls) {
        this.renderer.addClass(this.el.nativeElement, cls);
        this.appliedClasses.add(cls);
    }
    isTruthy(v) {
        return !(v === false || v === 'false' || v == null);
    }
    normalizeRatio(v) {
        if (!v)
            return undefined;
        switch (v) {
            case 'square':
            case 'wa-frame:square':
                return 'wa-frame:square';
            case 'landscape':
            case 'wa-frame:landscape':
                return 'wa-frame:landscape';
            case 'portrait':
            case 'wa-frame:portrait':
                return 'wa-frame:portrait';
            default:
                return undefined;
        }
    }
    normalizeRadius(v) {
        if (!v)
            return undefined;
        switch (v) {
            case 's':
            case 'wa-border-radius-s':
                return 'wa-border-radius-s';
            case 'm':
            case 'wa-border-radius-m':
                return 'wa-border-radius-m';
            case 'l':
            case 'wa-border-radius-l':
                return 'wa-border-radius-l';
            case 'pill':
            case 'wa-border-radius-pill':
                return 'wa-border-radius-pill';
            case 'circle':
            case 'wa-border-radius-circle':
                return 'wa-border-radius-circle';
            case 'square':
            case 'wa-border-radius-square':
                return 'wa-border-radius-square';
            default:
                return undefined;
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaLayoutFrameDirective, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.14", type: WaLayoutFrameDirective, isStandalone: true, selector: "[waFrame]", inputs: { enable: ["waFrame", "enable"], waFrameRatio: "waFrameRatio", aspectRatio: "aspectRatio", waFrameRadius: "waFrameRadius", borderRadius: "borderRadius", objectFit: "objectFit" }, usesOnChanges: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaLayoutFrameDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[waFrame]'
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i0.Renderer2 }], propDecorators: { enable: [{
                type: Input,
                args: ['waFrame']
            }], waFrameRatio: [{
                type: Input
            }], aspectRatio: [{
                type: Input
            }], waFrameRadius: [{
                type: Input
            }], borderRadius: [{
                type: Input
            }], objectFit: [{
                type: Input
            }] } });

/**
 * [waGrid] — Angular helper to apply the wa-grid layout primitive and common options.
 *
 * Responsibilities:
 *  - Toggle the `wa-grid` class on the host
 *  - Support sizing via CSS custom properties commonly used by WA grid:
 *    - minColumnSize -> --min-column-size (e.g., 20ch, 16rem, 200px)
 *    - columns -> --columns (number)
 *    - rowSize -> --row-size
 *  - Provide a convenient boolean input to add/remove `wa-span-grid` on a child when the directive is applied to that child via [waGridSpan]
 *
 * Use with [waGap] for spacing and [waAlignItems] for cross-axis alignment.
 */
class WaLayoutGridDirective {
    el;
    renderer;
    enable = '';
    minColumnSize;
    columns;
    rowSize;
    appliedBase = false;
    constructor(el, renderer) {
        this.el = el;
        this.renderer = renderer;
    }
    ngOnChanges(_) {
        this.sync();
    }
    sync() {
        const host = this.el.nativeElement;
        // Base class toggle
        if (!this.isTruthy(this.enable)) {
            if (this.appliedBase) {
                this.renderer.removeClass(host, 'wa-grid');
                this.appliedBase = false;
            }
            // Clear managed styles
            this.clearStyles(host);
            return;
        }
        if (!this.appliedBase) {
            this.renderer.addClass(host, 'wa-grid');
            this.appliedBase = true;
        }
        // Re-apply managed styles
        this.clearStyles(host);
        if (this.minColumnSize)
            this.renderer.setStyle(host, '--min-column-size', this.minColumnSize);
        if (this.columns != null && this.columns !== '')
            this.renderer.setStyle(host, '--columns', String(this.columns));
        if (this.rowSize)
            this.renderer.setStyle(host, '--row-size', this.rowSize);
    }
    clearStyles(host) {
        this.renderer.removeStyle(host, '--min-column-size');
        this.renderer.removeStyle(host, '--columns');
        this.renderer.removeStyle(host, '--row-size');
    }
    isTruthy(v) {
        return !(v === false || v === 'false' || v == null);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaLayoutGridDirective, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.14", type: WaLayoutGridDirective, isStandalone: true, selector: "[waGrid]", inputs: { enable: ["waGrid", "enable"], minColumnSize: "minColumnSize", columns: "columns", rowSize: "rowSize" }, usesOnChanges: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaLayoutGridDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[waGrid]'
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i0.Renderer2 }], propDecorators: { enable: [{
                type: Input,
                args: ['waGrid']
            }], minColumnSize: [{
                type: Input
            }], columns: [{
                type: Input
            }], rowSize: [{
                type: Input
            }] } });
/**
 * [waGridSpan] — helper directive to mark a grid child as full-span (adds `wa-span-grid`).
 */
class WaLayoutGridSpanDirective {
    el;
    renderer;
    span = '';
    applied = false;
    constructor(el, renderer) {
        this.el = el;
        this.renderer = renderer;
    }
    ngOnChanges(_) {
        const host = this.el.nativeElement;
        const truthy = !(this.span === false || this.span === 'false' || this.span == null);
        if (truthy && !this.applied) {
            this.renderer.addClass(host, 'wa-span-grid');
            this.applied = true;
        }
        else if (!truthy && this.applied) {
            this.renderer.removeClass(host, 'wa-span-grid');
            this.applied = false;
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaLayoutGridSpanDirective, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.14", type: WaLayoutGridSpanDirective, isStandalone: true, selector: "[waGridSpan]", inputs: { span: ["waGridSpan", "span"] }, usesOnChanges: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaLayoutGridSpanDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[waGridSpan]'
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i0.Renderer2 }], propDecorators: { span: [{
                type: Input,
                args: ['waGridSpan']
            }] } });

/**
 * [waSplit] — Angular helper to apply the wa-split layout primitive with typed options.
 *
 * Responsibilities:
 *  - Toggle the `wa-split` class on the host
 *  - Optional direction token adds `wa-split:row` or `wa-split:column`
 *  - Optional collapse value sets CSS var `--wa-split-collapse` (e.g., `40rem`)
 *  - Works with [waGap] and [waAlignItems]
 */
class WaLayoutSplitDirective {
    el;
    renderer;
    enable = '';
    waSplitDirection;
    splitCollapse; // maps to --wa-split-collapse
    applied = new Set();
    constructor(el, renderer) {
        this.el = el;
        this.renderer = renderer;
    }
    ngOnChanges(_) {
        this.sync();
    }
    sync() {
        const host = this.el.nativeElement;
        // Remove classes we added previously
        for (const cls of Array.from(this.applied)) {
            this.renderer.removeClass(host, cls);
            this.applied.delete(cls);
        }
        // Clear managed styles
        this.renderer.removeStyle(host, '--wa-split-collapse');
        if (!this.isTruthy(this.enable)) {
            return;
        }
        // Base class
        this.addClass('wa-split');
        // Direction
        const dir = this.normalizeDirection(this.waSplitDirection);
        if (dir)
            this.addClass(dir);
        // Collapse
        if (this.splitCollapse) {
            this.renderer.setStyle(host, '--wa-split-collapse', this.splitCollapse);
        }
    }
    addClass(cls) {
        this.renderer.addClass(this.el.nativeElement, cls);
        this.applied.add(cls);
    }
    isTruthy(v) {
        return !(v === false || v === 'false' || v == null);
    }
    normalizeDirection(v) {
        if (!v)
            return undefined;
        switch (v) {
            case 'row':
            case 'wa-split:row':
                return 'wa-split:row';
            case 'column':
            case 'wa-split:column':
                return 'wa-split:column';
            default:
                return undefined;
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaLayoutSplitDirective, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.14", type: WaLayoutSplitDirective, isStandalone: true, selector: "[waSplit]", inputs: { enable: ["waSplit", "enable"], waSplitDirection: "waSplitDirection", splitCollapse: "splitCollapse" }, usesOnChanges: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaLayoutSplitDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[waSplit]'
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i0.Renderer2 }], propDecorators: { enable: [{
                type: Input,
                args: ['waSplit']
            }], waSplitDirection: [{
                type: Input
            }], splitCollapse: [{
                type: Input
            }] } });

/**
 * [waStack] — Angular helper to apply the wa-stack layout primitive with typed options.
 *
 * Responsibilities:
 *  - Toggle the `wa-stack` class on the host
 *  - Optional direction token adds `wa-stack:column` or `wa-stack:row`
 *  - Optional justify maps to `wa-justify-start|center|end`
 *  - Optional dividers boolean adds `wa-dividers`
 *
 * Use together with [waGap] for spacing and [waAlignItems] for cross-axis alignment.
 */
class WaLayoutStackDirective {
    el;
    renderer;
    enable = '';
    waStackDirection;
    waStackJustify;
    waStackDividers;
    applied = new Set();
    constructor(el, renderer) {
        this.el = el;
        this.renderer = renderer;
    }
    ngOnChanges(_) {
        this.sync();
    }
    sync() {
        const host = this.el.nativeElement;
        // Remove previously added classes
        for (const cls of Array.from(this.applied)) {
            this.renderer.removeClass(host, cls);
            this.applied.delete(cls);
        }
        if (!this.isTruthy(this.enable)) {
            return;
        }
        // Base class
        this.addClass('wa-stack');
        // Direction
        const dir = this.normalizeDirection(this.waStackDirection);
        if (dir)
            this.addClass(dir);
        // Justify
        const just = this.normalizeJustify(this.waStackJustify);
        if (just)
            this.addClass(just);
        // Dividers
        if (this.isTruthy(this.waStackDividers)) {
            this.addClass('wa-dividers');
        }
    }
    addClass(cls) {
        this.renderer.addClass(this.el.nativeElement, cls);
        this.applied.add(cls);
    }
    isTruthy(v) {
        return !(v === false || v === 'false' || v == null);
    }
    normalizeDirection(v) {
        if (!v)
            return undefined;
        switch (v) {
            case 'column':
            case 'wa-stack:column':
                return 'wa-stack:column';
            case 'row':
            case 'wa-stack:row':
                return 'wa-stack:row';
            default:
                return undefined;
        }
    }
    normalizeJustify(v) {
        if (!v)
            return undefined;
        switch (v) {
            case 'start':
            case 'wa-justify-start':
                return 'wa-justify-start';
            case 'center':
            case 'wa-justify-center':
                return 'wa-justify-center';
            case 'end':
            case 'wa-justify-end':
                return 'wa-justify-end';
            default:
                return undefined;
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaLayoutStackDirective, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.14", type: WaLayoutStackDirective, isStandalone: true, selector: "[waStack]", inputs: { enable: ["waStack", "enable"], waStackDirection: "waStackDirection", waStackJustify: "waStackJustify", waStackDividers: "waStackDividers" }, usesOnChanges: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaLayoutStackDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[waStack]'
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i0.Renderer2 }], propDecorators: { enable: [{
                type: Input,
                args: ['waStack']
            }], waStackDirection: [{
                type: Input
            }], waStackJustify: [{
                type: Input
            }], waStackDividers: [{
                type: Input
            }] } });

/**
 * [waText] — Angular helper to apply Web Awesome Text Utility classes with typed options.
 *
 * Responsibilities:
 *  - Apply body/heading/caption/longform typography tokens
 *  - Apply link styles, list reset, form control text roles
 *  - Apply single-purpose font-size, font-weight, text color
 *  - Apply truncation utility
 *
 * Notes:
 *  - Inputs accept short tokens (e.g., 's', '2xl') or full class tokens (e.g., 'wa-body-s').
 *  - Directive maintains and replaces previously applied classes when inputs change.
 */
class WaTextDirective {
    el;
    renderer;
    // Grouped text styles (choose one size per group)
    waBody;
    waHeading;
    waCaption;
    waLongform;
    // Link styles
    waLink;
    // Lists
    waListPlain;
    // Form control text roles
    waFormControlText;
    // Single-purpose utilities
    waFontSize;
    waFontWeight;
    waColorText;
    // Truncation
    waTextTruncate;
    applied = new Set();
    constructor(el, renderer) {
        this.el = el;
        this.renderer = renderer;
    }
    ngOnChanges(_) {
        this.sync();
    }
    sync() {
        const host = this.el.nativeElement;
        // Remove previously added classes
        for (const cls of Array.from(this.applied)) {
            this.renderer.removeClass(host, cls);
            this.applied.delete(cls);
        }
        // Grouped styles
        this.applyGrouped('body', this.waBody);
        this.applyGrouped('heading', this.waHeading);
        this.applyGrouped('caption', this.waCaption);
        this.applyGrouped('longform', this.waLongform);
        // Link styles
        const linkClass = this.normalizeLink(this.waLink);
        if (linkClass)
            this.addClass(linkClass);
        // List reset
        if (this.isTruthy(this.waListPlain))
            this.addClass('wa-list-plain');
        // Form control text
        const fc = this.normalizeFormControlText(this.waFormControlText);
        if (fc)
            this.addClass(fc);
        // Single-purpose utilities
        const fs = this.normalizeFontSize(this.waFontSize);
        if (fs)
            this.addClass(fs);
        const fw = this.normalizeFontWeight(this.waFontWeight);
        if (fw)
            this.addClass(fw);
        const color = this.normalizeColorText(this.waColorText);
        if (color)
            this.addClass(color);
        // Truncate
        if (this.isTruthy(this.waTextTruncate))
            this.addClass('wa-text-truncate');
    }
    applyGrouped(kind, value) {
        const cls = this.normalizeGrouped(kind, value);
        if (cls)
            this.addClass(cls);
    }
    normalizeGrouped(kind, value) {
        if (!value)
            return undefined;
        const v = String(value).trim();
        // Exact passthrough for full class names
        if (v === `wa-${kind}` || v.startsWith(`wa-${kind}-`))
            return v;
        // Accept short size tokens
        switch (v) {
            case '2xs':
            case 'xs':
            case 's':
            case 'm':
            case 'l':
            case 'xl':
            case '2xl':
            case '3xl':
            case '4xl':
                return `wa-${kind}-${v}`;
            default:
                return undefined;
        }
    }
    normalizeLink(v) {
        if (v == null)
            return undefined;
        if (v === true)
            return 'wa-link';
        if (v === false || v === 'false')
            return undefined;
        const s = String(v).trim();
        if (!s)
            return undefined;
        switch (s) {
            case 'link':
            case 'wa-link':
                return 'wa-link';
            case 'plain':
            case 'wa-link-plain':
                return 'wa-link-plain';
            default:
                return undefined;
        }
    }
    normalizeFormControlText(v) {
        if (!v)
            return undefined;
        switch (v) {
            case 'label':
            case 'wa-form-control-label':
                return 'wa-form-control-label';
            case 'value':
            case 'wa-form-control-value':
                return 'wa-form-control-value';
            case 'placeholder':
            case 'wa-form-control-placeholder':
                return 'wa-form-control-placeholder';
            case 'hint':
            case 'wa-form-control-hint':
                return 'wa-form-control-hint';
            default:
                return undefined;
        }
    }
    normalizeFontSize(v) {
        if (!v)
            return undefined;
        const s = String(v).trim();
        if (s.startsWith('wa-font-size-'))
            return s;
        switch (s) {
            case '2xs':
            case 'xs':
            case 's':
            case 'm':
            case 'l':
            case 'xl':
            case '2xl':
            case '3xl':
            case '4xl':
                return `wa-font-size-${s}`;
            default:
                return undefined;
        }
    }
    normalizeFontWeight(v) {
        if (!v)
            return undefined;
        const s = String(v).trim();
        switch (s) {
            case 'light':
            case 'wa-font-weight-light':
                return 'wa-font-weight-light';
            case 'normal':
            case 'wa-font-weight-normal':
                return 'wa-font-weight-normal';
            case 'semibold':
            case 'wa-font-weight-semibold':
                return 'wa-font-weight-semibold';
            case 'bold':
            case 'wa-font-weight-bold':
                return 'wa-font-weight-bold';
            default:
                return undefined;
        }
    }
    normalizeColorText(v) {
        if (!v)
            return undefined;
        const s = String(v).trim();
        switch (s) {
            case 'quiet':
            case 'wa-color-text-quiet':
            case 'wa-color-quiet': // support legacy token used in examples
                return 'wa-color-text-quiet';
            case 'normal':
            case 'wa-color-text-normal':
            case 'wa-color-normal':
                return 'wa-color-text-normal';
            case 'link':
            case 'wa-color-text-link':
            case 'wa-color-link':
                return 'wa-color-text-link';
            default:
                return undefined;
        }
    }
    isTruthy(v) {
        return !(v === false || v === 'false' || v == null);
    }
    addClass(cls) {
        this.renderer.addClass(this.el.nativeElement, cls);
        this.applied.add(cls);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaTextDirective, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.14", type: WaTextDirective, isStandalone: true, selector: "[waText]", inputs: { waBody: "waBody", waHeading: "waHeading", waCaption: "waCaption", waLongform: "waLongform", waLink: "waLink", waListPlain: "waListPlain", waFormControlText: "waFormControlText", waFontSize: "waFontSize", waFontWeight: "waFontWeight", waColorText: "waColorText", waTextTruncate: "waTextTruncate" }, usesOnChanges: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaTextDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[waText]'
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i0.Renderer2 }], propDecorators: { waBody: [{
                type: Input
            }], waHeading: [{
                type: Input
            }], waCaption: [{
                type: Input
            }], waLongform: [{
                type: Input
            }], waLink: [{
                type: Input
            }], waListPlain: [{
                type: Input
            }], waFormControlText: [{
                type: Input
            }], waFontSize: [{
                type: Input
            }], waFontWeight: [{
                type: Input
            }], waColorText: [{
                type: Input
            }], waTextTruncate: [{
                type: Input
            }] } });

/**
 * [waVariant] — Angular helper to apply Web Awesome color variant utility classes
 * to any element (`.wa-brand`, `.wa-neutral`, `.wa-success`, `.wa-warning`, `.wa-danger`).
 *
 * Usage:
 *  - <div [waVariant]="'brand'"></div>
 *  - <div waBrand></div>
 *  - <div [waBrand]="true"></div>
 *  - <div [waVariant]="'wa-success'"></div>
 *
 * The directive ensures that only one variant class is applied at a time.
 */
class WaVariantDirective {
    el;
    renderer;
    // Primary API: one-of variant
    waVariant = null;
    // Boolean shorthands
    waBrand;
    waNeutral;
    waSuccess;
    waWarning;
    waDanger;
    applied = null;
    constructor(el, renderer) {
        this.el = el;
        this.renderer = renderer;
    }
    ngOnChanges(_) {
        this.sync();
    }
    sync() {
        // Determine desired variant in priority order: explicit waVariant, then boolean shorthands
        const desired = this.normalizeVariant(this.waVariant ?? (this.isTruthy(this.waBrand) ? 'brand'
            : this.isTruthy(this.waNeutral) ? 'neutral'
                : this.isTruthy(this.waSuccess) ? 'success'
                    : this.isTruthy(this.waWarning) ? 'warning'
                        : this.isTruthy(this.waDanger) ? 'danger'
                            : null));
        // Remove previously applied class if different
        if (this.applied && this.applied !== desired) {
            this.renderer.removeClass(this.el.nativeElement, this.applied);
            this.applied = null;
        }
        // Apply new class
        if (desired) {
            this.renderer.addClass(this.el.nativeElement, desired);
            this.applied = desired;
        }
    }
    normalizeVariant(v) {
        if (!v)
            return null;
        const str = String(v);
        if (str === 'brand' || str === 'wa-brand')
            return 'wa-brand';
        if (str === 'neutral' || str === 'wa-neutral')
            return 'wa-neutral';
        if (str === 'success' || str === 'wa-success')
            return 'wa-success';
        if (str === 'warning' || str === 'wa-warning')
            return 'wa-warning';
        if (str === 'danger' || str === 'wa-danger')
            return 'wa-danger';
        // Unknown: do not apply
        return null;
    }
    isTruthy(v) {
        // Support presence-only boolean inputs (empty string) and true boolean
        return v === '' || v === true || v === 'true';
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaVariantDirective, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.14", type: WaVariantDirective, isStandalone: true, selector: "[waVariant],[waBrand],[waNeutral],[waSuccess],[waWarning],[waDanger]", inputs: { waVariant: "waVariant", waBrand: "waBrand", waNeutral: "waNeutral", waSuccess: "waSuccess", waWarning: "waWarning", waDanger: "waDanger" }, usesOnChanges: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaVariantDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[waVariant],[waBrand],[waNeutral],[waSuccess],[waWarning],[waDanger]',
                    standalone: true
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i0.Renderer2 }], propDecorators: { waVariant: [{
                type: Input
            }], waBrand: [{
                type: Input
            }], waNeutral: [{
                type: Input
            }], waSuccess: [{
                type: Input
            }], waWarning: [{
                type: Input
            }], waDanger: [{
                type: Input
            }] } });

class WaZoomableFrameDirective {
    host;
    renderer;
    constructor(host, renderer) {
        this.host = host;
        this.renderer = renderer;
    }
    // Properties
    src;
    srcdoc;
    allowfullscreen;
    loading = 'eager';
    referrerpolicy;
    sandbox;
    zoom;
    zoomLevels;
    withoutControls;
    withoutInteraction;
    // Events
    load = new EventEmitter();
    error = new EventEmitter();
    setAll() {
        const el = this.host.nativeElement;
        this.setAttr('src', this.src);
        this.setAttr('srcdoc', this.srcdoc);
        this.setBooleanAttr('allowfullscreen', this.allowfullscreen);
        this.setAttr('loading', this.loading);
        this.setAttr('referrerpolicy', this.referrerpolicy);
        this.setAttr('sandbox', this.sandbox);
        this.setNumericAttr('zoom', this.zoom);
        this.setAttr('zoom-levels', this.zoomLevels);
        this.setBooleanAttr('without-controls', this.withoutControls);
        this.setBooleanAttr('without-interaction', this.withoutInteraction);
        // Events passthrough from internal iframe are re-dispatched by web component
        this.renderer.listen(el, 'load', (e) => this.load.emit(e));
        this.renderer.listen(el, 'error', (e) => this.error.emit(e));
    }
    ngAfterViewInit() { this.setAll(); }
    ngOnChanges() { this.setAll(); }
    setAttr(name, value) {
        if (value !== undefined && value !== null) {
            this.renderer.setAttribute(this.host.nativeElement, name, String(value));
        }
    }
    setNumericAttr(name, value) {
        if (value !== undefined && value !== null) {
            const n = typeof value === 'string' ? parseFloat(value) : value;
            if (!isNaN(n)) {
                this.renderer.setAttribute(this.host.nativeElement, name, String(n));
            }
        }
    }
    setBooleanAttr(name, value) {
        if (value === true || value === 'true' || value === '') {
            this.renderer.setAttribute(this.host.nativeElement, name, '');
        }
        else {
            this.renderer.removeAttribute(this.host.nativeElement, name);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaZoomableFrameDirective, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.14", type: WaZoomableFrameDirective, isStandalone: true, selector: "wa-zoomable-frame", inputs: { src: "src", srcdoc: "srcdoc", allowfullscreen: "allowfullscreen", loading: "loading", referrerpolicy: "referrerpolicy", sandbox: "sandbox", zoom: "zoom", zoomLevels: "zoomLevels", withoutControls: "withoutControls", withoutInteraction: "withoutInteraction" }, outputs: { load: "load", error: "error" }, usesOnChanges: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaZoomableFrameDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'wa-zoomable-frame',
                    standalone: true
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i0.Renderer2 }], propDecorators: { src: [{
                type: Input
            }], srcdoc: [{
                type: Input
            }], allowfullscreen: [{
                type: Input
            }], loading: [{
                type: Input
            }], referrerpolicy: [{
                type: Input
            }], sandbox: [{
                type: Input
            }], zoom: [{
                type: Input
            }], zoomLevels: [{
                type: Input
            }], withoutControls: [{
                type: Input
            }], withoutInteraction: [{
                type: Input
            }], load: [{
                type: Output
            }], error: [{
                type: Output
            }] } });

class WaFileInputDirective {
    host;
    renderer;
    constructor(host, renderer) {
        this.host = host;
        this.renderer = renderer;
    }
    // Properties
    size = 'medium';
    label;
    hint;
    multiple;
    accept;
    required;
    withLabel;
    withHint;
    // Events
    input = new EventEmitter();
    change = new EventEmitter();
    focus = new EventEmitter();
    blur = new EventEmitter();
    waInvalid = new EventEmitter();
    setAll() {
        const el = this.host.nativeElement;
        this.setAttr('size', this.size);
        this.setAttr('label', this.label);
        this.setAttr('hint', this.hint);
        this.setBooleanAttr('multiple', this.multiple);
        this.setAttr('accept', this.accept);
        this.setBooleanAttr('required', this.required);
        this.setBooleanAttr('with-label', this.withLabel);
        this.setBooleanAttr('with-hint', this.withHint);
        this.renderer.listen(el, 'input', (e) => this.input.emit(e));
        this.renderer.listen(el, 'change', (e) => this.change.emit(e));
        this.renderer.listen(el, 'focus', (e) => this.focus.emit(e));
        this.renderer.listen(el, 'blur', (e) => this.blur.emit(e));
        this.renderer.listen(el, 'wa-invalid', (e) => this.waInvalid.emit(e));
    }
    ngAfterViewInit() { this.setAll(); }
    ngOnChanges() { this.setAll(); }
    setAttr(name, value) {
        if (value !== undefined && value !== null) {
            this.renderer.setAttribute(this.host.nativeElement, name, String(value));
        }
    }
    setBooleanAttr(name, value) {
        if (value === true || value === 'true' || value === '') {
            this.renderer.setAttribute(this.host.nativeElement, name, '');
        }
        else {
            this.renderer.removeAttribute(this.host.nativeElement, name);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaFileInputDirective, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.14", type: WaFileInputDirective, isStandalone: true, selector: "wa-file-input", inputs: { size: "size", label: "label", hint: "hint", multiple: "multiple", accept: "accept", required: "required", withLabel: "withLabel", withHint: "withHint" }, outputs: { input: "input", change: "change", focus: "focus", blur: "blur", waInvalid: "wa-invalid" }, usesOnChanges: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaFileInputDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'wa-file-input',
                    standalone: true
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i0.Renderer2 }], propDecorators: { size: [{
                type: Input
            }], label: [{
                type: Input
            }], hint: [{
                type: Input
            }], multiple: [{
                type: Input
            }], accept: [{
                type: Input
            }], required: [{
                type: Input
            }], withLabel: [{
                type: Input
            }], withHint: [{
                type: Input
            }], input: [{
                type: Output
            }], change: [{
                type: Output
            }], focus: [{
                type: Output
            }], blur: [{
                type: Output
            }], waInvalid: [{
                type: Output,
                args: ['wa-invalid']
            }] } });

class WaSparklineDirective {
    host;
    renderer;
    constructor(host, renderer) {
        this.host = host;
        this.renderer = renderer;
    }
    // Properties
    label;
    data;
    appearance = 'solid';
    trend;
    curve = 'linear';
    // CSS variables helpers
    set fillColor(value) { this.setStyle('--fill-color', value); }
    set lineColor(value) { this.setStyle('--line-color', value); }
    set lineWidth(value) { this.setStyle('--line-width', value); }
    setAll() {
        this.setAttr('label', this.label);
        this.setAttr('data', this.data);
        this.setAttr('appearance', this.appearance);
        this.setAttr('trend', this.trend);
        this.setAttr('curve', this.curve);
    }
    ngAfterViewInit() { this.setAll(); }
    ngOnChanges() { this.setAll(); }
    setAttr(name, value) {
        if (value !== undefined && value !== null && value !== '') {
            this.renderer.setAttribute(this.host.nativeElement, name, String(value));
        }
    }
    setStyle(name, value) {
        if (value) {
            this.host.nativeElement.style.setProperty(name, value);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaSparklineDirective, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.14", type: WaSparklineDirective, isStandalone: true, selector: "wa-sparkline", inputs: { label: "label", data: "data", appearance: "appearance", trend: "trend", curve: "curve", fillColor: "fillColor", lineColor: "lineColor", lineWidth: "lineWidth" }, usesOnChanges: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaSparklineDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'wa-sparkline',
                    standalone: true
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i0.Renderer2 }], propDecorators: { label: [{
                type: Input
            }], data: [{
                type: Input
            }], appearance: [{
                type: Input
            }], trend: [{
                type: Input
            }], curve: [{
                type: Input
            }], fillColor: [{
                type: Input
            }], lineColor: [{
                type: Input
            }], lineWidth: [{
                type: Input
            }] } });

class WaNumberInputDirective {
    host;
    renderer;
    constructor(host, renderer) {
        this.host = host;
        this.renderer = renderer;
    }
    // Properties (subset mapped from llms.txt)
    value;
    defaultValue;
    size = 'medium';
    appearance = 'outlined';
    pill;
    label;
    hint;
    placeholder;
    readonly;
    required;
    min;
    max;
    step = 1;
    withoutSteppers;
    autocomplete;
    autofocus;
    enterkeyhint;
    inputmode = 'numeric';
    withLabel;
    withHint;
    // Events
    input = new EventEmitter();
    change = new EventEmitter();
    blur = new EventEmitter();
    focus = new EventEmitter();
    waInvalid = new EventEmitter();
    setAll() {
        const el = this.host.nativeElement;
        this.setAttr('value', this.value);
        this.setAttr('size', this.size);
        this.setAttr('appearance', this.appearance);
        this.setBooleanAttr('pill', this.pill);
        this.setAttr('label', this.label);
        this.setAttr('hint', this.hint);
        this.setAttr('placeholder', this.placeholder);
        this.setBooleanAttr('readonly', this.readonly);
        this.setBooleanAttr('required', this.required);
        this.setNumericAttr('min', this.min);
        this.setNumericAttr('max', this.max);
        this.setAttr('step', this.step);
        this.setBooleanAttr('without-steppers', this.withoutSteppers);
        this.setAttr('autocomplete', this.autocomplete);
        this.setBooleanAttr('autofocus', this.autofocus);
        this.setAttr('enterkeyhint', this.enterkeyhint);
        this.setAttr('inputmode', this.inputmode);
        this.setBooleanAttr('with-label', this.withLabel);
        this.setBooleanAttr('with-hint', this.withHint);
        this.renderer.listen(el, 'input', (e) => this.input.emit(e));
        this.renderer.listen(el, 'change', (e) => this.change.emit(e));
        this.renderer.listen(el, 'blur', (e) => this.blur.emit(e));
        this.renderer.listen(el, 'focus', (e) => this.focus.emit(e));
        this.renderer.listen(el, 'wa-invalid', (e) => this.waInvalid.emit(e));
    }
    ngAfterViewInit() { this.setAll(); }
    ngOnChanges() { this.setAll(); }
    setAttr(name, value) {
        if (value !== undefined && value !== null && value !== '') {
            this.renderer.setAttribute(this.host.nativeElement, name, String(value));
        }
    }
    setNumericAttr(name, value) {
        if (value !== undefined && value !== null && value !== '') {
            const n = typeof value === 'string' ? parseFloat(value) : value;
            if (!isNaN(n)) {
                this.renderer.setAttribute(this.host.nativeElement, name, String(n));
            }
        }
    }
    setBooleanAttr(name, value) {
        if (value === true || value === 'true' || value === '') {
            this.renderer.setAttribute(this.host.nativeElement, name, '');
        }
        else {
            this.renderer.removeAttribute(this.host.nativeElement, name);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaNumberInputDirective, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.14", type: WaNumberInputDirective, isStandalone: true, selector: "wa-number-input", inputs: { value: "value", defaultValue: "defaultValue", size: "size", appearance: "appearance", pill: "pill", label: "label", hint: "hint", placeholder: "placeholder", readonly: "readonly", required: "required", min: "min", max: "max", step: "step", withoutSteppers: "withoutSteppers", autocomplete: "autocomplete", autofocus: "autofocus", enterkeyhint: "enterkeyhint", inputmode: "inputmode", withLabel: "withLabel", withHint: "withHint" }, outputs: { input: "input", change: "change", blur: "blur", focus: "focus", waInvalid: "wa-invalid" }, usesOnChanges: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaNumberInputDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'wa-number-input',
                    standalone: true
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i0.Renderer2 }], propDecorators: { value: [{
                type: Input
            }], defaultValue: [{
                type: Input
            }], size: [{
                type: Input
            }], appearance: [{
                type: Input
            }], pill: [{
                type: Input
            }], label: [{
                type: Input
            }], hint: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], readonly: [{
                type: Input
            }], required: [{
                type: Input
            }], min: [{
                type: Input
            }], max: [{
                type: Input
            }], step: [{
                type: Input
            }], withoutSteppers: [{
                type: Input
            }], autocomplete: [{
                type: Input
            }], autofocus: [{
                type: Input
            }], enterkeyhint: [{
                type: Input
            }], inputmode: [{
                type: Input
            }], withLabel: [{
                type: Input
            }], withHint: [{
                type: Input
            }], input: [{
                type: Output
            }], change: [{
                type: Output
            }], blur: [{
                type: Output
            }], focus: [{
                type: Output
            }], waInvalid: [{
                type: Output,
                args: ['wa-invalid']
            }] } });

const DEFAULT_TOAST_CONFIG = {
    position: 'top-right',
    max: 5,
    duration: 5000,
    newestOnTop: true,
    gap: 12,
    zIndex: 10000
};

const WA_TOAST_CONFIG = new InjectionToken('WA_TOAST_CONFIG');
function provideWaToasts(config = {}) {
    return [
        { provide: WA_TOAST_CONFIG, useValue: config }
    ];
}
class WaToastService {
    cfg = { ...DEFAULT_TOAST_CONFIG, ...(inject(WA_TOAST_CONFIG, { optional: true }) || {}) };
    visible = [];
    queue = [];
    timers = new Map();
    subject = new BehaviorSubject([]);
    toasts$ = this.subject.asObservable();
    get config() {
        return { ...DEFAULT_TOAST_CONFIG, ...this.cfg };
    }
    setConfig(partial) {
        this.cfg = { ...this.cfg, ...partial };
        this.emit();
    }
    show(message, options = {}) {
        const id = this.uuid();
        const toast = {
            id,
            message,
            variant: options.variant,
            appearance: options.appearance,
            size: options.size,
            closable: options.closable ?? true,
            duration: options.duration ?? this.config.duration,
            title: options.title,
            createdAt: Date.now()
        };
        this.enqueue(toast);
        return id;
    }
    success(message, options = {}) {
        return this.show(message, { variant: 'success', ...options });
    }
    warning(message, options = {}) {
        return this.show(message, { variant: 'warning', ...options });
    }
    danger(message, options = {}) {
        return this.show(message, { variant: 'danger', ...options });
    }
    brand(message, options = {}) {
        return this.show(message, { variant: 'brand', ...options });
    }
    neutral(message, options = {}) {
        return this.show(message, { variant: 'neutral', ...options });
    }
    update(id, changes) {
        let updated = false;
        this.visible = this.visible.map(t => {
            if (t.id === id) {
                updated = true;
                return { ...t, ...changes };
            }
            return t;
        });
        if (!updated) {
            this.queue = this.queue.map(t => (t.id === id ? { ...t, ...changes } : t));
        }
        this.emit();
    }
    close(id) {
        this.clearTimer(id);
        const idx = this.visible.findIndex(t => t.id === id);
        if (idx !== -1) {
            this.visible.splice(idx, 1);
            this.fillFromQueue();
            this.emit();
            return;
        }
        // If not visible yet, remove from queue
        this.queue = this.queue.filter(t => t.id !== id);
        this.emit();
    }
    clearAll() {
        // clear timers
        for (const id of this.timers.keys())
            this.clearTimer(id);
        this.visible = [];
        this.queue = [];
        this.emit();
    }
    enqueue(toast) {
        const max = this.config.max;
        if (this.visible.length < max) {
            if (this.config.newestOnTop) {
                this.visible = [toast, ...this.visible];
            }
            else {
                this.visible = [...this.visible, toast];
            }
            this.startTimerIfNeeded(toast);
            this.emit();
        }
        else {
            this.queue.push(toast);
        }
    }
    fillFromQueue() {
        const max = this.config.max;
        while (this.visible.length < max && this.queue.length > 0) {
            const next = this.queue.shift();
            if (this.config.newestOnTop) {
                this.visible = [next, ...this.visible];
            }
            else {
                this.visible = [...this.visible, next];
            }
            this.startTimerIfNeeded(next);
        }
    }
    startTimerIfNeeded(toast) {
        const duration = toast.duration ?? this.config.duration;
        if (duration && duration > 0) {
            const handle = setTimeout(() => this.close(toast.id), duration);
            this.timers.set(toast.id, handle);
        }
    }
    clearTimer(id) {
        const handle = this.timers.get(id);
        if (handle) {
            clearTimeout(handle);
            this.timers.delete(id);
        }
    }
    emit() {
        // sort by createdAt depending on newestOnTop, but keep current order
        // We already maintain order at insertion time; just emit a shallow copy
        this.subject.next([...this.visible]);
    }
    uuid() {
        // Simple RFC4122 v4-ish ID
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaToastService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaToastService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaToastService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });

class WaToastContainerComponent {
    service = inject(WaToastService);
    positionSig = signal(DEFAULT_TOAST_CONFIG.position);
    set position(value) {
        this.positionSig.set(value ?? this.service.config.position);
    }
    positionValue = computed(() => this.positionSig());
    // reflect for CSS positioning
    get posAttr() { return this.positionValue(); }
    toasts = signal([]);
    subscription;
    ngOnInit() {
        this.toasts.set([]);
        this.subscription = this.service.toasts$.subscribe(list => this.toasts.set(list));
        // initialize position from service config if not provided
        if (!this.positionSig()) {
            this.positionSig.set(this.service.config.position);
        }
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe?.();
        }
    }
    close(t) {
        this.service.close(t.id);
    }
    trackById = (_, t) => t.id;
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaToastContainerComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.14", type: WaToastContainerComponent, isStandalone: true, selector: "wa-toast-container", inputs: { position: "position" }, host: { properties: { "attr.data-pos": "this.posAttr" } }, ngImport: i0, template: `
    <div class="wa-toast-stack" [attr.data-position]="positionValue()" role="region" aria-live="polite" aria-label="Notifications">
      <ng-container *ngFor="let t of toasts(); trackBy: trackById">
        <wa-callout
          class="wa-toast"
          [variant]="t.variant"
          [appearance]="t.appearance || 'filled'"
          [size]="t.size || 'medium'"
          [attr.role]="'status'"
        >
          <div class="wa-toast__content">
            <div class="wa-toast__text">
              <strong *ngIf="t.title">{{ t.title }}</strong>
              <div class="wa-toast__message">{{ t.message }}</div>
            </div>
            <button *ngIf="t.closable !== false" type="button" class="wa-toast__close" (click)="close(t)">
              ×
            </button>
          </div>
        </wa-callout>
      </ng-container>
    </div>
  `, isInline: true, styles: [":host{position:fixed;inset:auto;pointer-events:none;z-index:10000}.wa-toast-stack{display:flex;gap:12px}.wa-toast{pointer-events:auto}.wa-toast__content{display:flex;align-items:start;gap:12px}.wa-toast__text{display:grid;gap:4px}.wa-toast__message{line-height:1.35}.wa-toast__close{background:none;border:0;font-size:18px;line-height:1;cursor:pointer;color:inherit}:host([data-pos=\"top-right\"]){top:16px;right:16px}:host([data-pos=\"top-left\"]){top:16px;left:16px}:host([data-pos=\"bottom-right\"]){bottom:16px;right:16px}:host([data-pos=\"bottom-left\"]){bottom:16px;left:16px}:host([data-pos=\"top-center\"]){top:16px;left:50%;transform:translate(-50%)}:host([data-pos=\"bottom-center\"]){bottom:16px;left:50%;transform:translate(-50%)}[data-position^=top]{flex-direction:column}[data-position^=bottom]{flex-direction:column-reverse}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: WaCalloutDirective, selector: "wa-callout", inputs: ["variant", "appearance", "size"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: WaToastContainerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'wa-toast-container', standalone: true, imports: [CommonModule, WaCalloutDirective], template: `
    <div class="wa-toast-stack" [attr.data-position]="positionValue()" role="region" aria-live="polite" aria-label="Notifications">
      <ng-container *ngFor="let t of toasts(); trackBy: trackById">
        <wa-callout
          class="wa-toast"
          [variant]="t.variant"
          [appearance]="t.appearance || 'filled'"
          [size]="t.size || 'medium'"
          [attr.role]="'status'"
        >
          <div class="wa-toast__content">
            <div class="wa-toast__text">
              <strong *ngIf="t.title">{{ t.title }}</strong>
              <div class="wa-toast__message">{{ t.message }}</div>
            </div>
            <button *ngIf="t.closable !== false" type="button" class="wa-toast__close" (click)="close(t)">
              ×
            </button>
          </div>
        </wa-callout>
      </ng-container>
    </div>
  `, changeDetection: ChangeDetectionStrategy.OnPush, styles: [":host{position:fixed;inset:auto;pointer-events:none;z-index:10000}.wa-toast-stack{display:flex;gap:12px}.wa-toast{pointer-events:auto}.wa-toast__content{display:flex;align-items:start;gap:12px}.wa-toast__text{display:grid;gap:4px}.wa-toast__message{line-height:1.35}.wa-toast__close{background:none;border:0;font-size:18px;line-height:1;cursor:pointer;color:inherit}:host([data-pos=\"top-right\"]){top:16px;right:16px}:host([data-pos=\"top-left\"]){top:16px;left:16px}:host([data-pos=\"bottom-right\"]){bottom:16px;right:16px}:host([data-pos=\"bottom-left\"]){bottom:16px;left:16px}:host([data-pos=\"top-center\"]){top:16px;left:50%;transform:translate(-50%)}:host([data-pos=\"bottom-center\"]){bottom:16px;left:50%;transform:translate(-50%)}[data-position^=top]{flex-direction:column}[data-position^=bottom]{flex-direction:column-reverse}\n"] }]
        }], propDecorators: { position: [{
                type: Input
            }], posAttr: [{
                type: HostBinding,
                args: ['attr.data-pos']
            }] } });

/*
 * Public API Surface of angular-awesome
 */
// Import CSS tokens

/**
 * Generated bundle index. Do not edit.
 */

export { DEFAULT_TOAST_CONFIG, WA_TOAST_CONFIG, WaAnimatedImageDirective, WaAnimationDirective, WaAvatarDirective, WaBadgeDirective, WaBreadcrumbDirective, WaBreadcrumbItemDirective, WaButtonDirective, WaButtonGroupDirective, WaCalloutDirective, WaCardDirective, WaCarouselDirective, WaCarouselItemDirective, WaCheckboxDirective, WaColorPickerDirective, WaComboboxComponent, WaComparisonDirective, WaCopyButtonDirective, WaDetailsDirective, WaDialogDirective, WaDividerDirective, WaDrawerDirective, WaDropdownDirective, WaDropdownItemDirective, WaFileInputDirective, WaFormatBytesDirective, WaFormatDateDirective, WaFormatNumberDirective, WaIconDirective, WaIncludeDirective, WaInputDirective, WaIntersectionObserverDirective, WaLayoutAlignItemsDirective, WaLayoutClusterDirective, WaLayoutFlankDirective, WaLayoutFrameDirective, WaLayoutGapDirective, WaLayoutGridDirective, WaLayoutGridSpanDirective, WaLayoutSplitDirective, WaLayoutStackDirective, WaMutationObserverDirective, WaNumberInputDirective, WaOptionComponent, WaPageComponent, WaPopoverDirective, WaPopupDirective, WaProgressBarDirective, WaProgressRingDirective, WaQrCodeDirective, WaRadioButtonDirective, WaRadioDirective, WaRadioGroupDirective, WaRatingDirective, WaRelativeTimeDirective, WaScrollerDirective, WaSelectWrapperComponent, WaSkeletonDirective, WaSliderDirective, WaSparklineDirective, WaSpinnerDirective, WaSplitPanelDirective, WaSwitchDirective, WaTabComponent, WaTabGroupComponent, WaTabPanelComponent, WaTagDirective, WaTextDirective, WaTextareaComponent, WaToastContainerComponent, WaToastService, WaTooltipDirective, WaTreeDirective, WaTreeItemDirective, WaVariantDirective, WaZoomableFrameDirective, provideWaToasts };
//# sourceMappingURL=angular-awesome.mjs.map
