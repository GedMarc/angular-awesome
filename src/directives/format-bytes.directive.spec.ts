import { ElementRef } from '@angular/core';
import { WaFormatBytesDirective } from './format-bytes.directive';

describe('WaFormatBytesDirective', () => {
  let directive: WaFormatBytesDirective;
  let elementMock: ElementRef;

  beforeEach(() => {
    // Create a mock ElementRef
    elementMock = {
      nativeElement: {
        textContent: ''
      }
    } as ElementRef;

    // Create the directive with the mock ElementRef
    directive = new WaFormatBytesDirective(elementMock);
  });

  it('should create', () => {
    expect(directive).toBeTruthy();
  });

  it('should set default values', () => {
    expect(directive.value()).toBe(0);
    expect(directive.unit()).toBe('byte');
    expect(directive.display()).toBe('short');
    expect(directive.lang()).toBe('en');
  });

  // Note: We're not testing formatting functionality as it's handled by the web awesome component
});
