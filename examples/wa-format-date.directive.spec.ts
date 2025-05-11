import { ElementRef } from '@angular/core';
import { WaFormatDateDirective } from './wa-format-date.directive';

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
    expect(directive.date).toEqual(jasmine.any(Date));
    expect(directive.hourFormat).toBe('auto');
    expect(directive.lang).toBe('en');
  });

  it('should handle hourFormat as a standalone attribute', () => {
    // Test setting hourFormat to empty string (standalone attribute)
    directive.hourFormat = '';
    expect(directive.hourFormat).toBe('auto');

    // Test setting hourFormat to true (another way to represent standalone attribute)
    directive.hourFormat = true as any;
    expect(directive.hourFormat).toBe('auto');

    // Test setting hourFormat to specific values
    directive.hourFormat = '12';
    expect(directive.hourFormat).toBe('12');

    directive.hourFormat = '24';
    expect(directive.hourFormat).toBe('24');
  });

  it('should update formatted date on init', () => {
    // Set some formatting options
    directive.year = 'numeric';
    directive.month = 'long';
    directive.day = 'numeric';

    // Call ngOnInit to trigger formatting
    directive.ngOnInit();

    // Check that the element's textContent was updated
    expect(elementMock.nativeElement.textContent).toBeTruthy();
  });

  it('should update formatted date when inputs change', () => {
    // Set initial formatting options
    directive.year = 'numeric';
    directive.month = 'long';
    directive.day = 'numeric';
    directive.ngOnInit();

    const initialText = elementMock.nativeElement.textContent;

    // Change formatting options
    directive.year = '2-digit';
    directive.month = 'short';

    // Trigger ngOnChanges
    directive.ngOnChanges({});

    // Check that the formatted date was updated
    expect(elementMock.nativeElement.textContent).toBeTruthy();
    // The text should be different after changing the format
    expect(elementMock.nativeElement.textContent).not.toEqual(initialText);
  });

  it('should format date with different locales', () => {
    // Set formatting options
    directive.year = 'numeric';
    directive.month = 'long';
    directive.day = 'numeric';

    // Format with English locale
    directive.lang = 'en';
    directive.ngOnInit();
    const englishText = elementMock.nativeElement.textContent;

    // Format with French locale
    directive.lang = 'fr';
    directive.ngOnChanges({});
    const frenchText = elementMock.nativeElement.textContent;

    // The formatted dates should be different in different locales
    expect(frenchText).not.toEqual(englishText);
  });
});
