import { ElementRef } from '@angular/core';
import { WaFormatDateDirective } from './format-date.directive';

describe('WaFormatDateDirective', () => {
  let directive: WaFormatDateDirective;
  let elementMock: ElementRef;

  beforeEach(() => {
    // Create a mock ElementRef
    elementMock = {
      nativeElement: {
        textContent: ''
      }
    } as ElementRef;

    // Create the directive with the mock ElementRef
    directive = new WaFormatDateDirective(elementMock);
  });

  it('should create', () => {
    expect(directive).toBeTruthy();
  });

  it('should set default values', () => {
    expect(directive.date()).toEqual(jasmine.any(Date));
    expect(directive.hourFormat()).toBe('auto');
    expect(directive.lang()).toBe('en');
  });

  it('should set hourFormat value', () => {
    // Set hourFormat to specific values
    directive.hourFormat.set('12');
    expect(directive.hourFormat()).toBe('12');

    directive.hourFormat.set('24');
    expect(directive.hourFormat()).toBe('24');

    directive.hourFormat.set('auto');
    expect(directive.hourFormat()).toBe('auto');
  });

  // Note: We're not testing formatting functionality as it's handled by the web awesome component
});
